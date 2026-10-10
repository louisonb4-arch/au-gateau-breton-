import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { SectionHeading } from "@/components/ui/SectionHeading";

const photos: Record<string, { src: string; position?: string }> = {
  veranda: { src: "/images/veranda.webp", position: "object-[50%_60%]" },
  terrace: { src: "/images/terrasse-jardin.webp", position: "object-[40%_50%]" },
  room: { src: "/images/salle-tables.webp", position: "object-[50%_70%]" },
  private: { src: "/images/salle.webp", position: "object-[45%_50%]" },
};

export function Spaces({ t }: { t: Dictionary["spaces"] }) {
  return (
    <section id="lieux" className="bg-ink py-20 sm:py-28" aria-labelledby="spaces-title">
      <div className="container-site">
        <SectionHeading id="spaces-title" tone="light" eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item) => {
            const photo = photos[item.key];
            return (
              <figure key={item.key}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate lg:aspect-[3/4]">
                  <Image
                    src={photo.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover ${photo.position ?? ""}`}
                  />
                </div>
                <figcaption className="mt-5">
                  <h3 className="text-xl font-medium text-paper">{item.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-paper/65">{item.text}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
