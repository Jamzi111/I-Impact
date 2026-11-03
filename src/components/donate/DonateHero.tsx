"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react"
import {
  SparklesIcon,
  BookOpenIcon,
  UsersIcon,
  TrophyIcon,
  GlobeIcon,
} from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"

const HERO_PILLARS = [
  {
    icon: <BookOpenIcon size={15} color="#34D399" />,
    title: "Skills Development",
    subtitle: "Building practical knowledge and abilities",
  },
  {
    icon: <UsersIcon size={15} color="#38BDF8" />,
    title: "Youth Mentorship",
    subtitle: "Supporting personal growth and confidence",
  },
  {
    icon: <TrophyIcon size={15} color="#FBBF24" />,
    title: "Leadership Development",
    subtitle: "Developing tomorrow's changemakers",
  },
  {
    icon: <GlobeIcon size={15} color="#A78BFA" />,
    title: "Community Impact",
    subtitle: "Encouraging positive change",
  },
]

export function DonateHero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return (
    <Box
      as="section"
      position="relative"
      bg="linear-gradient(180deg, #051B64 0%, #071647 60%, #0B1A4D 100%)"
      color="#FFFFFF"
      pt={{ base: "76px", sm: "88px", md: "100px", lg: "108px" }}
      pb={{ base: "8", sm: "9", md: "10" }}
      overflow="hidden"
    >
      {/* Subtle Ambient Background Gradients */}
      <Box
        position="absolute"
        top="-10%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "300px", md: "580px" }}
        h={{ base: "220px", md: "360px" }}
        bg="radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(5, 27, 100, 0) 70%)"
        filter="blur(50px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-15%"
        right="-5%"
        w={{ base: "240px", md: "420px" }}
        h={{ base: "240px", md: "420px" }}
        bg="radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(5, 27, 100, 0) 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
        position="relative"
        zIndex={1}
      >
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          maxW="820px"
          mx="auto"
        >
          {/* Eyebrow Badge - Preserved with LiveDot per user instruction */}
          <HStack
            gap="2"
            px="3"
            py="1"
            bg="rgba(16, 185, 129, 0.14)"
            border="1px solid"
            borderColor="rgba(16, 185, 129, 0.3)"
            borderRadius="full"
            mb={{ base: "3", md: "3.5" }}
            boxShadow="0 2px 8px rgba(16, 185, 129, 0.1)"
          >
            <LiveDot color="#10B981" size={6} />
            <Text
              fontSize={{ base: "10.5px", sm: "11.5px" }}
              fontWeight="800"
              letterSpacing="0.08em"
              textTransform="uppercase"
              color="#34D399"
            >
              Invest in Tomorrow's Champions
            </Text>
            <SparklesIcon size={13} color="#34D399" />
          </HStack>

          {/* Main Hero Heading - Reduced to a balanced, refined size */}
          <Heading
            as="h1"
            fontSize={{ base: "23px", sm: "28px", md: "34px", lg: "40px" }}
            fontWeight="900"
            lineHeight={{ base: "1.2", md: "1.18" }}
            letterSpacing="-0.025em"
            color="#FFFFFF"
            mb={{ base: "3", md: "3.5" }}
          >
            Help Us Raise the Next Generation of{" "}
            <Text
              as="span"
              bgGradient="to-r"
              gradientFrom="#34D399"
              gradientTo="#6EE7B7"
              bgClip="text"
              color="#34D399"
            >
              Champions
            </Text>
          </Heading>

          {/* Supporting Text - Scaled cleanly to prevent visual clutter */}
          <Text
            fontSize={{ base: "13.5px", sm: "14.5px", md: "15.5px" }}
            lineHeight={{ base: "1.55", md: "1.6" }}
            color="rgba(226, 232, 240, 0.9)"
            maxW="680px"
            mb={{ base: "6", md: "7" }}
          >
            Your support helps I IMPACT INITIATIVE create opportunities for young people to develop practical skills, grow through mentorship and become leaders who make a difference in their communities.
          </Text>

          {/* Four Grounding Focus Cards - Streamlined padding & typography */}
          <SimpleGrid
            columns={{ base: 2, sm: 2, md: 4 }}
            gap={{ base: "2.5", sm: "3.5" }}
            w="100%"
            maxW="820px"
          >
            {HERO_PILLARS.map((pill, idx) => (
              <Box
                key={idx}
                p={{ base: "3", sm: "3.5" }}
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.1)"
                borderRadius="14px"
                textAlign="center"
                backdropFilter="blur(6px)"
                transition="all 0.25s ease"
                _hover={{
                  md: {
                    bg: "rgba(255, 255, 255, 0.09)",
                    borderColor: "rgba(255, 255, 255, 0.22)",
                    transform: prefersReducedMotion ? "none" : "translateY(-2px)",
                  },
                }}
              >
                <Flex justify="center" mb="1.5">
                  {pill.icon}
                </Flex>
                <Text
                  fontSize={{ base: "12px", sm: "13px" }}
                  fontWeight="700"
                  color="#FFFFFF"
                  lineHeight="1.25"
                  mb="0.5"
                >
                  {pill.title}
                </Text>
                <Text
                  fontSize={{ base: "10.5px", sm: "11px" }}
                  color="#94A3B8"
                  lineHeight="1.3"
                >
                  {pill.subtitle}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </Container>
    </Box>
  )
}
