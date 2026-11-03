"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  HStack,
} from "@chakra-ui/react"
import {
  BarChartSquareIcon,
  FileTextIcon,
  ShieldCheckIcon,
  HeartHandshakeIcon,
  SparklesIcon,
} from "@/components/icons"

interface AccountabilityPillar {
  id: string
  title: string
  description: string
  takeaway: string
  icon: React.ReactNode
  accentColor: string
  iconBg: string
  iconBorder: string
}

const PILLARS_DATA: AccountabilityPillar[] = [
  {
    id: "measurement",
    title: "Impact Measurement",
    description: "Tracking our activities, progress and outcomes.",
    takeaway: "How we track young people reached and programme outcomes.",
    icon: <BarChartSquareIcon size={20} color="#34D399" />,
    accentColor: "#34D399",
    iconBg: "rgba(16, 185, 129, 0.14)",
    iconBorder: "rgba(16, 185, 129, 0.28)",
  },
  {
    id: "reporting",
    title: "Reporting & Documentation",
    description: "Communicating our work and documenting progress.",
    takeaway: "How we communicate our activities and progress.",
    icon: <FileTextIcon size={20} color="#38BDF8" />,
    accentColor: "#38BDF8",
    iconBg: "rgba(56, 189, 248, 0.14)",
    iconBorder: "rgba(56, 189, 248, 0.28)",
  },
  {
    id: "safeguarding",
    title: "Safeguarding",
    description: "Promoting safe and responsible engagement.",
    takeaway: "How we work to protect young people and participants.",
    icon: <ShieldCheckIcon size={20} color="#A78BFA" />,
    accentColor: "#A78BFA",
    iconBg: "rgba(167, 139, 250, 0.14)",
    iconBorder: "rgba(167, 139, 250, 0.28)",
  },
  {
    id: "engagement",
    title: "Responsible Engagement",
    description: "Listening to participants and stakeholders.",
    takeaway: "How we listen, collect feedback and improve.",
    icon: <HeartHandshakeIcon size={20} color="#FBBF24" />,
    accentColor: "#FBBF24",
    iconBg: "rgba(251, 191, 36, 0.14)",
    iconBorder: "rgba(251, 191, 36, 0.28)",
  },
]

