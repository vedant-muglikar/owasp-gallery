export type ClubEvent = {
  slug: string
  name: string
  logo: string
  images: string[]
}

export const clubEvents: ClubEvent[] = [
  {
    slug: "tech-fest-2024",
    name: "Tech Fest 2024",
    logo: "/tech-fest-2024-event-logo.jpg",
    images: Array.from({ length: 12 }).map(
      (_, i) => `/placeholder.svg?height=800&width=1200&query=Tech%20Fest%20photo%20${i + 1}`,
    ),
  },
  {
    slug: "cultural-night",
    name: "Cultural Night",
    logo: "/placeholder-logo.svg",
    images: Array.from({ length: 9 }).map(
      (_, i) => `/placeholder.svg?height=900&width=1200&query=Cultural%20Night%20${i + 1}`,
    ),
  },
  {
    slug: "sports-meet",
    name: "Sports Meet",
    logo: "/placeholder-logo.png",
    images: Array.from({ length: 9 }).map(
      (_, i) => `/placeholder.svg?height=900&width=1200&query=Sports%20Meet%20${i + 1}`,
    ),
  },
  {
    slug: "hackathon-2024",
    name: "Hackathon 2024",
    logo: "/placeholder-logo.svg",
    images: Array.from({ length: 12 }).map(
      (_, i) => `/placeholder.svg?height=900&width=1200&query=Hackathon%20${i + 1}`,
    ),
  },
  {
    slug: "alumni-meet",
    name: "Alumni Meet",
    logo: "/placeholder-logo.svg",
    images: Array.from({ length: 8 }).map(
      (_, i) => `/placeholder.svg?height=900&width=1200&query=Alumni%20Meet%20${i + 1}`,
    ),
  },
  {
    slug: "art-expo",
    name: "Art Expo",
    logo: "/placeholder-logo.svg",
    images: Array.from({ length: 10 }).map(
      (_, i) => `/placeholder.svg?height=900&width=1200&query=Art%20Expo%20${i + 1}`,
    ),
  },
  {
    slug: "coding-challenge",
    name: "Coding Challenge",
    logo: "/placeholder-logo.svg",
    images: Array.from({ length: 10 }).map(
      (_, i) => `/placeholder.svg?height=900&width=1200&query=Coding%20Challenge%20${i + 1}`,
    ),
  },
  {
    slug: "music-fest",
    name: "Music Fest",
    logo: "/placeholder-logo.svg",
    images: Array.from({ length: 12 }).map(
      (_, i) => `/placeholder.svg?height=900&width=1200&query=Music%20Fest%20${i + 1}`,
    ),
  },
]
