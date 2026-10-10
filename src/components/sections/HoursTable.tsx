"use client";

import { useEffect, useState } from "react";
import { barOpensAt, exceptions, weekOrder, weeklyHours, type DaySchedule } from "@/content/hours";
import type { Dictionary } from "@/content/dictionary";
import { formatTime, parisNow, weekdayOf } from "@/lib/hours";
import type { Locale } from "@/lib/i18n";

function ranges(schedule: DaySchedule, lang: Locale) {
  return [schedule.lunch, schedule.dinner]
    .filter((r) => r !== undefined)
    .map((r) => `${formatTime(r.open, lang)} – ${formatTime(r.close, lang)}`);
}

/** Weekly hours, with today highlighted and upcoming exceptional days listed (both need the visitor's clock). */
export function HoursTable({ lang, t }: { lang: Locale; t: Dictionary["info"] }) {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(parisNow().iso), []);

  const todayWeekday = today ? weekdayOf(today) : -1;
  const upcoming = today ? Object.entries(exceptions).filter(([iso]) => iso >= today).sort(([a], [b]) => a.localeCompare(b)) : [];
  const fmt = new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

  return (
    <div>
      <dl className="divide-y divide-line">
        {weekOrder.map((day) => {
          const r = ranges(weeklyHours[day], lang);
          const isToday = day === todayWeekday;
          return (
            <div
              key={day}
              className={`flex items-start justify-between gap-4 py-3 text-sm ${isToday ? "-mx-3 rounded-xl bg-cream px-3 font-semibold text-ink" : "text-slate"}`}
            >
              <dt className="flex items-center gap-2">
                {t.days[day]}
                {isToday && <span className="rounded-full bg-bordeaux px-2 py-0.5 text-[10px] tracking-wide text-paper uppercase">{t.today}</span>}
              </dt>
              <dd className="text-right tabular-nums">
                {r.length ? r.map((x) => <span key={x} className="block">{x}</span>) : <span className="text-muted">{t.closed}</span>}
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-4 text-xs text-muted">
        {t.bar} {formatTime(barOpensAt, lang)}
      </p>
      {upcoming.length > 0 && (
        <div className="mt-5 rounded-2xl border border-terracotta/30 bg-terracotta/5 p-4 text-sm">
          <p className="font-semibold text-ink">{t.exceptions}</p>
          <ul className="mt-2 space-y-1 text-slate">
            {upcoming.map(([iso, schedule]) => {
              const r = ranges(schedule, lang);
              return (
                <li key={iso} className="flex justify-between gap-4">
                  <span className="first-letter:uppercase">{fmt.format(new Date(`${iso}T12:00:00Z`))}</span>
                  <span className="text-right tabular-nums">{r.length ? r.join(" · ") : t.closed}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