export function TransparencyAccountability() {
  const [inView, setInView] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      setInView(true)
      return
    }

    // 1. Respect user accessibility preferences
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    // 2. Safe Fallback if IntersectionObserver is unavailable
    if (!("IntersectionObserver" in window)) {
      setInView(true)
      return () => {
        mediaQuery.removeEventListener("change", handleChange)
      }
    }

    // 3. Fallback timer to ensure content never stays hidden
    const fallbackTimer = setTimeout(() => {
      setInView(true)
    }, 400)

    // 4. Standard IntersectionObserver setup
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          clearTimeout(fallbackTimer)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    } else {
      setInView(true)
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      clearTimeout(fallbackTimer)
      observer.disconnect()
    }
  }, [])

  const getTransitionStyle = (delayMs: number = 0) => {
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: "none",
        transition: "none",
      }
    }
    return {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
    }
  }

  return (
    <Box
      ref={sectionRef}
      id="transparency-accountability"
      as="section"
      position="relative"
      py={{ base: "12", sm: "16", md: "20", lg: "24" }}
      bg="#04103B"
      backgroundImage="linear-gradient(180deg, #030D2E 0%, #051B64 55%, #04103B 100%)"
      borderTop="1px solid"
      borderTopColor="rgba(255, 255, 255, 0.08)"
      borderBottom="1px solid"
      borderBottomColor="rgba(255, 255, 255, 0.08)"
      overflow="hidden"
      w="100%"
      maxW="100%"
      aria-label="Transparency and Accountability"
    >
      {/* Fallback CSS if JavaScript is disabled */}
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #transparency-accountability [data-animate="true"] {
                opacity: 1 !important;
                transform: none !important;
              }
            `,
          }}
        />
      </noscript>

      {/* Ambient Lighting Gradients */}
      <Box
        position="absolute"
        top="0%"
        right="-5%"
        w={{ base: "260px", sm: "360px", md: "520px" }}
        h={{ base: "260px", sm: "360px", md: "520px" }}
        bg="radial-gradient(circle, rgba(16, 185, 129, 0.09) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="0%"
        left="-5%"
        w={{ base: "240px", sm: "340px", md: "480px" }}
        h={{ base: "240px", sm: "340px", md: "480px" }}
        bg="radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Container
        maxW="1360px"
        px={{ base: "4", sm: "6", md: "8", lg: "10" }}
        position="relative"
        zIndex={1}
      >
        {/* ================= SECTION HEADER ================= */}
        <Box maxW="780px" mb={{ base: "8", sm: "10", md: "12" }}>
          {/* Eyebrow Label */}
          <Box mb="3" data-animate="true" style={getTransitionStyle(0)}>
            <HStack
              display="inline-flex"
              gap="2"
              px="3.5"
              py="1.5"
              bg="rgba(16, 185, 129, 0.12)"
              borderRadius="full"
              border="1px solid"
              borderColor="rgba(16, 185, 129, 0.28)"
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)"
            >
              <Box color="#34D399" display="flex" alignItems="center">
                <SparklesIcon size={13} />
              </Box>
              <Text
                fontSize={{ base: "10.5px", sm: "11px" }}
                fontWeight="800"
                color="#34D399"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                ACCOUNTABILITY MATTERS
              </Text>
            </HStack>
          </Box>

          {/* Main Semantic Heading */}
          <Heading
            as="h2"
            fontSize={{ base: "24px", sm: "30px", md: "38px", lg: "42px" }}
            fontWeight="900"
            color="#FFFFFF"
            lineHeight={{ base: "1.22", md: "1.18" }}
            letterSpacing="-0.025em"
            mb={{ base: "2.5", sm: "3.5" }}
            data-animate="true"
            style={getTransitionStyle(80)}
            wordBreak="break-word"
          >
            Impact You Can Understand. Progress You Can Trust.
          </Heading>

          {/* Description */}
          <Text
            fontSize={{ base: "14px", sm: "15px", md: "16.5px" }}
            color="rgba(255, 255, 255, 0.78)"
            lineHeight="1.65"
            maxW="720px"
            data-animate="true"
            style={getTransitionStyle(160)}
          >
            We believe meaningful impact requires transparency, responsible practices and a
            commitment to continuous improvement.
          </Text>
        </Box>

        {/* ================= FOUR ACCOUNTABILITY PILLARS ================= */}
        {/* 2-column layout on mobile, 4-column layout on desktop as requested */}
        <SimpleGrid
          columns={{ base: 2, lg: 4 }}
          gap={{ base: "3", sm: "4", md: "5" }}
          w="100%"
        >
          {PILLARS_DATA.map((pillar, idx) => (
            <Box
              key={pillar.id}
              position="relative"
              bg="rgba(255, 255, 255, 0.035)"
              backdropFilter="blur(12px)"
              borderRadius={{ base: "16px", sm: "20px" }}
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.09)"
              p={{ base: "3.5", sm: "4.5", md: "5" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              boxShadow="0 8px 24px -6px rgba(0, 0, 0, 0.3)"
              transition={{ base: "none", md: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              _hover={{
                md: {
                  bg: "rgba(255, 255, 255, 0.06)",
                  borderColor: "rgba(52, 211, 153, 0.4)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 14px 32px -8px rgba(0, 0, 0, 0.45)",
                },
              }}
              data-animate="true"
              style={getTransitionStyle(200 + idx * 80)}
              w="100%"
            >
              {/* Top Card Section: Icon & Header */}
              <Box mb="3">
                <Box
                  w={{ base: "34px", sm: "42px" }}
                  h={{ base: "34px", sm: "42px" }}
                  borderRadius={{ base: "10px", sm: "12px" }}
                  bg={pillar.iconBg}
                  border="1px solid"
                  borderColor={pillar.iconBorder}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={{ base: "2.5", sm: "3.5" }}
                  flexShrink={0}
                >
                  {pillar.icon}
                </Box>

                <Heading
                  as="h3"
                  fontSize={{ base: "13.5px", sm: "15px", md: "16.5px" }}
                  fontWeight="800"
                  color="#FFFFFF"
                  lineHeight="1.25"
                  letterSpacing="-0.01em"
                  mb={{ base: "1.5", sm: "2" }}
                >
                  {pillar.title}
                </Heading>

                <Text
                  fontSize={{ base: "11px", sm: "12.5px", md: "13px" }}
                  color="rgba(255, 255, 255, 0.72)"
                  lineHeight="1.48"
                >
                  {pillar.description}
                </Text>
              </Box>

              {/* Bottom Card Section: What visitors should understand */}
              <Box
                pt="2.5"
                borderTop="1px solid"
                borderColor="rgba(255, 255, 255, 0.08)"
              >
                <HStack align="flex-start" gap="1.5">
                  <Box
                    w="4.5px"
                    h="4.5px"
                    borderRadius="full"
                    bg={pillar.accentColor}
                    mt="1.5"
                    flexShrink={0}
                  />
                  <Text
                    fontSize={{ base: "10px", sm: "11px", md: "11.5px" }}
                    color="rgba(255, 255, 255, 0.62)"
                    lineHeight="1.38"
                  >
                    {pillar.takeaway}
                  </Text>
                </HStack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* ================= CLOSING MESSAGE BANNER ================= */}
        <Box
          mt={{ base: "6", sm: "8", md: "10" }}
          p={{ base: "4", sm: "5", md: "6" }}
          borderRadius={{ base: "16px", sm: "20px" }}
          bg="linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 27, 100, 0.6) 100%)"
          border="1px solid"
          borderColor="rgba(16, 185, 129, 0.22)"
          boxShadow="0 10px 30px -10px rgba(0, 0, 0, 0.35)"
          data-animate="true"
          style={getTransitionStyle(480)}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            gap={{ base: "3", md: "6" }}
          >
            <Box>
              <HStack gap="2" mb="1.5">
                <Box
                  w="6px"
                  h="6px"
                  borderRadius="full"
                  bg="#34D399"
                  boxShadow="0 0 8px #34D399"
                  flexShrink={0}
                />
                <Text
                  fontSize={{ base: "13.5px", sm: "14.5px", md: "15.5px" }}
                  fontWeight="800"
                  color="#34D399"
                  letterSpacing="0.015em"
                >
                  Transparency is part of our impact.
                </Text>
              </HStack>
              <Text
                fontSize={{ base: "12.5px", sm: "13.5px", md: "14px" }}
                color="rgba(255, 255, 255, 0.85)"
                lineHeight="1.55"
                maxW="780px"
              >
                We are committed to learning, improving and being accountable for the work we do.
              </Text>
            </Box>

            {/* Dignified Context Pill */}
            <Box
              flexShrink={0}
              px="3"
              py="1.5"
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.06)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.14)"
            >
              <Text
                fontSize={{ base: "10px", sm: "11px" }}
                fontWeight="700"
                color="rgba(255, 255, 255, 0.72)"
                letterSpacing="0.04em"
              >
                Continuous Improvement Framework
              </Text>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

