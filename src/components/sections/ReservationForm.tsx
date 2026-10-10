"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { CalendarCheck, Minus, Phone, Plus } from "lucide-react";
import type { ServiceId } from "@/content/hours";
import { dictionaries } from "@/content/dictionary";
import { restaurant } from "@/content/restaurant";
import { formatTime, services } from "@/lib/hours";
import type { Locale } from "@/lib/i18n";
import {
  bookableDays,
  reservationConfig,
  reservationEnabled,
  slotsFor,
  submitReservation,
  type BookableDay,
} from "@/lib/reservation";
import { buttonClass } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "pending" | "success" | "error";
type Fields = { name: string; phone: string; email: string; notes: string };

const dayFormat = (lang: Locale, opts: Intl.DateTimeFormatOptions) => (iso: string) =>
  new Intl.DateTimeFormat(lang, { ...opts, timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));

function Step({ n, label, children }: { n: number; label: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0 border-t border-line pt-6 first:border-t-0 first:pt-0">
      <legend className="mb-4 flex items-center gap-3 text-sm font-semibold text-ink">
        <span className="grid size-7 place-items-center rounded-full bg-bordeaux font-display text-[15px] text-paper">{n}</span>
        {label}
      </legend>
      {children}
    </fieldset>
  );
}

const chip =
  "rounded-xl border text-sm transition-[color,background-color,border-color,transform] duration-300 ease-out-soft active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 aria-pressed:border-bordeaux aria-pressed:bg-bordeaux aria-pressed:text-paper aria-pressed:shadow-[0_10px_20px_-12px_rgba(101,13,42,0.8)]";

