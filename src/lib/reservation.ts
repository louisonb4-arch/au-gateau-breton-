import type { ServiceId } from "@/content/hours";
import type { Locale } from "@/lib/i18n";
import { addDays, fromMinutes, isClosedDay, parisNow, scheduleFor, toMinutes } from "@/lib/hours";

/**
 * Online reservation — front-end only for now.
 *
 * To go live:
 *  1. Create the backend (e.g. `src/app/api/reservations/route.ts`, Supabase, or a Zenchef/TheFork bridge)
 *     that accepts a `ReservationRequest` as JSON and returns `{ reference: string }`.
 *  2. Set NEXT_PUBLIC_RESERVATION_ENABLED=true.
 * Until then the form works end-to-end in the UI and invites guests to confirm by phone.
 */
export const reservationEnabled = process.env.NEXT_PUBLIC_RESERVATION_ENABLED === "true";
export const RESERVATION_ENDPOINT = "/api/reservations";

export const reservationConfig = {
  /** Above this, guests are sent to the group enquiry. */
  maxOnlineGuests: 8,
  slotStepMinutes: 15,
  /** Last seating = closing time minus this. */
  lastSeatingBeforeCloseMinutes: 45,
  /** Minimum notice for a same-day booking. */
  minLeadMinutes: 60,
  bookingWindowDays: 30,
};

export type ReservationRequest = {
  date: string; // YYYY-MM-DD
  service: ServiceId;
  time: string; // HH:MM
  guests: number;
  name: string;
  phone: string;
  email: string;
  notes?: string;
  locale: Locale;
};

export type ReservationResult =
  | { ok: true; reference: string }
  | { ok: false; reason: "not-enabled" | "error" };

export async function submitReservation(request: ReservationRequest): Promise<ReservationResult> {
  if (!reservationEnabled) return { ok: false, reason: "not-enabled" };
  try {
    const res = await fetch(RESERVATION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!res.ok) return { ok: false, reason: "error" };
    const data = (await res.json()) as { reference: string };
    return { ok: true, reference: data.reference };
  } catch {
    return { ok: false, reason: "error" };
  }
}

export type BookableDay = { iso: string; closed: boolean };

export function bookableDays(now = new Date()): BookableDay[] {
  const { iso } = parisNow(now);
  return Array.from({ length: reservationConfig.bookingWindowDays }, (_, i) => {
    const day = addDays(iso, i);
    return { iso: day, closed: isClosedDay(day) || slotsFor(day, "lunch", now).length + slotsFor(day, "dinner", now).length === 0 };
  });
}

export function slotsFor(iso: string, service: ServiceId, now = new Date()): string[] {
  const range = scheduleFor(iso)[service];
  if (!range) return [];
  const { iso: today, minutes: nowMinutes } = parisNow(now);
  const first = toMinutes(range.open);
  const last = toMinutes(range.close) - reservationConfig.lastSeatingBeforeCloseMinutes;
  const slots: string[] = [];
  for (let m = first; m <= last; m += reservationConfig.slotStepMinutes) {
    if (iso === today && m < nowMinutes + reservationConfig.minLeadMinutes) continue;
    slots.push(fromMinutes(m));
  }
  return slots;
}
