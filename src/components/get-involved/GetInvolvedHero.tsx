"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react"
import {
  SparklesIcon,
  UsersIcon,
  HeartHandshakeIcon,
  GraduationCapIcon,
  TrophyIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@/components/icons"

interface GetInvolvedHeroProps {
  onSelectTrack?: (trackId: string) => void
}

interface StatPillar {
  id: string
  icon: React.ReactNode
  number: string
  label: string
  desc: string
}

const STAT_PILLARS: StatPillar[] = [
  {
    id: "reach",
    icon: <GraduationCapIcon size={18} color="#34D399" />,
    number: "10,000+",
    label: "Young People Reached",
    desc: "Cumulative impact across programmes",
  },
  {
    id: "mentorship",
    icon: <HeartHandshakeIcon size={18} color="#38BDF8" />,
    number: "Youth Mentorship",
    label: "Personal Guidance",
    desc: "Supporting character & confidence",
  },
  {
    id: "skills",
    icon: <TrophyIcon size={18} color="#FBBF24" />,
    number: "Skills Development",
    label: "Practical Knowledge",
    desc: "Equipping tomorrow's changemakers",
  },
  {
    id: "allies",
    icon: <UsersIcon size={18} color="#A78BFA" />,
    number: "Open Pathways",
    label: "Opportunities for All",
    desc: "Volunteer, partner, or support",
  },
]

export function GetInvolvedHero({ onSelectTrack }: GetInvolvedHeroProps) {
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

  const handleScrollToSection = (id: string) => {
    if (typeof window === "undefined") return
    const targetId = id === "pathways" ? "involvement-tracks" : id
    const el = document.getElementById(targetId) || document.getElementById(id)
    if (el) {
      const headerOffset = 70
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      })
    }
  }

  return (
    <Box
      as="section"
      position="relative"
      bg="linear-gradient(180deg, #051B64 0%, #071647 60%, #0B1A4D 100%)"
      color="#FFFFFF"
      pt={{ base: "100px", sm: "108px", md: "114px", lg: "116px" }}
      pb={{ base: "12", sm: "14", md: "16" }}
      overflow="hidden"
    >
      {/* Ambient background glows */}
      <Box
        position="absolute"
        top="-10%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "320px", md: "620px" }}
        h={{ base: "240px", md: "380px" }}
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.18) 0%, rgba(5, 27, 100, 0) 70%)"
        filter="blur(50px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-15%"
        right="-5%"
        w={{ base: "260px", md: "460px" }}
        h={{ base: "260px", md: "460px" }}
        bg="radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(5, 27, 100, 0) 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1280px" }}
        px={{ base: "4", sm: "6", md: "8" }}
        position="relative"
        zIndex={1}
      >
        <SimpleGrid
          columns={{ base: 1, lg: 12 }}
          gap={{ base: "8", lg: "10" }}
          alignItems="center"
        >
          {/* Left Column: Content, Badges & CTAs (7 cols) */}
          <Box gridColumn={{ lg: "span 7" }}>
            {/* Eyebrow Badge */}
            <HStack
              gap="2"
              px="3.5"
              py="1"
              bg="rgba(20, 145, 145, 0.16)"
              border="1px solid"
              borderColor="rgba(20, 145, 145, 0.35)"
              borderRadius="full"
              mb="3.5"
              w="fit-content"
              boxShadow="0 2px 8px rgba(20, 145, 145, 0.12)"
            >
              <SparklesIcon size={12} color="#34D399" />
              <Text
                fontSize={{ base: "11px", sm: "11.5px" }}
                fontWeight="800"
                letterSpacing="0.08em"
                textTransform="uppercase"
                color="#34D399"
              >
                Be Part of the Movement
              </Text>
            </HStack>

            {/* Heading */}
            <Heading
              as="h1"
              fontSize={{ base: "28px", sm: "36px", md: "42px", lg: "48px" }}
              fontWeight="900"
              lineHeight={{ base: "1.18", md: "1.14" }}
              letterSpacing="-0.025em"
              color="#FFFFFF"
              mb="3.5"
            >
              Be Part of Something That Raises{" "}
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

            {/* Supporting Text */}
            <Text
              fontSize={{ base: "14px", sm: "15px", md: "16px" }}
              lineHeight={{ base: "1.6", md: "1.65" }}
              color="rgba(226, 232, 240, 0.9)"
              maxW="640px"
              mb={{ base: "6", md: "7" }}
            >
              Your time, skills, experience and support can help create opportunities
              for young people to learn, grow and become leaders in their communities.
              Whether you want to volunteer, mentor, partner or support a programme,
              there&apos;s a place for you at I IMPACT INITIATIVE.
            </Text>

            {/* Action Buttons */}
            <Flex
              gap="3"
              wrap="wrap"
              align="center"
              mb={{ base: "8", md: "9" }}
            >
              <Button
                onClick={() => handleScrollToSection("involvement-tracks")}
                bg="#149191"
                color="#FFFFFF"
                size="lg"
                h={{ base: "44px", md: "48px" }}
                px="6"
                fontSize="14px"
                fontWeight="800"
                borderRadius="12px"
                boxShadow="0 4px 16px rgba(20, 145, 145, 0.4)"
                _hover={{
                  bg: "#0F766E",
                  transform: prefersReducedMotion ? "none" : "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(20, 145, 145, 0.5)",
                }}
                _focusVisible={{
                  outline: "2px solid #34D399",
                  outlineOffset: "2px",
                }}
                _active={{ transform: "translateY(0)" }}
                transition={prefersReducedMotion ? "none" : "all 0.2s ease"}
              >
                <HStack gap="2">
                  <Text>Explore Ways to Get Involved</Text>
                  <ArrowRightIcon size={15} />
                </HStack>
              </Button>

              <Button
                onClick={() => handleScrollToSection("application-form")}
                bg="rgba(255, 255, 255, 0.08)"
                color="#FFFFFF"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.2)"
                size="lg"
                h={{ base: "44px", md: "48px" }}
                px="6"
                fontSize="14px"
                fontWeight="700"
                borderRadius="12px"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.15)",
                  borderColor: "rgba(255, 255, 255, 0.35)",
                  transform: prefersReducedMotion ? "none" : "translateY(-1px)",
                }}
                _focusVisible={{
                  outline: "2px solid #FFFFFF",
                  outlineOffset: "2px",
                }}
                _active={{ transform: "translateY(0)" }}
                transition={prefersReducedMotion ? "none" : "all 0.2s ease"}
              >
                Start Your Application
              </Button>
            </Flex>

            {/* 4 Stat Cards */}
            <SimpleGrid columns={{ base: 2, sm: 4 }} gap={{ base: "2", md: "2.5" }}>
              {STAT_PILLARS.map((card) => (
                <Box
                  key={card.id}
                  bg="rgba(255, 255, 255, 0.04)"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(8px)"
                  borderRadius="10px"
                  p={{ base: "2", sm: "2", md: "2.5" }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  h="100%"
                  textAlign="left"
                  transition={prefersReducedMotion ? "none" : "all 0.2s ease"}
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(20, 145, 145, 0.4)",
                    transform: prefersReducedMotion ? "none" : "translateY(-2px)",
                  }}
                >
                  <Box mb="1">{card.icon}</Box>
                  <Text
                    fontSize={{ base: "13px", sm: "12.5px", md: "13.5px" }}
                    fontWeight="800"
                    color="#FFFFFF"
                    lineHeight="1.2"
                    mb="1"
                  >
                    {card.number}
                  </Text>
                  <Text
                    fontSize={{ base: "10.5px", sm: "10px", md: "11px" }}
                    fontWeight="700"
                    color="#34D399"
                    lineHeight="1.2"
                    mb="0.5"
                  >
                    {card.label}
                  </Text>
                  <Text
                    fontSize={{ base: "9.5px", sm: "9px", md: "10px" }}
                    color="rgba(226, 232, 240, 0.65)"
                    lineHeight="1.3"
                  >
                    {card.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Right Column: Visual Montage & Floating Card (5 cols) */}
          <Box gridColumn={{ lg: "span 5" }} position="relative">
            <Box
              position="relative"
              borderRadius="20px"
              overflow="hidden"
              boxShadow="0 20px 40px -15px rgba(0, 0, 0, 0.5)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.15)"
              bg="#071647"
            >
              {/* Main Image */}
              <Box
                position="relative"
                w="100%"
                h={{ base: "280px", sm: "360px", lg: "420px" }}
                overflow="hidden"
                display="block"
              >
                <Image
                  src="/images/get-involved-hero.jpg"
                  alt="Young leaders and mentors collaborating in an innovation learning session with I-IMPACT"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                  }}
                  priority
                />
              </Box>

              {/* Bottom Gradient Overlay */}
              <Box
                position="absolute"
                bottom="0"
                insetX="0"
                p={{ base: "4", md: "5" }}
                bg="linear-gradient(to top, rgba(5, 27, 100, 0.95) 0%, rgba(5, 27, 100, 0.7) 60%, transparent 100%)"
                color="#FFFFFF"
              >
                <HStack gap="2" mb="1">
                  <Box
                    px="2"
                    py="0.5"
                    borderRadius="full"
                    bg="#10B981"
                    color="#FFFFFF"
                    fontSize="10px"
                    fontWeight="800"
                    letterSpacing="0.05em"
                  >
                    LEARNING SESSIONS
                  </Box>
                  <Text fontSize="11px" color="rgba(226, 232, 240, 0.85)">
                    Interactive Youth Workshops
                  </Text>
                </HStack>
                <Heading as="h4" fontSize="15px" fontWeight="800" lineHeight="1.3" mb="0.5">
                  Mentors Guiding Future Leaders
                </Heading>
                <Text fontSize="11.5px" color="rgba(226, 232, 240, 0.8)" lineHeight="1.4">
                  Practical guidance and personal encouragement in every programme.
                </Text>
              </Box>
            </Box>

            {/* Overlapping Floating Card on Desktop */}
            <Box
              display={{ base: "none", sm: "flex" }}
              position="absolute"
              bottom="-18px"
              left="-18px"
              bg="#FFFFFF"
              color="#051B64"
              p="3.5"
              borderRadius="16px"
              boxShadow="0 15px 30px -10px rgba(5, 27, 100, 0.25)"
              border="1px solid"
              borderColor="#E2E8F0"
              alignItems="center"
              gap="3"
              maxW="280px"
              zIndex={2}
            >
              <Box
                w="40px"
                h="40px"
                borderRadius="full"
                bg="#ECFDF5"
                color="#059669"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <CheckCircleIcon size={20} />
              </Box>
              <Box>
                <Text fontSize="12.5px" fontWeight="800" color="#051B64" lineHeight="1.2">
                  Raising Champions
                </Text>
                <Text fontSize="11px" color="#64748B" lineHeight="1.3">
                  Dedicated to character, skills, and community impact.
                </Text>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
