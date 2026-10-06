"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react"
import Link from "next/link"
import {
  HeartHandshakeIcon,
  UsersIcon,
  TrophyIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@/components/icons"

interface CTAPathway {
  title: string
  description: string
  ctaText: string
  href: string
  icon: React.ReactNode
  accentColor: string
  isPrimary?: boolean
}

const PATHWAYS: CTAPathway[] = [
  {
    title: "Become a Mentor",
    description: "Guide an ambitious teenager or young adult through one-on-one and cohort sessions.",
    ctaText: "Apply as Mentor",
    href: "/get-involved/mentor",
    icon: <HeartHandshakeIcon size={20} color="#149191" />,
    accentColor: "#149191",
  },
  {
    title: "Volunteer with Us",
    description: "Support our AS A TEEN conferences, skill bootcamps, and NEEDY NEEDS YOU community outreaches.",
    ctaText: "Join Volunteer Corps",
    href: "/get-involved/volunteer",
    icon: <UsersIcon size={20} color="#059669" />,
    accentColor: "#059669",
  },
  {
    title: "Partner with Us",
    description: "Align your school, corporate organization, or foundation with our youth development initiatives.",
    ctaText: "Explore Partnerships",
    href: "/get-involved/partner",
    icon: <TrophyIcon size={20} color="#051B64" />,
    accentColor: "#051B64",
  },
  {
    title: "Sponsor a Champion",
    description: "Provide educational resources, workshop kits, or event sponsorships for high-need youth.",
    ctaText: "Donate & Support",
    href: "/donate",
    icon: <SparklesIcon size={20} color="#D97706" />,
    accentColor: "#D97706",
    isPrimary: true,
  },
]

export function AboutCTA() {
  return (
    <Box
      as="section"
      position="relative"
      py={{ base: "14", sm: "16", md: "20" }}
      bg="linear-gradient(135deg, #051B64 0%, #03113D 100%)"
      color="white"
      overflow="hidden"
    >
      {/* Background ambient lighting */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        w="550px"
        h="550px"
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.25) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container maxW="1240px" px={{ base: "4", sm: "6", md: "8", lg: "10" }} position="relative" zIndex={1}>
        {/* Top Header */}
        <VStack align="center" textAlign="center" gap="3" mb={{ base: "10", md: "14" }}>
          <HStack
            bg="rgba(255, 255, 255, 0.12)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            px="3.5"
            py="1"
            borderRadius="full"
            gap="2"
          >
            <SparklesIcon size={14} color="#FACC15" />
            <Text
              fontSize="11px"
              fontWeight="800"
              color="#FDE047"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              JOIN THE MOVEMENT
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "26px", sm: "32px", md: "40px" }}
            fontWeight="900"
            color="white"
            lineHeight="1.15"
            letterSpacing="-0.02em"
          >
            Empower Tomorrow’s Leaders Today
          </Heading>

          <Text fontSize={{ base: "14px", md: "16px" }} color="whiteAlpha.800" maxW="640px" lineHeight="1.6">
            Whether you want to share your wisdom as a mentor, volunteer in your community, or sponsor a young champion’s education—there is a place for you in I-Impact.
          </Text>
        </VStack>

        {/* 4 Pathway Cards */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: "4", md: "5" }}>
          {PATHWAYS.map((p, idx) => (
            <Box
              key={idx}
              bg="rgba(255, 255, 255, 0.06)"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.12)"
              borderRadius="20px"
              p={{ base: "5", md: "6" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                transform: "translateY(-4px)",
              }}
            >
              <Box>
                <Box
                  w="42px"
                  h="42px"
                  borderRadius="12px"
                  bg="rgba(255, 255, 255, 0.95)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb="3.5"
                >
                  {p.icon}
                </Box>

                <Heading as="h3" fontSize="17px" fontWeight="800" mb="2" color="white">
                  {p.title}
                </Heading>

                <Text fontSize="12.5px" color="whiteAlpha.800" lineHeight="1.6" mb="5">
                  {p.description}
                </Text>
              </Box>

              <Link href={p.href} style={{ textDecoration: "none" }}>
                <Button
                  w="100%"
                  size="sm"
                  h="38px"
                  bg={p.isPrimary ? "#10B981" : "rgba(255, 255, 255, 0.15)"}
                  color="#FFFFFF"
                  borderRadius="10px"
                  fontWeight="700"
                  fontSize="12.5px"
                  border="1px solid"
                  borderColor={p.isPrimary ? "#10B981" : "rgba(255, 255, 255, 0.2)"}
                  transition="all 0.2s ease"
                  _hover={{
                    bg: p.isPrimary ? "#059669" : "rgba(255, 255, 255, 0.25)",
                    transform: "translateY(-1px)",
                  }}
                >
                  <HStack gap="1.5" justify="center" w="100%">
                    <Text>{p.ctaText}</Text>
                    <ArrowRightIcon size={12} />
                  </HStack>
                </Button>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
