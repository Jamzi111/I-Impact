"use client"

import React, { useState } from "react"
import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react"
import {
  CloseIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ExternalLinkIcon,
  BarChartSquareIcon,
  SearchIcon,
} from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"

interface CapstoneRecord {
  id: string
  title: string
  school: string
  hub: string
  cohort: string
  category: string
  mentor: string
  ledgerHash: string
  impactMetric: string
  status: "VERIFIED" | "AUDITED"
}

const VERIFIED_CAPSTONES: CapstoneRecord[] = [
  {
    id: "CAP-2024-081",
    title: "AgroTech Soil Sensor & Irrigation Hub",
    school: "Government Model College, Ikorodu",
    hub: "Lagos Innovates Maker Lab",
    cohort: "Cohort 2024 - STEM Track",
    category: "Hardware & IoT",
    mentor: "Engr. T. Balogun (Lead IoT Architect)",
    ledgerHash: "0x8f2a...c94b",
    impactMetric: "32 Community Farms Automated",
    status: "VERIFIED",
  },
  {
    id: "CAP-2024-114",
    title: "Civic Health Triage SMS Bot",
    school: "Community Comprehensive High School, Surulere",
    hub: "Yaba Civic Tech Cluster",
    cohort: "Cohort 2024 - AI & Software",
    category: "Health Informatics",
    mentor: "Dr. A. Ekwueme (Clinical Informatics)",
    ledgerHash: "0x3e1d...7a29",
    impactMetric: "14,800+ Consult Queries Routed",
    status: "VERIFIED",
  },
  {
    id: "CAP-2024-149",
    title: "Solar E-Waste Micro-Battery Pack",
    school: "Government Secondary School, Garki Abuja",
    hub: "Abuja Tech Innovate Lab",
    cohort: "Cohort 2024 - CleanTech",
    category: "Clean Energy",
    mentor: "Engr. K. Danladi (Renewable Systems)",
    ledgerHash: "0x6c90...e581",
    impactMetric: "180 Off-grid Study Lamps Powered",
    status: "AUDITED",
  },
]

