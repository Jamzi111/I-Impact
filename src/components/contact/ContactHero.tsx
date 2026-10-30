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
  chakra,
} from "@chakra-ui/react"
import { LiveDot } from "@/components/LiveDot"
import {
  ClockIcon,
  ShieldCheckIcon,
  GraduationCapIcon,
  ShieldIcon,
  BanknoteIcon,
  MegaphoneIcon,
  ArrowRightIcon,
} from "@/components/icons"

interface ChannelCard {
  id: string
  eyebrow: string
  title: string
  description: string
  email: string
  icon: React.ReactNode
  iconBg: string
}

const CHANNELS: ChannelCard[] = [
  {
    id: "schools-hubs",
    eyebrow: "SCHOOLS & HUBS",
    title: "Programs & Partnerships",
    description:
      "Curriculum licensing, Maker hub kits, and school delegations for AS A TEEN summit.",
    email: "partnerships@iimpactinitiative.org",
    iconBg: "#EFF6FF",
    icon: <GraduationCapIcon size={24} color="#2563EB" />,
  },
  {
    id: "youth-wellbeing",
    eyebrow: "YOUTH WELLBEING",
    title: "Mentorship & Safeguarding",
    description:
      "Mentor credentials, cohort background checks, and student safeguarding protocols.",
    email: "safeguarding@iimpactinitiative.org",
    iconBg: "#ECFDF5",
    icon: <ShieldIcon size={24} color="#059669" />,
  },
  {
    id: "corporate-grants",
    eyebrow: "CORPORATE & GRANTS",
    title: "Funding & Collaboration",
    description:
      "Audited financial statements, CSR endowment queries, and Paystack settlement confirmation.",
    email: "donors@iimpactinitiative.org",
    iconBg: "#FEF3C7",
    icon: <BanknoteIcon size={24} color="#D97706" />,
  },
  {
    id: "media-speaking",
    eyebrow: "MEDIA & SPEAKING",
    title: "Press & Event Requests",
    description:
      "Keynote speaker booking, press accreditations, brand kit access, and youth interview requests.",
    email: "media@iimpactinitiative.org",
    iconBg: "#EEF2FF",
    icon: <MegaphoneIcon size={24} color="#6366F1" />,
  },
]

const TRUST_BADGES = [
  {
    label: "Response within 24 business hours",
    icon: <ClockIcon size={14} color="#149191" />,
  },
  {
    label: "Safeguarding support",
    icon: <ShieldCheckIcon size={14} color="#059669" />,
  },
]

