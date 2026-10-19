"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react"
import Link from "next/link"
import {
  UsersIcon,
  HeartHandshakeIcon,
  TrophyIcon,
  CalendarIcon,
  ArrowRightIcon,
  SparklesIcon,
  MapPinIcon,
} from "@/components/icons"

interface GetInvolvedEventsSectionProps {
  onOpenWatchPartyModal?: () => void
  onOpenRegisterModal?: () => void
}

export function GetInvolvedEventsSection({
  onOpenWatchPartyModal,
  onOpenRegisterModal,
}: GetInvolvedEventsSectionProps) {
  const pathways = [
    {
      title: "Host a Regional Watch Party",
      subtitle: "Schools, Tech Hubs & Community Centers",
      description:
        "Stream AS A TEEN 2026 live in your city or school hall with full event packets, printed banners, delegate badges, and two-way broadcast interactions.",
      icon: <MapPinIcon size={22} color="#059669" />,
      accentColor: "#059669",
      btnText: "Apply as Hub Host",
      onClick: onOpenWatchPartyModal,
      isPrimary: true,
    },
    {
      title: "Register a School Delegation",
      subtitle: "Principals, Teachers & Counselors",
      description:
        "Bring a cohort of 10 to 100+ students with reserved front-row seating, chaperone passes, and official certificates of participation.",
      icon: <UsersIcon size={22} color="#051B64" />,
      accentColor: "#051B64",
      btnText: "Register Delegation",
      onClick: onOpenRegisterModal,
    },
    {
      title: "Volunteer as an Event Champion",
      subtitle: "Media, Logistics & Delegate Care",
      description:
        "Work alongside continental organizers in video production, ushering, tech streaming, and youth breakout mentoring circles.",
      icon: <HeartHandshakeIcon size={22} color="#149191" />,
      accentColor: "#149191",
      btnText: "Apply as Volunteer",
      href: "/get-involved/volunteer",
    },
    {
      title: "Corporate Partner & Sponsor",
      subtitle: "Brands, Foundations & Tech Companies",
      description:
        "Showcase your organization to over 120,000 ambitious youth across Africa, sponsor tech prizes, and mentor the next generation of engineers.",
      icon: <TrophyIcon size={22} color="#F59E0B" />,
      accentColor: "#F59E0B",
      btnText: "Become a Partner",
      href: "/get-involved/partner",
    },
  ]

  return (
    <Box
      as="section"
      id="get-involved"
      py={{ base: "16", sm: "20", md: "24" }}
      bg="#F8FAFC"
      position="relative"
    >
      <Container maxW="1360px" px={{ base: "4", sm: "6", lg: "8" }}>
        {/* Section Header */}
        <VStack
          align="center"
          textAlign="center"
          maxW="760px"
          mx="auto"
          mb={{ base: "10", md: "14" }}
          gap="3.5"
        >
          <HStack
            gap="2"
            px="3"
            py="1"
            borderRadius="full"
            bg="rgba(5, 150, 105, 0.08)"
            border="1px solid"
            borderColor="rgba(5, 150, 105, 0.25)"
          >
            <SparklesIcon size={14} color="#059669" />
            <Text
              fontSize="11px"
              fontWeight="700"
              color="#059669"
              letterSpacing="0.05em"
              textTransform="uppercase"
            >
              04 • COLLABORATE & MOBILIZE
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "28px", sm: "36px", md: "42px" }}
            fontWeight="800"
            color="#051B64"
            lineHeight="1.18"
            letterSpacing="-0.02em"
          >
            Take Your Place on the Continental Stage
          </Heading>

          <Text fontSize={{ base: "15px", md: "16px" }} color="#64748B" lineHeight="1.65">
            Every summit is driven by an unstoppable coalition of schools, community mentors,
            volunteers, and partners. Choose how you want to be involved.
          </Text>
        </VStack>

        {/* 4 Cards Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6" mb={{ base: "12", md: "16" }}>
          {pathways.map((card, idx) => (
            <Box
              key={idx}
              p={{ base: "5", sm: "6" }}
              borderRadius="2xl"
              bg="#FFFFFF"
              border="1px solid"
              borderColor="rgba(5, 27, 100, 0.08)"
              boxShadow="0 4px 16px -2px rgba(5, 27, 100, 0.04)"
              display="flex"
              flexDirection="column"
              transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 16px 32px -4px rgba(5, 27, 100, 0.1)",
                borderColor: card.accentColor,
              }}
            >
              {/* Icon Box */}
              <Box
                w="48px"
                h="48px"
                borderRadius="xl"
                bg={`${card.accentColor}12`}
                border={`1px solid ${card.accentColor}30`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb="4"
              >
                {card.icon}
              </Box>

              {/* Title & Subtitle */}
              <Heading as="h3" fontSize="17px" fontWeight="800" color="#051B64" mb="1" lineHeight="1.3">
                {card.title}
              </Heading>
              <Text fontSize="11.5px" fontWeight="700" color={card.accentColor} mb="3" letterSpacing="0.02em">
                {card.subtitle}
              </Text>

              {/* Description */}
              <Text fontSize="13px" color="#64748B" lineHeight="1.6" mb="5" flex="1">
                {card.description}
              </Text>

              {/* Action Button */}
              {card.href ? (
                <Link href={card.href} style={{ width: "100%" }}>
                  <Button
                    w="100%"
                    h="42px"
                    borderRadius="xl"
                    fontSize="13px"
                    fontWeight="700"
                    bg={card.isPrimary ? "#059669" : "transparent"}
                    color={card.isPrimary ? "#FFFFFF" : "#051B64"}
                    border="1px solid"
                    borderColor={card.isPrimary ? "#059669" : "#E2E8F0"}
                    _hover={{
                      bg: card.isPrimary ? "#047857" : "#F8FAFC",
                      borderColor: card.accentColor,
                    }}
                  >
                    {card.btnText}
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={card.onClick}
                  w="100%"
                  h="42px"
                  borderRadius="xl"
                  fontSize="13px"
                  fontWeight="700"
                  bg={card.isPrimary ? "#059669" : "transparent"}
                  color={card.isPrimary ? "#FFFFFF" : "#051B64"}
                  border="1px solid"
                  borderColor={card.isPrimary ? "#059669" : "#E2E8F0"}
                  _hover={{
                    bg: card.isPrimary ? "#047857" : "#F8FAFC",
                    borderColor: card.accentColor,
                  }}
                >
                  {card.btnText}
                </Button>
              )}
            </Box>
          ))}
        </SimpleGrid>

        {/* High-Impact CTA Banner */}
        <Box
          p={{ base: "8", md: "12" }}
          borderRadius="3xl"
          bg="linear-gradient(135deg, #060B19 0%, #0A1E4A 60%, #060B19 100%)"
          color="#FFFFFF"
          position="relative"
          overflow="hidden"
          boxShadow="0 25px 60px -15px rgba(5, 27, 100, 0.4)"
          border="1px solid rgba(255, 255, 255, 0.12)"
        >
          <Box
            position="absolute"
            top="-50%"
            right="-20%"
            w="500px"
            h="500px"
            borderRadius="full"
            bg="radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)"
            filter="blur(40px)"
            pointerEvents="none"
          />

          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "flex-start", lg: "center" }}
            justify="space-between"
            gap="6"
            position="relative"
            zIndex={2}
          >
            <VStack align="flex-start" gap="2.5" maxW="700px">
              <HStack gap="2">
                <Box w="8px" h="8px" borderRadius="full" bg="#10B981" />
                <Text fontSize="11px" fontWeight="800" color="#34D399" letterSpacing="0.08em" textTransform="uppercase">
                  CONFERENCE REGISTRATION OPEN
                </Text>
              </HStack>
              <Heading
                as="h3"
                fontSize={{ base: "24px", sm: "30px", md: "34px" }}
                fontWeight="800"
                lineHeight="1.2"
                color="#FFFFFF"
              >
                Ready to Experience AS A TEEN Conference 2026?
              </Heading>
              <Text fontSize="14.5px" color="#94A3B8" lineHeight="1.6">
                Secure your seat in-person at Landmark Centre Lagos or join via international hybrid
                live broadcast. Attendance is free for all students and young pioneers.
              </Text>
            </VStack>

            <Flex direction={{ base: "column", sm: "row" }} gap="3" w={{ base: "100%", sm: "auto" }}>
              <Button
                onClick={onOpenRegisterModal}
                h="50px"
                px="7"
                bg="#059669"
                color="#FFFFFF"
                borderRadius="xl"
                fontWeight="700"
                fontSize="14.5px"
                _hover={{ bg: "#047857", transform: "translateY(-2px)" }}
                boxShadow="0 10px 25px -5px rgba(5, 150, 105, 0.5)"
              >
                Register Free as Delegate
              </Button>
              <Button
                onClick={onOpenWatchPartyModal}
                h="50px"
                px="6"
                bg="rgba(255, 255, 255, 0.08)"
                color="#FFFFFF"
                border="1px solid rgba(255, 255, 255, 0.2)"
                borderRadius="xl"
                fontWeight="600"
                fontSize="14.5px"
                _hover={{ bg: "rgba(255, 255, 255, 0.15)" }}
              >
                Host Regional Hub
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
