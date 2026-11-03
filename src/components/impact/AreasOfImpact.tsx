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
import Image from "next/image"
import Link from "next/link"
import {
  SparklesIcon,
  ArrowRightIcon,
  GraduationCapIcon,
  UsersIcon,
  HeartHandshakeIcon,
} from "@/components/icons"

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
  categoryBg: string
  categoryColor: string
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
    description: "Building practical skills, digital knowledge and innovative thinking for modern opportunities.",
    image: "/images/areas/skills-development.jpg",
    alt: "Young students actively learning in modern digital skills and innovation workshop",
    category: "Practical Capability & STEM",
    accentColor: "#059669",
    badgeBg: "#D1FAE5",
    badgeColor: "#047857",
    categoryBg: "rgba(6, 78, 59, 0.85)",
    categoryColor: "#6EE7B7",
    chips: ["Technical Bootcamps", "Problem Solving", "Innovation Labs"],
    linkUrl: "/events",
    linkText: "Explore Skills Labs",
    icon: <GraduationCapIcon size={17} color="#059669" />,
  },
  {
    id: "mentorship",
    step: "02",
    title: "Mentorship & Personal Development",
    description: "Building confidence and life direction through dedicated 1-on-1 coaching and guidance.",
    image: "/images/areas/mentorship-development.jpg",
    alt: "One-on-one mentorship session empowering youth with career guidance and support",
    category: "1-on-1 Guidance & Values",
    accentColor: "#2563EB",
    badgeBg: "#DBEAFE",
    badgeColor: "#1D4ED8",
    categoryBg: "rgba(30, 58, 138, 0.85)",
    categoryColor: "#93C5FD",
    chips: ["Dedicated Coaches", "Career Pathways", "Life Counseling"],
    linkUrl: "/contact",
    linkText: "Meet Our Mentors",
    icon: <UsersIcon size={17} color="#2563EB" />,
  },
  {
    id: "leadership",
    step: "03",
    title: "Leadership & Community Impact",
    description: "Inspiring young people to take civic action, lead outreach, and create positive change.",
    image: "/images/areas/leadership-community-iimpact.jpg",
    alt: "Youth champions leading community transformation and grassroots outreach",
    category: "Civic Action & Relief",
    accentColor: "#D97706",
    badgeBg: "#FEF3C7",
    badgeColor: "#B45309",
    categoryBg: "rgba(120, 53, 15, 0.85)",
    categoryColor: "#FDE68A",
    chips: ["Grassroots Relief", "Youth Ambassadors", "Community Action"],
    linkUrl: "/events",
    linkText: "Join Flagship Congress",
    icon: <HeartHandshakeIcon size={17} color="#D97706" />,
  },
]

