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
  VStack,
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import {
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  UsersIcon,
  HeartHandshakeIcon,
} from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"

interface AreaCard {
  id: string
  step: string
  title: string
  description: string
  image: string
  alt: string
  category: string
  accentColor: string
  badgeBg: string
  badgeColor: string
  chips: string[]
  linkUrl: string
  linkText: string
  icon: React.ReactNode
}

const AREAS_DATA: AreaCard[] = [
  {
    id: "skills",
    step: "01",
    title: "Skills Development & Innovation",
    description: "Building practical skills, digital knowledge and innovative thinking.",
    image: "/images/areas/skills-development.jpg",
    alt: "Young students actively learning in modern digital skills and innovation workshop",
    category: "PRACTICAL CAPABILITY & STEM",
    accentColor: "#059669",
    badgeBg: "#D1FAE5",
    badgeColor: "#059669",
    chips: ["Technical Bootcamps", "Problem Solving", "Innovation Labs"],
    linkUrl: "/programs/skills",
    linkText: "Explore Skills Labs",
    icon: <GraduationCapIcon size={16} color="#059669" />,
  },
  {
    id: "mentorship",
    step: "02",
    title: "Mentorship & Personal Development",
    description: "Building confidence through guidance and support.",
    image: "/images/areas/mentorship-development.jpg",
    alt: "One-on-one mentorship session empowering youth with career guidance and support",
    category: "1-ON-1 GUIDANCE & VALUES",
    accentColor: "#2563EB",
    badgeBg: "#DBEAFE",
    badgeColor: "#1D4ED8",
    chips: ["Dedicated Coaches", "Career Pathways", "Life Counseling"],
    linkUrl: "/programs/mentorship",
    linkText: "Meet Our Mentors",
    icon: <UsersIcon size={16} color="#2563EB" />,
  },
  {
    id: "leadership",
    step: "03",
    title: "Leadership & Community Impact",
    description: "Inspiring young people to create positive change.",
    image: "/images/areas/leadership-community-iimpact.jpg",
    alt: "Youth champions leading community transformation and grassroots outreach",
    category: "CIVIC ACTION & RELIEF",
    accentColor: "#D97706",
    badgeBg: "#FEF3C7",
    badgeColor: "#B45309",
    chips: ["Grassroots Relief", "Youth Ambassadors", "Community Action"],
    linkUrl: "/programs/as-a-teen",
    linkText: "Join Flagship Congress",
    icon: <HeartHandshakeIcon size={16} color="#D97706" />,
  },
]

