"use client"

import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ConferenceBanner } from "@/components/conference"
import { OurImpact } from "@/components/our-impact"
import { ImpactStats } from "@/components/stats"
import { FeaturedPathways } from "@/components/pathways"
import { Testimonials } from "@/components/testimonials"
import { PartnersSection } from "@/components/partners"
import { PreFooterCTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <Box minH="100vh" bg="#FFFFFF" display="flex" flexDirection="column">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Upcoming Event Section (Only renders if an active event exists in database) */}
      <ConferenceBanner />

      {/* Our Impact Section */}
      <OurImpact />

      {/* Impact Stats Counter Section */}
      <ImpactStats />

      {/* Featured Pathways Section */}
      <FeaturedPathways />

      {/* Ecosystem Voices / Testimonials Section */}
      <Testimonials />

      {/* Strategic Partners & Sponsors Section */}
      <PartnersSection />

      {/* Strong Final Pre-Footer Call to Action Banner */}
      <PreFooterCTA />

      {/* Comprehensive Rich Footer */}
      <Footer />
    </Box>
  )
}
