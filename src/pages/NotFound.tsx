import { Link } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 — DAVID SPACE"
        description="The page you're looking for doesn't exist or has been moved. Return to our homepage to explore fashion photography."
        canonicalUrl="/404"
        ogType="website"
      />

      <PortfolioHeader activeCategory="" />

      <main id="main-content" className="min-h-screen flex items-center justify-center px-8 pt-20 animate-fade-in">
        <div className="text-center max-w-2xl">
          <h1 className="font-editorial text-7xl italic md:text-9xl mb-8">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-light tracking-tight mb-4">
            Page not found
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block border border-accent px-8 py-3 text-sm uppercase tracking-widest hover:bg-accent transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default NotFound;
