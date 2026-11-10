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
import { SparklesIcon, BookOpenIcon, ArrowRightIcon } from "@/components/icons"

export function ResourceContributeBanner() {
  return (
    <Box as="section" py={{ base: "10", sm: "12", md: "14" }} bg="#FFFFFF" borderTop="1px solid" borderColor="#E2E8F0">
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Box
          borderRadius="24px"
          bg="linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 50%, #E6FBF2 100%)"
          border="1px solid"
          borderColor="#A7F3D0"
          p={{ base: "6", sm: "8", md: "10" }}
          textAlign={{ base: "left", md: "center" }}
        >
          <Flex direction="column" align={{ base: "flex-start", md: "center" }} maxW="700px" mx="auto">
            <HStack
              gap="1.5"
              px="3"
              py="1"
              bg="#FFFFFF"
              borderRadius="full"
              border="1px solid #A7F3D0"
              color="#047857"
              fontSize="11.5px"
              fontWeight="800"
              mb="3"
            >
              <SparklesIcon size={14} color="#059669" />
              <Text textTransform="uppercase" letterSpacing="0.05em">
                Curriculum & Editorial Contributions
              </Text>
            </HStack>

            <Heading
              as="h3"
              fontSize={{ base: "20px", sm: "24px", md: "28px" }}
              fontWeight="800"
              color="#064E3B"
              mb="2.5"
            >
              Have a Youth Curriculum, Guide or Devotional to Share?
            </Heading>

            <Text fontSize="13.5px" color="#047857" lineHeight="1.6" mb="5">
              We collaborate with African educators, faith leaders, engineers, and youth psychologists
              to publish and distribute impactful educational materials freely to secondary school students.
            </Text>

            <Link href="/contact">
              <Button
                bg="#059669"
                color="#FFFFFF"
                fontSize="13px"
                fontWeight="700"
                px="6"
                py="2.5"
                h="42px"
                borderRadius="12px"
                _hover={{ bg: "#047857" }}
                boxShadow="0 4px 14px rgba(5, 150, 105, 0.25)"
              >
                <HStack gap="1.5">
                  <Text>Submit a Resource Proposal</Text>
                  <ArrowRightIcon size={14} />
                </HStack>
              </Button>
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

