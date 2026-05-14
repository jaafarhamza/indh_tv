export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;      // Static image thumbnail (fast load)
  videoUrl: string;       // Compressed MP4 with q_auto
  streamUrl?: string;     // HLS streaming URL (adaptive bitrate)
  duration: string;
  date: string;
}

// Helper: Generate Cloudinary thumbnail image from video URL
function cloudinaryThumbnail(videoUrl: string, timeOffset: number = 5): string {
  // Only works for Cloudinary URLs
  if (videoUrl.includes("res.cloudinary.com")) {
    return videoUrl
      .replace("/video/upload/", `/video/upload/so_${timeOffset},w_480,h_270,c_fill,q_auto,f_auto/`)
      .replace(/\.(mp4|webm|mov)$/, ".jpg");
  }
  // For non-Cloudinary, return empty (will fallback to video frame)
  return "";
}

// Helper: Add Cloudinary optimization to video URL
function optimizeVideo(videoUrl: string): string {
  if (videoUrl.includes("res.cloudinary.com")) {
    return videoUrl.replace("/video/upload/", "/video/upload/q_auto,f_auto/");
  }
  return videoUrl;
}

// Helper: Generate HLS streaming URL
function hlsStream(videoUrl: string): string {
  if (videoUrl.includes("res.cloudinary.com")) {
    return videoUrl
      .replace("/video/upload/", "/video/upload/sp_hd/")
      .replace(/\.(mp4|webm|mov)$/, ".m3u8");
  }
  return "";
}

// Raw URLs (original Cloudinary links)
const RAW = {
  crepe: "https://res.cloudinary.com/dgavshhxy/video/upload/v1778343071/reportage_3indh_tv_crepe_ewhlh7.mp4",
  argan: "https://res.cloudinary.com/dgavshhxy/video/upload/v1778343511/reportage_6_indh_tv_categirie_argan_zi4k2x.mp4",
  hajAissa: "https://res.cloudinary.com/dgavshhxy/video/upload/v1778343796/reportage_interw_4_kabbar_indh_tv_haj_aissa_k0mzzi.mp4",
  elevage: "https://res.cloudinary.com/dgavshhxy/video/upload/v1778344042/video_categorie_elvage_indh_tv_yyylkt.mp4",
  legume: "https://res.cloudinary.com/dgavshhxy/video/upload/v1778344130/video_categorie_legume_indh_tv_erzhoq.mp4",
  episode1: "https://smbiz2u60k.ufs.sh/f/jhCrop5VF1Md4wHkUB3Lr95vSNPKgbWDHzmfjB76CkdJxZ0O",
  daraza: "https://smbiz2u60k.ufs.sh/f/jhCrop5VF1MdcaePriwVWzpHMChuIZjtbaUwPxi5FfTl9nYD",
};