export function ContactHero() {
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="#FFFFFF"
      pt={{ base: "20", sm: "22", md: "24", lg: "26" }}
      pb={{ base: "12", md: "16", lg: "18" }}
      borderBottom="1px solid"
      borderColor="rgba(5, 27, 100, 0.06)"
    >
      {/* Ambient background glows */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w={{ base: "320px", md: "600px" }}
        h={{ base: "320px", md: "600px" }}
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.08) 0%, rgba(20, 145, 145, 0) 70%)"
        filter="blur(50px)"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        top="5%"
        left="-8%"
        w={{ base: "300px", md: "520px" }}
        h={{ base: "300px", md: "520px" }}
        bg="radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, rgba(14, 165, 233, 0) 70%)"
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
        {/* Top Eyebrow Pill with Living Pulsing Dot */}
        <Box mb={{ base: "4", md: "5" }}>
          <Box
            display="inline-flex"
            alignItems="center"
            gap="2.5"
            bg="rgba(20, 145, 145, 0.08)"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.25)"
            color="#149191"
            px="3.5"
            py="1.5"
            borderRadius="full"
            boxShadow="0 1px 3px rgba(20, 145, 145, 0.06)"
          >
            <LiveDot color="#149191" size={7} />
            <Text
              fontSize={{ base: "11px", md: "11.5px" }}
              fontWeight="800"
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              GET IN TOUCH • WE&apos;RE HERE TO HELP
            </Text>
          </Box>
        </Box>

        {/* Main Title Heading - Clean, Unclipped Alignment */}
        <Heading
          as="h1"
          fontSize={{ base: "32px", sm: "40px", md: "48px", lg: "54px" }}
          fontWeight="900"
          lineHeight={{ base: "1.18", md: "1.12" }}
          letterSpacing="-0.025em"
          color="#051B64"
          mb={{ base: "4", md: "5" }}
        >
          <Text as="span" color="#051B64">
            Let&apos;s Create{" "}
          </Text>
          <Text
            as="span"
            bg="linear-gradient(135deg, #149191 0%, #0284C7 100%)"
            bgClip="text"
            color="transparent"
          >
            Impact
          </Text>{" "}
          <Text as="span" color="#051B64">
            Together.
          </Text>
        </Heading>

        {/* Subtitle Paragraph */}
        <Text
          fontSize={{ base: "15px", sm: "16px", md: "17.5px" }}
          color="#475569"
          lineHeight="1.65"
          maxW="820px"
          mb={{ base: "6", md: "7" }}
          fontWeight="400"
        >
          Whether you&apos;re a school looking to launch an innovation club, a mentor supporting
          young people, a potential partner, or a journalist covering youth innovation — we&apos;d love
          to hear from you.
        </Text>

        {/* Subtle Trust Indicators */}
        <Flex
          direction="row"
          wrap="wrap"
          gap={{ base: "2", sm: "2.5" }}
          mb={{ base: "9", md: "11" }}
        >
          {TRUST_BADGES.map((badge, idx) => (
            <HStack
              key={idx}
              bg="rgba(248, 250, 252, 0.95)"
              border="1px solid"
              borderColor="#E2E8F0"
              px={{ base: "3", sm: "3.5" }}
              py="1.5"
              borderRadius="full"
              gap="2"
            >
              <Box flexShrink={0}>{badge.icon}</Box>
              <Text
                fontSize={{ base: "11.5px", sm: "12px" }}
                fontWeight="600"
                color="#64748B"
                lineHeight="1"
              >
                {badge.label}
              </Text>
            </HStack>
          ))}
        </Flex>

        {/* Section Heading: How can we help you? */}
        <Heading
          as="h2"
          fontSize={{ base: "20px", sm: "22px", md: "24px" }}
          fontWeight="800"
          color="#051B64"
          letterSpacing="-0.02em"
          mb={{ base: "5", md: "6" }}
        >
          How can we help you?
        </Heading>

        {/* 4 Cards in 2 Columns and 2 Rows (2x2 Grid) */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: "4", sm: "5", md: "6" }}
        >
          {CHANNELS.map((card) => {
            const mailtoUrl = `mailto:${card.email}?subject=${encodeURIComponent(
              `Inquiry: ${card.title} - I-Impact Initiative`
            )}`

            return (
              <chakra.a
                key={card.id}
                href={mailtoUrl}
                bg="#FFFFFF"
                borderRadius="22px"
                p={{ base: "5", sm: "6", md: "6" }}
                border="1px solid"
                borderColor="rgba(5, 27, 100, 0.08)"
                boxShadow="0 3px 14px -2px rgba(5, 27, 100, 0.04)"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                position="relative"
                textDecoration="none"
                cursor="pointer"
                transition="all 0.28s cubic-bezier(0.16, 1, 0.3, 1)"
                role="group"
                tabIndex={0}
                _hover={{
                  transform: "translateY(-4px)",
                  borderColor: "#149191",
                  boxShadow: "0 16px 36px -8px rgba(20, 145, 145, 0.16)",
                }}
                _focusVisible={{
                  outline: "2px solid #149191",
                  outlineOffset: "3px",
                  boxShadow: "0 0 0 4px rgba(20, 145, 145, 0.15)",
                }}
              >
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  gap={{ base: "3.5", sm: "4.5" }}
                  align="flex-start"
                  w="100%"
                >
                  {/* Category Thematic Icon */}
                  <Box
                    w="50px"
                    h="50px"
                    borderRadius="14px"
                    bg={card.iconBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    transition="transform 0.2s ease"
                    _groupHover={{ transform: "scale(1.08)" }}
                  >
                    {card.icon}
                  </Box>

                  {/* Text Content */}
                  <Box flex="1" w="100%">
                    <Flex align="center" justify="space-between" gap="2" mb="1">
                      <Text
                        fontSize="11px"
                        fontWeight="800"
                        color="#047857"
                        letterSpacing="0.08em"
                        textTransform="uppercase"
                        lineHeight="1"
                      >
                        {card.eyebrow}
                      </Text>

                      {/* Interactive Arrow Shift Indicator */}
                      <Box
                        w="26px"
                        h="26px"
                        borderRadius="full"
                        bg="#F8FAFC"
                        border="1px solid"
                        borderColor="#E2E8F0"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="#94A3B8"
                        flexShrink={0}
                        transition="all 0.2s ease"
                        _groupHover={{
                          bg: "#149191",
                          borderColor: "#149191",
                          color: "#FFFFFF",
                          transform: "translate(2px, -2px)",
                        }}
                      >
                        <ArrowRightIcon size={12} />
                      </Box>
                    </Flex>

                    {/* Card Title */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "17px", md: "18.5px" }}
                      fontWeight="800"
                      color="#051B64"
                      letterSpacing="-0.02em"
                      lineHeight="1.3"
                      mb="2"
                      transition="color 0.2s ease"
                      _groupHover={{ color: "#149191" }}
                    >
                      {card.title}
                    </Heading>

                    {/* Restored Rich Description */}
                    <Text
                      fontSize="13.5px"
                      color="#64748B"
                      lineHeight="1.58"
                      mb="4"
                    >
                      {card.description}
                    </Text>

                    {/* Bottom Email Action */}
                    <HStack
                      gap="1.5"
                      color="#149191"
                      pt="3"
                      borderTop="1px solid"
                      borderColor="#F1F5F9"
                      transition="all 0.2s ease"
                      _groupHover={{ color: "#051B64" }}
                    >
                      <Text
                        fontSize="12.5px"
                        fontWeight="700"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {card.email}
                      </Text>
                      <Box
                        transition="transform 0.2s ease"
                        _groupHover={{ transform: "translateX(4px)" }}
                        flexShrink={0}
                      >
                        <ArrowRightIcon size={12} />
                      </Box>
                    </HStack>
                  </Box>
                </Flex>
              </chakra.a>
            )
          })}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