interface VerifyCapstonesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VerifyCapstonesModal({ isOpen, onClose }: VerifyCapstonesModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  if (!isOpen) return null

  const filteredCapstones = VERIFIED_CAPSTONES.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hub.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ledgerHash.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: "4", sm: "6" }}
    >
      {/* Backdrop */}
      <Box
        position="absolute"
        inset="0"
        bg="rgba(11, 15, 40, 0.72)"
        backdropFilter="blur(8px)"
        onClick={onClose}
        transition="opacity 0.2s ease"
      />

      {/* Modal Container */}
      <Box
        position="relative"
        zIndex={1}
        w="100%"
        maxW="820px"
        maxH="90vh"
        bg="#FFFFFF"
        borderRadius="20px"
        boxShadow="0 25px 60px -15px rgba(0, 0, 0, 0.35)"
        border="1px solid"
        borderColor="rgba(226, 232, 240, 0.9)"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {/* Modal Header */}
        <Box
          p={{ base: "5", sm: "6" }}
          borderBottom="1px solid"
          borderColor="#F1F5F9"
          bg="#FAFCFF"
        >
          <Flex justify="space-between" align="flex-start" gap="4">
            <Box>
              <HStack gap="2" mb="2">
                <Box
                  p="1.5"
                  borderRadius="8px"
                  bg="rgba(16, 185, 129, 0.12)"
                  color="#059669"
                >
                  <ShieldCheckIcon size={18} />
                </Box>
                <Text
                  fontSize="12px"
                  fontWeight="800"
                  color="#059669"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                >
                  Verified Capstone Ledger
                </Text>
                <LiveDot color="#10B981" size={6} />
              </HStack>
              <Heading
                as="h3"
                fontSize={{ base: "20px", sm: "24px" }}
                fontWeight="800"
                color="#0F172A"
              >
                Immutable Public Capstone Registry
              </Heading>
              <Text fontSize="13px" color="#64748B" mt="1">
                Direct cryptographic proof of student projects, field mentorship hours, and community outcomes.
              </Text>
            </Box>

            <Button
              onClick={onClose}
              variant="plain"
              p="2"
              minW="auto"
              h="auto"
              color="#64748B"
              _hover={{ color: "#0F172A", bg: "#F1F5F9" }}
              borderRadius="8px"
              aria-label="Close modal"
            >
              <CloseIcon size={20} />
            </Button>
          </Flex>

          {/* Quick Search Bar */}
          <Box mt="4" position="relative">
            <Box
              position="absolute"
              left="3"
              top="50%"
              transform="translateY(-50%)"
              color="#94A3B8"
              pointerEvents="none"
            >
              <SearchIcon size={16} />
            </Box>
            <input
              type="text"
              placeholder="Search by student project, school, hub, or ledger hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: "36px",
                paddingRight: "16px",
                paddingTop: "10px",
                paddingBottom: "10px",
                fontSize: "13px",
                borderRadius: "10px",
                border: "1px solid #E2E8F0",
                outline: "none",
                background: "#FFFFFF",
                color: "#0F172A",
              }}
            />
          </Box>
        </Box>

        {/* Modal Body - Capstone Records List */}
        <Box
          p={{ base: "4", sm: "6" }}
          overflowY="auto"
          flex="1"
          display="flex"
          flexDirection="column"
          gap="4"
        >
          {filteredCapstones.map((cap) => (
            <Box
              key={cap.id}
              p="4"
              borderRadius="14px"
              border="1px solid"
              borderColor="#E2E8F0"
              bg="#FFFFFF"
              transition="all 0.2s ease"
              _hover={{
                borderColor: "#059669",
                boxShadow: "0 8px 20px -6px rgba(5, 150, 105, 0.12)",
              }}
            >
              <Flex
                justify="space-between"
                align={{ base: "flex-start", sm: "center" }}
                direction={{ base: "column", sm: "row" }}
                gap="2"
                mb="2"
              >
                <HStack gap="2">
                  <Box
                    px="2.5"
                    py="1"
                    borderRadius="6px"
                    bg="rgba(5, 150, 105, 0.1)"
                    color="#047857"
                    fontSize="11px"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    {cap.id}
                  </Box>
                  <Box
                    px="2"
                    py="0.5"
                    borderRadius="6px"
                    bg="#EEF2FF"
                    color="#4338CA"
                    fontSize="11px"
                    fontWeight="600"
                  >
                    {cap.category}
                  </Box>
                </HStack>

                <HStack gap="1.5" color="#059669" fontSize="12px" fontWeight="700">
                  <CheckCircleIcon size={14} />
                  <Text>{cap.status}</Text>
                  <Text color="#94A3B8">•</Text>
                  <Text color="#64748B" fontFamily="monospace" fontSize="11px">
                    Hash: {cap.ledgerHash}
                  </Text>
                </HStack>
              </Flex>

              <Heading
                as="h4"
                fontSize="16px"
                fontWeight="700"
                color="#0F172A"
                mb="1"
              >
                {cap.title}
              </Heading>

              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2" mt="3" fontSize="12px">
                <Box>
                  <Text color="#64748B">School & Hub:</Text>
                  <Text fontWeight="600" color="#1E293B">
                    {cap.school} • {cap.hub}
                  </Text>
                </Box>
                <Box>
                  <Text color="#64748B">Direct Field Mentor:</Text>
                  <Text fontWeight="600" color="#1E293B">
                    {cap.mentor}
                  </Text>
                </Box>
              </SimpleGrid>

              <Box
                mt="3"
                pt="3"
                borderTop="1px dashed"
                borderColor="#E2E8F0"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack gap="2">
                  <Box color="#059669">
                    <BarChartSquareIcon size={15} />
                  </Box>
                  <Text fontSize="12px" fontWeight="700" color="#047857">
                    Verified Outcome: {cap.impactMetric}
                  </Text>
                </HStack>

                <HStack gap="1" color="#4338CA" fontSize="11px" fontWeight="700" cursor="pointer">
                  <Text>View Audit Trail</Text>
                  <ExternalLinkIcon size={12} />
                </HStack>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Modal Footer */}
        <Box
          p="4"
          bg="#F8FAFC"
          borderTop="1px solid"
          borderColor="#E2E8F0"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap="3"
        >
          <HStack gap="2">
            <ShieldCheckIcon size={16} color="#059669" />
            <Text fontSize="12px" color="#64748B">
              All entries cryptographically signed by I-Impact Field Directors.
            </Text>
          </HStack>

          <Button
            onClick={onClose}
            bg="#0F172A"
            color="#FFFFFF"
            fontSize="13px"
            fontWeight="700"
            px="4"
            py="2"
            h="auto"
            borderRadius="8px"
            _hover={{ bg: "#1E293B" }}
          >
            Close Ledger
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
