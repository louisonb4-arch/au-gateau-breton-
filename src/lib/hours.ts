import { exceptions, weeklyHours, type DaySchedule, type ServiceId } from "@/content/hours";

const TZ = "Europe/Paris";
export const services: ServiceId[] = ["lunch", "dinner"];

/** Today's date (YYYY-MM-DD) and minutes since midnight in Paris, whatever the visitor's timezone. */
export function parisNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "00";
  return {
    iso: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const fromMinutes = (total: number) =>
  `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

/** Weekday (0 = Sunday) of an ISO date, computed at noon UTC to stay clear of DST edges. */
export const weekdayOf = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();

export function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function scheduleFor(iso: string): DaySchedule {
  return exceptions[iso] ?? weeklyHours[weekdayOf(iso)] ?? {};
}

export const isClosedDay = (iso: string) => services.every((s) => !scheduleFor(iso)[s]);

export type OpenStatus =
  | { state: "open"; service: ServiceId; until: string }
  | { state: "later-today"; service: ServiceId; at: string }
  | { state: "closed"; next?: { iso: string; service: ServiceId; at: string } };

export function getOpenStatus(date = new Date()): OpenStatus {
  const { iso, minutes } = parisNow(date);
  const today = scheduleFor(iso);

  for (const service of services) {
    const range = today[service];
    if (!range) continue;
    if (minutes < toMinutes(range.open)) return { state: "later-today", service, at: range.open };
    if (minutes < toMinutes(range.close)) return { state: "open", service, until: range.close };
  }

  for (let i = 1; i <= 14; i++) {
    const day = addDays(iso, i);
    const schedule = scheduleFor(day);
    const service = services.find((s) => schedule[s]);
    if (service) return { state: "closed", next: { iso: day, service, at: schedule[service]!.open } };
  }
  return { state: "closed" };
}

/** "21:30" → "21h30" in French, "9:30 pm" in English. */
export function formatTime(hhmm: string, lang: "fr" | "en") {
  if (lang === "fr") return hhmm.replace(":", "h");
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "am" : "pm"}`;
}
