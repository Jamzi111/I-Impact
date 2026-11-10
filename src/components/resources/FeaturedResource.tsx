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
  Button,
} from "@chakra-ui/react"
import {
  BookOpenIcon,
  DownloadIcon,
  SparklesIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/icons"

interface FeaturedResourceProps {
  onOpenPreview: (resource: any) => void
}

export const FEATURED_RESOURCE_DATA = {
  id: "feat-1",
  title: "The Champion's Mindset: Principles for Emerging African Leaders",
  author: "Samuel Joseph (Convener, I-Impact)",
  category: "Leadership Guide",
  format: "Digital PDF & E-Pub",
  pages: "72 Pages",
  level: "Teens & Young Adults",
  isFree: true,
  description:
    "A seminal, practical handbook breaking down the 4 cornerstones of personal leadership: discovering identity, cultivating unshakable discipline, navigating peer pressure, and taking responsibility for community transformation.",
  highlights: [
    "Overcoming self-doubt and building constructive self-worth",
    "Goal execution frameworks for secondary school & university students",
    "Principles of ethical influence and servant leadership",
    "Daily reflection templates and leadership journal prompts",
  ],
}

export function FeaturedResource({ onOpenPreview }: FeaturedResourceProps) {
  return (
    <Box
      as="section"
      py={{ base: "10", sm: "12", md: "14" }}
      bg="#FFFFFF"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Box
          borderRadius="24px"
          bg="linear-gradient(135deg, #051B64 0%, #09267A 50%, #0F2D88 100%)"
          p={{ base: "6", sm: "8", md: "10" }}
          color="#FFFFFF"
          position="relative"
          overflow="hidden"
          boxShadow="0 20px 45px -12px rgba(5, 27, 100, 0.28)"
        >
          {/* Subtle decorative glow */}
          <Box
            position="absolute"
            top="-20%"
            right="-10%"
            w="340px"
            h="340px"
            bg="radial-gradient(circle, rgba(20, 145, 145, 0.3) 0%, rgba(5, 27, 100, 0) 70%)"
            filter="blur(50px)"
            pointerEvents="none"
          />

          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: "8", lg: "10" }}
            align="center"
          >
            {/* Visual Book Cover Presentation */}
            <Box
              w={{ base: "100%", sm: "260px", md: "290px" }}
              flexShrink={0}
              mx="auto"
            >
              <Box
                borderRadius="16px"
                bg="linear-gradient(145deg, #0F172A 0%, #071647 100%)"
                p="6"
                border="2px solid"
                borderColor="rgba(52, 211, 153, 0.4)"
                boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                position="relative"
                textAlign="center"
              >
                <Box
                  position="absolute"
                  top="12px"
                  right="12px"
                  px="2"
                  py="0.5"
                  borderRadius="full"
                  bg="rgba(16, 185, 129, 0.2)"
                  border="1px solid"
                  borderColor="rgba(16, 185, 129, 0.5)"
                  color="#34D399"
                  fontSize="10px"
                  fontWeight="800"
                  textTransform="uppercase"
                >
                  Flagship
                </Box>

                <Flex justify="center" mb="4">
                  <Box
                    w="52px"
                    h="52px"
                    borderRadius="14px"
                    bg="rgba(52, 211, 153, 0.15)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#34D399"
                  >
                    <BookOpenIcon size={26} />
                  </Box>
                </Flex>

                <Text
                  fontSize="11px"
                  fontWeight="800"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  color="#38BDF8"
                  mb="1.5"
                >
                  I-Impact Publications
                </Text>

                <Heading
                  as="h3"
                  fontSize="17px"
                  fontWeight="900"
                  lineHeight="1.3"
                  color="#FFFFFF"
                  mb="2"
                >
                  The Champion's Mindset
                </Heading>

                <Text fontSize="12px" color="#94A3B8" mb="4">
                  By Samuel Joseph
                </Text>

                <HStack justify="center" gap="1.5" color="#FBBF24" mb="4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={13} color="#FBBF24" />
                  ))}
                  <Text fontSize="11px" color="#CBD5E1" ml="1" fontWeight="700">
                    5.0 (980+ Readers)
                  </Text>
                </HStack>

                <Box
                  pt="3"
                  borderTop="1px solid"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  fontSize="11px"
                  color="#CBD5E1"
                >
                  <Text>72 Pages</Text>
                  <Text color="#34D399" fontWeight="700">Free PDF</Text>
                </Box>
              </Box>
            </Box>

            {/* Content & Action Description */}
            <Box flex="1">
              <HStack gap="2" mb="2">
                <Box
                  px="2.5"
                  py="0.8"
                  borderRadius="full"
                  bg="rgba(52, 211, 153, 0.18)"
                  color="#34D399"
                  fontSize="11px"
                  fontWeight="800"
                  textTransform="uppercase"
                >
                  Featured Reading
                </Box>
                <Text fontSize="12px" color="#94A3B8">
                  • Published for AS A TEEN Delegates
                </Text>
              </HStack>

              <Heading
                as="h2"
                fontSize={{ base: "20px", sm: "24px", md: "28px" }}
                fontWeight="800"
                lineHeight="1.25"
                color="#FFFFFF"
                mb="3"
              >
                {FEATURED_RESOURCE_DATA.title}
              </Heading>

              <Text
                fontSize={{ base: "13px", md: "14px" }}
                color="rgba(226, 232, 240, 0.88)"
                lineHeight="1.6"
                mb="5"
              >
                {FEATURED_RESOURCE_DATA.description}
              </Text>

              {/* Highlights List */}
              <Box mb="6">
                <Text
                  fontSize="12px"
                  fontWeight="800"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                  color="#38BDF8"
                  mb="3"
                >
                  What You Will Learn:
                </Text>
                <VStack align="stretch" gap="2">
                  {FEATURED_RESOURCE_DATA.highlights.map((h, i) => (
                    <Flex key={i} gap="2" align="flex-start">
                      <Box color="#34D399" mt="0.5" flexShrink={0}>
                        <CheckCircleIcon size={15} />
                      </Box>
                      <Text fontSize="12.5px" color="rgba(226, 232, 240, 0.85)" lineHeight="1.45">
                        {h}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>

              {/* Action Buttons */}
              <HStack gap="3" flexWrap="wrap">
                <Button
                  onClick={() => onOpenPreview(FEATURED_RESOURCE_DATA)}
                  bg="#149191"
                  color="#FFFFFF"
                  fontSize="13px"
                  fontWeight="700"
                  px="5"
                  py="2.5"
                  h="42px"
                  borderRadius="10px"
                  _hover={{
                    bg: "#107979",
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.15s ease"
                >
                  <HStack gap="2">
                    <DownloadIcon size={16} />
                    <Text>Download Free Copy (.PDF)</Text>
                  </HStack>
                </Button>

                <Button
                  onClick={() => onOpenPreview(FEATURED_RESOURCE_DATA)}
                  variant="outline"
                  borderColor="rgba(255, 255, 255, 0.25)"
                  color="#FFFFFF"
                  fontSize="13px"
                  fontWeight="700"
                  px="4"
                  py="2.5"
                  h="42px"
                  borderRadius="10px"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  Preview Chapters & TOC →
                </Button>
              </HStack>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

