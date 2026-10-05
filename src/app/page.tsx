"use client"

import {
  Box,
  Container,
} from "@chakra-ui/react"
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

      {/* Upcoming Event Section */}
      <Box
        as="section"
        position="relative"
        overflow="hidden"
        bg="linear-gradient(180deg, #FBFDFF 0%, #F5F9FE 100%)"
        py={{ base: "6", sm: "8", md: "10" }}
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="rgba(14, 165, 233, 0.05)"
      >
        {/* Subtle decorative ambient glow */}
        <Box
          position="absolute"
          top="-20%"
          left="50%"
          transform="translateX(-50%)"
          w="800px"
          h="400px"
          bg="radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, transparent 70%)"
          filter="blur(50px)"
          pointerEvents="none"
        />

        <Container maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1200px" }} px={{ base: "4", sm: "6", md: "8", lg: "8" }} position="relative" zIndex={1}>
          <ConferenceBanner />
        </Container>
      </Box>

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