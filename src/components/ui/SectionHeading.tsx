import type { ReactNode } from "react";
import { stagger } from "@/lib/motion";
import { words } from "@/lib/rich";
import { BrickMark } from "./BrickMark";

type Props = {
  eyebrow: string;
  /** Plain string; wrap words in *asterisks* to set them in Garamond italic. */
  title: string;
  lead?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  id?: string;
};

/** Eyebrow + sign-painter title + optional lead, shared by every section. */
export function SectionHeading({ eyebrow, title, lead, tone = "dark", className = "", id }: Props) {
  const light = tone === "light";
  return (
    <div className={`max-w-3xl ${className}`}>
      <p data-reveal className={`eyebrow flex items-center gap-3 ${light ? "text-brass-light" : "text-bordeaux"}`}>
        <BrickMark />
        {eyebrow}
      </p>
      <h2
        id={id}
        data-reveal="words"
        className={`title-caps mt-5 text-[3.1rem] sm:text-[4.2rem] lg:text-[5rem] ${
          light ? "text-paper [&_em]:text-brass-light" : "text-ink [&_em]:text-bordeaux"
        }`}
      >
        {words(title)}
      </h2>
      {lead && (
        <p
          data-reveal
          style={stagger(2)}
          className={`mt-6 max-w-2xl text-[1.3rem] leading-relaxed text-pretty ${light ? "text-paper/75" : "text-slate"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
