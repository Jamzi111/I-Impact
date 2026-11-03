"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react"
import {
  BuildingIcon,
  BanknoteIcon,
  GlobeIcon,
  CheckCircleIcon,
  MailIcon,
  ShieldCheckIcon,
} from "@/components/icons"

interface BankAccountInfo {
  id: string
  title: string
  currency: string
  badge: string
  bankName: string
  accountName: string
  accountNumber: string
  sortCode?: string
  swiftBic?: string
  routingNumber?: string
  accentColor: string
}

const BANK_ACCOUNTS: BankAccountInfo[] = [
  {
    id: "naira-access",
    title: "Naira Operations Account",
    currency: "NGN (₦)",
    badge: "Nigeria Local Transfers",
    bankName: "Access Bank Plc",
    accountName: "I-IMPACT INITIATIVE FOR YOUTH DEVELOPMENT",
    accountNumber: "0123456789",
    sortCode: "044150149",
    accentColor: "#059669",
  },
  {
    id: "usd-zenith",
    title: "Domiciliary USD Account",
    currency: "USD ($)",
    badge: "International Wire Transfers",
    bankName: "Zenith Bank Plc",
    accountName: "I-IMPACT INITIATIVE FOR YOUTH DEV (DOM)",
    accountNumber: "5070123456",
    swiftBic: "ZEIBNGLA",
    routingNumber: "021000089",
    accentColor: "#0284C7",
  },
]

