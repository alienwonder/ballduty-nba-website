import Image from "next/image";
import { STORES } from "@/lib/stores";

// Both store badges, side by side on a computer and stacked on a phone.
export default function StoreBadges({ priority = false }: { priority?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {STORES.map((s) => (
        <a key={s.name} href={s.href} className="inline-block hover:opacity-90">
          <Image src={s.src} alt={s.name} width={s.width} height={56} priority={priority} />
        </a>
      ))}
    </div>
  );
}
