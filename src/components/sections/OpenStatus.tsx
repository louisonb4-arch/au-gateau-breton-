"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/content/dictionary";
import { formatTime, getOpenStatus, type OpenStatus as Status } from "@/lib/hours";
import type { Locale } from "@/lib/i18n";

/** Live "open now" pill, computed in the visitor's browser against Paris time. */
export function OpenStatus({ lang, t }: { lang: Locale; t: Dictionary["status"] }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  let label = " ";
  if (status?.state === "open") label = `${t.open} ${formatTime(status.until, lang)}`;
  if (status?.state === "later-today") label = `${t.later} ${formatTime(status.at, lang)}`;
  if (status?.state === "closed") {
    label = t.closed;
    if (status.next) {
      const day = new Intl.DateTimeFormat(lang, { weekday: "long", timeZone: "UTC" }).format(
        new Date(`${status.next.iso}T12:00:00Z`),
      );
      label += ` · ${t.nextOpen} ${day} ${formatTime(status.next.at, lang)}`;
    }
  }

  const open = status?.state === "open";
  return (
    <p
      aria-live="polite"
      className={`inline-flex min-h-8 items-center gap-2.5 font-sans text-[13px] font-medium text-slate transition-opacity duration-500 ${
        status ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="relative flex size-2">
        {open && <span className="absolute inline-flex size-full animate-ping rounded-full motion-reduce:hidden bg-[#3f7d4e] opacity-60" />}
        <span className={`relative inline-flex size-2 rounded-full ${open ? "bg-[#3f7d4e]" : "bg-terracotta"}`} />
      </span>
      {label}
    </p>
  );
}
