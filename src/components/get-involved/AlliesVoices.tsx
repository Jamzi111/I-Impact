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
import { QuoteIcon, StarIcon, SparklesIcon } from "@/components/icons"

const VOICES = [
  {
    quote:
      "Mentoring secondary school seniors through I-Impact showed me how hungry African youth are for genuine guidance. Seeing my mentee find purpose, gain confidence, and build his first community project made every hour worth it.",
    name: "Dr. Ngozi Eke",
    role: "Senior Tech Consultant & 2-Year Mentor",
    location: "Lagos, Nigeria",
    avatarBg: "linear-gradient(135deg, #149191 0%, #0F766E 100%)",
    initials: "NE",
  },
  {
    quote:
      "Behind every seamless AS A TEEN conference is a team of young people who care deeply. The camaraderie and hands-on leadership training you gain as an on-ground volunteer has accelerated my own career more than any internship.",
    name: "Femi Balogun",
    role: "Event Logistics Volunteer Lead",
    location: "Ibadan, Nigeria",
    avatarBg: "linear-gradient(135deg, #051B64 0%, #071647 100%)",
    initials: "FB",
  },
  {
    quote:
      "I-Impact's school partnership brought an extraordinary culture shift to our students. Disciplinary challenges dropped, student enthusiasm skyrocketed, and our youth leadership prefects are now setting national standards.",
    name: "Mrs. Helen Adeyemi",
    role: "Vice Principal, Partner Secondary School",
    location: "Ogun State, Nigeria",
    avatarBg: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
    initials: "HA",
  },
]

export function AlliesVoices() {
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
              Voices of Champion Allies
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
            Stories from Those Walking Beside Us
          </Heading>
          <Text fontSize="13.5px" color="#64748B" lineHeight="1.6">
            Hear directly from active mentors, logistics volunteers, and school leaders
            who are investing their time and energy to uplift youth across our communities.
          </Text>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {VOICES.map((voice, i) => (
            <Box
              key={i}
              bg="#FFFFFF"
              borderRadius="20px"
              p={{ base: "5", md: "6" }}
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 4px 16px -4px rgba(5, 27, 100, 0.05)"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              transition="all 0.2s ease"
              _hover={{
                borderColor: "#CBD5E1",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 24px -6px rgba(5, 27, 100, 0.08)",
              }}
            >
              <Box mb="4">
                {/* 5 Stars */}
                <HStack gap="1" mb="3">
                  {[...Array(5)].map((_, s) => (
                    <StarIcon key={s} size={14} color="#F59E0B" />
                  ))}
                </HStack>

                <Text
                  fontSize="13px"
                  color="#334155"
                  lineHeight="1.65"
                  fontStyle="italic"
                >
                  &ldquo;{voice.quote}&rdquo;
                </Text>
              </Box>

              {/* Author */}
              <Flex align="center" gap="3" pt="4" borderTop="1px solid #F1F5F9">
                <Box
                  w="42px"
                  h="42px"
                  borderRadius="full"
                  bg={voice.avatarBg}
                  color="#FFFFFF"
                  fontSize="14px"
                  fontWeight="900"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  {voice.initials}
                </Box>
                <Box>
                  <Text fontSize="13.5px" fontWeight="800" color="#051B64" lineHeight="1.2">
                    {voice.name}
                  </Text>
                  <Text fontSize="11px" fontWeight="600" color="#149191" lineHeight="1.3">
                    {voice.role}
                  </Text>
                  <Text fontSize="10.5px" color="#94A3B8">
                    {voice.location}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

