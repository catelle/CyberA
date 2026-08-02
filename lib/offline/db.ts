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
  progressVersion?: 3;
  userId: string;
  moduleId: string;
  lessonsRead: string[];
  lessonQuizAnswers: Record<string, number>;
  quizAnswers: Record<string, number>;
  quizScore?: number;
  passed?: boolean;
  pointsEarned?: number;
  updatedAt: Date;
};

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

function isProgressPayloadFor(
  item: PendingSync,
  userId: string,
  moduleId: string
) {
  if (item.type !== "quiz_progress" && item.type !== "lesson_complete") {
    return false;
  }

  const payload = item.payload as Partial<LocalProgress> | null;
  return payload?.userId === userId && payload.moduleId === moduleId;
}

async function saveModuleProgress(progress: LocalProgress, type: PendingSyncType) {
  await offlineDb.transaction("rw", offlineDb.localProgress, offlineDb.pendingSync, async () => {
    await offlineDb.localProgress.put(progress);

    // Keep only the newest cumulative snapshot for a module. This avoids showing
    // several pending actions when a learner opens lessons in quick succession.
    const duplicates = await offlineDb.pendingSync
      .where("type")
      .anyOf("quiz_progress", "lesson_complete")
      .filter((item) => isProgressPayloadFor(item, progress.userId, progress.moduleId))
      .primaryKeys();

    await offlineDb.pendingSync.bulkDelete(duplicates);
    await offlineDb.pendingSync.add({
      type,
      payload: progress,
      createdAt: new Date(),
      status: "queued"
    });
  });

  return progress;
}

export async function saveLessonProgress({
  userId,
  moduleId,
  lessonId,
  selectedIndex
}: {
  userId: string;
  moduleId: string;
  lessonId: string;
  selectedIndex: number;
}) {
  const stored = await offlineDb.localProgress.get(moduleId);
  const previous =
    stored?.userId === userId && stored.progressVersion === 3 ? stored : null;
  const lessonsRead = Array.from(
    new Set([...(previous?.lessonsRead ?? []), lessonId])
  );

  if (previous?.lessonsRead.includes(lessonId)) {
    return false;
  }

  await saveModuleProgress(
    {
      progressVersion: 3,
      userId,
      moduleId,
      lessonsRead,
      lessonQuizAnswers: {
        ...(previous?.lessonQuizAnswers ?? {}),
        [lessonId]: selectedIndex
      },
      quizAnswers: previous?.quizAnswers ?? {},
      quizScore: previous?.quizScore,
      passed: previous?.passed,
      pointsEarned: previous?.pointsEarned,
      updatedAt: new Date()
    },
    "lesson_complete"
  );

  return true;
}

export async function saveQuizProgress(progress: LocalProgress) {
  const stored = await offlineDb.localProgress.get(progress.moduleId);
  const previous =
    stored?.userId === progress.userId && stored.progressVersion === 3
      ? stored
      : null;
  const nextProgress = {
    ...progress,
    progressVersion: 3 as const,
    lessonQuizAnswers: previous?.lessonQuizAnswers ?? progress.lessonQuizAnswers,
    lessonsRead: Array.from(
      new Set([...(previous?.lessonsRead ?? []), ...progress.lessonsRead])
    )
  };

  return saveModuleProgress(nextProgress, "quiz_progress");
}

export async function countPendingSyncItems() {
  return offlineDb.pendingSync
    .where("status")
    .anyOf("queued", "syncing", "failed")
    .count();
}

async function pushPendingItem(item: PendingSync) {
  async function requireSuccessfulResponse(response: Response, fallback: string) {
    if (response.ok) return;

    const body = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new Error(body?.message ?? fallback);
  }

  if (item.type === "forum_report") {
    const response = await fetch("/api/student/forum-reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item.payload)
    });
    await requireSuccessfulResponse(response, "Forum sync failed");
    return;
  }

  if (item.type === "capstone_submission") {
    const response = await fetch("/api/student/capstone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item.payload)
    });
    await requireSuccessfulResponse(response, "Capstone sync failed");
    return;
  }

  if (item.type === "quiz_progress" || item.type === "lesson_complete") {
    const response = await fetch("/api/student/module-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item.payload)
    });
    await requireSuccessfulResponse(response, "Progress sync failed");
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
    await requireSuccessfulResponse(response, "Challenge submission sync failed");
  }
}

let activeSync: Promise<void> | null = null;

async function runPendingSync() {
  const pending = await offlineDb.pendingSync
    .where("status")
    .anyOf("queued", "syncing", "failed")
    .toArray();

  for (const item of pending) {
    if (!item.id) continue;

    if (item.type === "quiz_progress" || item.type === "lesson_complete") {
      const payload = item.payload as Partial<LocalProgress> | null;

      // Versions 1 and 2 marked lessons complete when they were merely opened.
      // Never sync those obsolete snapshots after quiz-gated completion ships.
      if (payload?.progressVersion !== 3) {
        await offlineDb.pendingSync.delete(item.id);
        continue;
      }
    }

    if (item.type === "challenge_submission") {
      const payload = item.payload as { challengeId?: string } | null;

      // Older builds displayed hard-coded demo challenges. Their non-UUID IDs
      // can never exist in Supabase, so remove those obsolete queue artifacts.
      if (!payload?.challengeId || !uuidPattern.test(payload.challengeId)) {
        await offlineDb.pendingSync.delete(item.id);
        continue;
      }
    }

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

export function syncPending() {
  if (activeSync) return activeSync;

  activeSync = runPendingSync().finally(() => {
    activeSync = null;
  });

  return activeSync;
}

export async function getPendingSyncSummary() {
  const items = await offlineDb.pendingSync
    .where("status")
    .anyOf("queued", "syncing", "failed")
    .toArray();
  const failed = items.filter((item) => item.status === "failed");

  return {
    count: items.length,
    failedCount: failed.length,
    lastError: failed.at(-1)?.lastError,
    lastFailedId: failed.at(-1)?.id
  };
}

export async function discardPendingSyncItem(id: number) {
  await offlineDb.pendingSync.delete(id);
}
