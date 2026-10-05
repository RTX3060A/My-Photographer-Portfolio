import type { ArchiveItem } from "@/types/archive";
import selected1 from "@/assets/gallery/selected-1.jpg";
import selected2 from "@/assets/gallery/selected-2.jpg";
import selected3 from "@/assets/gallery/selected-3.jpg";
import selected4 from "@/assets/gallery/selected-4.jpg";
import commissioned1 from "@/assets/gallery/commissioned-1.jpg";
import commissioned2 from "@/assets/gallery/commissioned-2.jpg";
import commissioned3 from "@/assets/gallery/commissioned-3.jpg";
import editorial1 from "@/assets/gallery/editorial-1.jpg";
import editorial2 from "@/assets/gallery/editorial-2.jpg";
import editorial3 from "@/assets/gallery/editorial-3.jpg";
import editorial4 from "@/assets/gallery/editorial-4.jpg";
import personal1 from "@/assets/gallery/personal-1.jpg";
import personal2 from "@/assets/gallery/personal-2.jpg";
import personal3 from "@/assets/gallery/personal-3.jpg";

const collections: Record<string, { src: string; title: string }[]> = {
  SELECTED: [
    { src: selected1, title: "Selected Study I" },
    { src: selected2, title: "Selected Study II" },
    { src: selected3, title: "Selected Study III" },
    { src: selected4, title: "Selected Study IV" },
  ],
  COMMISSIONED: [
    { src: commissioned1, title: "Commission I" },
    { src: commissioned2, title: "Commission II" },
    { src: commissioned3, title: "Commission III" },
  ],
  EDITORIAL: [
    { src: editorial1, title: "Editorial Study I" },
    { src: editorial2, title: "Editorial Study II" },
    { src: editorial3, title: "Editorial Study III" },
    { src: editorial4, title: "Editorial Study IV" },
  ],
  PERSONAL: [
    { src: personal1, title: "Personal Study I" },
    { src: personal2, title: "Personal Study II" },
    { src: personal3, title: "Personal Study III" },
  ],
};

export const categoryCopy: Record<string, { title: string; description: string }> = {
  SELECTED: { title: "Selected Works", description: "A continually edited sequence of commissioned, editorial and independent image-making." },
  COMMISSIONED: { title: "Commissioned", description: "Visual commissions developed with brands, publications and creative collaborators." },
  EDITORIAL: { title: "Editorial Portfolio", description: "Fashion stories and visual essays shaped through gesture, atmosphere and form." },
  PERSONAL: { title: "Personal Studies", description: "Independent observations, fragments and ongoing photographic research." },
};

export function getFallbackArchive(category: string): ArchiveItem[] {
  const normalized = category.toUpperCase();
  const source = collections[normalized] ?? collections.SELECTED;
  return source.map((item, index) => ({
    id: `${normalized.toLowerCase()}-${index + 1}`,
    type: "image",
    src: item.src,
    highResSrc: item.src,
    alt: item.title,
    title: item.title,
    series: categoryCopy[normalized]?.title ?? "DAVID SPACE Archive",
    location: "Location not provided",
    year: "Date not provided",
    photographer: "DAVID SPACE",
    category: normalized,
    medium: "Digital photograph",
    details: "Archive record awaiting final project notes.",
    copyright: "© DAVID SPACE",
  }));
}
