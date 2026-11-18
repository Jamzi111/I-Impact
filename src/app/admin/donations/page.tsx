"use client"

import React from "react"
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
import Link from "next/link"
import { BanknoteIcon, ExternalLinkIcon, BarChartSquareIcon, CheckIcon, ArrowRightIcon } from "@/components/icons"

const PLANNED_FEATURES = [
  {
    title: "Payment Records",
    description: "Track all Paystack donations with donor information, amounts, and transaction references.",
    status: "planned",
  },
  {
    title: "Donation Analytics",
    description: "Monthly and cumulative donation trends, top donors, and campaign performance.",
    status: "planned",
  },
  {
    title: "Campaign Management",
    description: "Create and manage fundraising campaigns with targets and progress tracking.",
    status: "planned",
  },
  {
    title: "Donor Records",
    description: "Maintain a donor database, acknowledgement history, and repeat donor tracking.",
    status: "planned",
  },
  {
    title: "Receipt Generation",
    description: "Auto-generate and email donation receipts upon successful Paystack webhook events.",
    status: "planned",
  },
  {
    title: "Financial Reports",
    description: "Exportable monthly and annual financial summaries for internal and external reporting.",
    status: "planned",
  },
]

export default function AdminDonationsPage() {
  return (
    <Box minH="100vh" bg="#F8FAFC" color="#0F172A" pb="20">
      {/* Page Header */}
      <Box
        bg="linear-gradient(135deg, #051B64 0%, #0a2a7a 100%)"
        color="white"
        py="6"
        px={{ base: "4", md: "8" }}
        borderBottom="1px solid rgba(255,255,255,0.1)"
      >
        <Container maxW="1300px">
          <Flex justify="space-between" align="center" wrap="wrap" gap="4">
            <HStack gap="3">
              <Box bg="rgba(20,145,145,0.3)" p="2.5" borderRadius="xl">
                <BanknoteIcon size={22} color="#34D399" />
              </Box>
              <Box>
                <Heading fontSize={{ base: "lg", md: "xl" }} fontWeight="800" color="white">
                  Donations &amp; Finance
                </Heading>
                <Text fontSize="xs" color="whiteAlpha.700">
                  Coming soon · Paystack integration planned
                </Text>
              </Box>
            </HStack>

            <Badge
              bg="rgba(245, 158, 11, 0.25)"
              color="#FCD34D"
              fontSize="11px"
              fontWeight="800"
              px="3"
              py="1.5"
              borderRadius="full"
              letterSpacing="wider"
            >
              🚧 PHASE 5 — UPCOMING
            </Badge>
          </Flex>
        </Container>
      </Box>

      <Container maxW="1300px" py="10" px={{ base: "4", md: "8" }}>
        {/* Hero Notice */}
        <Box
          bg="white"
          borderRadius="2xl"
          border="2px dashed #E2E8F0"
          p={{ base: "8", md: "12" }}
          textAlign="center"
          mb="10"
        >
          <Box
            w="72px"
            h="72px"
            bg="linear-gradient(135deg, #051B64 0%, #149191 100%)"
            borderRadius="2xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            mb="5"
          >
            <BanknoteIcon size={34} color="white" />
          </Box>

          <Heading fontSize={{ base: "xl", md: "2xl" }} fontWeight="900" color="#051B64" mb="3">
            Donations &amp; Finance Module
          </Heading>

          <Text fontSize="sm" color="gray.500" maxW="560px" mx="auto" lineHeight="1.8" mb="6">
            This module will be built once I IMPACT establishes its payment infrastructure with
            Paystack. All donation tracking, receipt generation, campaign management, and financial
            reporting will live here.
          </Text>

          <HStack gap="3" justify="center" wrap="wrap">
            <Link href="/admin/reports">
              <Button
                size="sm"
                bg="#051B64"
                color="white"
                fontWeight="700"
                borderRadius="lg"
                _hover={{ bg: "#04144a" }}
                px="5"
                h="38px"
              >
                <HStack gap="1.5">
                  <BarChartSquareIcon size={14} color="white" />
                  <Text>View Impact &amp; Reports</Text>
                </HStack>
              </Button>
            </Link>

            <Link href="/donate" target="_blank">
              <Button
                size="sm"
                bg="gray.100"
                color="#051B64"
                fontWeight="700"
                borderRadius="lg"
                _hover={{ bg: "gray.200" }}
                px="5"
                h="38px"
              >
                <HStack gap="1.5">
                  <ExternalLinkIcon size={14} color="#051B64" />
                  <Text>View Public Donate Page</Text>
                </HStack>
              </Button>
            </Link>
          </HStack>
        </Box>

        {/* Planned Features Grid */}
        <Box mb="8">
          <Heading fontSize="lg" fontWeight="800" color="#051B64" mb="1">
            Planned Features
          </Heading>
          <Text fontSize="sm" color="gray.500" mb="6">
            These capabilities will be built when Paystack integration is established.
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
            {PLANNED_FEATURES.map((f) => (
              <Box
                key={f.title}
                bg="white"
                p="5"
                borderRadius="xl"
                border="1px solid #E2E8F0"
                boxShadow="sm"
                opacity={0.75}
              >
                <HStack gap="2" mb="2">
                  <Box p="1.5" bg="#F0FDF4" borderRadius="md">
                    <CheckIcon size={14} color="#10B981" />
                  </Box>
                  <Text fontWeight="700" fontSize="sm" color="#051B64">
                    {f.title}
                  </Text>
                </HStack>
                <Text fontSize="12px" color="gray.500" lineHeight="1.7">
                  {f.description}
                </Text>
                <Badge mt="3" bg="#FEF3C7" color="#92400E" fontSize="10px" fontWeight="700" px="2" borderRadius="md">
                  PLANNED
                </Badge>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Implementation Note */}
        <Box
          bg="#EFF6FF"
          border="1px solid #BFDBFE"
          borderRadius="xl"
          p="5"
        >
          <HStack gap="3" align="flex-start">
            <Box p="2" bg="#DBEAFE" borderRadius="lg" mt="0.5">
              <ArrowRightIcon size={16} color="#1D4ED8" />
            </Box>
            <VStack align="flex-start" gap="1">
              <Text fontWeight="700" fontSize="sm" color="#1D4ED8">
                Implementation Note
              </Text>
              <Text fontSize="sm" color="#1E40AF" lineHeight="1.8">
                When you are ready to build this module, it will integrate with{" "}
                <strong>Paystack webhooks</strong> to automatically record donations, generate
                PDF receipts, and populate this dashboard in real time. The{" "}
                <code
                  style={{
                    background: "#DBEAFE",
                    padding: "1px 6px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  Donation
                </code>{" "}
                MongoDB model and API routes will be scaffolded in Phase 5 of the roadmap.
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}

