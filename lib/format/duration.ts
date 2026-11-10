/** Compact French duration used across the admin follow-up screens. */
export function formatDuration(seconds: number | null | undefined) {
  if (seconds === null || seconds === undefined || seconds <= 0) return "0 min";

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return hours > 0 ? `${days} j ${hours} h` : `${days} j`;
  if (hours > 0) return minutes > 0 ? `${hours} h ${minutes} min` : `${hours} h`;
  if (minutes > 0) return `${minutes} min`;
  return "moins d'une minute";
}

/** "il y a 4 min" style label for the last heartbeat received from a learner. */
export function formatRelativeTime(value: string | null | undefined) {
  if (!value) return "jamais connecte";

  const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return "a l'instant";
  if (seconds < 3600) return `il y a ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `il y a ${Math.floor(seconds / 3600)} h`;
  return `il y a ${Math.floor(seconds / 86400)} j`;
}
