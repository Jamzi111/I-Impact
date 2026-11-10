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
import Image from "next/image"
import { CalendarIcon, ClockIcon, ArrowRightIcon, SparklesIcon } from "@/components/icons"

interface FeaturedPostProps {
  onOpenArticle: (article: any) => void
}

export const FEATURED_ARTICLE_DATA = {
  id: "post-feat-1",
  title: "AS A TEEN 2026 Continental Summit Dates Announced: Empowering 2,500 Youth Delegates",
  category: "announcements",
  categoryLabel: "Program Announcement",
  date: "November 2026",
  readTime: "4 Mins Read",
  author: "Editorial Directorate",
  imageUrl: "/images/events-hero-summit.jpg",
  excerpt:
    "We are thrilled to officially unveil the dates, theme, and delegate registration roadmap for the 2026 edition of our flagship youth leadership congress. Here is what school heads, parents, and youth delegates need to know.",
  fullContent: `
We are thrilled to officially unveil the theme, dates, and delegate nomination roadmap for the 2026 edition of AS A TEEN — our continental flagship congress dedicated to empowering secondary school leaders and aspiring champions.

### Raising Champions in a Changing World
Over the last three years, AS A TEEN has grown from a regional gathering into a landmark continental summit bringing together students from government colleges, private institutions, and community clusters under one roof. The 2026 summit focuses on three pivotal pillars:

1. **Practical Ethics & Integrity**: Inspiring teenagers to build reputations anchored in honesty, accountability, and moral courage.
2. **STEM & Technological Self-Reliance**: Equipping students with hands-on maker skills so they don't just consume technology, but invent solutions for local challenges.
3. **Servant Leadership & Civic Service**: Encouraging young delegates to return to their secondary schools and communities as catalysts for positive, dignified change.

### School Delegations & Institutional Quotas
To ensure balanced representation across socio-economic lines, 60% of all delegate slots are reserved for nominations from public secondary schools and underserved districts, with full attendance subsidies provided through our generous donor and partner network.

Registration guidelines, speaker reveals, and venue details will be released in rolling updates over the coming months. We invite partner schools, educators, and mentors to prepare their student delegations early.
  `,
}

export function FeaturedPost({ onOpenArticle }: FeaturedPostProps) {
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
          bg="#FFFFFF"
          border="1px solid"
          borderColor="#E2E8F0"
          overflow="hidden"
          boxShadow="0 10px 30px -10px rgba(5, 27, 100, 0.08)"
          display="flex"
          flexDirection={{ base: "column", lg: "row" }}
          transition="all 0.25s ease"
          _hover={{
            md: {
              borderColor: "#149191",
              boxShadow: "0 15px 35px -10px rgba(20, 145, 145, 0.15)",
            },
          }}
        >
          {/* Cover Image Container */}
          <Box
            position="relative"
            w={{ base: "100%", lg: "50%" }}
            minH={{ base: "240px", sm: "300px", lg: "380px" }}
            bg="#0F172A"
          >
            <Image
              src={FEATURED_ARTICLE_DATA.imageUrl}
              alt={FEATURED_ARTICLE_DATA.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <Box
              position="absolute"
              top="16px"
              left="16px"
              px="3"
              py="1"
              borderRadius="full"
              bg="#051B64"
              color="#34D399"
              fontSize="11px"
              fontWeight="800"
              textTransform="uppercase"
              boxShadow="0 4px 10px rgba(5, 27, 100, 0.3)"
            >
              Cover Story
            </Box>
          </Box>

          {/* Text Description & Actions */}
          <Box
            p={{ base: "6", sm: "8", lg: "10" }}
            w={{ base: "100%", lg: "50%" }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box mb="4">
              <HStack gap="2.5" mb="3" color="#64748B" fontSize="12px">
                <Box
                  px="2.5"
                  py="0.8"
                  borderRadius="full"
                  bg="rgba(20, 145, 145, 0.12)"
                  color="#149191"
                  fontSize="11px"
                  fontWeight="800"
                  textTransform="uppercase"
                >
                  {FEATURED_ARTICLE_DATA.categoryLabel}
                </Box>
                <Text>•</Text>
                <HStack gap="1">
                  <ClockIcon size={13} color="#94A3B8" />
                  <Text>{FEATURED_ARTICLE_DATA.readTime}</Text>
                </HStack>
              </HStack>

              <Heading
                as="h2"
                fontSize={{ base: "20px", sm: "24px", md: "26px" }}
                fontWeight="800"
                color="#0F172A"
                lineHeight="1.3"
                mb="3"
              >
                {FEATURED_ARTICLE_DATA.title}
              </Heading>

              <Text fontSize="13.5px" color="#475569" lineHeight="1.6" mb="4">
                {FEATURED_ARTICLE_DATA.excerpt}
              </Text>
            </Box>

            <Box pt="4" borderTop="1px solid" borderColor="#F1F5F9">
              <Flex justify="space-between" align="center" wrap="wrap" gap="3">
                <Text fontSize="12px" color="#64748B" fontWeight="600">
                  By {FEATURED_ARTICLE_DATA.author} • {FEATURED_ARTICLE_DATA.date}
                </Text>

                <Button
                  onClick={() => onOpenArticle(FEATURED_ARTICLE_DATA)}
                  bg="#051B64"
                  color="#FFFFFF"
                  fontSize="13px"
                  fontWeight="700"
                  px="5"
                  py="2"
                  h="40px"
                  borderRadius="10px"
                  _hover={{ bg: "#0A257F" }}
                >
                  <HStack gap="1.5">
                    <Text>Read Full Story</Text>
                    <ArrowRightIcon size={14} />
                  </HStack>
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

