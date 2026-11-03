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
    icon: <GraduationCapIcon size={20} color="#2563EB" />,
  },
  {
    id: "youth-wellbeing",
    eyebrow: "YOUTH WELLBEING",
    title: "Mentorship & Safeguarding",
    description:
      "Mentor credentials, cohort background checks, and student safeguarding protocols.",
    email: "safeguarding@iimpactinitiative.org",
    iconBg: "#ECFDF5",
    icon: <ShieldIcon size={20} color="#059669" />,
  },
  {
    id: "corporate-grants",
    eyebrow: "CORPORATE & GRANTS",
    title: "Funding & Collaboration",
    description:
      "Audited financial statements, CSR endowment queries, and Paystack settlement confirmation.",
    email: "donors@iimpactinitiative.org",
    iconBg: "#FEF3C7",
    icon: <BanknoteIcon size={20} color="#D97706" />,
  },
  {
    id: "media-speaking",
    eyebrow: "MEDIA & SPEAKING",
    title: "Press & Event Requests",
    description:
      "Keynote speaker booking, press accreditations, brand kit access, and youth interview requests.",
    email: "media@iimpactinitiative.org",
    iconBg: "#EEF2FF",
    icon: <MegaphoneIcon size={20} color="#6366F1" />,
  },
]

const TRUST_BADGES = [
  {
    label: "Response within 24 business hours",
    icon: <ClockIcon size={13} color="#149191" />,
  },
  {
    label: "Safeguarding support",
    icon: <ShieldCheckIcon size={13} color="#059669" />,
  },
]

export function ContactHero() {
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="#FFFFFF"
      pt={{ base: "96px", sm: "104px", md: "112px", lg: "120px" }}
      pb={{ base: "8", sm: "10", md: "12" }}
      borderBottom="1px solid"
      borderColor="rgba(5, 27, 100, 0.06)"
    >
      {/* Ambient background glows */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w={{ base: "280px", md: "520px" }}
        h={{ base: "280px", md: "520px" }}
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.07) 0%, rgba(20, 145, 145, 0) 70%)"
        filter="blur(50px)"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        top="5%"
        left="-8%"
        w={{ base: "260px", md: "460px" }}
        h={{ base: "260px", md: "460px" }}
        bg="radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, rgba(14, 165, 233, 0) 70%)"
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
        <Box mb={{ base: "2.5", sm: "3" }}>
          <Box
            display="inline-flex"
            alignItems="center"
            gap="2"
            bg="rgba(20, 145, 145, 0.08)"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.25)"
            color="#149191"
            px="3"
            py="1"
            borderRadius="full"
            boxShadow="0 1px 3px rgba(20, 145, 145, 0.06)"
          >
            <LiveDot color="#149191" size={6} />
            <Text
              fontSize={{ base: "10.5px", md: "11px" }}
              fontWeight="800"
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              GET IN TOUCH • WE&apos;RE HERE TO HELP
            </Text>
          </Box>
        </Box>

        {/* Main Title Heading - Streamlined, Balanced Size */}
        <Heading
          as="h1"
          fontSize={{ base: "25px", sm: "32px", md: "38px", lg: "42px" }}
          fontWeight="900"
          lineHeight={{ base: "1.2", md: "1.15" }}
          letterSpacing="-0.025em"
          color="#051B64"
          mb={{ base: "2.5", sm: "3" }}
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
          fontSize={{ base: "13.5px", sm: "14.5px", md: "15.5px" }}
          color="#475569"
          lineHeight="1.58"
          maxW="720px"
          mb={{ base: "3.5", sm: "4.5" }}
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
          mb={{ base: "5", sm: "6" }}
        >
          {TRUST_BADGES.map((badge, idx) => (
            <HStack
              key={idx}
              bg="rgba(248, 250, 252, 0.95)"
              border="1px solid"
              borderColor="#E2E8F0"
              px={{ base: "2.5", sm: "3" }}
              py="1"
              borderRadius="full"
              gap="1.5"
            >
              <Box flexShrink={0}>{badge.icon}</Box>
              <Text
                fontSize={{ base: "11px", sm: "11.5px" }}
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
          fontSize={{ base: "17px", sm: "19px", md: "20px" }}
          fontWeight="800"
          color="#051B64"
          letterSpacing="-0.02em"
          mb={{ base: "3", sm: "4" }}
        >
          How can we help you?
        </Heading>

        {/* 4 Cards in 2 Columns and 2 Rows (2x2 Grid) */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: "3.5", sm: "4", md: "5" }}
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
                borderRadius="18px"
                p={{ base: "4", sm: "4.5", md: "5" }}
                border="1px solid"
                borderColor="rgba(5, 27, 100, 0.08)"
                boxShadow="0 2px 10px -2px rgba(5, 27, 100, 0.04)"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                position="relative"
                textDecoration="none"
                cursor="pointer"
                transition="all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                role="group"
                tabIndex={0}
                _hover={{
                  md: {
                    transform: "translateY(-3px)",
                    borderColor: "#149191",
                    boxShadow: "0 12px 28px -6px rgba(20, 145, 145, 0.14)",
                  },
                }}
                _active={{
                  transform: "scale(0.985)",
                }}
                _focusVisible={{
                  outline: "2px solid #149191",
                  outlineOffset: "3px",
                  boxShadow: "0 0 0 4px rgba(20, 145, 145, 0.15)",
                }}
              >
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  gap={{ base: "3", sm: "3.5" }}
                  align="flex-start"
                  w="100%"
                >
                  {/* Category Thematic Icon */}
                  <Box
                    w={{ base: "38px", sm: "42px" }}
                    h={{ base: "38px", sm: "42px" }}
                    borderRadius="12px"
                    bg={card.iconBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    transition="transform 0.2s ease"
                    _groupHover={{ md: { transform: "scale(1.06)" } }}
                  >
                    {card.icon}
                  </Box>

                  {/* Text Content */}
                  <Box flex="1" w="100%">
                    <Flex align="center" justify="space-between" gap="2" mb="1">
                      <Text
                        fontSize="10.5px"
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
                        w="24px"
                        h="24px"
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
                          md: {
                            bg: "#149191",
                            borderColor: "#149191",
                            color: "#FFFFFF",
                            transform: "translate(2px, -2px)",
                          },
                        }}
                      >
                        <ArrowRightIcon size={11} />
                      </Box>
                    </Flex>

                    {/* Card Title */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "15px", md: "16.5px" }}
                      fontWeight="800"
                      color="#051B64"
                      letterSpacing="-0.015em"
                      lineHeight="1.25"
                      mb="1.5"
                      transition="color 0.2s ease"
                      _groupHover={{ md: { color: "#149191" } }}
                    >
                      {card.title}
                    </Heading>

                    {/* Description */}
                    <Text
                      fontSize={{ base: "12px", md: "12.5px" }}
                      color="#64748B"
                      lineHeight="1.5"
                      mb="3"
                    >
                      {card.description}
                    </Text>

                    {/* Bottom Email Action */}
                    <HStack
                      gap="1.5"
                      color="#149191"
                      pt="2.5"
                      borderTop="1px solid"
                      borderColor="#F1F5F9"
                      transition="all 0.2s ease"
                      _groupHover={{ md: { color: "#051B64" } }}
                    >
                      <Text
                        fontSize="12px"
                        fontWeight="700"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {card.email}
                      </Text>
                      <Box
                        transition="transform 0.2s ease"
                        _groupHover={{ md: { transform: "translateX(3px)" } }}
                        flexShrink={0}
                      >
                        <ArrowRightIcon size={11} />
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
