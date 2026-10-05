"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react"
import Image from "next/image"
import { HeartHandshakeIcon } from "@/components/icons"

export interface PartnerLogo {
  id: string
  name: string
  logo: string
}

export type PartnerItem = PartnerLogo


const PARTNERS: PartnerLogo[] = [
  {
    id: "ima",
    name: "IMA",
    logo: "/ima.png",
  },
  {
    id: "comidista",
    name: "Comidista",
    logo: "/comidista.png",
  },
  {
    id: "love-house",
    name: "Love House",
    logo: "/love-house.png",
  },
]

// Duplicate list for continuous smooth infinite scrolling
const MARQUEE_PARTNERS = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS]

export function PartnersSection() {
  return (
    <Box
      as="section"
      id="partners"
      py={{ base: "12", sm: "14", md: "16", lg: "20" }}
      bg="#FFFFFF"
      position="relative"
      overflow="hidden"
      borderBottom="1px solid"
      borderColor="#F1F5F9"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1200px" }}
        px={{ base: "4", sm: "6", md: "8" }}
        mb={{ base: "8", md: "10" }}
        textAlign="center"
      >
        <VStack gap="2.5" maxW="640px" mx="auto">
          <HStack
            bg="rgba(20, 145, 145, 0.08)"
            px="3.5"
            py="1"
            borderRadius="full"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.2)"
            gap="1.5"
          >
            <HeartHandshakeIcon size={14} color="#149191" />
            <Text
              fontSize={{ base: "11px", sm: "11.5px" }}
              fontWeight="800"
              color="#149191"
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              OUR TRUSTED PARTNERS & SPONSORS
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "22px", sm: "26px", md: "30px", lg: "32px" }}
            fontWeight="900"
            color="#051B64"
            letterSpacing="-0.025em"
            lineHeight="1.2"
          >
            Empowered by Visionary Organizations
          </Heading>
        </VStack>
      </Container>

      {/* Infinite Scrolling Logo Ticker Container */}
      <Box position="relative" w="100%" overflow="hidden" py={{ base: "3", md: "5" }}>
        {/* Left & Right Smooth Edge Fade Masks */}
        <Box
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          w={{ base: "50px", sm: "90px", md: "160px" }}
          bg="linear-gradient(to right, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)"
          zIndex={2}
          pointerEvents="none"
        />
        <Box
          position="absolute"
          top="0"
          bottom="0"
          right="0"
          w={{ base: "50px", sm: "90px", md: "160px" }}
          bg="linear-gradient(to left, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)"
          zIndex={2}
          pointerEvents="none"
        />

        {/* Continuous Moving Track */}
        <Box className="animate-marquee" display="flex" alignItems="center">
          {MARQUEE_PARTNERS.map((partner, index) => (
            <Flex
              key={`${partner.id}-${index}`}
              align="center"
              justify="center"
              px={{ base: "7", sm: "9", md: "12", lg: "14" }}
              flexShrink={0}
            >
              <Box
                position="relative"
                w={{ base: "170px", sm: "210px", md: "260px", lg: "290px" }}
                h={{ base: "70px", sm: "85px", md: "100px", lg: "115px" }}
                cursor="pointer"
                transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease"
                opacity={0.92}
                _hover={{
                  opacity: 1,
                  transform: "scale(1.08)",
                }}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} - Sponsor`}
                  fill
                  sizes="(max-width: 768px) 210px, 290px"
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
