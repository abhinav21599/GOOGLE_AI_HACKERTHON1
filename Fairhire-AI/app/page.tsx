"use client"

import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { TrustSection } from "@/components/landing/trust-section"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  )
}
