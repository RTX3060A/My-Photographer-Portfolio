import { useState, useEffect } from "react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import ArchiveExperience from "@/components/ArchiveExperience";
import ViewingRoom from "@/components/ViewingRoom";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";
import { getFallbackArchive } from "@/data/archive";
import type { ArchiveItem } from "@/types/archive";

const Index = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Homepage always shows SELECTED category
  const activeCategory = "SELECTED";

  const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMixedMedia(activeCategory, 1, 20);
        setDisplayImages(data.items as ArchiveItem[]);
      } catch (err) {
        console.error('Error fetching Pexels media:', err);
        setError('Online archive unavailable. Showing the local collection.');
        setDisplayImages(getFallbackArchive(activeCategory));
      } finally {
        setLoading(false);
      }
    };

  };

  useEffect(() => {
    loadImages();
  }, []); // Remove activeCategory dependency - it's now constant

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "DAVID SPACE",
    "jobTitle": "Fashion Production & Web Design",
    "description": "Fashion Production & Web Design specialist. Creating compelling imagery and digital experiences.",
    "url": "https://davidspace.com",
    "image": "https://davidspace.com/og-image.jpg",
    "sameAs": [
      "https://instagram.com/davidspace"
    ],
    "knowsAbout": [
      "Fashion Photography",
      "Editorial Photography",
      "Commercial Production",
      "Fashion Campaigns",
      "Brand Photography"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "UK"
    }
  };

  return (
    <>
      <SEO
        title="DAVID SPACE - Fashion Production & Web Design"
        description="Fashion Production & Web Design specialist. Creating compelling imagery and digital experiences."
        canonicalUrl="/"
        ogType="profile"
        jsonLd={jsonLd}
      />

      <PortfolioHeader
        activeCategory={activeCategory}
      />
      
      <main>
        {error && <p className="sr-only" role="status">{error}</p>}
        <ArchiveExperience category={activeCategory} items={displayImages} loading={loading} onOpen={handleImageClick} onRetry={loadImages} />
      </main>

      {lightboxOpen && displayImages.length > 0 && (
        <ViewingRoom
          items={displayImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PortfolioFooter />
    </>
  );
};

export default Index;
