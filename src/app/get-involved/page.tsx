"use client"

import React, { useState, useEffect, Suspense } from "react"
import { Box } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreFooterCTA } from "@/components/cta"
import {
  GetInvolvedHero,
  InvolvementTracks,
  HowYouCanHelp,
  OnboardingProcess,
  WhyGetInvolved,
  InvolvementForm,
  InvolvementFAQ,
  GetInvolvedCTA,
} from "@/components/get-involved"

function GetInvolvedContent() {
  const searchParams = useSearchParams()
  const initialRole = searchParams?.get("role") || "mentor"
  const [selectedTrack, setSelectedTrack] = useState(initialRole)

  useEffect(() => {
    const roleParam = searchParams?.get("role")
    if (roleParam) {
      setSelectedTrack(roleParam)
      setTimeout(() => {
        const formEl = document.getElementById("application-form")
        if (formEl) {
          const headerOffset = 84
          const elementPosition = formEl.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 100)
    }
  }, [searchParams])

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId)
    const el = document.getElementById("application-form")
    if (el) {
      const headerOffset = 84
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <Box
      minH="100vh"
      bg="#FFFFFF"
      display="flex"
      flexDirection="column"
      overflowX="hidden"
      w="100%"
      maxW="100%"
    >
      {/* Universal Fixed Header - Crisp White Variant */}
      <Header variant="white" />

      <Box
        as="main"
        flex="1"
        overflowX="hidden"
        w="100%"
        maxW="100%"
      >
        {/* 1. Get Involved Hero (Clean invitation, verified 10,000+ stat, 2 CTAs) */}
        <GetInvolvedHero onSelectTrack={handleTrackSelect} />

        {/* 2. Ways to Get Involved (6 Inclusive pathways) */}
        <InvolvementTracks
          selectedTrack={selectedTrack}
          onSelectTrack={handleTrackSelect}
        />

        {/* 3. Ways Your Contribution Can Make a Difference (Practical value, no invented numbers) */}
        <HowYouCanHelp />

        {/* 4. How Getting Involved Works (Honest 4-step journey with safeguarding note) */}
        <OnboardingProcess />

        {/* 5. Why Get Involved With I IMPACT? (Mission, culture of champions, mutual growth) */}
        <WhyGetInvolved />

        {/* 6. Expression of Interest Form (Working prototype with validation) */}
        <InvolvementForm
          selectedTrack={selectedTrack}
          onTrackChange={setSelectedTrack}
        />

        {/* 7. Frequently Asked Questions (Realistic, grounded answers) */}
        <InvolvementFAQ />

        {/* 8. Final Call to Action (General invitation to collaborate) */}
        <GetInvolvedCTA />

        {/* 9. Site-wide PreFooter Call to Action */}
        <PreFooterCTA />
      </Box>

      {/* Universal Footer */}
      <Footer />
    </Box>
  )
}

export default function GetInvolvedPage() {
  return (
    <Suspense
      fallback={
        <Box minH="100vh" bg="#FFFFFF">
          <Header variant="white" />
        </Box>
      }
    >
      <GetInvolvedContent />
    </Suspense>
  )
}
