import EventCarousel from "@/components/event-carousel";
import { clubEvents } from "@/lib/events";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-(--color-background)">
      <EventCarousel events={clubEvents} className="px-4" />
    </div>
  );
}
