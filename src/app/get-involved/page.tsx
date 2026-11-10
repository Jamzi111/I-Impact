"use client"

import React, { useState, useEffect, Suspense } from "react"
import { Box, Container, Flex, HStack, Text } from "@chakra-ui/react"
import Link from "next/link"
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
  InvolvementSuccessModal,
  InvolvementFAQ,
  GetInvolvedCTA,
} from "@/components/get-involved"

function GetInvolvedContent() {
  const searchParams = useSearchParams()
  const initialRole = searchParams?.get("role") || "mentor"
  const [selectedTrack, setSelectedTrack] = useState(initialRole)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [submissionData, setSubmissionData] = useState<any | null>(null)

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

  const handleOpenSuccessModal = (data: any) => {
    setSubmissionData(data)
    setIsSuccessOpen(true)
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
        pt={{ base: "72px", md: "84px" }}
      >
        {/* Top Utility Context Bar / Breadcrumb Header */}
        <Box
          as="section"
          w="100%"
          bg="#F8FAFC"
          borderBottom="1px solid"
          borderColor="#E2E8F0"
          py="2.5"
        >
          <Container
            maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1280px" }}
            px={{ base: "4", sm: "6", md: "8" }}
          >
            <Flex
              direction={{ base: "column", sm: "row" }}
              align={{ base: "flex-start", sm: "center" }}
              justify="space-between"
              gap="2"
            >
              <HStack gap="2" fontSize="12.5px" color="#64748B">
                <Link href="/">
                  <Text
                    as="span"
                    color="#64748B"
                    _hover={{ color: "#059669" }}
                    transition="color 0.15s ease"
                  >
                    Home
                  </Text>
                </Link>
                <Text as="span" color="#CBD5E1">
                  /
                </Text>
                <Text as="span" color="#051B64" fontWeight="700">
                  Get Involved & Partner With Us
                </Text>
              </HStack>

              <Text
                fontSize={{ base: "10.5px", md: "11px" }}
                fontWeight="800"
                letterSpacing="0.08em"
                textTransform="uppercase"
                color="#059669"
              >
                Pan-African Youth Empowerment • Pathways to Impact
              </Text>
            </Flex>
          </Container>
        </Box>

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
          onOpenSuccessModal={handleOpenSuccessModal}
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

      {/* Celebration / Success Confirmation Modal */}
      <InvolvementSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        submission={submissionData}
      />
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
