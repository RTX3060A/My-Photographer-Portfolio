import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FocusTrap from "focus-trap-react";
import { TextRoll } from "@/components/ui/text-roll";

interface PortfolioHeaderProps {
  activeCategory: string;
}

const categories = [
  "SELECTED",
  "COMMISSIONED",
  "EDITORIAL",
  "PERSONAL",
];

const PortfolioHeader = ({ activeCategory }: PortfolioHeaderProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-6 px-4 md:px-10">
        <Link
          to="/"
          className="font-editorial text-lg italic text-foreground transition-colors hover:text-accent whitespace-nowrap"
          onMouseEnter={() => setHoveredItem('name')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hoveredItem === 'name' ? (
            <TextRoll duration={0.3} getEnterDelay={(i) => i * 0.02} getExitDelay={(i) => i * 0.02}>
              DAVID SPACE
            </TextRoll>
          ) : (
            "DAVID SPACE"
          )}
        </Link>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu size={20} />
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase()}`}
            onMouseEnter={() => setHoveredItem(category)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`text-[10px] uppercase tracking-[0.18em] transition-colors whitespace-nowrap ${
              activeCategory === category
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground/80"
            }`}
          >
            {hoveredItem === category ? (
              <TextRoll duration={0.3} getEnterDelay={(i) => i * 0.02} getExitDelay={(i) => i * 0.02}>
                {category}
              </TextRoll>
            ) : (
              category
            )}
          </Link>
        ))}
        
        <Link
          to="/about"
          className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          onMouseEnter={() => setHoveredItem('about')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hoveredItem === 'about' ? (
            <TextRoll duration={0.3} getEnterDelay={(i) => i * 0.02} getExitDelay={(i) => i * 0.02}>
              ABOUT
            </TextRoll>
          ) : (
            "ABOUT"
          )}
        </Link>
       </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <FocusTrap>
            <div
              className="fixed inset-0 bg-background z-50 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Close Button */}
              <div className="flex justify-end p-5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </Button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col items-center justify-center gap-8 px-8 pt-12">
                {/* Categories */}
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg uppercase tracking-widest font-inter transition-colors ${
                      activeCategory === category
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {category}
                  </Link>
                ))}

                {/* Separator */}
                <div className="w-16 h-px bg-border"></div>

                {/* Page Links */}
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-inter"
                >
                  ABOUT
                </Link>
              </nav>
            </div>
          </FocusTrap>
        )}
      </div>
    </header>
  );
};

export default PortfolioHeader;
