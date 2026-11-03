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
  BuildingIcon,
  GraduationCapIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/icons"

interface Tier {
  id: string
  title: string
  badge: string
  investment: string
  investmentUSD: string
  tagline: string
  benefits: string[]
  accentColor: string
  isFeatured?: boolean
}

const SPONSORSHIP_TIERS: Tier[] = [
  {
    id: "cohort",
    title: "Cohort Supporter",
    badge: "50 Scholars",
    investment: "₦500,000",
    investmentUSD: "~$1,250",
    tagline: "Underwrite an entire public secondary school group for a full academic term.",
    benefits: [
      "Supplies 50 students with physical STEM & workbook packages",
      "Covers 12 weeks of weekly guided mentorship sessions",
      "Named sponsor acknowledgment on student capstone certificates",
      "Quarterly scholar progress report with photo documentation",
    ],
    accentColor: "#0284C7",
  },
  {
    id: "lab-patron",
    title: "School Lab Patron",
    badge: "Most High-Impact",
    investment: "₦1,500,000",
    investmentUSD: "~$3,500",
    tagline: "Outfit a full partner secondary school with robotics, microcontrollers & tools.",
    benefits: [
      "Establishes a permanent on-campus maker club in a selected school",
      "Provides hardware kits, safe soldering gear & micro-boards",
      "Mandatory safeguarding & pedagogical training for school teachers",
      "Co-branded sponsor plaque on the campus maker facility",
      "Executive invitation to project presentation day",
    ],
    accentColor: "#059669",
    isFeatured: true,
  },
  {
    id: "summit-partner",
    title: "Flagship Summit Partner",
    badge: "Annual Youth Summit",
    investment: "₦5,000,000+",
    investmentUSD: "~$12,000+",
    tagline: "Title sponsor for AS A TEEN — empowering over 1,500 youth delegates in person.",
    benefits: [
      "Premium branding across all summit banners, stages & print media",
      "Keynote speaking or fireside chat slot for corporate leadership",
      "Dedicated corporate volunteer mentorship day for staff",
      "Full audited CSR impact report & media press package",
    ],
    accentColor: "#051B64",
  },
]

