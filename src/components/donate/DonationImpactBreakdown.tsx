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
} from "@chakra-ui/react"
import {
  BarChartSquareIcon,
  ShieldCheckIcon,
  HeartHandshakeIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@/components/icons"

const ALLOCATION_BREAKDOWN = [
  {
    percentage: "85%",
    title: "Direct Youth Programs & STEM Kits",
    description: "Procurement of hands-on science materials, textbook packages, robotics kits, and secondary school maker workshops.",
    barColor: "#10B981",
    barBg: "rgba(16, 185, 129, 0.15)",
  },
  {
    percentage: "10%",
    title: "Mentor Training & Safeguarding",
    description: "Volunteer mentor background verifications, child protection training, school site coordination, and safety gear.",
    barColor: "#0284C7",
    barBg: "rgba(2, 132, 199, 0.15)",
  },
  {
    percentage: "5%",
    title: "Accountability & Operations",
    description: "Public transparency documentation, independent accounting, donor reporting, and essential administrative governance.",
    barColor: "#6366F1",
    barBg: "rgba(99, 102, 241, 0.15)",
  },
]

const TRUST_PILLARS = [
  {
    icon: <BarChartSquareIcon size={22} color="#059669" />,
    title: "Measurable Real-World Reach",
    description: "We don't deal in abstractions. Contributions map directly to real students, verified workshops, and school science clubs.",
  },
  {
    icon: <ShieldCheckIcon size={22} color="#0284C7" />,
    title: "Safeguarding by Design",
    description: "Every volunteer and mentor undergoes strict child protection checks and mandatory orientation before entering classrooms.",
  },
  {
    icon: <HeartHandshakeIcon size={22} color="#D97706" />,
    title: "Respect for Every Kobo & Cent",
    description: "Whether giving ₦5,000 or $5,000, your contribution is treated with the highest ethical stewardship and fiscal responsibility.",
  },
]

export function DonationImpactBreakdown() {
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
        {/* Section Header */}
        <Box textAlign="center" maxW="720px" mx="auto" mb={{ base: "10", md: "14" }}>
          <HStack
            justify="center"
            gap="2"
            px="3"
            py="1"
            bg="rgba(16, 185, 129, 0.1)"
            borderRadius="full"
            w="fit-content"
            mx="auto"
            mb="3"
          >
            <SparklesIcon size={14} color="#059669" />
            <Text
              fontSize="12px"
              fontWeight="800"
              color="#059669"
              letterSpacing="0.06em"
              textTransform="uppercase"
            >
              Fiduciary Stewardship
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
            Where Does Your Contribution Go?
          </Heading>

          <Text fontSize={{ base: "14px", sm: "16px" }} color="#64748B" lineHeight="1.6">
            We believe transparent stewardship is the bedrock of non-profit credibility.
            Here is how every naira and dollar donated to I-Impact is deployed into classrooms and communities.
          </Text>
        </Box>

        {/* 3 Allocation Progress Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }} mb={{ base: "12", md: "16" }}>
          {ALLOCATION_BREAKDOWN.map((item, idx) => (
            <Box
              key={idx}
              p={{ base: "6", sm: "7" }}
              borderRadius="20px"
              bg="#F8FAFC"
              border="1px solid"
              borderColor="#E2E8F0"
              transition="all 0.2s ease"
              _hover={{
                md: {
                  borderColor: item.barColor,
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 25px -10px rgba(15, 23, 42, 0.1)",
                },
              }}
            >
              <Flex justify="space-between" align="baseline" mb="3">
                <Text
                  fontSize={{ base: "36px", sm: "42px" }}
                  fontWeight="900"
                  color={item.barColor}
                  lineHeight="1"
                  letterSpacing="-0.03em"
                >
                  {item.percentage}
                </Text>
                <Box
                  px="2"
                  py="0.5"
                  borderRadius="6px"
                  bg={item.barBg}
                  color={item.barColor}
                  fontSize="11px"
                  fontWeight="700"
                >
                  Allocation
                </Box>
              </Flex>

              {/* Visual Progress Bar */}
              <Box w="100%" h="6px" borderRadius="full" bg="#E2E8F0" mb="4" overflow="hidden">
                <Box w={item.percentage} h="100%" bg={item.barColor} borderRadius="full" />
              </Box>

              <Heading as="h3" fontSize="17px" fontWeight="800" color="#0F172A" mb="2">
                {item.title}
              </Heading>

              <Text fontSize="13px" color="#64748B" lineHeight="1.5">
                {item.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* 3 Trust Commitments */}
        <Box
          p={{ base: "6", sm: "8", md: "10" }}
          borderRadius="24px"
          bg="linear-gradient(135deg, #051B64 0%, #0B1C4D 100%)"
          color="#FFFFFF"
        >
          <Flex direction="column" align="center" textAlign="center" mb={{ base: "8", md: "10" }}>
            <Heading as="h3" fontSize={{ base: "20px", sm: "24px" }} fontWeight="800" mb="2">
              Our 3 Stewardship Commitments
            </Heading>
            <Text fontSize="14px" color="rgba(226, 232, 240, 0.85)" maxW="600px">
              Ensuring your investment delivers lasting educational returns for youth across Nigeria.
            </Text>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "6", md: "8" }}>
            {TRUST_PILLARS.map((pillar, idx) => (
              <Box key={idx} textAlign={{ base: "left", md: "center" }}>
                <Flex
                  w="48px"
                  h="48px"
                  borderRadius="14px"
                  bg="rgba(255, 255, 255, 0.1)"
                  align="center"
                  justify="center"
                  mb="4"
                  mx={{ base: "0", md: "auto" }}
                >
                  {pillar.icon}
                </Flex>
                <Heading as="h4" fontSize="16px" fontWeight="800" color="#FFFFFF" mb="2">
                  {pillar.title}
                </Heading>
                <Text fontSize="13px" color="rgba(226, 232, 240, 0.8)" lineHeight="1.5">
                  {pillar.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}

