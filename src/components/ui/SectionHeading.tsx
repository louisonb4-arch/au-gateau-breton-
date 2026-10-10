import type { ReactNode } from "react";
import { rich } from "@/lib/rich";
import { BrickMark } from "./BrickMark";

type Props = {
  eyebrow: string;
  /** Plain string; wrap a word in *asterisks* to accent it. */
  title: string;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

/** Eyebrow + serif title + optional lead, shared by every section. */
export function SectionHeading({ eyebrow, title, lead, tone = "dark", align = "left", className = "", id }: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p
        className={`flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase ${
          center ? "justify-center" : ""
        } ${light ? "text-brass-light" : "text-bordeaux"}`}
      >
        <BrickMark className={light ? "text-brass-light" : "text-bordeaux"} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 text-[2rem] leading-[1.08] font-medium tracking-tight sm:text-[2.6rem] ${
          light ? "text-paper [&_em]:text-brass-light" : "text-ink [&_em]:text-bordeaux"
        } [&_em]:font-normal [&_em]:italic`}
      >
        {rich(title)}
      </h2>
      {lead && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-paper/75" : "text-muted"}`}>{lead}</p>
      )}
    </div>
  );
}