export const videos: Video[] = [
  // ===== REPORTAGES =====
  {
    id: "1",
    title: "Reportage INDH TV — Crêpes",
    description: "Découvrez comment l'INDH soutient les projets de fabrication artisanale de crêpes, créant des opportunités économiques pour les communautés locales.",
    category: "Reportages",
    thumbnail: cloudinaryThumbnail(RAW.crepe, 3),
    videoUrl: optimizeVideo(RAW.crepe),
    streamUrl: hlsStream(RAW.crepe),
    duration: "12:34",
    date: "2024",
  },
  {
    id: "9",
    title: "Reportage — Coopératives Féminines",
    description: "Les coopératives féminines soutenues par l'INDH transforment la vie des femmes rurales à travers des projets générateurs de revenus.",
    category: "Reportages",
    thumbnail: cloudinaryThumbnail(RAW.argan, 8),
    videoUrl: optimizeVideo(RAW.argan),
    streamUrl: hlsStream(RAW.argan),
    duration: "14:20",
    date: "2024",
  },
  {
    id: "10",
    title: "Reportage — Projets Agricoles",
    description: "L'agriculture durable au cœur de l'INDH. Découvrez les projets qui modernisent le secteur agricole dans les zones rurales.",
    category: "Reportages",
    thumbnail: cloudinaryThumbnail(RAW.legume, 12),
    videoUrl: optimizeVideo(RAW.legume),
    streamUrl: hlsStream(RAW.legume),
    duration: "16:45",
    date: "2024",
  },
  {
    id: "11",
    title: "Reportage — Élevage & Développement",
    description: "Comment les programmes d'élevage de l'INDH aident les communautés rurales à développer une activité économique durable.",
    category: "Reportages",
    thumbnail: cloudinaryThumbnail(RAW.elevage, 15),
    videoUrl: optimizeVideo(RAW.elevage),
    streamUrl: hlsStream(RAW.elevage),
    duration: "11:30",
    date: "2024",
  },
  {
    id: "12",
    title: "Reportage — Artisanat Local",
    description: "L'artisanat marocain soutenu par l'INDH : un patrimoine vivant qui crée des emplois et préserve la culture locale.",
    category: "Reportages",
    thumbnail: cloudinaryThumbnail(RAW.hajAissa, 20),
    videoUrl: optimizeVideo(RAW.hajAissa),
    streamUrl: hlsStream(RAW.hajAissa),
    duration: "13:15",
    date: "2024",
  },

  // ===== INTERVIEWS =====
  {
    id: "3",
    title: "Interview — Cap Bedouzza",
    description: "Entretien exclusif depuis Cap Bedouzza sur les projets de développement touristique et économique soutenus par l'INDH dans la région.",
    category: "Interviews",
    thumbnail: cloudinaryThumbnail(RAW.argan, 25),
    videoUrl: optimizeVideo(RAW.argan),
    streamUrl: hlsStream(RAW.argan),
    duration: "18:45",
    date: "2024",
  },
  {
    id: "4",
    title: "Interview — Haj Aissa",
    description: "Haj Aissa partage son expérience et l'impact des programmes INDH sur sa communauté et son activité professionnelle.",
    category: "Interviews",
    thumbnail: cloudinaryThumbnail(RAW.hajAissa, 10),
    videoUrl: optimizeVideo(RAW.hajAissa),
    streamUrl: hlsStream(RAW.hajAissa),
    duration: "14:10",
    date: "2024",
  },
  {
    id: "5",
    title: "INDH TV — Épisode 1",
    description: "Premier épisode de la série d'interviews INDH TV. Une introduction aux projets phares de l'Initiative Nationale pour le Développement Humain.",
    category: "Interviews",
    thumbnail: "",
    videoUrl: RAW.episode1,
    duration: "20:00",
    date: "2024",
  },
  {
    id: "6",
    title: "Interview — Daraza",
    description: "Reportage sur le projet Daraza et ses bénéficiaires. Comment l'INDH transforme les vies dans les zones rurales du Maroc.",
    category: "Interviews",
    thumbnail: "",
    videoUrl: RAW.daraza,
    duration: "16:30",
    date: "2024",
  },
  {
    id: "13",
    title: "Interview — Bénéficiaires INDH",
    description: "Témoignages des bénéficiaires des programmes INDH dans les régions du sud du Maroc.",
    category: "Interviews",
    thumbnail: cloudinaryThumbnail(RAW.crepe, 30),
    videoUrl: optimizeVideo(RAW.crepe),
    streamUrl: hlsStream(RAW.crepe),
    duration: "15:20",
    date: "2024",
  },
  {
    id: "14",
    title: "Interview — Responsables Régionaux",
    description: "Entretien avec les responsables régionaux de l'INDH sur les stratégies de développement humain.",
    category: "Interviews",
    thumbnail: cloudinaryThumbnail(RAW.elevage, 18),
    videoUrl: optimizeVideo(RAW.elevage),
    streamUrl: hlsStream(RAW.elevage),
    duration: "19:50",
    date: "2024",
  },

  // ===== CATÉGORIES =====
  {
    id: "2",
    title: "Catégorie Argan — INDH TV",
    description: "L'huile d'argan, trésor du Maroc. Ce reportage met en lumière les coopératives féminines soutenues par l'INDH dans la filière argan.",
    category: "Catégories",
    thumbnail: cloudinaryThumbnail(RAW.argan, 5),
    videoUrl: optimizeVideo(RAW.argan),
    streamUrl: hlsStream(RAW.argan),
    duration: "15:20",
    date: "2024",
  },
  {
    id: "7",
    title: "Catégorie Élevage — INDH TV",
    description: "Les projets d'élevage soutenus par l'INDH : comment l'initiative aide les éleveurs locaux à développer leurs activités.",
    category: "Catégories",
    thumbnail: cloudinaryThumbnail(RAW.elevage, 7),
    videoUrl: optimizeVideo(RAW.elevage),
    streamUrl: hlsStream(RAW.elevage),
    duration: "13:50",
    date: "2024",
  },
  {
    id: "8",
    title: "Catégorie Légumes — INDH TV",
    description: "La filière maraîchère au cœur du développement rural. Découvrez les projets agricoles financés par l'INDH.",
    category: "Catégories",
    thumbnail: cloudinaryThumbnail(RAW.legume, 9),
    videoUrl: optimizeVideo(RAW.legume),
    streamUrl: hlsStream(RAW.legume),
    duration: "11:25",
    date: "2024",
  },
  {
    id: "15",
    title: "Catégorie Artisanat — INDH TV",
    description: "L'artisanat traditionnel marocain : tissage, poterie et travail du cuir soutenus par les programmes INDH.",
    category: "Catégories",
    thumbnail: cloudinaryThumbnail(RAW.hajAissa, 14),
    videoUrl: optimizeVideo(RAW.hajAissa),
    streamUrl: hlsStream(RAW.hajAissa),
    duration: "17:40",
    date: "2024",
  },
  {
    id: "16",
    title: "Catégorie Tourisme — INDH TV",
    description: "Le tourisme rural et écologique soutenu par l'INDH : créer des opportunités dans les régions reculées du Maroc.",
    category: "Catégories",
    thumbnail: cloudinaryThumbnail(RAW.crepe, 22),
    videoUrl: optimizeVideo(RAW.crepe),
    streamUrl: hlsStream(RAW.crepe),
    duration: "14:55",
    date: "2024",
  },
  {
    id: "17",
    title: "Catégorie Eau & Assainissement",
    description: "Les projets d'accès à l'eau potable et d'assainissement financés par l'INDH dans les zones rurales.",
    category: "Catégories",
    thumbnail: "",
    videoUrl: RAW.episode1,
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
