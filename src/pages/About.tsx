import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";
import { fetchPexelsPhotos } from "@/services/pexels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import portraitFallback from "@/assets/raya-portrait.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const About = () => {
  const [portrait, setPortrait] = useState<{ src: string; alt: string; width?: number; height?: number }>({ src: portraitFallback, alt: "DAVID SPACE studio portrait" });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your inquiry. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    const loadPortrait = async () => {
      try {
        // Fetch a professional photographer portrait from Pexels
        const data = await fetchPexelsPhotos('PERSONAL', 1, 1); // Personal category has artistic portraits
        if (data.photos.length > 0) {
          const photo = data.photos[0];
          setPortrait({
            src: photo.src.large2x,
            alt: photo.alt || 'Portrait',
            width: photo.width,
            height: photo.height,
          });
        }
      } catch (err) {
        console.error('Error fetching portrait:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPortrait();
  }, []);

  return (
    <>
      <SEO
        title="About — DAVID SPACE"
        description="DAVID SPACE is an image-making and visual production practice working across fashion, editorial, and digital experiences."
        canonicalUrl="/about"
      />

      <PortfolioHeader
        activeCategory=""
      />
      
      <main id="main-content" className="min-h-screen">
        <section className="mx-auto max-w-[1500px] px-4 pb-20 pt-28 md:px-10 md:pt-36">
          <div className="mb-20 grid gap-12 border-b border-border pb-20 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-8 lg:col-span-5">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Studio profile</p>
              <h1 className="font-editorial text-5xl italic text-foreground md:text-7xl">
                DAVID SPACE
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                FASHION PRODUCTION & WEB DESIGN
              </p>
            </div>

            </div>
            {!loading && portrait && (
              <div className="overflow-hidden lg:col-span-7">
                <picture className="relative block">
                  {portrait.width && portrait.height && (
                    <svg
                      width={portrait.width}
                      height={portrait.height}
                      viewBox={`0 0 ${portrait.width} ${portrait.height}`}
                      className="w-full h-auto"
                    >
                      <rect
                        width={portrait.width}
                        height={portrait.height}
                        fill="white"
                      />
                    </svg>
                  )}
                  <img
                    src={portrait.src}
                    alt={portrait.alt}
                    className="absolute left-0 top-0 h-full w-full object-cover grayscale"
                    style={{
                      opacity: loading ? 0 : 1,
                      transition: 'opacity 0.5s ease-out'
                    }}
                  />
                </picture>
              </div>
            )}
          </div>

          {/* Bio Section */}
          <div className="mx-auto mb-20 grid max-w-5xl gap-10 text-sm leading-7 text-foreground/80 md:grid-cols-2">
            <p>
              DAVID SPACE is an independent visual practice working across fashion production, editorial photography, and digital design.
            </p>

            <p>
              Each project is developed as a complete visual system—from research and location work to image sequencing and final digital presentation.
            </p>

            <div className="pt-8">
              <h2 className="font-editorial text-xl text-foreground mb-4">Practice</h2>
              <p className="text-foreground/70 text-xs uppercase tracking-wider leading-loose">
                Fashion Production / Editorial Photography / Creative Direction / Digital Art Direction / Web Design
              </p>
            </div>

            <div className="pt-4">
              <h2 className="font-editorial text-xl text-foreground mb-4">Archive</h2>
              <p className="text-foreground/70 text-xs uppercase tracking-wider leading-loose">
                Selected commissions, editorial stories, independent studies, and location-based visual records.
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mx-auto max-w-2xl border-t border-border pt-20">
            <div className="text-center space-y-4 mb-12">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-inter">
                INQUIRIES
              </p>
              <h2 className="font-editorial text-4xl italic text-foreground md:text-5xl">
                Contact
              </h2>
              <p className="text-foreground/80 text-sm leading-relaxed">
                For project inquiries and collaborations.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider text-foreground/70 font-inter">
                        Message *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          className="border-0 border-b border-foreground/20 rounded-none bg-transparent text-foreground min-h-[150px] px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="outline"
                    className="w-full md:w-auto px-12 py-6 text-sm uppercase tracking-widest font-inter border-foreground/40 hover:bg-foreground hover:text-background transition-all"
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default About;
