import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ShowcaseSection } from "@/components/showcase-section"
import { FeaturesSection } from "@/components/features-section"
import { GeneratorSection } from "@/components/generator-section"
import { GallerySection } from "@/components/gallery-section"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] bg-noise">
      <Navigation />
      <HeroSection />
      <GeneratorSection />
      <ShowcaseSection />
      <PricingSection />
      <FeaturesSection />
      <GallerySection />
      <CTASection />
      <Footer />
    </main>
  )
}
