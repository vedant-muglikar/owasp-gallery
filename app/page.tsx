import EventCarousel from "@/components/event-carousel";
import { clubEvents } from "@/lib/events";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-(--color-background)">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-(--color-primary)" />
          <span className="text-sm font-medium">Club Gallery</span>
        </div>
        <div className="text-xs text-(--color-muted-foreground)">
          Explore events
        </div>
      </nav>

      <EventCarousel events={clubEvents} className="px-4" />

      <footer className="mx-auto w-full max-w-6xl px-4 py-10 text-xs text-(--color-muted-foreground)">
        © {new Date().getFullYear()} Your Club. All rights reserved.
      </footer>
    </div>
  );
}