export function SponsorshipTiers() {
  return (
    <Box
      as="section"
      py={{ base: "14", sm: "16", md: "20" }}
      bg="#FFFFFF"
      borderTop="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        {/* Header */}
        <Box textAlign="center" maxW="720px" mx="auto" mb={{ base: "10", md: "14" }}>
          <HStack
            justify="center"
            gap="2"
            px="3"
            py="1"
            bg="rgba(5, 27, 100, 0.08)"
            borderRadius="full"
            w="fit-content"
            mx="auto"
            mb="3"
          >
            <BuildingIcon size={14} color="#051B64" />
            <Text
              fontSize="12px"
              fontWeight="800"
              color="#051B64"
              letterSpacing="0.06em"
              textTransform="uppercase"
            >
              Institutional Philanthropy & CSR
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "26px", sm: "32px", md: "38px" }}
            fontWeight="800"
            color="#0F172A"
            letterSpacing="-0.02em"
            mb="3"
          >
            Sponsorship Tiers for Foundations & Corporate Bodies
          </Heading>

          <Text fontSize={{ base: "14px", sm: "16px" }} color="#64748B" lineHeight="1.6">
            Looking to deploy corporate social responsibility (CSR) capital or multi-year philanthropic
            grants? Partner with I-Impact to create measurable, audited community transformation.
          </Text>
        </Box>

        {/* 3 Tier Cards */}
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: "6", md: "8" }} mb={{ base: "10", md: "12" }}>
          {SPONSORSHIP_TIERS.map((tier) => (
            <Box
              key={tier.id}
              borderRadius="24px"
              border="2px solid"
              borderColor={tier.isFeatured ? "#051B64" : "#E2E8F0"}
              bg={tier.isFeatured ? "linear-gradient(180deg, #FAFCFF 0%, #FFFFFF 100%)" : "#FFFFFF"}
              boxShadow={
                tier.isFeatured
                  ? "0 20px 40px -15px rgba(5, 27, 100, 0.15)"
                  : "0 4px 16px -4px rgba(15, 23, 42, 0.05)"
              }
              p={{ base: "6", sm: "7" }}
              position="relative"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              {tier.isFeatured && (
                <Box
                  position="absolute"
                  top="-12px"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="#051B64"
                  color="#FFFFFF"
                  px="3.5"
                  py="1"
                  borderRadius="full"
                  fontSize="11px"
                  fontWeight="800"
                  letterSpacing="0.04em"
                  textTransform="uppercase"
                  boxShadow="0 4px 10px rgba(5, 27, 100, 0.25)"
                >
                  Most Popular CSR Tier
                </Box>
              )}

              <Box>
                <Flex justify="space-between" align="center" mb="3">
                  <Heading as="h3" fontSize="20px" fontWeight="800" color="#0F172A">
                    {tier.title}
                  </Heading>
                  <Box
                    px="2"
                    py="0.5"
                    borderRadius="6px"
                    bg="rgba(5, 27, 100, 0.06)"
                    color="#051B64"
                    fontSize="11px"
                    fontWeight="700"
                  >
                    {tier.badge}
                  </Box>
                </Flex>

                <HStack align="baseline" gap="2" mb="2">
                  <Text fontSize="28px" fontWeight="900" color="#051B64">
                    {tier.investment}
                  </Text>
                  <Text fontSize="13px" fontWeight="600" color="#64748B">
                    / {tier.investmentUSD}
                  </Text>
                </HStack>

                <Text fontSize="13px" color="#64748B" lineHeight="1.5" mb="5">
                  {tier.tagline}
                </Text>

                <Box pt="4" borderTop="1px solid" borderColor="#F1F5F9" mb="6">
                  <Text fontSize="12px" fontWeight="700" color="#1E293B" textTransform="uppercase" mb="3">
                    What this tier delivers:
                  </Text>
                  <VStack align="stretch" gap="2.5">
                    {tier.benefits.map((benefit, idx) => (
                      <Flex key={idx} gap="2" align="flex-start">
                        <Box color="#059669" mt="0.5" flexShrink={0}>
                          <CheckCircleIcon size={15} />
                        </Box>
                        <Text fontSize="12px" color="#475569" lineHeight="1.4">
                          {benefit}
                        </Text>
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              </Box>

              <Link href="/contact" style={{ width: "100%" }}>
                <Button
                  w="100%"
                  h="44px"
                  bg={tier.isFeatured ? "#051B64" : "#F1F5F9"}
                  color={tier.isFeatured ? "#FFFFFF" : "#1E293B"}
                  fontSize="13px"
                  fontWeight="700"
                  borderRadius="12px"
                  _hover={{
                    bg: tier.isFeatured ? "#0A257F" : "#E2E8F0",
                  }}
                  transition="all 0.15s ease"
                >
                  <HStack gap="1.5">
                    <Text>Request Partnership Brief</Text>
                    <ArrowRightIcon size={14} />
                  </HStack>
                </Button>
              </Link>
            </Box>
          ))}
        </SimpleGrid>

        {/* Co-design Callout */}
        <Box
          p={{ base: "6", sm: "8" }}
          bg="#F8FAFC"
          borderRadius="20px"
          border="1px solid"
          borderColor="#E2E8F0"
          textAlign="center"
          maxW="820px"
          mx="auto"
        >
          <Heading as="h4" fontSize="17px" fontWeight="800" color="#0F172A" mb="2">
            Have a Bespoke Foundation Grant or Custom CSR Mandate?
          </Heading>
          <Text fontSize="13px" color="#64748B" maxW="600px" mx="auto" mb="4">
            We collaborate closely with ESG directors, corporate foundations, and diaspora associations
            to design targeted educational programs in specific regions or schools of interest.
          </Text>
          <Link href="/contact">
            <Button
              bg="#0F172A"
              color="#FFFFFF"
              fontSize="13px"
              fontWeight="700"
              px="5"
              py="2.5"
              h="auto"
              borderRadius="10px"
              _hover={{ bg: "#1E293B" }}
            >
              Schedule a Corporate Alignment Call →
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}

