"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  VStack,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  TrophyIcon,
  UsersIcon,
  MapPinIcon,
  DownloadIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/icons"
import { PAST_EVENTS_ARCHIVE, PastEventItem } from "./eventsData"

export function PastEventsSection() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null)

  const handleDownloadBrochure = (eventName: string) => {
    setDownloadSuccess(eventName)
    setTimeout(() => {
      setDownloadSuccess(null)
    }, 4000)
  }

  return (
    <Box
      as="section"
      id="past-events"
      py={{ base: "16", sm: "20", md: "24" }}
      bg="#FFFFFF"
      position="relative"
    >
      <Container maxW="1360px" px={{ base: "4", sm: "6", lg: "8" }}>
        {/* Section Header */}
        <VStack
          align="center"
          textAlign="center"
          maxW="780px"
          mx="auto"
          mb={{ base: "10", md: "14" }}
          gap="3.5"
        >
          <HStack
            gap="2"
            px="3"
            py="1"
            borderRadius="full"
            bg="rgba(20, 145, 145, 0.08)"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.2)"
          >
            <TrophyIcon size={14} color="#149191" />
            <Text
              fontSize="11px"
              fontWeight="700"
              color="#149191"
              letterSpacing="0.05em"
              textTransform="uppercase"
            >
              03 • PROVEN TRACK RECORD & ARCHIVE
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "28px", sm: "36px", md: "42px" }}
            fontWeight="800"
            color="#051B64"
            lineHeight="1.18"
            letterSpacing="-0.02em"
          >
            Past Summits & Historic Milestones
          </Heading>

          <Text fontSize={{ base: "15px", md: "16px" }} color="#64748B" lineHeight="1.65">
            Relive moments of transformation from our previous gatherings across West & East
            Africa. From Landmark Centre to classroom assemblies, here is how our champions have
            risen.
          </Text>
        </VStack>

        {/* Continental Impact Numbers Row */}
        <Box
          p={{ base: "5", md: "6" }}
          borderRadius="2xl"
          bg="linear-gradient(135deg, #051B64 0%, #0A257A 60%, #149191 100%)"
          color="#FFFFFF"
          boxShadow="0 15px 35px -5px rgba(5, 27, 100, 0.25)"
          mb={{ base: "10", md: "14" }}
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: "4", md: "6" }}>
            <VStack align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} gap="0.5">
              <Text fontSize={{ base: "26px", sm: "32px", md: "36px" }} fontWeight="800" color="#34D399" lineHeight="1">
                120,000+
              </Text>
              <Text fontSize="13px" fontWeight="700" color="#F1F5F9">
                Teens Reached
              </Text>
              <Text fontSize="11px" color="#94A3B8">
                In-person & hybrid broadcasts
              </Text>
            </VStack>

            <VStack align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} gap="0.5">
              <Text fontSize={{ base: "26px", sm: "32px", md: "36px" }} fontWeight="800" color="#FFFFFF" lineHeight="1">
                18
              </Text>
              <Text fontSize="13px" fontWeight="700" color="#F1F5F9">
                African Nations
              </Text>
              <Text fontSize="11px" color="#94A3B8">
                Delegations & watch parties
              </Text>
            </VStack>

            <VStack align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} gap="0.5">
              <Text fontSize={{ base: "26px", sm: "32px", md: "36px" }} fontWeight="800" color="#FACC15" lineHeight="1">
                450+
              </Text>
              <Text fontSize="13px" fontWeight="700" color="#F1F5F9">
                Keynote Speakers
              </Text>
              <Text fontSize="11px" color="#94A3B8">
                Founders, executives & youth mentors
              </Text>
            </VStack>

            <VStack align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} gap="0.5">
              <Text fontSize={{ base: "26px", sm: "32px", md: "36px" }} fontWeight="800" color="#38BDF8" lineHeight="1">
                98.4%
              </Text>
              <Text fontSize="13px" fontWeight="700" color="#F1F5F9">
                Satisfaction Rating
              </Text>
              <Text fontSize="11px" color="#94A3B8">
                Direct delegate feedback
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Download notification alert if triggered */}
        {downloadSuccess && (
          <Box
            p="3.5"
            mb="6"
            borderRadius="xl"
            bg="#ECFDF5"
            border="1px solid #A7F3D0"
            color="#065F46"
            display="flex"
            alignItems="center"
            gap="2.5"
          >
            <CheckCircleIcon size={18} color="#059669" />
            <Text fontSize="13px" fontWeight="600">
              Program recap for &quot;{downloadSuccess}&quot; has been queued for download.
            </Text>
          </Box>
        )}

        {/* Past Events Archive Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          {PAST_EVENTS_ARCHIVE.map((item) => (
            <Box
              key={item.id}
              borderRadius="2xl"
              bg="#FFFFFF"
              border="1px solid"
              borderColor="rgba(5, 27, 100, 0.08)"
              overflow="hidden"
              boxShadow="0 4px 18px -3px rgba(5, 27, 100, 0.05)"
              display="flex"
              flexDirection="column"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 16px 32px -4px rgba(5, 27, 100, 0.1)",
                borderColor: "rgba(20, 145, 145, 0.3)",
              }}
            >
              {/* Event Image Banner */}
              <Box position="relative" w="100%" h="200px" overflow="hidden" bg="#051B64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <Box
                  position="absolute"
                  inset="0"
                  bg="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(5, 27, 100, 0.75) 100%)"
                />

                {/* Year Pill */}
                <Box
                  position="absolute"
                  top="3"
                  left="3"
                  px="2.5"
                  py="0.5"
                  borderRadius="full"
                  bg="rgba(5, 27, 100, 0.85)"
                  backdropFilter="blur(6px)"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  color="#FFFFFF"
                  fontSize="11px"
                  fontWeight="800"
                >
                  {item.year}
                </Box>
              </Box>

              {/* Card Body */}
              <Box p={{ base: "4", sm: "5" }} display="flex" flexDirection="column" flex="1">
                {/* Title */}
                <Heading as="h3" fontSize="17px" fontWeight="800" color="#051B64" mb="2" lineHeight="1.3">
                  {item.title}
                </Heading>

                {/* Metadata */}
                <VStack align="flex-start" gap="1.5" mb="3">
                  <HStack gap="1.5" fontSize="12px" color="#64748B">
                    <MapPinIcon size={13} color="#149191" />
                    <Text lineClamp={1}>{item.venue}</Text>
                  </HStack>
                  <HStack gap="1.5" fontSize="12px" color="#059669">
                    <UsersIcon size={13} color="#059669" />
                    <Text fontWeight="600">{item.delegates} • {item.reach}</Text>
                  </HStack>
                </VStack>

                {/* Summary */}
                <Text fontSize="13px" color="#475569" lineHeight="1.6" mb="4" flex="1">
                  {item.summary}
                </Text>

                {/* Tags */}
                <Flex wrap="wrap" gap="1.5" mb="4">
                  {item.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      bg="rgba(5, 27, 100, 0.05)"
                      color="#051B64"
                      fontSize="10.5px"
                      px="2"
                      py="0.5"
                      borderRadius="md"
                    >
                      {tag}
                    </Badge>
                  ))}
                </Flex>

                {/* Action Link */}
                <Button
                  w="100%"
                  h="38px"
                  variant="outline"
                  borderColor="#E2E8F0"
                  color="#051B64"
                  borderRadius="xl"
                  fontSize="12px"
                  fontWeight="700"
                  _hover={{ bg: "#F8FAFC", borderColor: "#149191", color: "#149191" }}
                  onClick={() => handleDownloadBrochure(item.title)}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="2"
                >
                  <DownloadIcon size={14} color="currentColor" />
                  <Text>Download Recap Brochure</Text>
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
