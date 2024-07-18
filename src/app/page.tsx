import AboutSection from "@/components/sections/home/AboutSection";
import ContactSection from "@/components/sections/home/ContactSection";
import EventsSection from "@/components/sections/home/EventsSection";
import GallerySection from "@/components/sections/home/GallerySection";
import HeroSection from "@/components/sections/home/hero-section";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