export function AreasOfImpact() {
  const [inView, setInView] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isHoverCapable, setIsHoverCapable] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      setInView(true)
      return
    }

    // 1. Accessibility: Detect user's reduced motion preferences
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    // 2. Hardware: Detect if device supports genuine hover (desktop vs touch/mobile)
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    setIsHoverCapable(hoverQuery.matches)
    const handleHoverChange = () => setIsHoverCapable(hoverQuery.matches)
    hoverQuery.addEventListener("change", handleHoverChange)

    // 3. Safe Fallback: Check if IntersectionObserver is available in the browser/environment
    if (!("IntersectionObserver" in window)) {
      setInView(true)
      return () => {
        mediaQuery.removeEventListener("change", handleChange)
        hoverQuery.removeEventListener("change", handleHoverChange)
      }
    }

    // 4. Fallback Timer: Ensure content is never left hidden if the observer does not fire
    const fallbackTimer = setTimeout(() => {
      setInView(true)
    }, 400)

    // 5. Initialize IntersectionObserver with graceful disconnect
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
      hoverQuery.removeEventListener("change", handleHoverChange)
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
      id="areas-of-impact"
      as="section"
      position="relative"
      py={{ base: "12", sm: "16", md: "20", lg: "24" }}
      bg="#FFFFFF"
      borderBottom="1px solid"
      borderColor="rgba(15, 23, 42, 0.06)"
      overflow="hidden"
      w="100%"
      maxW="100%"
      aria-label="Our Areas of Impact"
    >
      {/* Fallback CSS: Guarantees content is 100% visible if JavaScript is disabled or fails */}
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #areas-of-impact [data-animate="true"] {
                opacity: 1 !important;
                transform: none !important;
              }
            `,
          }}
        />
      </noscript>

      {/* Subtle Background Lighting - constrained to prevent mobile overflow */}
      <Box
        position="absolute"
        top="8%"
        left="-4%"
        w={{ base: "220px", sm: "300px", md: "460px" }}
        h={{ base: "220px", sm: "300px", md: "460px" }}
        bg="radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)"
        filter="blur(50px)"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="6%"
        right="-4%"
        w={{ base: "220px", sm: "300px", md: "460px" }}
        h={{ base: "220px", sm: "300px", md: "460px" }}
        bg="radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)"
        filter="blur(50px)"
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
        <Box maxW="780px" mb={{ base: "8", sm: "10", md: "14" }}>
          {/* Eyebrow Label */}
          <Box mb="3" data-animate="true" style={getTransitionStyle(0)}>
            <HStack
              display="inline-flex"
              gap="2"
              px="3.5"
              py="1.5"
              bg="#ECFDF5"
              borderRadius="full"
              border="1px solid"
              borderColor="#A7F3D0"
              boxShadow="0 1px 3px rgba(5, 150, 105, 0.08)"
            >
              <Box color="#059669" display="flex" alignItems="center">
                <SparklesIcon size={13} />
              </Box>
              <Text
                fontSize={{ base: "10.5px", sm: "11px" }}
                fontWeight="800"
                color="#047857"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                OUR AREAS OF IMPACT
              </Text>
            </HStack>
          </Box>

          {/* Main Accessible Heading: Level 2 */}
          <Heading
            as="h2"
            fontSize={{ base: "25px", sm: "32px", md: "38px", lg: "44px" }}
            fontWeight="900"
            color="#0F172A"
            lineHeight={{ base: "1.22", md: "1.18" }}
            letterSpacing="-0.025em"
            mb={{ base: "2.5", sm: "3.5" }}
            data-animate="true"
            style={getTransitionStyle(80)}
            wordBreak="break-word"
          >
            Creating Impact Where It Matters Most
          </Heading>

          {/* Introductory Paragraph */}
          <Text
            fontSize={{ base: "14.5px", sm: "15.5px", md: "16.5px" }}
            color="#475569"
            lineHeight="1.65"
            maxW="680px"
            data-animate="true"
            style={getTransitionStyle(160)}
          >
            We empower young people through skills, mentorship and leadership opportunities that
            help them build resilience and shape a better future.
          </Text>
        </Box>

        {/* ================= 3-CARD IMPACT GRID ================= */}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: "5", sm: "6", lg: "8" }}
          w="100%"
        >
          {AREAS_DATA.map((card, idx) => {
            const isHovered = isHoverCapable && hoveredCard === card.id
            return (
              <Box
                key={card.id}
                position="relative"
                bg="#FFFFFF"
                borderRadius="24px"
                border="1px solid"
                borderColor={{
                  base: "rgba(226, 232, 240, 0.95)",
                  md: isHovered ? card.accentColor : "rgba(226, 232, 240, 0.95)",
                }}
                boxShadow={{
                  base: "0 6px 24px -6px rgba(15, 23, 42, 0.07), 0 1px 3px rgba(15, 23, 42, 0.04)",
                  md: isHovered
                    ? "0 20px 40px -12px rgba(15, 23, 42, 0.14), 0 0 1px rgba(15, 23, 42, 0.08)"
                    : "0 6px 24px -6px rgba(15, 23, 42, 0.07), 0 1px 3px rgba(15, 23, 42, 0.04)",
                }}
                overflow="hidden"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                transition={{
                  base: "none",
                  md: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                transform={{
                  base: "none",
                  md: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
                onMouseEnter={() => {
                  if (isHoverCapable) setHoveredCard(card.id)
                }}
                onMouseLeave={() => {
                  if (isHoverCapable) setHoveredCard(null)
                }}
                data-animate="true"
                style={getTransitionStyle(200 + idx * 90)}
                w="100%"
              >
                {/* Top Accent Stripe - ensures visual identity is complete at all times */}
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

                {/* Upper Half: Authentic Photo & Information Badges */}
                <Box>
                  <Box
                    position="relative"
                    w="100%"
                    h={{ base: "195px", sm: "220px", md: "210px", lg: "235px" }}
                    bg="#0B132B"
                    overflow="hidden"
                  >
                    {/* Next.js Image with optimized sizes, lazy loading, and modern format support */}
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      quality={85}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center 25%",
                        transition: isHoverCapable ? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                      }}
                    />

                    {/* Dark Vignette Overlay for Crisp Readability */}
                    <Box
                      position="absolute"
                      inset="0"
                      bg="linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(15, 23, 42, 0.9) 100%)"
                      pointerEvents="none"
                    />

                    {/* Top Floating Area Pill - Always clearly visible */}
                    <Box
                      position="absolute"
                      top="3"
                      left="3.5"
                      zIndex={2}
                      bg="rgba(15, 23, 42, 0.82)"
                      backdropFilter="blur(8px)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.22)"
                      borderRadius="full"
                      px="3"
                      py="1"
                      boxShadow="0 2px 8px rgba(0, 0, 0, 0.3)"
                    >
                      <HStack gap="1.5">
                        <Box
                          w="6px"
                          h="6px"
                          borderRadius="full"
                          bg={card.accentColor}
                          boxShadow={`0 0 6px ${card.accentColor}`}
                        />
                        <Text
                          fontSize="11px"
                          fontWeight="800"
                          color="#FFFFFF"
                          letterSpacing="0.06em"
                        >
                          AREA {card.step}
                        </Text>
                      </HStack>
                    </Box>

                    {/* Bottom Category Frosted Pill Badge - Custom styled per area */}
                    <Box
                      position="absolute"
                      bottom="3"
                      left="3.5"
                      right="3.5"
                      zIndex={2}
                    >
                      <Box
                        display="inline-flex"
                        alignItems="center"
                        bg={card.categoryBg}
                        backdropFilter="blur(8px)"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.2)"
                        borderRadius="full"
                        px="3"
                        py="1"
                        boxShadow="0 2px 6px rgba(0, 0, 0, 0.25)"
                      >
                        <Text
                          fontSize="10px"
                          fontWeight="800"
                          color={card.categoryColor}
                          letterSpacing="0.08em"
                          textTransform="uppercase"
                        >
                          {card.category}
                        </Text>
                      </Box>
                    </Box>
                  </Box>

                  {/* Card Content Area - Spacing tuned for readability */}
                  <Box p={{ base: "4.5", sm: "5.5", md: "6" }}>
                    {/* Header with Semantic Level 3 Heading & Thematic Icon */}
                    <HStack align="flex-start" justify="space-between" gap="3" mb="2.5">
                      <Heading
                        as="h3"
                        fontSize={{ base: "17.5px", sm: "18.5px", md: "19px" }}
                        fontWeight="800"
                        color="#0F172A"
                        lineHeight="1.3"
                        letterSpacing="-0.015em"
                        flex="1"
                        minW="0"
                        wordBreak="break-word"
                      >
                        {card.step} · {card.title}
                      </Heading>
                      <Box
                        w="36px"
                        h="36px"
                        borderRadius="12px"
                        bg={card.badgeBg}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        transition={{ base: "none", md: "transform 0.25s ease" }}
                        transform={{ base: "none", md: isHovered ? "scale(1.08)" : "scale(1)" }}
                        boxShadow="0 1px 3px rgba(0, 0, 0, 0.05)"
                      >
                        {card.icon}
                      </Box>
                    </HStack>

                    {/* Description */}
                    <Text
                      fontSize={{ base: "13.5px", sm: "14px" }}
                      color="#475569"
                      lineHeight="1.58"
                      mb="4"
                    >
                      {card.description}
                    </Text>

                    {/* Feature Chips - Clearly defined with micro accent indicators */}
                    <Flex wrap="wrap" gap="1.5">
                      {card.chips.map((chip) => (
                        <HStack
                          key={chip}
                          bg="#F8FAFC"
                          border="1px solid"
                          borderColor="#E2E8F0"
                          borderRadius="8px"
                          px="2.5"
                          py="1.5"
                          gap="1.5"
                        >
                          <Box
                            w="4.5px"
                            h="4.5px"
                            borderRadius="full"
                            bg={card.accentColor}
                            flexShrink={0}
                          />
                          <Text
                            fontSize="11.5px"
                            fontWeight="600"
                            color="#334155"
                            lineHeight="1.2"
                          >
                            {chip}
                          </Text>
                        </HStack>
                      ))}
                    </Flex>
                  </Box>
                </Box>

                {/* Card Bottom CTA Link - Tactile button target */}
                <Box
                  px={{ base: "4.5", sm: "5.5", md: "6" }}
                  pb={{ base: "4.5", sm: "5.5", md: "6" }}
                  pt="2"
                >
                  <Box pt="3" borderTop="1px solid" borderColor="#F1F5F9">
                    <Link
                      href={card.linkUrl}
                      style={{ width: "100%", display: "block", textDecoration: "none" }}
                    >
                      <Flex
                        as="span"
                        align="center"
                        justify="space-between"
                        w="100%"
                        minH="46px"
                        px="4"
                        py="3"
                        borderRadius="12px"
                        bg={card.badgeBg}
                        color={card.badgeColor}
                        fontWeight="700"
                        fontSize="13.5px"
                        cursor="pointer"
                        transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        border="1px solid"
                        borderColor="transparent"
                        _hover={{
                          md: {
                            bg: card.accentColor,
                            color: "#FFFFFF",
                            borderColor: card.accentColor,
                            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                          },
                        }}
                        _active={{
                          transform: "scale(0.98)",
                        }}
                      >
                        <Text fontWeight="700">{card.linkText}</Text>
                        <ArrowRightIcon size={15} color="currentColor" />
                      </Flex>
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
