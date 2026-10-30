"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  DownloadIcon,
  TrendingUpIcon,
  ClipboardCheckIcon,
  ShieldCheckIcon,
  ShieldIcon,
  LockIcon,
  RefreshCwIcon,
  BarChartSquareIcon,
} from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"
import { VerifyCapstonesModal } from "./VerifyCapstonesModal"
import { ReportDownloadModal } from "./ReportDownloadModal"

export function ImpactHero() {
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)

  const handleScrollToExplorer = () => {
    const explorerEl = document.getElementById("impact-explorer")
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: "smooth" })
    } else {
      setIsVerifyOpen(true)
    }
  }

  return (
    <>
      <Box
        as="section"
        position="relative"
        overflow="hidden"
        bg="#FBFBFC"
        pt={{ base: "24", sm: "26", md: "28", lg: "32" }}
        pb={{ base: "14", md: "18", lg: "22" }}
        borderBottom="1px solid"
        borderColor="rgba(15, 23, 42, 0.06)"
      >
        {/* Subtle Ambient Background Gradients */}
        <Box
          position="absolute"
          top="-8%"
          right="-5%"
          w={{ base: "300px", md: "560px" }}
          h={{ base: "300px", md: "560px" }}
          bg="radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0) 70%)"
          filter="blur(60px)"
          pointerEvents="none"
          zIndex={0}
        />
        <Box
          position="absolute"
          top="15%"
          left="-8%"
          w={{ base: "280px", md: "500px" }}
          h={{ base: "280px", md: "500px" }}
          bg="radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, rgba(99, 102, 241, 0) 70%)"
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
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "stretch", lg: "center" }}
            justify="space-between"
            gap={{ base: "12", lg: "10", xl: "14" }}
          >
            {/* ===================== LEFT COLUMN ===================== */}
            <Box flex={{ base: "1", lg: "1.15" }} maxW={{ lg: "640px", xl: "680px" }}>
              {/* Eyebrow Pill */}
              <Box mb={{ base: "4", md: "5" }}>
                <Box
                  display="inline-flex"
                  alignItems="center"
                  gap="2.5"
                  bg="#252736"
                  borderRadius="full"
                  px="3.5"
                  py="1.5"
                  boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                >
                  <Box color="#34D399" display="flex" alignItems="center">
                    <BarChartSquareIcon size={14} />
                  </Box>
                  <Text
                    fontSize="11px"
                    fontWeight="700"
                    color="#A3AAC2"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    ACCREDITED IMPACT & VERIFIABLE METRICS
                  </Text>
                </Box>
              </Box>

              {/* Main Heading */}
              <Heading
                as="h1"
                fontSize={{ base: "32px", sm: "40px", md: "48px", lg: "54px", xl: "58px" }}
                fontWeight="900"
                lineHeight="1.12"
                letterSpacing="-0.03em"
                mb={{ base: "5", md: "6" }}
              >
                <Box as="span" display="block" color="#0F172A">
                  Audited Impact.
                </Box>
                <Box as="span" display="block" color="#059669">
                  Measurable Transformation.
                </Box>
                <Box as="span" display="block" color="#0F172A">
                  Real Champions.
                </Box>
              </Heading>

              {/* Subparagraph */}
              <Text
                fontSize={{ base: "15px", sm: "16px", md: "17px" }}
                lineHeight="1.68"
                color="#475569"
                maxW="590px"
                mb={{ base: "7", md: "8" }}
              >
                We measure our success not just by attendance numbers, but by tangible shift in agency, academic resilience, technological capability and ethical leadership in every teenager we mentor.
              </Text>

              {/* Action Buttons */}
              <Box mb={{ base: "8", md: "9" }}>
                {/* Row 1: Primary CTAs */}
                <Flex
                  wrap="wrap"
                  align="center"
                  gap="3.5"
                  mb="3.5"
                >
                  {/* Download Report Button */}
                  <Button
                    onClick={() => setIsDownloadOpen(true)}
                    bg="#0B0F2A"
                    color="#FFFFFF"
                    px="5"
                    py="3.5"
                    h="auto"
                    fontSize="14px"
                    fontWeight="700"
                    borderRadius="10px"
                    boxShadow="0 4px 14px rgba(11, 15, 42, 0.25)"
                    _hover={{
                      bg: "#181E48",
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 18px rgba(11, 15, 42, 0.32)",
                    }}
                    transition="all 0.2s ease"
                    display="inline-flex"
                    alignItems="center"
                    gap="2.5"
                  >
                    <DownloadIcon size={17} color="#FFFFFF" />
                    Download 2024 Report (.PDF)
                  </Button>

                  {/* Interactive Explorer Button */}
                  <Button
                    onClick={handleScrollToExplorer}
                    bg="#047857"
                    color="#FFFFFF"
                    px="5"
                    py="3.5"
                    h="auto"
                    fontSize="14px"
                    fontWeight="700"
                    borderRadius="10px"
                    boxShadow="0 4px 14px rgba(4, 120, 87, 0.25)"
                    _hover={{
                      bg: "#065F46",
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 18px rgba(4, 120, 87, 0.32)",
                    }}
                    transition="all 0.2s ease"
                    display="inline-flex"
                    alignItems="center"
                    gap="2.5"
                  >
                    <TrendingUpIcon size={17} color="#FFFFFF" />
                    Interactive Explorer
                  </Button>
                </Flex>

                {/* Row 2: Secondary Button */}
                <Box>
                  <Button
                    onClick={() => setIsVerifyOpen(true)}
                    bg="#EEF2FF"
                    color="#1E1B4B"
                    px="4.5"
                    py="2.5"
                    h="auto"
                    fontSize="13px"
                    fontWeight="700"
                    borderRadius="10px"
                    border="1px solid"
                    borderColor="rgba(99, 102, 241, 0.15)"
                    _hover={{
                      bg: "#E0E7FF",
                      borderColor: "rgba(99, 102, 241, 0.3)",
                      transform: "translateY(-1px)",
                    }}
                    transition="all 0.2s ease"
                    display="inline-flex"
                    alignItems="center"
                    gap="2"
                  >
                    <ClipboardCheckIcon size={16} color="#4338CA" />
                    Verify Capstones
                  </Button>
                </Box>
              </Box>

              {/* Bottom Trust/Safeguarding Badges Bar */}
              <Box
                bg="#FFFFFF"
                borderRadius="16px"
                border="1px solid"
                borderColor="#E2E8F0"
                p={{ base: "3.5", sm: "4" }}
                boxShadow="0 4px 16px -4px rgba(15, 23, 42, 0.05)"
              >
                <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: "3.5", sm: "4" }}>
                  {/* Trust Badge 1 */}
                  <Flex align="center" gap="3">
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="full"
                      bg="#A7F3D0"
                      color="#047857"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Text fontSize="16px" fontWeight="800">
                        @
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="13px" fontWeight="800" color="#0F172A" lineHeight="1.2">
                        100% Zero-Leakage
                      </Text>
                      <Text fontSize="11px" color="#64748B" fontWeight="500" mt="0.5">
                        Direct-to-student ledger
                      </Text>
                    </Box>
                  </Flex>

                  {/* Trust Badge 2 */}
                  <Flex align="center" gap="3">
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="full"
                      bg="#EDE9FE"
                      color="#7C3AED"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <ShieldIcon size={18} color="#7C3AED" />
                    </Box>
                    <Box>
                      <Text fontSize="13px" fontWeight="800" color="#0F172A" lineHeight="1.2">
                        Safeguarding Gold
                      </Text>
                      <Text fontSize="11px" color="#64748B" fontWeight="500" mt="0.5">
                        UK & NG vetting verified
                      </Text>
                    </Box>
                  </Flex>

                  {/* Trust Badge 3 */}
                  <Flex align="center" gap="3">
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="full"
                      bg="#FEF3C7"
                      color="#D97706"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <LockIcon size={17} color="#D97706" />
                    </Box>
                    <Box>
                      <Text fontSize="13px" fontWeight="800" color="#0F172A" lineHeight="1.2">
                        NDPR Compliant
                      </Text>
                      <Text fontSize="11px" color="#64748B" fontWeight="500" mt="0.5">
                        Secured privacy protocols
                      </Text>
                    </Box>
                  </Flex>
                </SimpleGrid>
              </Box>
            </Box>

            {/* ===================== RIGHT COLUMN ===================== */}
            <Box flex={{ base: "1", lg: "0.95" }} maxW={{ lg: "520px", xl: "540px" }} w="100%">
              {/* Outer Card with Top Gradient Border */}
              <Box
                position="relative"
                bg="#FFFFFF"
                borderRadius="24px"
                border="1px solid"
                borderColor="rgba(226, 232, 240, 0.95)"
                boxShadow="0 20px 45px -12px rgba(15, 23, 42, 0.12), 0 0 1px rgba(15, 23, 42, 0.08)"
                overflow="hidden"
                p={{ base: "3", sm: "4" }}
                transition="all 0.3s ease"
                _hover={{
                  boxShadow: "0 25px 55px -12px rgba(15, 23, 42, 0.16)",
                }}
              >
                {/* Top Gradient Accent Bar */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  h="4px"
                  bg="linear-gradient(90deg, #10B981 0%, #06B6D4 50%, #6366F1 100%)"
                />

                {/* Inner Image Section */}
                <Box
                  position="relative"
                  w="100%"
                  h={{ base: "240px", sm: "280px", md: "310px" }}
                  borderRadius="16px"
                  overflow="hidden"
                  bg="#0B132B"
                >
                  <Image
                    src="/images/impact-capstone-hub.jpg"
                    alt="Cohort 2024 Tech & Civic Capstones - Lagos & Abuja Hubs"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 540px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 25%",
                    }}
                  />

                  {/* Dark Vignette / Contrast Gradient */}
                  <Box
                    position="absolute"
                    inset="0"
                    bg="linear-gradient(180deg, rgba(15, 23, 42, 0) 35%, rgba(15, 23, 42, 0.85) 75%, rgba(15, 23, 42, 0.96) 100%)"
                    pointerEvents="none"
                  />

                  {/* Overlay Sensor Badge & Title */}
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p={{ base: "4", sm: "4.5" }}
                    zIndex={2}
                  >
                    {/* Live Field Sensor Badge */}
                    <HStack gap="2" mb="1.5">
                      <LiveDot color="#34D399" size={7} />
                      <Text
                        fontSize="11px"
                        fontWeight="800"
                        color="#34D399"
                        letterSpacing="0.06em"
                        textTransform="uppercase"
                      >
                        LIVE FIELD SENSOR: LAGOS & ABUJA
                      </Text>
                    </HStack>

                    {/* Image Title */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "17px", sm: "19px", md: "20px" }}
                      fontWeight="800"
                      color="#FFFFFF"
                      lineHeight="1.25"
                    >
                      Cohort 2024 Tech & Civic Capstones
                    </Heading>
                  </Box>
                </Box>

                {/* Metrics 3-Column Row */}
                <Box mt="3.5">
                  <SimpleGrid columns={3} gap="2">
                    {/* Metric 1 */}
                    <Box
                      bg="#F1F5F9"
                      borderRadius="12px"
                      py="3"
                      px="2"
                      textAlign="center"
                      transition="transform 0.2s ease"
                      _hover={{ bg: "#E2E8F0" }}
                    >
                      <Text
                        fontSize={{ base: "17px", sm: "19px", md: "21px" }}
                        fontWeight="800"
                        color="#0F172A"
                        lineHeight="1.1"
                      >
                        120,418+
                      </Text>
                      <Text
                        fontSize={{ base: "9px", sm: "10px" }}
                        fontWeight="700"
                        color="#64748B"
                        letterSpacing="0.05em"
                        textTransform="uppercase"
                        mt="1"
                      >
                        TEENS IMPACTED
                      </Text>
                    </Box>

                    {/* Metric 2 */}
                    <Box
                      bg="#F1F5F9"
                      borderRadius="12px"
                      py="3"
                      px="2"
                      textAlign="center"
                      transition="transform 0.2s ease"
                      _hover={{ bg: "#E2E8F0" }}
                    >
                      <Text
                        fontSize={{ base: "17px", sm: "19px", md: "21px" }}
                        fontWeight="800"
                        color="#0F172A"
                        lineHeight="1.1"
                      >
                        85,420h
                      </Text>
                      <Text
                        fontSize={{ base: "9px", sm: "10px" }}
                        fontWeight="700"
                        color="#64748B"
                        letterSpacing="0.05em"
                        textTransform="uppercase"
                        mt="1"
                      >
                        VERIFIED MENTORSHIP
                      </Text>
                    </Box>

                    {/* Metric 3 */}
                    <Box
                      bg="#F1F5F9"
                      borderRadius="12px"
                      py="3"
                      px="2"
                      textAlign="center"
                      transition="transform 0.2s ease"
                      _hover={{ bg: "#E2E8F0" }}
                    >
                      <Text
                        fontSize={{ base: "17px", sm: "19px", md: "21px" }}
                        fontWeight="800"
                        color="#0F172A"
                        lineHeight="1.1"
                      >
                        94.2%
                      </Text>
                      <Text
                        fontSize={{ base: "9px", sm: "10px" }}
                        fontWeight="700"
                        color="#64748B"
                        letterSpacing="0.05em"
                        textTransform="uppercase"
                        mt="1"
                      >
                        UNI TRANSITION
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Card Footer Bar */}
                <Box
                  mt="3.5"
                  pt="3"
                  borderTop="1px solid"
                  borderColor="#F1F5F9"
                  bg="#FFFFFF"
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    direction={{ base: "column", sm: "row" }}
                    gap="2"
                  >
                    {/* Left: LMS Sync Indicator */}
                    <HStack gap="1.5" color="#0D9488">
                      <RefreshCwIcon size={14} color="#0D9488" />
                      <Text fontSize="12px" color="#64748B" fontWeight="500">
                        LMS Synchronized: Updated 14m ago
                      </Text>
                    </HStack>

                    {/* Right: Ledger Monospace ID */}
                    <Box
                      bg="#EEF2FF"
                      color="#4338CA"
                      px="2"
                      py="0.5"
                      borderRadius="6px"
                      fontSize="11px"
                      fontWeight="700"
                      fontFamily="monospace"
                      letterSpacing="0.02em"
                    >
                      Ledger ID #IIM-2024-V9
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Interactive Modals */}
      <VerifyCapstonesModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
      />
      <ReportDownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </>
  )
}
