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
import Image from "next/image"
import {
  ShieldCheckIcon,
  TrophyIcon,
  HeartHandshakeIcon,
  SparklesIcon,
  GlobeIcon,
  CheckCircleIcon,
} from "@/components/icons"

interface ValueCard {
  title: string
  subhead: string
  description: string
  icon: React.ReactNode
  accentColor: string
  accentBg: string
}

const VALUES: ValueCard[] = [
  {
    title: "Uncompromising Integrity",
    subhead: "Character First",
    description:
      "True leadership begins with moral courage and accountability. We teach young leaders that honesty and consistency in private define enduring success in public.",
    icon: <ShieldCheckIcon size={22} color="#051B64" />,
    accentColor: "#051B64",
    accentBg: "rgba(5, 27, 100, 0.08)",
  },
  {
    title: "Relentless Pursuit of Excellence",
    subhead: "Refusing Mediocrity",
    description:
      "A Champion strives for mastery in their craft, discipline in their daily habits, and high standards in every undertaking—big or small.",
    icon: <TrophyIcon size={22} color="#D97706" />,
    accentColor: "#D97706",
    accentBg: "rgba(245, 158, 11, 0.12)",
  },
  {
    title: "Servant Leadership & Empathy",
    subhead: "Living Beyond Self",
    description:
      "True influence is measured by how many people you lift up. We foster compassion and grassroots community responsibility through direct action.",
    icon: <HeartHandshakeIcon size={22} color="#149191" />,
    accentColor: "#149191",
    accentBg: "rgba(20, 145, 145, 0.1)",
  },
  {
    title: "Intentionality & Critical Thinking",
    subhead: "Courage to Dare",
    description:
      "We encourage young people to challenge assumptions, question limiting cultural narratives, and take ownership of their personal trajectory.",
    icon: <SparklesIcon size={22} color="#059669" />,
    accentColor: "#059669",
    accentBg: "rgba(5, 150, 105, 0.1)",
  },
  {
    title: "Pan-African Inclusivity",
    subhead: "United for Impact",
    description:
      "We celebrate the diversity of young voices across every region, ethnic background, and gender, creating an inclusive space where every youth thrives.",
    icon: <GlobeIcon size={22} color="#4F46E5" />,
    accentColor: "#4F46E5",
    accentBg: "rgba(79, 70, 229, 0.1)",
  },
]

export function CoreValues() {
  return (
    <Box
      as="section"
      id="values"
      position="relative"
      py={{ base: "14", sm: "16", md: "20" }}
      bg="linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)"
      overflow="hidden"
    >
      <Container maxW="1240px" px={{ base: "4", sm: "6", md: "8", lg: "10" }} position="relative" zIndex={1}>
        {/* Section Header */}
        <VStack align="center" textAlign="center" gap="2.5" mb={{ base: "10", md: "14" }}>
          <HStack
            bg="rgba(245, 158, 11, 0.12)"
            border="1px solid rgba(245, 158, 11, 0.3)"
            px="3.5"
            py="1"
            borderRadius="full"
            gap="2"
          >
            <Box w="6px" h="6px" borderRadius="full" bg="#B45309" />
            <Text
              fontSize="11px"
              fontWeight="800"
              color="#B45309"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              THE CHAMPION CODE
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "26px", sm: "32px", md: "38px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.15"
            letterSpacing="-0.02em"
          >
            Our Core Values
          </Heading>

          <Text fontSize={{ base: "14px", md: "15.5px" }} color="#64748B" maxW="640px" lineHeight="1.6">
            The unshakeable cultural DNA that shapes the thoughts, decisions, and character of every leader raised through I-Impact.
          </Text>
        </VStack>

        {/* Values Grid with Featured Unity Card */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "5", md: "6" }}>
          {VALUES.map((val, idx) => (
            <Box
              key={idx}
              bg="#FFFFFF"
              p={{ base: "6", sm: "7" }}
              borderRadius="22px"
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 6px 20px -4px rgba(5, 27, 100, 0.04)"
              transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{
                transform: "translateY(-4px)",
                borderColor: val.accentColor,
                boxShadow: "0 14px 32px -6px rgba(5, 27, 100, 0.1)",
              }}
            >
              <Flex
                w="46px"
                h="46px"
                borderRadius="14px"
                bg={val.accentBg}
                align="center"
                justify="center"
                mb="4"
              >
                {val.icon}
              </Flex>

              <Text
                fontSize="10.5px"
                fontWeight="800"
                color={val.accentColor}
                letterSpacing="0.08em"
                textTransform="uppercase"
                mb="1"
              >
                {val.subhead}
              </Text>

              <Heading as="h3" fontSize="18px" fontWeight="800" color="#051B64" mb="3">
                {val.title}
              </Heading>

              <Text fontSize="13px" color="#64748B" lineHeight="1.65">
                {val.description}
              </Text>
            </Box>
          ))}

          {/* 6th Card: Unity in Action Feature with Hands Image */}
          <Box
            bg="linear-gradient(145deg, #051B64 0%, #08287A 100%)"
            color="white"
            p={{ base: "6", sm: "7" }}
            borderRadius="22px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            position="relative"
            overflow="hidden"
            boxShadow="0 14px 32px -6px rgba(5, 27, 100, 0.25)"
          >
            {/* Background image overlay */}
            <Box
              position="absolute"
              inset="0"
              opacity={0.18}
              zIndex={0}
            >
              <Image
                src="/truthseeker08-hands-1917895_19201-1536x1152.png"
                alt="Interlocking hands representing unity and partnership"
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>

            <Box position="relative" zIndex={1}>
              <HStack gap="2" mb="3">
                <Box p="1.5" borderRadius="md" bg="rgba(255, 255, 255, 0.15)">
                  <GlobeIcon size={16} color="#FACC15" />
                </Box>
                <Text fontSize="11px" fontWeight="800" color="#93C5FD" letterSpacing="0.08em" textTransform="uppercase">
                  COLLECTIVE IMPACT
                </Text>
              </HStack>

              <Heading as="h3" fontSize="19px" fontWeight="800" mb="2" color="white">
                Stronger Together Across Borders
              </Heading>

              <Text fontSize="12.5px" color="whiteAlpha.800" lineHeight="1.6">
                Through alliances across Nigeria, Liberia, Cameroon, and beyond, we are proving that collaborative youth leadership can transform communities.
              </Text>
            </Box>

            <HStack position="relative" zIndex={1} pt="4" gap="2" color="#FACC15" fontSize="12px" fontWeight="700">
              <CheckCircleIcon size={14} color="#FACC15" />
              <Text>Empowering 10,000+ Champions Together</Text>
            </HStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
