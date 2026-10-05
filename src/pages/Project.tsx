import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";

import alpine1 from "@/assets/projects/alpine-1.jpg";
import alpine2 from "@/assets/projects/alpine-2.jpg";
import alpine3 from "@/assets/projects/alpine-3.jpg";
import alpine4 from "@/assets/projects/alpine-4.jpg";
import alpine5 from "@/assets/projects/alpine-5.jpg";
import alpine6 from "@/assets/projects/alpine-6.jpg";
import alpine7 from "@/assets/projects/alpine-7.jpg";
import alpine8 from "@/assets/projects/alpine-8.jpg";

const projectImages = [
  { src: alpine1, caption: "First Light on Summit Ridge" },
  { src: alpine2, caption: "Valley Mist" },
  { src: alpine3, caption: "Alpine Meadow" },
  { src: alpine4, caption: "Glacial Lake" },
  { src: alpine5, caption: "Ridge Line" },
  { src: alpine6, caption: "Morning Reflection" },
  { src: alpine7, caption: "Alpine Stream" },
  { src: alpine8, caption: "Golden Hour Peak" },
];

const Project = () => {
  const { slug } = useParams();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Alpine Light",
    "description": "A collection of images capturing the ethereal quality of early morning light in mountain landscapes. These photographs explore the delicate balance between shadow and illumination in high-altitude environments.",
    "creator": {
      "@type": "Person",
      "name": "DAVID SPACE",
      "url": "https://davidspace.com"
    },
    "about": {
      "@type": "Thing",
      "name": "Alpine Photography"
    },
    "image": projectImages.map((img) => ({
      "@type": "ImageObject",
      "contentUrl": `https://davidspace.com${img.src}`,
      "caption": img.caption,
      "creator": {
        "@type": "Person",
        "name": "DAVID SPACE"
      }
    })),
    "datePublished": "2024",
    "inLanguage": "en-US"
  };

  return (
    <>
      <SEO
        title="Alpine Light — DAVID SPACE"
        description="A collection of images capturing the ethereal quality of early morning light in mountain landscapes. These photographs explore the delicate balance between shadow and illumination in high-altitude environments."
        canonicalUrl={`/project/${slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />

      <PortfolioHeader activeCategory="" />

      <main id="main-content" className="pt-16">
        <header className="mx-auto grid max-w-[1500px] gap-10 px-4 py-20 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-accent">Photographic essay / 2024</p>
          <h1 className="font-editorial text-5xl italic md:text-7xl mb-6">
            Alpine Light
          </h1>
          </div>
          <p className="self-end text-base leading-8 text-muted-foreground lg:col-span-5">
            A collection of images capturing the ethereal quality of early morning light in mountain landscapes. 
            These photographs explore the delicate balance between shadow and illumination in high-altitude environments.
          </p>
        </header>

        <div className="mx-auto flex max-w-[1500px] flex-col gap-20 px-4 py-10 animate-fade-in md:px-10 lg:gap-32">
          {projectImages.map((image, index) => (
            <figure key={index} className={index % 3 === 1 ? "md:ml-auto md:w-4/5" : index % 3 === 2 ? "md:w-3/4" : "w-full"}>
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <figcaption className="flex justify-between border-b border-border py-4 text-xs text-muted-foreground">
                <span>{image.caption}</span><span>{String(index + 1).padStart(2, "0")} / {String(projectImages.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <Link
          to="/"
          className="group mx-auto mt-20 flex max-w-[1500px] items-center justify-between border-t border-border px-4 py-12 transition-colors hover:bg-muted md:px-10"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              More Work
            </p>
            <h2 className="text-2xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
               Return to Archive
            </h2>
          </div>
          <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-2 group-hover:text-foreground transition-all duration-300" />
        </Link>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default Project;
