"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react"
import Link from "next/link"
import { CameraIcon, DownloadIcon, ArrowRightIcon } from "@/components/icons"

export function PressKitBanner() {
  return (
    <Box as="section" py={{ base: "10", sm: "12", md: "14" }} bg="#F8FAFC">
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Box
          borderRadius="24px"
          bg="#FFFFFF"
          border="1px solid"
          borderColor="#E2E8F0"
          p={{ base: "6", sm: "8", md: "10" }}
          boxShadow="0 4px 20px -5px rgba(15, 23, 42, 0.05)"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap="6"
          >
            <Box maxW="640px">
              <HStack gap="1.5" color="#051B64" fontSize="11.5px" fontWeight="800" textTransform="uppercase" mb="2">
                <CameraIcon size={15} color="#149191" />
                <Text>Press & Media Relations</Text>
              </HStack>

              <Heading as="h3" fontSize={{ base: "19px", sm: "22px" }} fontWeight="800" color="#0F172A" mb="2">
                Need High-Resolution Photography or Press Kits?
              </Heading>

              <Text fontSize="13.5px" color="#64748B" lineHeight="1.55">
                Accredited journalists, conference partners, and school publications can request access
                to uncompressed photo galleries, executive bios, and official I-Impact brand assets.
              </Text>
            </Box>

            <HStack gap="3" flexWrap="wrap">
              <Link href="/contact">
                <Button
                  bg="#051B64"
                  color="#FFFFFF"
                  fontSize="13px"
                  fontWeight="700"
                  px="5"
                  py="2.5"
                  h="42px"
                  borderRadius="10px"
                  _hover={{ bg: "#0A257F" }}
                >
                  <HStack gap="1.5">
                    <Text>Contact Press Desk</Text>
                    <ArrowRightIcon size={14} />
                  </HStack>
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

