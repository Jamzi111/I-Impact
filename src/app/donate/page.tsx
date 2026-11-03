"use client"

import React from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreFooterCTA } from "@/components/cta"
import {
  DonateHero,
  DonationForm,
  DonationImpactBreakdown,
  BankTransferDetails,
  SponsorshipTiers,
  DonateFAQ,
} from "@/components/donate"

export default function DonatePage() {
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
      {/* Universal Fixed Navigation Header - White variant on Donate page */}
      <Header variant="white" />

      <Box as="main" flex="1" overflowX="hidden" w="100%" maxW="100%">
        {/* 1. Donate Hero & Purpose Statement */}
        <DonateHero />

        {/* 2. Interactive Giving Widget (Frequencies, Currencies, Presets & Checkout) */}
        <DonationForm />

        {/* 3. Fiduciary Stewardship & Impact Allocation Breakdown */}
        <DonationImpactBreakdown />

        {/* 4. Direct Bank Wire & Mobile Transfer Details */}
        <BankTransferDetails />

        {/* 5. Sponsorship Tiers for Foundations & Corporate CSR */}
        <SponsorshipTiers />

        {/* 6. Donor Frequently Asked Questions */}
        <DonateFAQ />

        {/* 7. Site-wide PreFooter Call to Action */}
        <PreFooterCTA />
      </Box>

      {/* Universal Footer */}
      <Footer />
    </Box>
  )
}

