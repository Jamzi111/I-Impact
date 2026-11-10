"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react"
import { MailIcon, CheckCircleIcon, SparklesIcon } from "@/components/icons"

export function NewsletterCard() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
    }, 700)
  }

  return (
    <Box as="section" py={{ base: "12", sm: "14", md: "16" }} bg="#FFFFFF" borderTop="1px solid" borderColor="#E2E8F0">
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Box
          borderRadius="24px"
          bg="linear-gradient(135deg, #051B64 0%, #0A257F 50%, #0F2D88 100%)"
          color="#FFFFFF"
          p={{ base: "6", sm: "8", md: "10" }}
          position="relative"
          overflow="hidden"
          boxShadow="0 15px 35px -10px rgba(5, 27, 100, 0.25)"
        >
          {/* Subtle Glow */}
          <Box
            position="absolute"
            bottom="-20%"
            right="-10%"
            w="280px"
            h="280px"
            bg="radial-gradient(circle, rgba(20, 145, 145, 0.25) 0%, rgba(5, 27, 100, 0) 70%)"
            filter="blur(50px)"
            pointerEvents="none"
          />

          <Flex
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            align={{ base: "flex-start", lg: "center" }}
            gap="8"
          >
            <Box maxW="580px">
              <HStack gap="2" mb="3">
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="8px"
                  bg="rgba(52, 211, 153, 0.15)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="#34D399"
                >
                  <MailIcon size={16} />
                </Box>
                <Text
                  fontSize="11.5px"
                  fontWeight="800"
                  color="#34D399"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  Stay Connected With I IMPACT
                </Text>
              </HStack>

              <Heading
                as="h2"
                fontSize={{ base: "22px", sm: "26px", md: "30px" }}
                fontWeight="800"
                lineHeight="1.25"
                color="#FFFFFF"
                mb="2.5"
              >
                Never Miss a Breakthrough, Opportunity, or Summit
              </Heading>

              <Text fontSize="13.5px" color="rgba(226, 232, 240, 0.85)" lineHeight="1.55">
                Join our newsletter community to receive event announcements, youth leadership opportunities,
                exclusive articles, and field progress reports delivered straight to your inbox.
              </Text>

              {/* What you receive check items */}
              <Flex gap="4" mt="4" wrap="wrap" fontSize="12px" color="#93C5FD">
                <HStack gap="1.5">
                  <CheckCircleIcon size={13} color="#34D399" />
                  <Text>Event announcements</Text>
                </HStack>
                <HStack gap="1.5">
                  <CheckCircleIcon size={13} color="#34D399" />
                  <Text>Youth opportunities</Text>
                </HStack>
                <HStack gap="1.5">
                  <CheckCircleIcon size={13} color="#34D399" />
                  <Text>Thought articles</Text>
                </HStack>
              </Flex>
            </Box>

            {/* Subscription Form */}
            <Box w={{ base: "100%", lg: "420px" }} flexShrink={0}>
              {isSubscribed ? (
                <Box
                  p="5"
                  borderRadius="16px"
                  bg="rgba(16, 185, 129, 0.15)"
                  border="1px solid rgba(16, 185, 129, 0.4)"
                  textAlign="center"
                >
                  <Flex justify="center" mb="2">
                    <CheckCircleIcon size={24} color="#34D399" />
                  </Flex>
                  <Text fontSize="15px" fontWeight="800" color="#FFFFFF" mb="1">
                    Welcome to the Champion Circle!
                  </Text>
                  <Text fontSize="12.5px" color="#CBD5E1">
                    You're now subscribed. We promise to send only valuable dispatches and respect your inbox.
                  </Text>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <VStack align="stretch" gap="3">
                    <Box
                      bg="#FFFFFF"
                      borderRadius="14px"
                      p="1.5"
                      boxShadow="0 6px 20px rgba(0, 0, 0, 0.2)"
                    >
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "none",
                          outline: "none",
                          fontSize: "13.5px",
                          color: "#0F172A",
                          fontWeight: 600,
                          borderRadius: "10px",
                        }}
                      />
                    </Box>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      w="100%"
                      h="44px"
                      bg="#149191"
                      color="#FFFFFF"
                      fontSize="13.5px"
                      fontWeight="800"
                      borderRadius="12px"
                      _hover={{ bg: "#107979", transform: "translateY(-1px)" }}
                      transition="all 0.15s ease"
                    >
                      {isSubmitting ? "Connecting..." : "Subscribe to Updates →"}
                    </Button>

                    <Text fontSize="11px" color="rgba(226, 232, 240, 0.65)" textAlign="center">
                      Zero spam. One-click unsubscribe anytime.
                    </Text>
                  </VStack>
                </form>
              )}
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

