"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ClubEvent } from "@/lib/events";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  events: ClubEvent[];
  className?: string;
};

export default function EventCarousel({ events, className }: Props) {
  const [index, setIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const total = events.length;
  const selected = events[index];

  const go = useCallback(
    (delta: number) => setIndex((prev) => (prev + delta + total) % total),
    [total]
  );

  const onOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const dots = useMemo(
    () =>
      events.map((_, i) => (
        <button
          key={i}
          aria-label={`Go to ${events[i].name}`}
          onClick={() => setIndex(i)}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            i === index
              ? "bg-(--color-foreground)"
              : "bg-(--color-muted-foreground)/60"
          )}
        />
      )),
    [events, index]
  );

  return (
    <section
      className={cn(
        "relative mx-auto flex w-full max-w-5xl flex-col items-center gap-6 py-12",
        className
      )}
      aria-label="Event selector">
      <header className="relative z-20 mb-4 text-center md:mb-6">
        <p className="text-sm text-(--color-foreground)">Current event</p>
        <h1 className="text-(--color-foreground) text-pretty text-3xl font-semibold leading-tight md:text-4xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
          {selected.name}
        </h1>
      </header>

      <div className="relative w-full mt-4 md:mt-8">
        <div className="relative mx-auto h-[min(60vw,420px)] w-full max-w-5xl">
          {events.map((ev, i) => {
            // Compute shortest circular offset from current index
            const raw = i - index;
            const half = Math.floor(total / 2);
            let off = raw;
            if (raw > half) off = raw - total;
            if (raw < -half) off = raw + total;

            const x = off * 340; // horizontal spacing per slide
            const scale = Math.max(0.6, 1 - Math.abs(off) * 0.15);
            const opacity = Math.max(0.15, 1 - Math.abs(off) * 0.25);
            const z = 100 - Math.abs(off);

            const isCenter = off === 0;

            return (
              <article
                key={ev.slug}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
                  zIndex: z,
                  opacity,
                  transition:
                    "transform 450ms cubic-bezier(0.22,1,0.36,1), opacity 450ms ease, filter 450ms ease",
                  filter: isCenter ? "none" : "saturate(0.85)",
                }}>
                <button
                  aria-label={
                    isCenter ? `Open ${ev.name} gallery` : `Focus ${ev.name}`
                  }
                  onClick={() => (isCenter ? onOpen() : setIndex(i))}
                  className={cn(
                    "relative block aspect-[4/5] w-[min(60vw,420px)] overflow-hidden rounded-xl border border-(--color-border) bg-(--color-card) shadow-md",
                    isCenter ? "hover:scale-[1.02]" : "hover:scale-[1.01]"
                  )}
                  style={{
                    transition: "transform 250ms ease",
                  }}>
                  <Image
                    src={ev.logo || "/placeholder-logo.svg"}
                    alt={`${ev.name} logo`}
                    fill
                    sizes="(min-width: 768px) 420px, 60vw"
                    style={{ objectFit: "contain" }}
                    priority={isCenter}
                  />
                  <span className="sr-only">
                    {isCenter ? "Open gallery" : "Focus"}
                  </span>
                </button>
              </article>
            );
          })}
        </div>

        {/* Prev/Next arrows positioned at screen edges */}
        <button
          aria-label="Previous event"
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 rounded-full border border-(--color-border) bg-(--color-background)/80 px-4 py-3 text-lg text-(--color-foreground) backdrop-blur hover:bg-(--color-accent) shadow-lg"
          onClick={() => go(-1)}>
          {"<"}
        </button>
        <button
          aria-label="Next event"
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 rounded-full border border-(--color-border) bg-(--color-background)/80 px-4 py-3 text-lg text-(--color-foreground) backdrop-blur hover:bg-(--color-accent) shadow-lg"
          onClick={() => go(1)}>
          {">"}
        </button>
      </div>

      <div
        className="relative flex items-center gap-2"
        style={{ zIndex: 101 }}
        aria-label="Event pagination">
        {dots}
      </div>

      <div className="mt-3 md:mt-5 flex items-center gap-3">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <button className="rounded-md bg-(--color-primary) px-5 py-2 text-sm font-medium text-(--color-primary-foreground) hover:opacity-90">
              View Gallery
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[85vw] max-h-[90vh] overflow-y-auto">
            {/* Cancel button in top right corner */}
            <AlertDialogCancel className="absolute right-4 top-4 h-8 w-8 rounded-full border-0 bg-transparent p-0 text-lg hover:bg-(--color-primary) hover:text-(--color-primary-foreground) hover:rotate-180 transition-all duration-300 ease-in-out">
              &#x2715;
            </AlertDialogCancel>

            <AlertDialogHeader>
              <AlertDialogTitle>{selected.name} Gallery</AlertDialogTitle>
              <AlertDialogDescription>
                Browse through the images from {selected.name}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {selected.images.map((image, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/9] overflow-hidden rounded-lg border border-(--color-border)">
                  <Image
                    src={image}
                    alt={`${selected.name} image ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 350px, (min-width: 768px) 300px, (min-width: 640px) 280px, 350px"
                    style={{ objectFit: "cover" }}
                    className="hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
