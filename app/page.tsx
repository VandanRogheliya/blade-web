import Header from "@/components/common/header"
import WaitlistFooter from "@/components/common/waitlist-footer"
import { HeroSection } from "@/components/landing/hero-section"
import { ProductsSection } from "@/components/landing/products-section"
import { WhyBladeSection } from "@/components/landing/why-blade-section"

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-background overflow-hidden">
      {/* Background grid pattern */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <ProductsSection />
          <WhyBladeSection />
        </main>
        <WaitlistFooter />
      </div>
    </div>
  )
}