export function AreasOfImpact() {
  const [inView, setInView] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleChange)

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      )

      if (sectionRef.current) {
        observer.observe(sectionRef.current)
      }

      return () => {
        mediaQuery.removeEventListener("change", handleChange)
        observer.disconnect()
      }
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
      id="areas-of-impact"
      as="section"
      position="relative"
      py={{ base: "14", sm: "16", md: "20", lg: "24" }}
      bg="#FFFFFF"
      borderBottom="1px solid"
      borderColor="rgba(15, 23, 42, 0.06)"
      overflow="hidden"
    >
      {/* Subtle Background Lighting */}
      <Box
        position="absolute"
        top="10%"
        left="-6%"
        w={{ base: "260px", md: "480px" }}
        h={{ base: "260px", md: "480px" }}
        bg="radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="5%"
        right="-6%"
        w={{ base: "260px", md: "480px" }}
        h={{ base: "260px", md: "480px" }}
        bg="radial-gradient(circle, rgba(37, 99, 235, 0.04) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container
        maxW="1360px"
        px={{ base: "4", sm: "6", md: "8", lg: "10" }}
        position="relative"
        zIndex={1}
      >
        {/* ================= SECTION HEADER ================= */}
        <Box maxW="780px" mb={{ base: "10", md: "14" }}>
          {/* Eyebrow Label */}
          <Box mb="2.5" style={getTransitionStyle(0)}>
            <HStack
              display="inline-flex"
              gap="2"
              px="3.5"
              py="1.5"
              bg="#ECFDF5"
              borderRadius="full"
              border="1px solid"
              borderColor="#A7F3D0"
            >
              <Box color="#059669" display="flex" alignItems="center">
                <SparklesIcon size={13} />
              </Box>
              <Text
                fontSize="11px"
                fontWeight="800"
                color="#047857"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                OUR AREAS OF IMPACT
              </Text>
            </HStack>
          </Box>

          {/* Main Heading */}
          <Heading
            as="h2"
            fontSize={{ base: "28px", sm: "34px", md: "40px", lg: "44px" }}
            fontWeight="800"
            color="#0F172A"
            lineHeight="1.18"
            letterSpacing="-0.02em"
            mb="3"
            style={getTransitionStyle(100)}
          >
            Creating Impact Where It Matters Most
          </Heading>

          {/* Introductory Paragraph */}
          <Text
            fontSize={{ base: "15px", sm: "16px", md: "17px" }}
            color="#64748B"
            lineHeight="1.6"
            maxW="680px"
            style={getTransitionStyle(200)}
          >
            We empower young people through skills, mentorship and leadership opportunities that
            help them shape a better future.
          </Text>
        </Box>

        {/* ================= 3-CARD IMPACT GRID ================= */}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: "6", md: "7", lg: "8" }}
        >
          {AREAS_DATA.map((card, idx) => {
            const isHovered = hoveredCard === card.id
            return (
              <Box
                key={card.id}
                position="relative"
                bg="#FFFFFF"
                borderRadius="24px"
                border="1px solid"
                borderColor={isHovered ? card.accentColor : "rgba(226, 232, 240, 0.95)"}
                boxShadow={
                  isHovered
                    ? "0 22px 48px -12px rgba(15, 23, 42, 0.14), 0 0 1px rgba(15, 23, 42, 0.08)"
                    : "0 12px 30px -10px rgba(15, 23, 42, 0.07), 0 0 1px rgba(15, 23, 42, 0.04)"
                }
                overflow="hidden"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                transform={isHovered ? "translateY(-4px)" : "translateY(0)"}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={getTransitionStyle(250 + idx * 100)}
              >
                {/* Top Accent Stripe */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  h="4px"
                  bg={card.accentColor}
                  borderTopRadius="24px"
                  zIndex={3}
                />

                {/* Upper Half: Authentic Photo Image */}
                <Box>
                  <Box
                    position="relative"
                    w="100%"
                    h={{ base: "210px", sm: "230px", md: "215px", lg: "235px" }}
                    bg="#0B132B"
                    overflow="hidden"
                  >
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center 25%",
                        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                      }}
                    />

                    {/* Dark Vignette Overlay for Depth */}
                    <Box
                      position="absolute"
                      inset="0"
                      bg="linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0.88) 100%)"
                      pointerEvents="none"
                    />

                    {/* Top Floating Index Pill */}
                    <Box
                      position="absolute"
                      top="3.5"
                      left="3.5"
                      zIndex={2}
                      bg="rgba(15, 23, 42, 0.75)"
                      backdropFilter="blur(8px)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.2)"
                      borderRadius="full"
                      px="3"
                      py="1"
                    >
                      <HStack gap="1.5">
                        <Box w="5px" h="5px" borderRadius="full" bg={card.accentColor} />
                        <Text
                          fontSize="11.5px"
                          fontWeight="800"
                          color="#FFFFFF"
                          letterSpacing="0.06em"
                        >
                          AREA {card.step}
                        </Text>
                      </HStack>
                    </Box>

                    {/* Bottom Category Label Over Image */}
                    <Box
                      position="absolute"
                      bottom="3.5"
                      left="4"
                      right="4"
                      zIndex={2}
                    >
                      <Text
                        fontSize="10.5px"
                        fontWeight="800"
                        color="#A7F3D0"
                        letterSpacing="0.08em"
                        textTransform="uppercase"
                        textShadow="0 1px 3px rgba(0,0,0,0.6)"
                      >
                        {card.category}
                      </Text>
                    </Box>
                  </Box>

                  {/* Card Content Area */}
                  <Box p={{ base: "5", sm: "6" }}>
                    {/* Header with Title & Icon */}
                    <HStack align="flex-start" justify="space-between" gap="3" mb="2.5">
                      <Heading
                        as="h3"
                        fontSize={{ base: "18px", sm: "19px", md: "20px" }}
                        fontWeight="800"
                        color="#0F172A"
                        lineHeight="1.3"
                        letterSpacing="-0.01em"
                      >
                        {card.step} · {card.title.replace(/^0[1-3] · /, "")}
                      </Heading>
                      <Box
                        w="32px"
                        h="32px"
                        borderRadius="10px"
                        bg={card.badgeBg}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        transition="transform 0.25s ease"
                        transform={isHovered ? "scale(1.08)" : "scale(1)"}
                      >
                        {card.icon}
                      </Box>
                    </HStack>

                    {/* Short Description */}
                    <Text
                      fontSize="13.5px"
                      color="#64748B"
                      lineHeight="1.6"
                      mb="4.5"
                    >
                      {card.description}
                    </Text>

                    {/* Feature Chips */}
                    <Flex wrap="wrap" gap="1.5">
                      {card.chips.map((chip) => (
                        <Box
                          key={chip}
                          bg="#F8FAFC"
                          border="1px solid"
                          borderColor="#E2E8F0"
                          borderRadius="8px"
                          px="2.5"
                          py="1"
                          fontSize="11px"
                          fontWeight="600"
                          color="#475569"
                        >
                          {chip}
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                </Box>

                {/* Card Bottom CTA Link */}
                <Box
                  px={{ base: "5", sm: "6" }}
                  pb={{ base: "5", sm: "6" }}
                  pt="2"
                >
                  <Box pt="3" borderTop="1px solid" borderColor="#F1F5F9">
                    <Link href={card.linkUrl}>
                      <HStack
                        as="span"
                        gap="2"
                        color={card.accentColor}
                        fontWeight="700"
                        fontSize="13px"
                        cursor="pointer"
                        transition="gap 0.2s ease"
                        _hover={{ gap: "3" }}
                      >
                        <Text>{card.linkText}</Text>
                        <ArrowRightIcon size={14} color={card.accentColor} />
                      </HStack>
                    </Link>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
