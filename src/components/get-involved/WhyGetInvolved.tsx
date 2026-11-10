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
  SparklesIcon,
  TrophyIcon,
  HeartHandshakeIcon,
  UsersIcon,
  BuildingIcon,
  CheckCircleIcon,
} from "@/components/icons"

const REASONS = [
  {
    icon: <TrophyIcon size={20} color="#059669" />,
    iconBg: "rgba(5, 150, 105, 0.1)",
    title: "A Culture of Raising Champions",
    desc: "We believe every young person possesses potential that can flourish with encouragement. Our focus is on practical skills, character, and leadership confidence.",
  },
  {
    icon: <BuildingIcon size={20} color="#051B64" />,
    iconBg: "rgba(5, 27, 100, 0.1)",
    title: "Grassroots Relevance",
    desc: "We bring programmes directly into schools, community halls, and youth spaces, ensuring support reaches students who will benefit most from it.",
  },
  {
    icon: <HeartHandshakeIcon size={20} color="#149191" />,
    iconBg: "rgba(20, 145, 145, 0.12)",
    title: "Mutual Growth & Fulfillment",
    desc: "Mentoring and volunteering is a two-way street. Sharing your knowledge strengthens your own leadership, communication, and community connection.",
  },
  {
    icon: <UsersIcon size={20} color="#7C3AED" />,
    iconBg: "rgba(124, 58, 237, 0.12)",
    title: "A Purpose-Driven Network",
    desc: "Join educators, working professionals, and passionate young leaders who are actively dedicating their energy to creating positive social impact.",
  },
]

export function WhyGetInvolved() {
  return (
    <Box
      as="section"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#FFFFFF"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <SimpleGrid
          columns={{ base: 1, lg: 12 }}
          gap={{ base: "8", lg: "10" }}
          alignItems="center"
        >
          {/* Left Column: Editorial Photo & Mission Perspective (5 cols) */}
          <Box gridColumn={{ lg: "span 5" }}>
            <Box
              borderRadius="20px"
              overflow="hidden"
              boxShadow="0 16px 36px -12px rgba(5, 27, 100, 0.18)"
              border="1px solid"
              borderColor="#E2E8F0"
              mb="4"
              bg="#051B64"
            >
              <Box
                w="100%"
                h={{ base: "260px", sm: "300px", md: "340px" }}
                overflow="hidden"
                display="block"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT-wtzw2PU9xpLD37KUMCFTSg3O0LI1NrInxaZeFgoWcVX7wAXy0meFVhIy7Tux80Bk64Hw-F93XCGXEqcGaW_y0K_LrRE_xlyKR7caNje5lQhOYtFAGH6olKyy5sqDrjysrhM_Cl6CB32qzF-QcJp48oWsFdxMYyW_0oZIvwOAmXWFdLtdJPCuDQh3SPiiE5mVxzGPCV-2W48xf8h4Ni2guVuQxwTxqOiskCGyTdHj9BJuEGHHd_W"
                  alt="Professional mentors, educators, and partners collaborating in a leadership session"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            </Box>

            {/* Grounded Perspective Card */}
            <Box
              bg="#F8FAFC"
              borderRadius="16px"
              p="4"
              border="1px solid"
              borderColor="#E2E8F0"
            >
              <HStack gap="2" mb="1.5">
                <Box color="#059669">
                  <CheckCircleIcon size={16} />
                </Box>
                <Text
                  fontSize="11px"
                  fontWeight="800"
                  color="#059669"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                >
                  COLLABORATIVE CULTURE
                </Text>
              </HStack>
              <Text fontSize="12.5px" color="#334155" lineHeight="1.55" fontStyle="italic" mb="2">
                &ldquo;Investing time, skills, and institutional support fuels the development of
                tomorrow&apos;s champions. When mentors and partners collaborate with youth, everyone rises together.&rdquo;
              </Text>
              <Text fontSize="11px" fontWeight="700" color="#64748B">
                — Shared commitment across our volunteer & partner community
              </Text>
            </Box>
          </Box>

          {/* Right Column: Mission Pillars & Value proposition (7 cols) */}
          <Box gridColumn={{ lg: "span 7" }}>
            <HStack
              gap="2"
              px="3"
              py="1"
              bg="rgba(20, 145, 145, 0.08)"
              border="1px solid"
              borderColor="rgba(20, 145, 145, 0.25)"
              borderRadius="full"
              mb="2.5"
              w="fit-content"
            >
              <SparklesIcon size={13} color="#149191" />
              <Text
                fontSize="11.5px"
                fontWeight="800"
                letterSpacing="0.06em"
                textTransform="uppercase"
                color="#0F766E"
              >
                Why Get Involved?
              </Text>
            </HStack>

            <Heading
              as="h2"
              fontSize={{ base: "22px", sm: "28px", md: "34px" }}
              fontWeight="900"
              color="#051B64"
              lineHeight="1.2"
              mb="2.5"
            >
              Building Champions Through Meaningful Partnership
            </Heading>

            <Text
              fontSize={{ base: "13.5px", sm: "14.5px" }}
              color="#64748B"
              lineHeight="1.6"
              mb="6"
            >
              We believe every young person possesses boundless potential when given the right
              mentorship, environment, and opportunities. Here is why joining our movement creates lasting value:
            </Text>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
              {REASONS.map((item, i) => (
                <Box
                  key={i}
                  bg="#F8FAFC"
                  borderRadius="16px"
                  p="4.5"
                  border="1px solid"
                  borderColor="#E2E8F0"
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: "#CBD5E1",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px -4px rgba(5, 27, 100, 0.06)",
                    bg: "#FFFFFF",
                  }}
                >
                  <Box
                    p="2"
                    borderRadius="10px"
                    bg={item.iconBg}
                    w="fit-content"
                    mb="2.5"
                  >
                    {item.icon}
                  </Box>
                  <Heading
                    as="h3"
                    fontSize="15px"
                    fontWeight="800"
                    color="#051B64"
                    lineHeight="1.3"
                    mb="1.5"
                  >
                    {item.title}
                  </Heading>
                  <Text fontSize="12.5px" color="#475569" lineHeight="1.5">
                    {item.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
