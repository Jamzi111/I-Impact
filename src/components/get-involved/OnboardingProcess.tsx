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
} from "@chakra-ui/react"
import { SparklesIcon, ShieldCheckIcon } from "@/components/icons"

const ONBOARDING_STEPS = [
  {
    step: "1",
    title: "Expression of Interest",
    desc: "Complete our brief intake form below. Tell us which pathway interests you, your background, and your preferred availability.",
    meta: "Quick 3-minute form",
  },
  {
    step: "2",
    title: "Review & Conversation",
    desc: "Our team reviews your submission and connects with you for an introductory discussion on available opportunities and mutual fit.",
    meta: "Personal alignment",
  },
  {
    step: "3",
    title: "Orientation & Guidelines",
    desc: "Receive a clear orientation on I IMPACT's mission, core values, expectations, and constructive guidelines for interacting with youth.",
    meta: "Values & preparation",
  },
  {
    step: "4",
    title: "Active Participation",
    desc: "Begin your journey! You are introduced to the relevant programme team, event coordinators, or school partners to start contributing.",
    meta: "Ready to impact lives",
  },
]

export function OnboardingProcess() {
  return (
    <Box
      as="section"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#F8FAFC"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          maxW="720px"
          mx="auto"
          mb={{ base: "8", md: "12" }}
        >
          <HStack
            gap="2"
            px="3"
            py="1"
            bg="rgba(20, 145, 145, 0.08)"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.25)"
            borderRadius="full"
            mb="2.5"
          >
            <SparklesIcon size={13} color="#149191" />
            <Text
              fontSize="11.5px"
              fontWeight="800"
              letterSpacing="0.06em"
              textTransform="uppercase"
              color="#0F766E"
            >
              Simple & Transparent
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
            How Getting Involved Works
          </Heading>
          <Text
            fontSize={{ base: "13.5px", sm: "14.5px" }}
            color="#64748B"
            lineHeight="1.6"
          >
            A straightforward, welcoming process to help you get started comfortably and effectively.
          </Text>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="5" mb="8">
          {ONBOARDING_STEPS.map((item) => (
            <Box
              key={item.step}
              bg="#FFFFFF"
              borderRadius="18px"
              p={{ base: "5", md: "6" }}
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 4px 12px -4px rgba(5, 27, 100, 0.04)"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              transition="all 0.2s ease"
              _hover={{
                borderColor: "#CBD5E1",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px -4px rgba(5, 27, 100, 0.08)",
              }}
            >
              <Box mb="4">
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="full"
                  bg="#051B64"
                  color="#FFFFFF"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="900"
                  fontSize="15px"
                  mb="3.5"
                >
                  {item.step}
                </Box>
                <Heading
                  as="h3"
                  fontSize="16px"
                  fontWeight="800"
                  color="#051B64"
                  lineHeight="1.3"
                  mb="2"
                >
                  {item.title}
                </Heading>
                <Text fontSize="13px" color="#475569" lineHeight="1.55">
                  {item.desc}
                </Text>
              </Box>

              <Box pt="3" borderTop="1px solid" borderColor="#F1F5F9">
                <Text fontSize="11px" fontWeight="700" color="#149191">
                  {item.meta}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* Safeguarding Commitment Banner */}
        <Box
          bg="#FFFFFF"
          borderRadius="14px"
          p={{ base: "3.5", md: "4" }}
          border="1px solid"
          borderColor="#E2E8F0"
          maxW="820px"
          mx="auto"
        >
          <HStack align="flex-start" gap="3">
            <Box color="#059669" flexShrink={0} mt="0.5">
              <ShieldCheckIcon size={20} />
            </Box>
            <Box>
              <Text fontSize="12px" fontWeight="800" color="#051B64" mb="0.5">
                Our Commitment to Young People:
              </Text>
              <Text fontSize="12px" color="#475569" lineHeight="1.5">
                I IMPACT INITIATIVE prioritises the safety and wellbeing of every young person.
                Appropriate safeguarding guidelines and background conversations are conducted
                before assigning adults to work directly with students.
              </Text>
            </Box>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}

