"use client";

import Dexie, { type Table } from "dexie";

import type { ProgramLesson, ProgramModule } from "@/lib/program";

export type PendingSyncType =
  | "quiz_progress"
  | "challenge_submission"
  | "forum_report"
  | "capstone_submission"
  | "lesson_complete";

export type CachedModule = {
  id: string;
  data: ProgramModule;
  cachedAt: Date;
};

export type CachedLesson = {
  id: string;
  moduleId: string;
  data: ProgramLesson;
  cachedAt: Date;
};

export type PendingSync = {
  id?: number;
  type: PendingSyncType;
  payload: unknown;
  createdAt: Date;
  status: "queued" | "syncing" | "failed";
  lastError?: string;
};

export type LocalProgress = {
  userId: string;
  moduleId: string;
  lessonsRead: string[];
  quizAnswers: Record<string, number>;
  quizScore?: number;
  passed?: boolean;
  pointsEarned?: number;
  updatedAt: Date;
};

class CyberAmbassadorDB extends Dexie {
  modules!: Table<CachedModule, string>;
  lessons!: Table<CachedLesson, string>;
  pendingSync!: Table<PendingSync, number>;
  localProgress!: Table<LocalProgress, string>;

  constructor() {
    super("CyberAmbassadorDB");
    this.version(1).stores({
      modules: "id, cachedAt",
      lessons: "id, moduleId, cachedAt",
      pendingSync: "++id, type, status, createdAt",
      localProgress: "moduleId, updatedAt"
    });
  }
}

export const offlineDb = new CyberAmbassadorDB();

export async function cacheModuleForOffline(module: ProgramModule) {
  await offlineDb.modules.put({
    id: module.id,
    data: module,
    cachedAt: new Date()
  });

  await offlineDb.lessons.bulkPut(
    module.lessons.map((lesson) => ({
      id: lesson.id,
      moduleId: module.id,
      data: lesson,
      cachedAt: new Date()
    }))
  );
}

export async function queuePendingSync(type: PendingSyncType, payload: unknown) {
  return offlineDb.pendingSync.add({
    type,
    payload,
    createdAt: new Date(),
    status: "queued"
  });
}

export async function saveQuizProgress(progress: LocalProgress) {
  await offlineDb.localProgress.put(progress);
  await queuePendingSync("quiz_progress", progress);
}

export async function countPendingSyncItems() {
  return offlineDb.pendingSync
    .where("status")
    .anyOf("queued", "syncing", "failed")
    .count();
}

async function pushPendingItem(item: PendingSync) {
  if (item.type === "forum_report") {
    const response = await fetch("/api/student/forum-reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item.payload)
    });
    if (!response.ok) throw new Error("Forum sync failed");
    return;
  }

  if (item.type === "capstone_submission") {
    const response = await fetch("/api/student/capstone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item.payload)
    });
    if (!response.ok) throw new Error("Capstone sync failed");
    return;
  }

  if (item.type === "quiz_progress") {
    const response = await fetch("/api/student/module-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item.payload)
    });
    if (!response.ok) throw new Error("Quiz progress sync failed");
    return;
  }

  if (item.type === "challenge_submission") {
    const payload = item.payload as {
      challengeId?: string;
      reportText?: string;
      city?: string;
      photo?: { blob?: Blob; name?: string };
    };
    const formData = new FormData();
    formData.set("challengeId", payload.challengeId ?? "");
    formData.set("reportText", payload.reportText ?? "");
    formData.set("city", payload.city ?? "");
    if (payload.photo?.blob) {
      formData.set("photo", payload.photo.blob, payload.photo.name ?? "photo.jpg");
    }

    const response = await fetch("/api/student/challenge-submissions", {
      method: "POST",
      body: formData
    });
    if (!response.ok) throw new Error("Challenge submission sync failed");
  }
}

export async function syncPending() {
  const pending = await offlineDb.pendingSync
    .where("status")
    .anyOf("queued", "syncing", "failed")
    .toArray();

  for (const item of pending) {
    if (!item.id) continue;

    try {
      await offlineDb.pendingSync.update(item.id, { status: "syncing" });
      await pushPendingItem(item);
      await offlineDb.pendingSync.delete(item.id);
    } catch (error) {
      await offlineDb.pendingSync.update(item.id, {
        status: "failed",
        lastError: error instanceof Error ? error.message : "Sync failed"
      });
    }
  }
}
