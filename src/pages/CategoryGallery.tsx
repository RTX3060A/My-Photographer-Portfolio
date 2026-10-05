import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import ArchiveExperience from "@/components/ArchiveExperience";
import ViewingRoom from "@/components/ViewingRoom";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";
import { getFallbackArchive } from "@/data/archive";
import type { ArchiveItem } from "@/types/archive";

const validCategories = ['selected', 'commissioned', 'editorial', 'personal', 'all'];

const CategoryGallery = () => {
  const { category } = useParams<{ category: string }>();
  const [images, setImages] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Validate category
  if (!category || !validCategories.includes(category.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  const categoryUpper = category.toUpperCase();

  const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMixedMedia(categoryUpper, 1, 20);
        setImages(data.items as ArchiveItem[]);
      } catch (err) {
        console.error('Error fetching Pexels media:', err);
        setError('Online archive unavailable. Showing the local collection.');
        setImages(getFallbackArchive(categoryUpper));
      } finally {
        setLoading(false);
      }
    };

  };

  useEffect(() => {
    loadImages();
  }, [categoryUpper]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      'selected': 'Selected Works',
      'commissioned': 'Commissioned Projects',
      'editorial': 'Editorial Photography',
      'personal': 'Personal Projects',
      'all': 'All Photography'
    };
    return titles[cat] || 'Gallery';
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      'selected': 'Curated selection of luxury fashion campaigns and high-end editorial work showcasing contemporary minimalism and timeless elegance.',
      'commissioned': 'Commercial fashion campaigns for luxury brands, featuring product photography with clean aesthetics and professional execution.',
      'editorial': 'Editorial fashion photography for leading publications, combining artistic vision with commercial excellence.',
      'personal': 'Artistic personal projects exploring black and white photography, intimate portraiture, and creative experimentation.',
      'all': 'Complete portfolio spanning fashion campaigns, editorial work, and personal projects with a distinctive minimalist aesthetic.'
    };
    return descriptions[cat] || 'Explore the collection';
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${getCategoryTitle(category)} - Morgan Blake`,
    "description": getCategoryDescription(category),
    "url": `https://morganblake.com/category/${category}`,
    "creator": {
      "@type": "Person",
      "name": "Morgan Blake"
    }
  };

  return (
    <>
      <SEO
        title={`${getCategoryTitle(category)} - Morgan Blake`}
        description={getCategoryDescription(category)}
        canonicalUrl={`/category/${category}`}
        jsonLd={jsonLd}
      />

      <PortfolioHeader
        activeCategory={categoryUpper}
      />

      <main>
        {error && <p className="sr-only" role="status">{error}</p>}
        <ArchiveExperience category={categoryUpper} items={images} loading={loading} onOpen={handleImageClick} onRetry={loadImages} />
      </main>

      {lightboxOpen && images.length > 0 && (
        <ViewingRoom
          items={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PortfolioFooter />
    </>
  );
};

export default CategoryGallery;
