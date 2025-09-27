export type ClubEvent = {
  slug: string;
  name: string;
  logo: string;
  images: string[];
};

export const clubEvents: ClubEvent[] = [
  {
    slug: "tech-fest-2024",
    name: "Tech Fest 2024",
    logo: "/tech-fest-2024-event-logo.jpg",
    images: Array.from({ length: 12 }).map(
      (_, i) =>
        `/placeholder.svg?height=800&width=1200&query=Tech%20Fest%20photo%20${
          i + 1
        }`
    ),
  },
  {
    slug: "cultural-night",
    name: "Cultural Night",
    logo: "/cultural-night-event-logo.jpg",
    images: Array.from({ length: 9 }).map(
      (_, i) =>
        `/placeholder.svg?height=900&width=1200&query=Cultural%20Night%20${
          i + 1
        }`
    ),
  },
  {
    slug: "sports-meet",
    name: "Sports Meet",
    logo: "/placeholder-logo.png",
    images: Array.from({ length: 9 }).map(
      (_, i) =>
        `/placeholder.svg?height=900&width=1200&query=Sports%20Meet%20${i + 1}`
    ),
  },
];
