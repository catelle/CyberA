"use client";

import Link from "next/link";
import { useState } from "react";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  data?: { action_href?: string } | null;
};

export function NotificationCards({ notifications }: { notifications: Notification[] }) {
  const [readIds, setReadIds] = useState(() => new Set(notifications.filter((item) => item.read).map((item) => item.id)));

  async function markRead(id: string) {
    setReadIds((current) => new Set(current).add(id));
    await fetch(`/api/notifications/${id}`, { method: "PATCH" });
  }

  return (
    <div className="grid gap-3">
      {notifications.map((notification) => {
        const isRead = readIds.has(notification.id);
        return (
          <article className={isRead ? "rounded-lg bg-white p-5 shadow-sm" : "rounded-lg border-2 border-brand-gold bg-white p-5 shadow-sm"} key={notification.id}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-sm font-black uppercase text-brand-gold">{notification.type}</p>
              {!isRead ? <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-black text-white">Nouveau</span> : null}
            </div>
            <h2 className="mt-2 text-xl font-black text-brand-blue">{notification.title}</h2>
            <p className="mt-2 leading-7 text-slate-600">{notification.body}</p>
            {notification.data?.action_href ? (
              <Link className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 font-black text-white" href={notification.data.action_href} onClick={() => markRead(notification.id)}>
                Donner mon avis
              </Link>
            ) : !isRead ? (
              <button className="mt-4 text-sm font-black text-primary underline" onClick={() => markRead(notification.id)} type="button">Marquer comme lue</button>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
