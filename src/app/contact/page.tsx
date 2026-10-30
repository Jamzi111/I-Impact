"use client"

import React from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  ContactHero,
  ContactFormSection,
  ContactFAQ,
} from "@/components/contact"

export default function ContactPage() {
  return (
    <Box minH="100vh" bg="#FFFFFF" display="flex" flexDirection="column">
      {/* Universal Fixed Header */}
      <Header />

      <Box as="main" flex="1">
        {/* 1. Contact Hero Section (Matches user reference design) */}
        <ContactHero />

        {/* 2. Direct Inquiry Message Form & Regional Desk Channels */}
        <ContactFormSection />

        {/* 3. Self-Service FAQ Accordion */}
        <ContactFAQ />
      </Box>

      {/* Universal Comprehensive Footer */}
      <Footer />
    </Box>
  )
}
