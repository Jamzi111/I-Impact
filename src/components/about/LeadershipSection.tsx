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
  Badge,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  UsersIcon,
  TrophyIcon,
  GlobeIcon,
  SparklesIcon,
  HeartHandshakeIcon,
  CheckCircleIcon,
} from "@/components/icons"

interface LeaderProfile {
  name: string
  role: string
  country: string
  countryCode: string
  organization: string
  bio: string
  avatarBg: string
  accentColor: string
}

const LEADERS: LeaderProfile[] = [
  {
    name: "Samuel Joseph",
    role: "Convener & Founder",
    country: "Nigeria",
    countryCode: "🇳🇬",
    organization: "I-IMPACT INITIATIVE",
    bio: "Passionate youth development strategist, speaker, and convener dedicated to shifting African youth mindsets and building a continent-wide ecosystem of champions.",
    avatarBg: "linear-gradient(135deg, #051B64 0%, #149191 100%)",
    accentColor: "#051B64",
  },
  {
    name: "Alan Daylee Yealu",
    role: "CEO & African Mind Builder",
    country: "Liberia",
    countryCode: "🇱🇷",
    organization: "African Mind Builder",
    bio: "International leadership coach and mindset transformer working across West Africa to equip the emerging generation with ethical leadership and critical thinking.",
    avatarBg: "linear-gradient(135deg, #149191 0%, #059669 100%)",
    accentColor: "#149191",
  },
  {
    name: "Abigail Mbatu",
    role: "Founder & Youth Advocate",
    country: "Cameroon",
    countryCode: "🇨🇲",
    organization: "Girls for Global Impact",
    bio: "Visionary civic leader championing female leadership, grassroots education, and youth empowerment initiatives across Central and West Africa.",
    avatarBg: "linear-gradient(135deg, #4F46E5 0%, #051B64 100%)",
    accentColor: "#4F46E5",
  },
]

export function LeadershipSection() {
  return (
    <Box
      as="section"
      id="leadership"
      position="relative"
      py={{ base: "14", sm: "16", md: "20" }}
      bg="#FFFFFF"
      overflow="hidden"
    >
      <Container maxW="1240px" px={{ base: "4", sm: "6", md: "8", lg: "10" }}>
        {/* Header */}
        <VStack align="center" textAlign="center" gap="2.5" mb={{ base: "10", md: "14" }}>
          <HStack
            bg="rgba(5, 27, 100, 0.06)"
            border="1px solid rgba(5, 27, 100, 0.12)"
            px="3.5"
            py="1"
            borderRadius="full"
            gap="2"
          >
            <Box w="6px" h="6px" borderRadius="full" bg="#051B64" />
            <Text
              fontSize="11px"
              fontWeight="800"
              color="#051B64"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              VISIONARY LEADERS & ADVOCATES
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
            Leadership & Core Drivers
          </Heading>

          <Text fontSize={{ base: "14px", md: "15.5px" }} color="#64748B" maxW="640px" lineHeight="1.6">
            Meet the passionate visionaries, conveners, and pan-African mind builders steering the mission of I IMPACT INITIATIVE.
          </Text>
        </VStack>

        {/* Leaders Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "6", md: "7" }} mb="12">
          {LEADERS.map((leader, idx) => (
            <Box
              key={idx}
              bg="#FFFFFF"
              borderRadius="24px"
              p={{ base: "6", sm: "7" }}
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 8px 24px -4px rgba(5, 27, 100, 0.05)"
              transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              position="relative"
              overflow="hidden"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 18px 36px -6px rgba(5, 27, 100, 0.12)",
                borderColor: leader.accentColor,
              }}
            >
              {/* Top Accent bar */}
              <Box position="absolute" top="0" left="0" right="0" h="4px" bg={leader.avatarBg} />

              <VStack align="flex-start" gap="4">
                {/* Header Row: Initials Badge + Country Flag */}
                <Flex justify="space-between" align="center" w="100%">
                  <Flex
                    w="54px"
                    h="54px"
                    borderRadius="16px"
                    bg={leader.avatarBg}
                    color="white"
                    align="center"
                    justify="center"
                    fontSize="20px"
                    fontWeight="900"
                    boxShadow="0 4px 12px rgba(5, 27, 100, 0.2)"
                  >
                    {leader.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Flex>

                  <Badge
                    display="inline-flex"
                    alignItems="center"
                    gap="1"
                    bg="rgba(5, 27, 100, 0.06)"
                    color="#051B64"
                    px="2.5"
                    py="1"
                    borderRadius="full"
                    fontSize="11px"
                    fontWeight="700"
                  >
                    <Text as="span">{leader.countryCode}</Text>
                    <Text as="span">{leader.country}</Text>
                  </Badge>
                </Flex>

                <Box>
                  <Heading as="h3" fontSize="19px" fontWeight="800" color="#051B64" mb="1">
                    {leader.name}
                  </Heading>
                  <Text fontSize="12px" fontWeight="700" color="#059669">
                    {leader.role}
                  </Text>
                  <Text fontSize="11px" color="#94A3B8" fontWeight="600">
                    {leader.organization}
                  </Text>
                </Box>

                <Text fontSize="13px" color="#64748B" lineHeight="1.65">
                  {leader.bio}
                </Text>

                <HStack gap="1.5" pt="1" color="#051B64" fontSize="11.5px" fontWeight="700">
                  <CheckCircleIcon size={14} color="#059669" />
                  <Text>Keynote Convener & Mentor</Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Mentorship Network Banner */}
        <Box
          bg="linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)"
          p={{ base: "6", md: "8" }}
          borderRadius="20px"
          border="1px solid"
          borderColor="#E2E8F0"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
            gap="5"
          >
            <HStack gap="3.5" align="center">
              <Box
                w="46px"
                h="46px"
                borderRadius="14px"
                bg="rgba(20, 145, 145, 0.12)"
                color="#149191"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <HeartHandshakeIcon size={22} />
              </Box>
              <Box>
                <Heading as="h4" fontSize="16px" fontWeight="800" color="#051B64">
                  Supported by 50+ Dedicated Mentors & Community Partners
                </Heading>
                <Text fontSize="12.5px" color="#64748B">
                  Our network spans industry executives, tech innovators, educators, and grassroots activists across Africa.
                </Text>
              </Box>
            </HStack>

            <HStack gap="2" flexWrap="nowrap">
              <Badge bg="#E0F2FE" color="#0369A1" px="3" py="1" borderRadius="full" fontSize="11px" fontWeight="700">
                Lagos
              </Badge>
              <Badge bg="#DCFCE7" color="#15803D" px="3" py="1" borderRadius="full" fontSize="11px" fontWeight="700">
                Abuja
              </Badge>
              <Badge bg="#FEF3C7" color="#B45309" px="3" py="1" borderRadius="full" fontSize="11px" fontWeight="700">
                Monrovia
              </Badge>
              <Badge bg="#EDE9FE" color="#6D28D9" px="3" py="1" borderRadius="full" fontSize="11px" fontWeight="700">
                Yaoundé
              </Badge>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
