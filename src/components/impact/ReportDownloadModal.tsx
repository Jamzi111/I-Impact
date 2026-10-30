"use client"

import React, { useState } from "react"
import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react"
import {
  CloseIcon,
  DownloadIcon,
  CheckCircleIcon,
  FileTextIcon,
  ShieldCheckIcon,
} from "@/components/icons"

interface ReportDownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReportDownloadModal({ isOpen, onClose }: ReportDownloadModalProps) {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  if (!isOpen) return null

  const handleSimulateDownload = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      setDownloaded(true)
    }, 1200)
  }

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
        maxW="600px"
        bg="#FFFFFF"
        borderRadius="20px"
        boxShadow="0 25px 60px -15px rgba(0, 0, 0, 0.35)"
        border="1px solid"
        borderColor="rgba(226, 232, 240, 0.9)"
        overflow="hidden"
      >
        {/* Header */}
        <Box p={{ base: "5", sm: "6" }} borderBottom="1px solid #F1F5F9" bg="#FAFCFF">
          <Flex justify="space-between" align="flex-start" gap="4">
            <Box>
              <HStack gap="2" mb="2">
                <Box
                  p="1.5"
                  borderRadius="8px"
                  bg="rgba(5, 27, 100, 0.08)"
                  color="#051B64"
                >
                  <FileTextIcon size={18} />
                </Box>
                <Text
                  fontSize="12px"
                  fontWeight="800"
                  color="#051B64"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                >
                  Audited Publication
                </Text>
              </HStack>
              <Heading as="h3" fontSize="22px" fontWeight="800" color="#0F172A">
                Annual Impact & Accountability Report
              </Heading>
              <Text fontSize="13px" color="#64748B" mt="1">
                48 pages of verified longitudinal metrics, financial ledgers, and student case studies.
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
        </Box>

        {/* Content Highlights */}
        <Box p={{ base: "5", sm: "6" }}>
          <Text fontSize="13px" fontWeight="700" color="#334155" mb="3">
            What is included in this document:
          </Text>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mb="6">
            {[
              "120,418+ Active Students Tracked",
              "100% Zero-Leakage Financial Ledger",
              "94.2% Secondary-to-University Transition",
              "85,420 Hours Verified Mentorship",
              "UK & NG Safeguarding Gold Attestation",
              "NDPR Data Compliance Framework",
            ].map((item, idx) => (
              <HStack key={idx} gap="2" align="center">
                <CheckCircleIcon size={15} color="#059669" />
                <Text fontSize="12px" color="#475569" fontWeight="500">
                  {item}
                </Text>
              </HStack>
            ))}
          </SimpleGrid>

          {/* Action Button */}
          <VStack gap="3" align="stretch">
            <Button
              onClick={handleSimulateDownload}
              disabled={downloading}
              bg="#0B0F2A"
              color="#FFFFFF"
              py="3.5"
              fontSize="14px"
              fontWeight="700"
              borderRadius="10px"
              _hover={{ bg: "#1E2248", transform: "translateY(-1px)" }}
              transition="all 0.2s ease"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="2"
            >
              <DownloadIcon size={17} />
              {downloading
                ? "Preparing Download..."
                : downloaded
                ? "Report Ready (Click to re-download)"
                : "Download Complete 2024 Report (.PDF - 8.4 MB)"}
            </Button>

            {downloaded && (
              <Box
                p="2.5"
                borderRadius="8px"
                bg="#ECFDF5"
                border="1px solid #A7F3D0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="2"
              >
                <CheckCircleIcon size={14} color="#059669" />
                <Text fontSize="12px" color="#047857" fontWeight="600">
                  Verification checksum: SHA256-e910fa...78b verified successfully.
                </Text>
              </Box>
            )}

            <HStack justify="center" gap="2" color="#64748B" fontSize="11px">
              <ShieldCheckIcon size={14} color="#059669" />
              <Text>Signed with public PGP audit key for transparent validation.</Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}
