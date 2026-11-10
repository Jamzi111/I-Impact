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
import { ArrowRightIcon, MailIcon, SparklesIcon } from "@/components/icons"

export function GetInvolvedCTA() {
  const handleScrollToForm = () => {
    if (typeof window === "undefined") return
    const el = document.getElementById("application-form")
    if (el) {
      const headerOffset = 84
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <Box
      as="section"
      py={{ base: "12", sm: "14", md: "16" }}
      bg="#051B64"
      color="#FFFFFF"
      position="relative"
      overflow="hidden"
    >
      {/* Ambient background glow */}
      <Box
        position="absolute"
        top="-20%"
        right="10%"
        w={{ base: "260px", md: "460px" }}
        h={{ base: "260px", md: "460px" }}
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.18) 0%, rgba(5, 27, 100, 0) 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
        position="relative"
        zIndex={1}
      >
        <Box
          bg="rgba(255, 255, 255, 0.05)"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.12)"
          borderRadius="24px"
          p={{ base: "6", sm: "8", md: "10" }}
          backdropFilter="blur(10px)"
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "flex-start", lg: "center" }}
            justify="space-between"
            gap="8"
          >
            <Box maxW="640px">
              <HStack
                gap="2"
                px="3"
                py="1"
                bg="rgba(20, 145, 145, 0.18)"
                border="1px solid"
                borderColor="rgba(20, 145, 145, 0.35)"
                borderRadius="full"
                mb="3"
                w="fit-content"
              >
                <SparklesIcon size={12} color="#34D399" />
                <Text
                  fontSize="11px"
                  fontWeight="800"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  color="#34D399"
                >
                  Join Hands With Us
                </Text>
              </HStack>

              <Heading
                as="h2"
                fontSize={{ base: "22px", sm: "28px", md: "34px" }}
                fontWeight="900"
                lineHeight="1.2"
                mb="3"
              >
                Ready to Make a Difference?
              </Heading>

              <Text
                fontSize={{ base: "13.5px", sm: "14.5px" }}
                color="rgba(226, 232, 240, 0.9)"
                lineHeight="1.6"
              >
                Whether you are an individual, an educational institution or an organisation,
                we welcome conversations about how we can work together to create opportunities for young people.
              </Text>
            </Box>

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap="3"
              w={{ base: "100%", lg: "auto" }}
              flexShrink={0}
            >
              <Button
                onClick={handleScrollToForm}
                h="48px"
                px="6"
                bg="#149191"
                color="#FFFFFF"
                fontSize="13.5px"
                fontWeight="800"
                borderRadius="12px"
                boxShadow="0 4px 16px rgba(20, 145, 145, 0.4)"
                _hover={{
                  bg: "#0F766E",
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s ease"
              >
                <HStack gap="2">
                  <Text>Start Your Application</Text>
                  <ArrowRightIcon size={15} />
                </HStack>
              </Button>

              <Link href="/contact" style={{ display: "inline-block" }}>
                <Button
                  w="100%"
                  h="48px"
                  px="6"
                  bg="rgba(255, 255, 255, 0.08)"
                  color="#FFFFFF"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  fontSize="13.5px"
                  fontWeight="700"
                  borderRadius="12px"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(255, 255, 255, 0.35)",
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.2s ease"
                >
                  <HStack gap="2">
                    <MailIcon size={15} color="#34D399" />
                    <Text>Contact Our Team</Text>
                  </HStack>
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

