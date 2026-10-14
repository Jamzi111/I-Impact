"use client"

import React, { useState, useEffect, useLayoutEffect } from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import {
  AboutHero,
  OurStorySection,
  MissionVisionSection,
  WhatWeBelieveSection,
  OurValuesSection,
  OurApproach,
  FounderSection,
  AboutCTA,
} from "@/components/about"
import { Footer } from "@/components/footer"
import { jumpToElement, consumeTargetHash } from "@/lib/scrollUtils"

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export default function AboutPage() {
  const [hasTargetHash] = useState(() => {
    if (typeof window === "undefined") return false
    try {
      return !!(window.location.hash || sessionStorage.getItem("about_target_hash"))
    } catch {
      return false
    }
  })
  const [isJumped, setIsJumped] = useState(!hasTargetHash)

  useIsomorphicLayoutEffect(() => {
    const target = consumeTargetHash()

    if (target) {
      const tryJump = () => {
        const success = jumpToElement(target)
        if (success) {
          setIsJumped(true)
          return true
        }
        return false
      }

      if (!tryJump()) {
        const interval = setInterval(() => {
          if (tryJump()) {
            clearInterval(interval)
          }
        }, 15)
        const timeout = setTimeout(() => {
          clearInterval(interval)
          setIsJumped(true)
        }, 400)
        return () => {
          clearInterval(interval)
          clearTimeout(timeout)
        }
      }
    } else {
      setIsJumped(true)
    }
  }, [])

  return (
    <Box
      minH="100vh"
      bg="#FFFFFF"
      display="flex"
      flexDirection="column"
      opacity={hasTargetHash && !isJumped ? 0 : 1}
      transition={hasTargetHash && !isJumped ? "none" : "opacity 0.12s ease-in"}
    >
      {/* Universal Fixed Header */}
      <Header />

      {/* 1. Stacked Hero with Writeup, Wide About-iimpact.png & Floating Stats */}
      <AboutHero />

      {/* 2. Our Origin Story & Conviction */}
      <OurStorySection />

      {/* 3. Mission & Vision */}
      <MissionVisionSection />

      {/* 4. What We Believe (7 Core Convictions & Foundation Banner) */}
      <WhatWeBelieveSection />

      {/* 5. Our Values (The Principles Behind Every Champion - 6 Cards) */}
      <OurValuesSection />

      {/* 6. Our 4-Pillar Transformation Approach */}
      <OurApproach />

      {/* 7. About The Founder (Samuel Joseph) */}
      <FounderSection />

      {/* 8. Action Pathways Pre-Footer CTA */}
      <AboutCTA />

      {/* Universal Comprehensive Footer */}
      <Footer />
    </Box>
  )
}
