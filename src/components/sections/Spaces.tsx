import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const photos: Record<string, { src: string; position?: string }> = {
  veranda: { src: "/images/veranda.webp", position: "object-[50%_60%]" },
  terrace: { src: "/images/terrasse-jardin.webp", position: "object-[40%_50%]" },
  room: { src: "/images/salle-tables.webp", position: "object-[50%_70%]" },
  private: { src: "/images/salle.webp", position: "object-[45%_50%]" },
};

export function Spaces({ t }: { t: Dictionary["spaces"] }) {
  return (
    <section id="lieux" className="bg-ink py-24 sm:py-32" aria-labelledby="spaces-title">
      <div className="container-site">
        <SectionHeading id="spaces-title" tone="light" eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const photo = photos[item.key];
            return (
              <figure key={item.key} className={`group ${i % 2 ? "lg:mt-16" : ""}`}>
                <div data-reveal="image" style={stagger(i)} className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate lg:aspect-[3/4]">
                  <Image
                    src={photo.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.05] ${photo.position ?? ""}`}
                  />
                </div>
                <figcaption data-reveal style={stagger(i)} className="mt-6">
                  <h3 className="font-display text-[2.2rem] leading-none tracking-[0.02em] text-paper uppercase">{item.title}</h3>
                  <p className="mt-2 max-w-md text-[1.08rem] leading-relaxed text-paper/65">{item.text}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
