"use client"

import React from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import {
  AboutHero,
  OurStorySection,
  MissionVisionBeliefs,
  OurApproach,
  CoreValues,
  LeadershipSection,
  AboutCTA,
} from "@/components/about"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <Box minH="100vh" bg="#FFFFFF" display="flex" flexDirection="column">
      {/* Universal Fixed Header */}
      <Header />

      {/* 1. Stacked Hero with Writeup, Wide About-iimpact.png & Floating Stats */}
      <AboutHero />

      {/* 2. Our Origin Story & Conviction */}
      <OurStorySection />

      {/* 3. Mission, Vision & What We Believe */}
      <MissionVisionBeliefs />

      {/* 4. Our 4-Pillar Transformation Approach */}
      <OurApproach />

      {/* 5. Core Values (The Champion Code) */}
      <CoreValues />

      {/* 6. Leadership & Core Drivers */}
      <LeadershipSection />

      {/* 7. Action Pathways Pre-Footer CTA */}
      <AboutCTA />

      {/* Universal Comprehensive Footer */}
      <Footer />
    </Box>
  )
}
