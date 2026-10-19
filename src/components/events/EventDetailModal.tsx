"use client"

import React, { useState } from "react"
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  CloseIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  DownloadIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@/components/icons"
import { EventData } from "./eventsData"

interface EventDetailModalProps {
  isOpen: boolean
  onClose: () => void
  event: EventData | null
  onRegisterClick?: (event: EventData) => void
}

export function EventDetailModal({
  isOpen,
  onClose,
  event,
  onRegisterClick,
}: EventDetailModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  if (!isOpen || !event) return null

  const handleDownload = () => {
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 3500)
  }

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="4"
      bg="rgba(5, 12, 30, 0.75)"
      backdropFilter="blur(8px)"
      animation="fadeIn 0.2s ease"
    >
      <Box
        w="100%"
        maxW="680px"
        maxH="90vh"
        overflowY="auto"
        bg="#FFFFFF"
        borderRadius="2xl"
        boxShadow="0 25px 60px -15px rgba(0, 0, 0, 0.4)"
        border="1px solid rgba(5, 27, 100, 0.1)"
        position="relative"
        overflow="hidden"
      >
        {/* Banner Image or Top Accent Bar */}
        <Box position="relative" w="100%" h={{ base: "180px", sm: "220px" }} bg="#060B19">
          <Image
            src={event.bannerImageUrl || "/images/events-hero-summit.jpg"}
            alt={event.title}
            fill
            sizes="680px"
            style={{ objectFit: "cover" }}
          />
          <Box
            position="absolute"
            inset="0"
            bg="linear-gradient(180deg, rgba(6, 11, 25, 0.2) 0%, rgba(6, 11, 25, 0.9) 100%)"
          />

          {/* Close Button */}
          <Box
            as="button"
            aria-label="Close modal"
            onClick={onClose}
            position="absolute"
            top="3.5"
            right="3.5"
            p="2"
            borderRadius="full"
            bg="rgba(0, 0, 0, 0.5)"
            color="#FFFFFF"
            _hover={{ bg: "rgba(0, 0, 0, 0.8)" }}
            cursor="pointer"
            zIndex={10}
          >
            <CloseIcon size={16} />
          </Box>

          {/* Banner Title & Theme */}
          <Box position="absolute" bottom="4" left="5" right="5">
            <HStack gap="2" mb="1">
              <Badge bg="#059669" color="#FFFFFF" px="2.5" py="0.5" borderRadius="full" fontSize="10px">
                {event.badge}
              </Badge>
              {event.theme && (
                <Badge bg="rgba(255, 255, 255, 0.2)" color="#FFFFFF" px="2.5" py="0.5" borderRadius="full" fontSize="10px">
                  THEME: {event.theme}
                </Badge>
              )}
            </HStack>
            <Heading as="h2" fontSize={{ base: "19px", sm: "23px" }} fontWeight="800" color="#FFFFFF" lineHeight="1.2">
              {event.title}
            </Heading>
          </Box>
        </Box>

        {/* Modal Content Body */}
        <Box p={{ base: "5", sm: "6" }}>
          {/* Metadata Grid */}
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mb="5" p="3.5" bg="#F8FAFC" borderRadius="xl">
            <HStack gap="2" align="flex-start" fontSize="12.5px" color="#334155">
              <CalendarIcon size={15} color="#149191" style={{ marginTop: "2px", flexShrink: 0 }} />
              <Box>
                <Text fontWeight="700">{event.dateDisplay}</Text>
                <Text fontSize="11px" color="#64748B">{event.timeDisplay}</Text>
              </Box>
            </HStack>

            <HStack gap="2" align="flex-start" fontSize="12.5px" color="#334155">
              <MapPinIcon size={15} color="#051B64" style={{ marginTop: "2px", flexShrink: 0 }} />
              <Box>
                <Text fontWeight="700">{event.venue.split("&")[0]}</Text>
                <Text fontSize="11px" color="#64748B">{event.mode}</Text>
              </Box>
            </HStack>
          </SimpleGrid>

          {/* Overview */}
          <Box mb="5">
            <Text fontSize="12px" fontWeight="800" color="#051B64" letterSpacing="0.05em" textTransform="uppercase" mb="1.5">
              Event Overview
            </Text>
            <Text fontSize="13.5px" color="#475569" lineHeight="1.65">
              {event.fullOverview || event.description}
            </Text>
          </Box>

          {/* Featured Speakers if available */}
          {event.speakers && event.speakers.length > 0 && (
            <Box mb="5">
              <Text fontSize="12px" fontWeight="800" color="#051B64" letterSpacing="0.05em" textTransform="uppercase" mb="2">
                Featured Keynote Speakers
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 3 }} gap="3">
                {event.speakers.map((sp, idx) => (
                  <Box
                    key={idx}
                    p="3"
                    borderRadius="xl"
                    bg="#F1F5F9"
                    border="1px solid #E2E8F0"
                  >
                    <Text fontSize="13px" fontWeight="700" color="#051B64">
                      {sp.name}
                    </Text>
                    <Text fontSize="11px" fontWeight="600" color="#149191">
                      {sp.role}
                    </Text>
                    <Text fontSize="10.5px" color="#64748B">
                      {sp.organization} ({sp.country})
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {/* Highlights */}
          {event.highlights && (
            <Box mb="6">
              <Text fontSize="12px" fontWeight="800" color="#051B64" letterSpacing="0.05em" textTransform="uppercase" mb="2">
                What to Expect
              </Text>
              <VStack align="flex-start" gap="1.5">
                {event.highlights.map((hl, i) => (
                  <HStack key={i} align="flex-start" gap="2" fontSize="13px" color="#334155">
                    <CheckCircleIcon size={14} color="#059669" style={{ marginTop: "3px", flexShrink: 0 }} />
                    <Text>{hl}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          )}

          {/* Download Notice if triggered */}
          {downloadSuccess && (
            <Box p="3" mb="4" borderRadius="lg" bg="#ECFDF5" border="1px solid #A7F3D0" color="#065F46" fontSize="12.5px" display="flex" gap="2" alignItems="center">
              <CheckCircleIcon size={15} color="#059669" />
              <Text fontWeight="600">Brochure downloaded successfully.</Text>
            </Box>
          )}

          {/* Bottom Action Buttons */}
          <Flex direction={{ base: "column", sm: "row" }} gap="3" pt="4" borderTop="1px solid #F1F5F9">
            <Button
              flex="1"
              h="46px"
              bg="#059669"
              color="#FFFFFF"
              borderRadius="xl"
              fontWeight="700"
              fontSize="14px"
              _hover={{ bg: "#047857" }}
              onClick={() => {
                onClose()
                onRegisterClick?.(event)
              }}
            >
              {event.registrationBtnText || "Register as Delegate"}
            </Button>

            <Button
              h="46px"
              px="5"
              variant="outline"
              borderColor="#CBD5E1"
              color="#051B64"
              borderRadius="xl"
              fontWeight="600"
              fontSize="13px"
              _hover={{ bg: "#F8FAFC", borderColor: "#149191" }}
              onClick={handleDownload}
              display="flex"
              alignItems="center"
              gap="2"
            >
              <DownloadIcon size={15} color="#051B64" />
              <Text>Brochure PDF</Text>
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
