"use client"

import React, { useState } from "react"
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
  Badge,
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import {
  MailIcon,
  PhoneIcon,
  ClockIcon,
  GlobeIcon,
  ShieldCheckIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@/components/icons"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <Box as="footer" bg="#FFFFFF" pt={{ base: "6", sm: "8", md: "10" }} pb="4" borderTop="1px solid" borderColor="#E2E8F0">
      <Container maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1240px" }} px={{ base: "4", sm: "6", md: "8" }}>
        {/* Top Newsletter Card */}
        <Box
          bg="linear-gradient(135deg, #F1F6FE 0%, #F8FAFF 100%)"
          borderRadius="18px"
          p={{ base: "5", sm: "6", md: "7" }}
          border="1px solid"
          borderColor="rgba(20, 145, 145, 0.15)"
          boxShadow="0 6px 20px -4px rgba(5, 27, 100, 0.04)"
          mb={{ base: "7", md: "8" }}
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            align={{ base: "flex-start", lg: "center" }}
            gap={{ base: "5", lg: "6" }}
          >
            {/* Left Content */}
            <VStack align="flex-start" gap="1.5" maxW="580px">
              <Text
                fontSize="11px"
                fontWeight="800"
                color="#149191"
                letterSpacing="0.12em"
                textTransform="uppercase"
              >
                STAY CONNECTED WITH I IMPACT
              </Text>
              <Heading
                as="h3"
                fontSize={{ base: "18px", sm: "20px", md: "22px", lg: "24px" }}
                fontWeight="900"
                color="#051B64"
                letterSpacing="-0.02em"
                lineHeight="1.25"
              >
                Raising Champions Across Continents
              </Heading>
              <Text fontSize={{ base: "12.5px", sm: "13px" }} color="#4B5563" lineHeight="1.5">
                Get updates on conferences, mentorship cohorts, scholarships, and inspiring youth impact stories delivered directly to your inbox.
              </Text>
            </VStack>

            {/* Right Newsletter Form */}
            <Box w={{ base: "100%", lg: "400px" }} flexShrink={0}>
              {isSubscribed ? (
                <HStack
                  bg="#FFFFFF"
                  p="3"
                  borderRadius="10px"
                  border="1px solid"
                  borderColor="#10B981"
                  gap="2"
                >
                  <CheckCircleIcon size={18} color="#10B981" />
                  <Text fontSize="13px" fontWeight="700" color="#047857">
                    Thank you for subscribing to I-IMPACT!
                  </Text>
                </HStack>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    gap="2"
                    w="100%"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter your active email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        flex: 1,
                        height: "42px",
                        padding: "0 14px",
                        borderRadius: "10px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #CBD5E1",
                        fontSize: "13px",
                        color: "#051B64",
                        outline: "none",
                        boxShadow: "0 1px 4px rgba(5, 27, 100, 0.03)",
                      }}
                    />
                    <Button
                      type="submit"
                      h="42px"
                      px="5"
                      bg="#047857"
                      color="#FFFFFF"
                      borderRadius="10px"
                      fontWeight="700"
                      fontSize="13px"
                      flexShrink={0}
                      transition="all 0.2s ease"
                      _hover={{
                        bg: "#065F46",
                        transform: "translateY(-1.5px)",
                        boxShadow: "0 4px 12px rgba(4, 120, 87, 0.25)",
                      }}
                    >
                      Subscribe
                    </Button>
                  </Flex>
                </form>
              )}
            </Box>
          </Flex>
        </Box>

        {/* Main 5-Column Navigation Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={{ base: "5", lg: "4.5" }} mb="6">
          {/* Column 1: Brand Info */}
          <VStack align="flex-start" gap="2.5" gridColumn={{ base: "span 1", sm: "span 2", md: "span 3", lg: "span 1" }}>
            <Link href="/" style={{ display: "inline-block" }}>
              <Box position="relative" w="135px" h="34px">
                <Image
                  src="/iimpact-logo2.png"
                  alt="I-IMPACT Initiative"
                  fill
                  sizes="135px"
                  style={{ objectFit: "contain", objectPosition: "left" }}
                />
              </Box>
            </Link>

            <Text
              fontSize="10.5px"
              fontWeight="800"
              color="#149191"
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              RAISING CHAMPIONS EVERYDAY
            </Text>

            <Text fontSize="12px" color="#4B5563" lineHeight="1.5">
              Empowering the younger generation to discover their potential, gain leadership skills, access mentorship, and become champions in their communities.
            </Text>

            {/* Badges - Always Side by Side */}
            <HStack gap="1.5" flexWrap="nowrap" whiteSpace="nowrap" pt="0.5">
              <Badge
                display="inline-flex"
                alignItems="center"
                gap="1"
                bg="rgba(245, 158, 11, 0.12)"
                color="#B45309"
                px="2"
                py="0.5"
                borderRadius="full"
                fontSize="10px"
                fontWeight="700"
              >
                <ShieldCheckIcon size={12} color="#B45309" />
                Certified Youth Hub
              </Badge>

              <Badge
                display="inline-flex"
                alignItems="center"
                gap="1"
                bg="rgba(99, 102, 241, 0.12)"
                color="#4338CA"
                px="2"
                py="0.5"
                borderRadius="full"
                fontSize="10px"
                fontWeight="700"
              >
                <GlobeIcon size={12} color="#4338CA" />
                Pan-African Reach
              </Badge>
            </HStack>
          </VStack>

          {/* Column 2: EXPLORE */}
          <VStack align="flex-start" gap="1.8">
            <Text fontSize="11.5px" fontWeight="800" color="#051B64" letterSpacing="0.08em" textTransform="uppercase" mb="0.5">
              EXPLORE
            </Text>
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Our Story", href: "/about#story" },
              { label: "Leadership", href: "/about#leadership" },
              { label: "Values", href: "/about#values" },
              { label: "Careers", href: "/careers" },
            ].map((link, idx) => (
              <Link key={idx} href={link.href} style={{ textDecoration: "none" }}>
                <Text
                  fontSize="12.5px"
                  color="#64748B"
                  fontWeight="500"
                  transition="all 0.15s ease"
                  _hover={{ color: "#149191", transform: "translateX(2px)" }}
                >
                  {link.label}
                </Text>
              </Link>
            ))}
          </VStack>

          {/* Column 3: PROGRAMS */}
          <VStack align="flex-start" gap="1.8">
            <Text fontSize="11.5px" fontWeight="800" color="#051B64" letterSpacing="0.08em" textTransform="uppercase" mb="0.5">
              PROGRAMS
            </Text>
            {[
              { label: "AS A TEEN Conference", href: "/programs/as-a-teen" },
              { label: "UNLOCK", href: "/programs/unlock" },
              { label: "NEEDY NEEDS YOU (NNY)", href: "/programs/nny" },
              { label: "Leadership Academy", href: "/programs/leadership" },
              { label: "Mentorship Network", href: "/programs/mentorship" },
              { label: "Skills & Tech Lab", href: "/programs/skills" },
            ].map((link, idx) => (
              <Link key={idx} href={link.href} style={{ textDecoration: "none" }}>
                <Text
                  fontSize="12.5px"
                  color="#64748B"
                  fontWeight="500"
                  transition="all 0.15s ease"
                  _hover={{ color: "#149191", transform: "translateX(2px)" }}
                >
                  {link.label}
                </Text>
              </Link>
            ))}
          </VStack>

          {/* Column 4: GET INVOLVED */}
          <VStack align="flex-start" gap="1.8">
            <Text fontSize="11.5px" fontWeight="800" color="#051B64" letterSpacing="0.08em" textTransform="uppercase" mb="0.5">
              GET INVOLVED
            </Text>
            {[
              { label: "Volunteer", href: "/get-involved/volunteer" },
              { label: "Become a Mentor", href: "/get-involved/mentor" },
              { label: "Partner with Us", href: "/get-involved/partner" },
              { label: "Sponsor a Champion", href: "/get-involved/sponsor" },
              { label: "Live Conferences", href: "/events" },
              { label: "Donate", href: "/donate" },
            ].map((link, idx) => (
              <Link key={idx} href={link.href} style={{ textDecoration: "none" }}>
                <Text
                  fontSize="12.5px"
                  color="#64748B"
                  fontWeight="500"
                  transition="all 0.15s ease"
                  _hover={{ color: "#149191", transform: "translateX(2px)" }}
                >
                  {link.label}
                </Text>
              </Link>
            ))}
          </VStack>

          {/* Column 5: CONTACT & LEGAL */}
          <VStack align="flex-start" gap="2.5">
            <Text fontSize="11.5px" fontWeight="800" color="#051B64" letterSpacing="0.08em" textTransform="uppercase" mb="0.5">
              CONTACT & LEGAL
            </Text>

            <HStack align="flex-start" gap="2">
              <Box color="#149191" mt="0.5" flexShrink={0}>
                <MapPinIcon size={14} />
              </Box>
              <Text fontSize="12px" color="#64748B" lineHeight="1.4">
                Lagos & Abuja, Nigeria
              </Text>
            </HStack>

            <HStack align="flex-start" gap="2">
              <Box color="#149191" mt="0.5" flexShrink={0}>
                <MailIcon size={14} />
              </Box>
              <Link href="mailto:contact@iimpactinitiative.org" style={{ textDecoration: "none" }}>
                <Text
                  fontSize="12px"
                  color="#64748B"
                  lineHeight="1.4"
                  _hover={{ color: "#149191" }}
                >
                  contact@iimpactinitiative.org
                </Text>
              </Link>
            </HStack>

            <HStack align="flex-start" gap="2">
              <Box color="#149191" mt="0.5" flexShrink={0}>
                <PhoneIcon size={14} />
              </Box>
              <Link href="tel:+2348004467228" style={{ textDecoration: "none" }}>
                <Text
                  fontSize="12px"
                  color="#64748B"
                  lineHeight="1.4"
                  _hover={{ color: "#149191" }}
                >
                  +234 (0) 800 I-IMPACT
                </Text>
              </Link>
            </HStack>

            <HStack align="flex-start" gap="2">
              <Box color="#149191" mt="0.5" flexShrink={0}>
                <ClockIcon size={14} />
              </Box>
              <Text fontSize="12px" color="#64748B" lineHeight="1.4">
                Mon - Fri: 8:00 AM - 5:00 PM
              </Text>
            </HStack>
          </VStack>
        </SimpleGrid>

        {/* Bottom Sub-Footer Bar */}
        <Box pt="3" pb="1" borderTop="1px solid" borderColor="#EDF2F7">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap="2.5"
          >
            <Text fontSize="11px" color="#94A3B8" lineHeight="1.5">
              Copyright © {new Date().getFullYear()} I IMPACT INITIATIVE. All rights reserved. Registered Youth & Community Development Organization in Nigeria.
            </Text>

            <HStack gap="2.5" flexWrap="wrap">
              <Link href="/privacy" style={{ textDecoration: "none" }}>
                <Text fontSize="11px" color="#64748B" _hover={{ color: "#149191" }}>
                  Privacy Policy
                </Text>
              </Link>
              <Text fontSize="11px" color="#CBD5E1">•</Text>
              <Link href="/terms" style={{ textDecoration: "none" }}>
                <Text fontSize="11px" color="#64748B" _hover={{ color: "#149191" }}>
                  Terms of Service
                </Text>
              </Link>
              <Text fontSize="11px" color="#CBD5E1">•</Text>
              <Link href="/reports" style={{ textDecoration: "none" }}>
                <Text fontSize="11px" color="#64748B" _hover={{ color: "#149191" }}>
                  Annual Impact Reports
                </Text>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
