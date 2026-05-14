export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  date: string;
}

// 6 new video URLs
const URLS = {
  v1: "https://nq3v18uj8o.ufs.sh/f/ZvpqXEDI3Ykp0BpVLZwGobeKWaU4BQSnmgTdrqAh6lHpY2Vw",
  v2: "https://nq3v18uj8o.ufs.sh/f/ZvpqXEDI3Ykp2U3Fb29fguUC0KoR5e7TVPcZJrsj4kbAMi3W",
  v3: "https://nq3v18uj8o.ufs.sh/f/ZvpqXEDI3YkpWf95ojK6tSqUmvMsPfTbwHpeXnO8zkDQ9JKF",
  v4: "https://nq3v18uj8o.ufs.sh/f/ZvpqXEDI3YkpxD1wFW5EZpSwqiz1kYVsALudTbxQ70KmIMUJ",
  v5: "https://nq3v18uj8o.ufs.sh/f/ZvpqXEDI3YkpnhLsEKopqcN1OKD5JohWM0mbxAQU7CTdSPa3",
  v6: "https://nq3v18uj8o.ufs.sh/f/ZvpqXEDI3YkpkDCCQF2gej36S4focRZ0FbEBhDGa1mYuts2r",
};

export const videos: Video[] = [
  // ===== REPORTAGES =====
  {
    id: "1",
    title: "Reportage INDH TV — Crêpes",
    description: "Découvrez comment l'INDH soutient les projets de fabrication artisanale de crêpes, créant des opportunités économiques pour les communautés locales.",
    category: "Reportages",
    thumbnail: "",
    videoUrl: URLS.v1,
    duration: "12:34",
    date: "2024",
  },
  {
    id: "9",
    title: "Reportage — Coopératives Féminines",
    description: "Les coopératives féminines soutenues par l'INDH transforment la vie des femmes rurales à travers des projets générateurs de revenus.",
    category: "Reportages",
    thumbnail: "",
    videoUrl: URLS.v2,
    duration: "14:20",
    date: "2024",
  },
  {
    id: "10",
    title: "Reportage — Projets Agricoles",
    description: "L'agriculture durable au cœur de l'INDH. Découvrez les projets qui modernisent le secteur agricole dans les zones rurales.",
    category: "Reportages",
    thumbnail: "",
    videoUrl: URLS.v3,
    duration: "16:45",
    date: "2024",
  },
  {
    id: "11",
    title: "Reportage — Élevage & Développement",
    description: "Comment les programmes d'élevage de l'INDH aident les communautés rurales à développer une activité économique durable.",
    category: "Reportages",
    thumbnail: "",
    videoUrl: URLS.v4,
    duration: "11:30",
    date: "2024",
  },
  {
    id: "12",
    title: "Reportage — Artisanat Local",
    description: "L'artisanat marocain soutenu par l'INDH : un patrimoine vivant qui crée des emplois et préserve la culture locale.",
    category: "Reportages",
    thumbnail: "",
    videoUrl: URLS.v5,
    duration: "13:15",
    date: "2024",
  },

  // ===== INTERVIEWS =====
  {
    id: "3",
    title: "Interview — Cap Bedouzza",
    description: "Entretien exclusif depuis Cap Bedouzza sur les projets de développement touristique et économique soutenus par l'INDH dans la région.",
    category: "Interviews",
    thumbnail: "",
    videoUrl: URLS.v6,
    duration: "18:45",
    date: "2024",
  },
  {
    id: "4",
    title: "Interview — Haj Aissa",
    description: "Haj Aissa partage son expérience et l'impact des programmes INDH sur sa communauté et son activité professionnelle.",
    category: "Interviews",
    thumbnail: "",
    videoUrl: URLS.v1,
    duration: "14:10",
    date: "2024",
  },
  {
    id: "5",
    title: "INDH TV — Épisode 1",
    description: "Premier épisode de la série d'interviews INDH TV. Une introduction aux projets phares de l'Initiative Nationale pour le Développement Humain.",
    category: "Interviews",
    thumbnail: "",
    videoUrl: URLS.v2,
    duration: "20:00",
    date: "2024",
  },
  {
    id: "6",
    title: "Interview — Daraza",
    description: "Reportage sur le projet Daraza et ses bénéficiaires. Comment l'INDH transforme les vies dans les zones rurales du Maroc.",
    category: "Interviews",
    thumbnail: "",
    videoUrl: URLS.v3,
    duration: "16:30",
    date: "2024",
  },
  {
    id: "13",
    title: "Interview — Bénéficiaires INDH",
    description: "Témoignages des bénéficiaires des programmes INDH dans les régions du sud du Maroc.",
    category: "Interviews",
    thumbnail: "",
    videoUrl: URLS.v4,
    duration: "15:20",
    date: "2024",
  },
  {
    id: "14",
    title: "Interview — Responsables Régionaux",
    description: "Entretien avec les responsables régionaux de l'INDH sur les stratégies de développement humain.",
    category: "Interviews",
    thumbnail: "",
    videoUrl: URLS.v5,
    duration: "19:50",
    date: "2024",
  },

  // ===== CATÉGORIES =====
  {
    id: "2",
    title: "Catégorie Argan — INDH TV",
    description: "L'huile d'argan, trésor du Maroc. Ce reportage met en lumière les coopératives féminines soutenues par l'INDH dans la filière argan.",
    category: "Catégories",
    thumbnail: "",
    videoUrl: URLS.v6,
    duration: "15:20",
    date: "2024",
  },
  {
    id: "7",
    title: "Catégorie Élevage — INDH TV",
    description: "Les projets d'élevage soutenus par l'INDH : comment l'initiative aide les éleveurs locaux à développer leurs activités.",
    category: "Catégories",
    thumbnail: "",
    videoUrl: URLS.v1,
    duration: "13:50",
    date: "2024",
  },
  {
    id: "8",
    title: "Catégorie Légumes — INDH TV",
    description: "La filière maraîchère au cœur du développement rural. Découvrez les projets agricoles financés par l'INDH.",
    category: "Catégories",
    thumbnail: "",
    videoUrl: URLS.v2,
    duration: "11:25",
    date: "2024",
  },
  {
    id: "15",
    title: "Catégorie Artisanat — INDH TV",
    description: "L'artisanat traditionnel marocain : tissage, poterie et travail du cuir soutenus par les programmes INDH.",
    category: "Catégories",
    thumbnail: "",
    videoUrl: URLS.v3,
    duration: "17:40",
    date: "2024",
  },
  {
    id: "16",
    title: "Catégorie Tourisme — INDH TV",
    description: "Le tourisme rural et écologique soutenu par l'INDH : créer des opportunités dans les régions reculées du Maroc.",
    category: "Catégories",
    thumbnail: "",
    videoUrl: URLS.v4,
    duration: "14:55",
    date: "2024",
  },
  {
    id: "17",
    title: "Catégorie Eau & Assainissement",
    description: "Les projets d'accès à l'eau potable et d'assainissement financés par l'INDH dans les zones rurales.",
    category: "Catégories",
    thumbnail: "",
    videoUrl: URLS.v5,
    duration: "12:10",
    date: "2024",
  },
];

export const categories = ["Tous", "Reportages", "Interviews", "Catégories"];

export function getVideoById(id: string): Video | undefined {
  return videos.find((v) => v.id === id);
}

export function getVideosByCategory(category: string): Video[] {
  if (category === "Tous") return videos;
  return videos.filter((v) => v.category === category);
}

export function getRelatedVideos(currentId: string, limit = 4): Video[] {
  const current = getVideoById(currentId);
  if (!current) return videos.slice(0, limit);
  return videos
    .filter((v) => v.id !== currentId && v.category === current.category)
    .concat(videos.filter((v) => v.id !== currentId && v.category !== current.category))
    .slice(0, limit);
}
