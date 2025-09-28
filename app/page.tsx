import EventCarousel from "@/components/event-carousel";
import { clubEvents } from "@/lib/events";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-(--color-background)">
      <EventCarousel events={clubEvents} className="px-4" />

      <footer className="mx-auto w-full max-w-6xl px-4 py-10 text-xs text-(--color-muted-foreground)">
        © {new Date().getFullYear()} Owasp Pccoe Club. All rights reserved.
      </footer>
    </div>
  );
}
