/**
 * Opening hours, in Europe/Paris time. Days: 0 = Sunday … 6 = Saturday.
 * Kitchen service times drive the open status, the hours table and the reservation slots.
 */
export type ServiceId = "lunch" | "dinner";
export type TimeRange = { open: string; close: string };
export type DaySchedule = Partial<Record<ServiceId, TimeRange>>;

const lunch: TimeRange = { open: "12:00", close: "14:30" };
const dinner: TimeRange = { open: "19:00", close: "21:30" };

export const weeklyHours: Record<number, DaySchedule> = {
  1: { lunch, dinner }, // lundi
  2: { lunch }, // mardi
  3: {}, // mercredi — fermé
  4: { lunch, dinner }, // jeudi
  5: { lunch, dinner }, // vendredi
  6: { lunch, dinner }, // samedi
  0: { lunch }, // dimanche
};

/** Bar & welcome open earlier than the kitchen. */
export const barOpensAt = "10:00";

/** Exceptional days (closures, holidays). Format YYYY-MM-DD. An empty schedule means closed. */
export const exceptions: Record<string, DaySchedule> = {
  "2026-11-09": {},
  "2026-11-10": {},
  "2026-11-11": { lunch },
};

/** Display order for the hours table (week starts on Monday). */
export const weekOrder = [1, 2, 3, 4, 5, 6, 0];
