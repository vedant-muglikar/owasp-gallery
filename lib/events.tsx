export type ClubEvent = {
  slug: string;
  name: string;
  logo: string;
  images: string[];
};

export const clubEvents: ClubEvent[] = [
  {
    slug: "tech-fest-2024",
    name: "OWASP",
    logo: "/owasp-main.png",
    images: [
      "/images/lecture/IMG_0180.JPG",
      "/images/lecture/IMG_0181.JPG",
      "/images/lecture/IMG_0191.JPG",
      "/images/lecture/IMG_0192.JPG",
      "/images/lecture/IMG_0196.JPG",
      "/images/lecture/IMG_0199.JPG",
    ],
  },
  {
    slug: "cultural-night",
    name: "Cyber Kavach",
    logo: "/cyberkavach.png",
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
    logo: "/Copy of PCCOE.png ",
    images: Array.from({ length: 9 }).map(
      (_, i) =>
        `/placeholder.svg?height=900&width=1200&query=Sports%20Meet%20${i + 1}`
    ),
  },
];
