import Link from "next/link"
import { notFound } from "next/navigation"
import { clubEvents } from "@/lib/events"
import { GalleryGrid } from "@/components/gallery-grid"

export default function GalleryPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = clubEvents.find((e) => e.slug === params.slug)
  if (!event) return notFound()

  return (
    <div className="min-h-dvh">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <Link
          href="/"
          className="rounded-md border border-(--color-border) px-3 py-1 text-sm hover:bg-(--color-accent)"
          aria-label="Back to home"
        >
          ← Events
        </Link>
        <span className="text-xs text-(--color-muted-foreground)">{event.name}</span>
      </nav>

      <GalleryGrid title={event.name} images={event.images} />
    </div>
  )
}