// The dictionary is read here rather than passed as a prop: it contains formatting functions,
// which cannot cross the server → client boundary.
export function ReservationForm({ lang }: { lang: Locale }) {
  const t = dictionaries[lang].reservation;
  const [days, setDays] = useState<BookableDay[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [service, setService] = useState<ServiceId | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [fields, setFields] = useState<Fields>({ name: "", phone: "", email: "", notes: "" });
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");

  // Dates depend on "today", so they are computed in the browser only.
  useEffect(() => setDays(bookableDays()), []);

  const weekday = useMemo(() => dayFormat(lang, { weekday: "short" }), [lang]);
  const dayNum = useMemo(() => dayFormat(lang, { day: "numeric" }), [lang]);
  const month = useMemo(() => dayFormat(lang, { month: "short" }), [lang]);
  const longDate = useMemo(() => dayFormat(lang, { weekday: "long", day: "numeric", month: "long" }), [lang]);

  const slots = useMemo(() => (date && service ? slotsFor(date, service) : []), [date, service]);
  const availableServices = useMemo(
    () => (date ? services.filter((s) => slotsFor(date, s).length > 0) : []),
    [date],
  );

  const pickDate = (iso: string) => {
    setDate(iso);
    setTime(null);
    const offered = services.filter((s) => slotsFor(iso, s).length > 0);
    setService((current) => (current && offered.includes(current) ? current : (offered[0] ?? null)));
  };

  const setField = (key: keyof Fields) => (value: string) => setFields((f) => ({ ...f, [key]: value }));

  const errors = {
    date: !date,
    service: !service,
    time: !time,
    name: fields.name.trim().length < 2,
    phone: fields.phone.replace(/\D/g, "").length < 9,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()),
  };
  const valid = !Object.values(errors).some(Boolean);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid || !date || !service || !time) {
      setShowErrors(true);
      return;
    }
    setStatus("submitting");
    const result = await submitReservation({
      date,
      service,
      time,
      guests,
      name: fields.name.trim(),
      phone: fields.phone.trim(),
      email: fields.email.trim(),
      notes: fields.notes.trim() || undefined,
      locale: lang,
    });
    if (result.ok) {
      setReference(result.reference);
      setStatus("success");
    } else {
      setStatus(result.reason === "not-enabled" ? "pending" : "error");
    }
  }

  const summary = date && time ? t.summary(longDate(date), formatTime(time, lang), t.guestsUnit(guests)) : "";

  if (status === "pending" || status === "success") {
    const success = status === "success";
    return (
      <div className="flex min-h-[32rem] animate-[fade-up_0.8s_var(--ease-out-soft)_both] flex-col items-start justify-center gap-6 p-2 font-sans sm:p-4" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-bordeaux-soft text-bordeaux">
          <CalendarCheck className="size-7" />
        </span>
        <div>
          <h3 className="font-display text-[3rem] leading-[0.95] tracking-[0.01em] text-ink uppercase">{success ? t.successTitle : t.pendingTitle}</h3>
          <p className="mt-3 inline-block rounded-full bg-cream px-4 py-1.5 text-sm font-medium text-ink first-letter:uppercase">
            {summary}
          </p>
          <p className="mt-5 max-w-md font-serif text-[1.15rem] leading-relaxed text-slate">
            {success ? `${t.successText} ${reference}` : t.pendingText}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {!success && (
            <a href={restaurant.phone.href} className={buttonClass("primary", "lg")}>
              <Phone className="size-4" /> {restaurant.phone.display}
            </a>
          )}
          <button type="button" onClick={() => setStatus("idle")} className={buttonClass("outline", "lg")}>
            {t.edit}
          </button>
        </div>
      </div>
    );
  }

  const fieldClass = (invalid: boolean) =>
    `mt-1.5 h-12 w-full rounded-xl border bg-paper px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-bordeaux ${
      showErrors && invalid ? "border-terracotta" : "border-line"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7 font-sans">
      {!reservationEnabled && (
        <p className="rounded-2xl bg-cream px-4 py-3 text-sm leading-relaxed text-slate">
          {t.soon}{" "}
          <a href={restaurant.phone.href} className="font-semibold whitespace-nowrap text-bordeaux underline-offset-4 hover:underline">
            {restaurant.phone.display}
          </a>
          .
        </p>
      )}

      <Step n={1} label={t.steps.date}>
        <div className="no-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1" aria-busy={days.length === 0}>
          {days.length === 0 &&
            Array.from({ length: 7 }, (_, i) => <span key={i} className="h-[4.75rem] w-16 shrink-0 animate-pulse rounded-xl bg-cream" />)}
          {days.map((d, i) => (
            <button
              key={d.iso}
              type="button"
              disabled={d.closed}
              aria-pressed={date === d.iso}
              aria-label={longDate(d.iso)}
              onClick={() => pickDate(d.iso)}
              className={`${chip} flex h-[4.75rem] w-16 shrink-0 snap-start flex-col items-center justify-center gap-0.5 border-line bg-paper hover:border-ink/40`}
            >
              <span className="text-[11px] tracking-wide uppercase opacity-70">{i === 0 ? t.today : weekday(d.iso)}</span>
              <span className="font-display text-[1.9rem] leading-none">{dayNum(d.iso)}</span>
              <span className="text-[11px] opacity-70">{d.closed ? t.closed : month(d.iso)}</span>
            </button>
          ))}
        </div>
      </Step>

      <Step n={2} label={`${t.steps.service} & ${t.steps.time.toLowerCase()}`}>
        {!date ? (
          <p className={`text-sm ${showErrors ? "text-terracotta" : "text-muted"}`}>{t.pickDate}</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              {services.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={!availableServices.includes(s)}
                  aria-pressed={service === s}
                  onClick={() => {
                    setService(s);
                    setTime(null);
                  }}
                  className={`${chip} h-12 border-line bg-paper font-medium hover:border-ink/40`}
                >
                  {t.services[s]}
                </button>
              ))}
            </div>
            {slots.length > 0 ? (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={time === s}
                    onClick={() => setTime(s)}
                    className={`${chip} h-10 border-line bg-paper tabular-nums hover:border-ink/40`}
                  >
                    {formatTime(s, lang)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">{t.noSlots}</p>
            )}
            {showErrors && errors.time && slots.length > 0 && <p className="mt-2 text-sm text-terracotta">{t.required}</p>}
          </>
        )}
      </Step>

      <Step n={3} label={t.steps.guests}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              aria-label={t.fewer}
              className="grid size-11 place-items-center rounded-full border border-line text-ink hover:border-ink/40 disabled:opacity-40"
            >
              <Minus className="size-4" />
            </button>
            <output aria-live="polite" className="min-w-32 text-center font-display text-[1.9rem] leading-none tracking-[0.02em] text-ink uppercase">
              {t.guestsUnit(guests)}
            </output>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(reservationConfig.maxOnlineGuests, g + 1))}
              disabled={guests >= reservationConfig.maxOnlineGuests}
              aria-label={t.more}
              className="grid size-11 place-items-center rounded-full border border-line text-ink hover:border-ink/40 disabled:opacity-40"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <p className="text-sm text-muted">
            {t.groupsLead}{" "}
            <a href="#groupes" className="font-medium text-bordeaux underline-offset-4 hover:underline">
              {t.groupsLink}
            </a>
          </p>
        </div>
      </Step>

      <Step n={4} label={t.steps.details}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate sm:col-span-2">
            {t.fields.name}
            <input
              className={fieldClass(errors.name)}
              autoComplete="name"
              value={fields.name}
              onChange={(e) => setField("name")(e.target.value)}
              aria-invalid={showErrors && errors.name}
              required
            />
          </label>
          <label className="text-sm font-medium text-slate">
            {t.fields.phone}
            <input
              className={fieldClass(errors.phone)}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={fields.phone}
              onChange={(e) => setField("phone")(e.target.value)}
              aria-invalid={showErrors && errors.phone}
              required
            />
          </label>
          <label className="text-sm font-medium text-slate">
            {t.fields.email}
            <input
              className={fieldClass(errors.email)}
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={(e) => setField("email")(e.target.value)}
              aria-invalid={showErrors && errors.email}
              required
            />
          </label>
          <label className="text-sm font-medium text-slate sm:col-span-2">
            {t.fields.notes}
            <textarea
              rows={3}
              className={`${fieldClass(false)} h-auto resize-none py-3`}
              placeholder={t.fields.notesPlaceholder}
              value={fields.notes}
              onChange={(e) => setField("notes")(e.target.value)}
            />
          </label>
        </div>
      </Step>

      {showErrors && !valid && (
        <p role="alert" className="text-sm font-medium text-terracotta">
          {t.required}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-terracotta">
          {t.errorText}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted">{t.consent}</p>
        <button type="submit" disabled={status === "submitting"} className={buttonClass("primary", "lg", "shrink-0")}>
          {status === "submitting" ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}