export function BankTransferDetails() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <Box
      as="section"
      id="bank-details"
      py={{ base: "14", sm: "16", md: "20" }}
      bg="#F8FAFC"
      borderTop="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        {/* Header */}
        <Box textAlign="center" maxW="700px" mx="auto" mb={{ base: "10", md: "12" }}>
          <HStack
            justify="center"
            gap="2"
            px="3"
            py="1"
            bg="rgba(5, 27, 100, 0.08)"
            borderRadius="full"
            w="fit-content"
            mx="auto"
            mb="3"
          >
            <BanknoteIcon size={14} color="#051B64" />
            <Text
              fontSize="12px"
              fontWeight="800"
              color="#051B64"
              letterSpacing="0.06em"
              textTransform="uppercase"
            >
              Direct Electronic Settlement
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "26px", sm: "32px", md: "38px" }}
            fontWeight="800"
            color="#0F172A"
            letterSpacing="-0.02em"
            mb="3"
          >
            Direct Bank Wire & Transfer Details
          </Heading>

          <Text fontSize={{ base: "14px", sm: "16px" }} color="#64748B" lineHeight="1.6">
            If you prefer making your gift via online banking, mobile app, or international wire,
            please find our official, verified organization accounts below.
          </Text>
        </Box>

        {/* 2 Bank Cards Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "6", md: "8" }} mb={{ base: "10", md: "12" }}>
          {BANK_ACCOUNTS.map((acc) => (
            <Box
              key={acc.id}
              bg="#FFFFFF"
              borderRadius="24px"
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 8px 24px -6px rgba(15, 23, 42, 0.06)"
              p={{ base: "6", sm: "7", md: "8" }}
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                h="4px"
                bg={acc.accentColor}
              />

              <Flex justify="space-between" align="center" mb="4" wrap="wrap" gap="2">
                <Box>
                  <Text fontSize="12px" fontWeight="700" color="#64748B" textTransform="uppercase">
                    {acc.currency}
                  </Text>
                  <Heading as="h3" fontSize="20px" fontWeight="800" color="#0F172A">
                    {acc.title}
                  </Heading>
                </Box>
                <Box
                  px="2.5"
                  py="1"
                  borderRadius="full"
                  bg="rgba(5, 27, 100, 0.06)"
                  color="#051B64"
                  fontSize="11px"
                  fontWeight="700"
                >
                  {acc.badge}
                </Box>
              </Flex>

              <VStack align="stretch" gap="3.5" mb="6">
                <Box p="3" bg="#F8FAFC" borderRadius="12px" border="1px solid #EDF2F7">
                  <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase" mb="0.5">
                    Bank Name
                  </Text>
                  <Text fontSize="15px" fontWeight="700" color="#1E293B">
                    {acc.bankName}
                  </Text>
                </Box>

                <Box p="3" bg="#F8FAFC" borderRadius="12px" border="1px solid #EDF2F7">
                  <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase" mb="0.5">
                    Beneficiary Account Name
                  </Text>
                  <Text fontSize="14px" fontWeight="700" color="#1E293B">
                    {acc.accountName}
                  </Text>
                </Box>

                {/* Account Number with Copy Button */}
                <Box
                  p="3"
                  bg="rgba(5, 27, 100, 0.03)"
                  borderRadius="12px"
                  border="1px solid #CBD5E1"
                >
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase" mb="0.5">
                        Account Number
                      </Text>
                      <Text fontSize="20px" fontWeight="900" color="#051B64" fontFamily="monospace">
                        {acc.accountNumber}
                      </Text>
                    </Box>
                    <Button
                      onClick={() => handleCopy(acc.id, acc.accountNumber)}
                      bg={copiedId === acc.id ? "#059669" : "#051B64"}
                      color="#FFFFFF"
                      fontSize="12px"
                      fontWeight="700"
                      px="3.5"
                      py="1.5"
                      h="36px"
                      borderRadius="8px"
                      _hover={{ bg: copiedId === acc.id ? "#047857" : "#0A257F" }}
                      transition="all 0.15s ease"
                    >
                      {copiedId === acc.id ? "Copied!" : "Copy Number"}
                    </Button>
                  </Flex>
                </Box>

                {acc.sortCode && (
                  <HStack justify="space-between" px="2" fontSize="12px">
                    <Text color="#64748B">Sort Code / Branch ID:</Text>
                    <Text fontWeight="700" color="#1E293B" fontFamily="monospace">
                      {acc.sortCode}
                    </Text>
                  </HStack>
                )}

                {acc.swiftBic && (
                  <HStack justify="space-between" px="2" fontSize="12px">
                    <Text color="#64748B">SWIFT / BIC Code:</Text>
                    <Text fontWeight="700" color="#1E293B" fontFamily="monospace">
                      {acc.swiftBic}
                    </Text>
                  </HStack>
                )}

                {acc.routingNumber && (
                  <HStack justify="space-between" px="2" fontSize="12px">
                    <Text color="#64748B">Correspondent Routing:</Text>
                    <Text fontWeight="700" color="#1E293B" fontFamily="monospace">
                      {acc.routingNumber}
                    </Text>
                  </HStack>
                )}
              </VStack>

              <Flex align="center" gap="2" color="#059669" fontSize="11px" fontWeight="600">
                <ShieldCheckIcon size={14} color="#059669" />
                <Text>Corporate Non-Profit Account • Central Bank of Nigeria Regulated</Text>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        {/* Confirmation & Proof of Payment Notice */}
        <Box
          p={{ base: "5", sm: "6" }}
          bg="#FFFFFF"
          borderRadius="18px"
          border="1px solid"
          borderColor="#E2E8F0"
          maxW="820px"
          mx="auto"
        >
          <Flex direction={{ base: "column", sm: "row" }} align={{ base: "flex-start", sm: "center" }} gap="4">
            <Box
              w="44px"
              h="44px"
              borderRadius="12px"
              bg="rgba(16, 185, 129, 0.12)"
              color="#059669"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <MailIcon size={20} color="#059669" />
            </Box>
            <Box flex="1">
              <Heading as="h4" fontSize="15px" fontWeight="800" color="#0F172A" mb="1">
                Completed your wire or transfer? Let us know!
              </Heading>
              <Text fontSize="13px" color="#64748B">
                Please email your payment reference or receipt to{" "}
                <Text as="span" fontWeight="700" color="#051B64">
                  donations@iimpactinitiative.org
                </Text>{" "}
                with your full name and designated program. Our finance team will confirm receipt and
                issue your formal donation certificate within 24 hours.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

