import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ArchiveItem } from "@/types/archive";
import { categoryCopy } from "@/data/archive";

type ArchiveView = "works" | "locations" | "chronology";

interface ArchiveExperienceProps {
  category: string;
  items: ArchiveItem[];
  loading?: boolean;
  onOpen: (index: number) => void;
  onRetry?: () => void;
}

const tabs: { id: ArchiveView; label: string }[] = [
  { id: "works", label: "Selected works" },
  { id: "locations", label: "Location index" },
  { id: "chronology", label: "Chronology" },
];

export default function ArchiveExperience({ category, items, loading, onOpen, onRetry }: ArchiveExperienceProps) {
  const [view, setView] = useState<ArchiveView>("works");
  const copy = categoryCopy[category] ?? categoryCopy.SELECTED;
  const groups = useMemo(() => {
    const key = view === "chronology" ? "year" : "location";
    return items.reduce<Record<string, number[]>>((result, item, index) => {
      const value = item[key] || (view === "chronology" ? "Date not provided" : "Location not provided");
      (result[value] ??= []).push(index);
      return result;
    }, {});
  }, [items, view]);

  return (
    <main id="main-content" className="min-h-screen px-4 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32">
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <aside className="space-y-10 lg:sticky lg:top-32 lg:col-span-3">
          <header>
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Archive / {category}</p>
            <h1 className="font-editorial text-4xl italic leading-tight md:text-5xl">DAVID SPACE</h1>
          </header>
          <section className="border-t border-accent/40 pt-5">
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-accent">Collection</p>
            <h2 className="font-editorial text-2xl leading-snug">{copy.title}</h2>
          </section>
          <section>
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Archive note</p>
            <p className="max-w-xs text-sm leading-7 text-foreground/75">{copy.description}</p>
          </section>
          <nav aria-label="Archive views" className="space-y-1 border-l border-border">
            {tabs.map((tab) => (
              <Button key={tab.id} variant="ghost" onClick={() => setView(tab.id)} className={`h-9 w-full justify-start rounded-none border-l-2 px-4 text-xs uppercase tracking-[0.16em] ${view === tab.id ? "-ml-px border-accent text-accent" : "border-transparent text-muted-foreground"}`}>
                {tab.label}
              </Button>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-9">
          {loading && items.length === 0 ? (
            <div className="space-y-6" aria-label="Loading archive">
              <div className="aspect-[16/9] animate-pulse bg-muted" />
              <div className="h-3 w-2/5 animate-pulse bg-muted" />
            </div>
          ) : view === "works" ? (
            <WorksView items={items} onOpen={onOpen} />
          ) : (
            <IndexView groups={groups} items={items} onOpen={onOpen} />
          )}
          {!loading && items.length === 0 && (
            <div className="border-y border-border py-20 text-center">
              <p className="font-editorial text-2xl">The archive could not be displayed.</p>
              {onRetry && <Button onClick={onRetry} variant="outline" className="mt-6 rounded-none">Try again</Button>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function WorksView({ items, onOpen }: { items: ArchiveItem[]; onOpen: (index: number) => void }) {
  if (items.length === 0) return null;
  const featured = items[0];
  return (
    <div className="space-y-24 animate-fade-in">
      <article>
        <button onClick={() => onOpen(0)} className="group relative block w-full cursor-zoom-in overflow-hidden bg-muted text-left" aria-label={`Open ${featured.title} in viewing room`}>
          {featured.type === "video" ? <video src={featured.videoSrc} poster={featured.src} muted autoPlay loop playsInline className="aspect-video w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.015] group-hover:opacity-100" /> : <img src={featured.src} alt={featured.alt} className="aspect-video w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.015] group-hover:opacity-100" />}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-5 pb-6 pt-24 md:px-8">
            <p className="mb-3 inline-block bg-accent px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-accent-foreground">Featured entry</p>
            <h3 className="font-editorial text-3xl md:text-5xl">{featured.title}</h3>
          </div>
        </button>
        <div className="mt-5 flex flex-col justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2"><span>{featured.location || "Location not provided"}</span><span>{featured.year || "Date not provided"}</span><span>{featured.type}</span></div>
          <Button variant="link" onClick={() => onOpen(0)} className="h-auto justify-start p-0 text-xs uppercase tracking-[0.16em] text-foreground">Enter viewing room <ArrowUpRight /></Button>
        </div>
      </article>
      {items.length > 1 && <section>
        <p className="mb-6 border-b border-border pb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Recent studies / {String(items.length - 1).padStart(2, "0")}</p>
        <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-6">
          {items.slice(1).map((item, offset) => <button key={item.id} onClick={() => onOpen(offset + 1)} className="group min-w-[76vw] snap-start text-left sm:min-w-[360px] md:min-w-[400px]">
            <div className="mb-4 aspect-[3/4] overflow-hidden bg-muted"><img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover opacity-75 grayscale transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0" /></div>
            <h3 className="font-editorial text-lg italic">{item.title}</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{item.location || "Location not provided"} · {item.year || "Date not provided"}</p>
          </button>)}
        </div>
      </section>}
    </div>
  );
}

function IndexView({ groups, items, onOpen }: { groups: Record<string, number[]>; items: ArchiveItem[]; onOpen: (index: number) => void }) {
  return <div className="animate-fade-in border-t border-border">{Object.entries(groups).map(([label, indices]) => <section key={label} className="grid gap-5 border-b border-border py-8 md:grid-cols-[1fr_2fr]">
    <h3 className="flex items-center gap-3 font-editorial text-2xl"><MapPin className="h-4 w-4 text-accent" />{label}</h3>
    <div>{indices.map((index) => <Button key={items[index].id} variant="ghost" onClick={() => onOpen(index)} className="group flex h-auto w-full justify-between rounded-none border-b border-border/50 px-0 py-4 text-left last:border-0"><span>{items[index].title}</span><span className="text-xs text-muted-foreground group-hover:text-accent">{items[index].year || "—"}</span></Button>)}</div>
  </section>)}</div>;
}
