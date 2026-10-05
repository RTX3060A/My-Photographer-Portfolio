import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Info, Maximize, Minus, Plus, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ArchiveItem } from "@/types/archive";

interface ViewingRoomProps { items: ArchiveItem[]; initialIndex: number; onClose: () => void; }

export default function ViewingRoom({ items, initialIndex, onClose }: ViewingRoomProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [infoOpen, setInfoOpen] = useState(true);
  const [chrome, setChrome] = useState(true);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const item = items[index];

  const reset = () => { setScale(1); setPosition({ x: 0, y: 0 }); };
  const move = (next: number) => { if (next >= 0 && next < items.length) { setIndex(next); reset(); } };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") move(index - 1);
      if (event.key === "ArrowRight") move(index + 1);
      if (event.key === "+" || event.key === "=") setScale((value) => Math.min(4, value + 0.5));
      if (event.key === "-") setScale((value) => Math.max(1, value - 0.5));
      if (event.key.toLowerCase() === "i") setInfoOpen((value) => !value);
    };
    window.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", keydown); };
  }, [index, onClose]);

  if (!item) return null;
  return <div className="fixed inset-0 z-[100] overflow-hidden bg-background text-foreground" role="dialog" aria-modal="true" aria-label="Viewing room">
    <header className={`absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-3 backdrop-blur-md transition-opacity md:px-6 ${chrome ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <div><p className="font-editorial text-sm italic">DAVID SPACE</p><p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Viewing room · {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p></div>
      <div className="flex items-center gap-1">
        {item.type === "image" && <><Button size="icon" variant="ghost" onClick={() => setScale((v) => Math.max(1, v - 0.5))} aria-label="Zoom out"><Minus /></Button><span className="w-12 text-center text-[10px] text-muted-foreground">{Math.round(scale * 100)}%</span><Button size="icon" variant="ghost" onClick={() => setScale((v) => Math.min(4, v + 0.5))} aria-label="Zoom in"><Plus /></Button><Button size="icon" variant="ghost" onClick={reset} aria-label="Reset view"><RotateCcw /></Button></>}
        <Button size="icon" variant={infoOpen ? "secondary" : "ghost"} onClick={() => setInfoOpen((v) => !v)} aria-label="Toggle photograph information"><Info /></Button>
        <Button size="icon" variant="ghost" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Enter fullscreen"><Maximize /></Button>
        <Button size="icon" variant="ghost" onClick={onClose} aria-label="Close viewing room"><X /></Button>
      </div>
    </header>

    <div className="absolute inset-0 flex items-center justify-center px-4 pb-28 pt-20 md:px-20" onDoubleClick={() => setScale((v) => v === 1 ? 2 : 1)} onClick={() => setChrome((v) => !v)} onPointerDown={(e) => { if (scale > 1) { drag.current = { x: e.clientX, y: e.clientY, px: position.x, py: position.y }; e.currentTarget.setPointerCapture(e.pointerId); } }} onPointerMove={(e) => { if (drag.current) setPosition({ x: drag.current.px + e.clientX - drag.current.x, y: drag.current.py + e.clientY - drag.current.y }); }} onPointerUp={(e) => { if (drag.current) e.currentTarget.releasePointerCapture(e.pointerId); drag.current = null; }}>
      {item.type === "video" ? <video src={item.videoSrc} poster={item.src} controls autoPlay className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()} /> : <img src={item.highResSrc || item.src} alt={item.alt} draggable={false} className={`max-h-full max-w-full select-none object-contain transition-transform duration-150 ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})` }} />}
    </div>

    <Button size="icon" variant="ghost" disabled={index === 0} onClick={(e) => { e.stopPropagation(); move(index - 1); }} className={`absolute left-3 top-1/2 z-20 -translate-y-1/2 ${chrome ? "opacity-100" : "opacity-0"}`} aria-label="Previous photograph"><ChevronLeft /></Button>
    <Button size="icon" variant="ghost" disabled={index === items.length - 1} onClick={(e) => { e.stopPropagation(); move(index + 1); }} className={`absolute right-3 top-1/2 z-20 -translate-y-1/2 ${chrome ? "opacity-100" : "opacity-0"}`} aria-label="Next photograph"><ChevronRight /></Button>

    <aside className={`absolute right-0 top-16 z-20 h-[calc(100%-8rem)] w-full max-w-sm overflow-y-auto border-l border-border bg-background/95 p-6 backdrop-blur-xl transition-transform duration-300 ${infoOpen && chrome ? "translate-x-0" : "translate-x-full"}`}>
      <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-accent">Archive record {String(index + 1).padStart(3, "0")}</p>
      <h2 className="font-editorial text-3xl italic">{item.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{item.series}</p>
      <dl className="mt-8 divide-y divide-border border-y border-border text-xs">
        {[["Location", item.location], ["Year", item.year], ["Venue", item.venue], ["Photographer", item.photographer], ["Client", item.client], ["Medium", item.medium], ["Format", item.dimensions]].map(([label, value]) => value && <div key={label} className="grid grid-cols-2 gap-4 py-3"><dt className="uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd>{value}</dd></div>)}
      </dl>
      {item.details && <p className="mt-8 text-sm leading-7 text-foreground/75">{item.details}</p>}
      <p className="mt-8 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{item.copyright || "Rights information not provided"}</p>
    </aside>

    <footer className={`absolute inset-x-0 bottom-0 z-30 h-24 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-md transition-opacity ${chrome ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <div className="no-scrollbar mx-auto flex h-full max-w-4xl gap-2 overflow-x-auto">{items.map((thumb, thumbIndex) => <button key={thumb.id} onClick={() => move(thumbIndex)} className={`h-full min-w-14 overflow-hidden border ${thumbIndex === index ? "border-accent" : "border-transparent opacity-45 hover:opacity-100"}`} aria-label={`View photograph ${thumbIndex + 1}`}><img src={thumb.src} alt="" className="h-full w-full object-cover" /></button>)}</div>
    </footer>
  </div>;
}