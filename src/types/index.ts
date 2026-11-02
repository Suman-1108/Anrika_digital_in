export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  features: string[];
  iconName: string;
  badge: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "all" | "web" | "ads" | "photo-video" | "branding";
  categoryLabel: string;
  client: string;
  year: string;
  description: string;
  image: string;
  aspectRatio: "portrait" | "landscape" | "square";
  deliverables: string[];
  metrics?: string;
  accentColor?: string;
}

export interface ShowcaseMediaItem {
  id: string;
  title: string;
  category: string;
  duration?: string;
  resolution?: string;
  thumbnail: string;
  videoPlaceholderUrl?: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  brand: string;
  year: string;
  category: string;
}

