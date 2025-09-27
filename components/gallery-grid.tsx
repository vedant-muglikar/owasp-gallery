import Image from "next/image"
import { cn } from "@/lib/utils"

export function GalleryGrid({
  title,
  images,
  className,
}: {
  title: string
  images: string[]
  className?: string
}) {
  return (
    <main className={cn("mx-auto w-full max-w-6xl px-4 py-10", className)}>
      <header className="mb-8">
        <h1 className="text-balance text-3xl font-semibold md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-(--color-muted-foreground)">{images.length} photos</p>
      </header>

      <section
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3"
        aria-label={`${title} photo gallery`}
      >
        {images.map((src, i) => (
          <figure
            key={i}
            className="group relative overflow-hidden rounded-lg border border-(--color-border) bg-(--color-card)"
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`${title} photo ${i + 1}`}
              width={1200}
              height={800}
              className="h-auto w-full object-cover transition-transform group-hover:scale-[1.02]"
            />
          </figure>
        ))}
      </section>
    </main>
  )
}
