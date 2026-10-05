export type ArchiveMediaType = "image" | "video";

export interface ArchiveItem {
  id: string;
  type: ArchiveMediaType;
  src: string;
  highResSrc?: string;
  videoSrc?: string;
  alt: string;
  title: string;
  series: string;
  year?: string;
  location?: string;
  venue?: string;
  photographer?: string;
  client?: string;
  category?: string;
  medium?: string;
  dimensions?: string;
  details?: string;
  copyright?: string;
  width?: number;
  height?: number;
}
