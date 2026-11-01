"use client"

import React from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreFooterCTA } from "@/components/cta"
import {
  ImpactHero,
  ImpactScorecard,
  LongitudinalGrowth,
  AreasOfImpact,
} from "@/components/impact"

export default function ImpactPage() {
  return (
    <Box minH="100vh" bg="#FFFFFF" display="flex" flexDirection="column" overflowX="hidden" w="100%" maxW="100%">
      {/* Universal Navigation Header */}
      <Header />

      <Box as="main" flex="1" overflowX="hidden" w="100%" maxW="100%">
        {/* 1. Impact Hero Section */}
        <ImpactHero />

        {/* 2. Core Accountability Scorecard (6-Card Longitudinal Impact) */}
        <ImpactScorecard />

        {/* 3. Longitudinal Growth Section (Cumulative Impact Card & Growth Journey Chart) */}
        <LongitudinalGrowth />

        {/* 4. Areas of Impact (3-Card Core Pillars) */}
        <AreasOfImpact />

        {/* 5. PreFooter Call to Action */}
        <PreFooterCTA />
      </Box>

      {/* Universal Footer */}
      <Footer />
    </Box>
  )
}
