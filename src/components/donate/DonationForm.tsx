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
import Link from "next/link"
import {
  HeartIcon,
  ShieldCheckIcon,
  LockIcon,
  CheckCircleIcon,
  SparklesIcon,
  FileTextIcon,
  UsersIcon,
  BuildingIcon,
  BanknoteIcon,
  ArrowRightIcon,
} from "@/components/icons"

type CurrencyCode = "NGN" | "USD" | "GBP"
type GivingFrequency = "once" | "monthly"
type PaymentMethod = "card" | "bank_transfer"

interface PresetOption {
  amount: number
  label: string
  impact: string
}

const PRESETS_BY_CURRENCY: Record<CurrencyCode, { symbol: string; prefix: string; options: PresetOption[]; minCustom: number }> = {
  NGN: {
    symbol: "₦",
    prefix: "NGN",
    minCustom: 1000,
    options: [
      { amount: 5000, label: "₦5,000", impact: "1 Student STEM Starter Kit (textbooks & learning supplies)" },
      { amount: 15000, label: "₦15,000", impact: "1 Term Mentorship & weekly workshop sessions" },
      { amount: 35000, label: "₦35,000", impact: "Maker & Robotics Toolkit for a high school science club" },
      { amount: 100000, label: "₦100,000", impact: "Classroom Hub Sponsor equipping an entire student cohort" },
    ],
  },
  USD: {
    symbol: "$",
    prefix: "USD",
    minCustom: 5,
    options: [
      { amount: 15, label: "$15", impact: "1 Student STEM Starter Kit (textbooks & learning supplies)" },
      { amount: 40, label: "$40", impact: "1 Term Mentorship & weekly workshop sessions" },
      { amount: 100, label: "$100", impact: "Maker & Robotics Toolkit for a high school science club" },
      { amount: 250, label: "$250", impact: "Classroom Hub Sponsor equipping an entire student cohort" },
    ],
  },
  GBP: {
    symbol: "£",
    prefix: "GBP",
    minCustom: 5,
    options: [
      { amount: 12, label: "£12", impact: "1 Student STEM Starter Kit (textbooks & learning supplies)" },
      { amount: 30, label: "£30", impact: "1 Term Mentorship & weekly workshop sessions" },
      { amount: 80, label: "£80", impact: "Maker & Robotics Toolkit for a high school science club" },
      { amount: 200, label: "£200", impact: "Classroom Hub Sponsor equipping an entire student cohort" },
    ],
  },
}

const DESIGNATIONS = [
  { id: "general", label: "Where Needed Most (General Youth Fund)" },
  { id: "stem", label: "Secondary School STEM & Maker Kits" },
  { id: "mentorship", label: "Youth Mentorship & AS A TEEN Leadership Summits" },
  { id: "girl_child", label: "Girl-Child Tech & Digital Inclusion" },
]

export function DonationForm() {
  const [frequency, setFrequency] = useState<GivingFrequency>("monthly")
  const [currency, setCurrency] = useState<CurrencyCode>("NGN")
  const [selectedAmount, setSelectedAmount] = useState<number>(15000)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [designation, setDesignation] = useState<string>("general")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")

  // Donor Details
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isDedication, setIsDedication] = useState(false)
  const [dedicationName, setDedicationName] = useState("")
  const [dedicationNote, setDedicationNote] = useState("")

  // Submission State
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [transactionRef, setTransactionRef] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const activeCurrencyConfig = PRESETS_BY_CURRENCY[currency]

  // Handle currency switch
  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency)
    setCustomAmount("")
    // Set default preset for that currency (second preset)
    setSelectedAmount(PRESETS_BY_CURRENCY[newCurrency].options[1].amount)
  }

  // Handle preset click
  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
    setErrorMessage("")
  }

  // Handle custom amount change
  const handleCustomAmountChange = (val: string) => {
    // Only permit digits
    const cleaned = val.replace(/[^0-9]/g, "")
    setCustomAmount(cleaned)
    if (cleaned) {
      const num = parseInt(cleaned, 10)
      setSelectedAmount(num)
    } else {
      setSelectedAmount(0)
    }
    setErrorMessage("")
  }

  // Active impact description
  const activePreset = activeCurrencyConfig.options.find((p) => p.amount === selectedAmount)
  const activeImpactText = activePreset
    ? activePreset.impact
    : `Provides direct educational resources, workshop toolkits, and mentor support for youth champions.`

  // Handle Form Submission
  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please provide your first and last name.")
      return
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please provide a valid email address for your official receipt.")
      return
    }

    if (!selectedAmount || selectedAmount < activeCurrencyConfig.minCustom) {
      setErrorMessage(
        `The minimum donation amount is ${activeCurrencyConfig.symbol}${activeCurrencyConfig.minCustom.toLocaleString()}.`
      )
      return
    }

    setErrorMessage("")
    setIsProcessing(true)

    // Simulate instant secure transaction verification
    setTimeout(() => {
      const randomRef = "IMP-" + new Date().getFullYear() + "-DON-" + Math.floor(100000 + Math.random() * 900000)
      setTransactionRef(randomRef)
      setIsProcessing(false)
      setIsCompleted(true)
    }, 1200)
  }

  const handleResetForm = () => {
    setIsCompleted(false)
    setTransactionRef("")
    setCustomAmount("")
    setSelectedAmount(activeCurrencyConfig.options[1].amount)
  }

  return (
    <Box
      as="section"
      id="donate-widget"
      py={{ base: "12", sm: "14", md: "20" }}
      bg="#F8FAFC"
      position="relative"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: "8", lg: "10" }}>
          {/* Main Donation Container (7 Columns on Desktop) */}
          <Box gridColumn={{ base: "span 1", lg: "span 7" }}>
            <Box
              bg="#FFFFFF"
              borderRadius="24px"
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 10px 30px -8px rgba(15, 23, 42, 0.08)"
              p={{ base: "5", sm: "7", md: "8" }}
              position="relative"
              overflow="hidden"
            >
              {/* Top Accent Stripe */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                h="4px"
                bg="linear-gradient(90deg, #051B64 0%, #10B981 100%)"
              />

              {isCompleted ? (
                /* Celebration / Receipt Confirmation Screen */
                <Box textAlign="center" py={{ base: "6", md: "8" }}>
                  <Flex
                    w="68px"
                    h="68px"
                    borderRadius="full"
                    bg="rgba(16, 185, 129, 0.12)"
                    color="#059669"
                    align="center"
                    justify="center"
                    mx="auto"
                    mb="4"
                  >
                    <CheckCircleIcon size={36} color="#059669" />
                  </Flex>

                  <Heading
                    as="h2"
                    fontSize={{ base: "22px", sm: "26px", md: "30px" }}
                    fontWeight="800"
                    color="#0F172A"
                    mb="2"
                  >
                    Thank You for Your Generosity!
                  </Heading>

                  <Text fontSize="15px" color="#475569" maxW="480px" mx="auto" mb="6">
                    {isAnonymous
                      ? "Your anonymous contribution"
                      : `Dear ${firstName}, your gift`}{" "}
                    has been recorded. A formal tax receipt and confirmation have been
                    dispatched to <Text as="span" fontWeight="700" color="#0F172A">{email}</Text>.
                  </Text>

                  {/* Summary Card */}
                  <Box
                    bg="#F8FAFC"
                    border="1px solid"
                    borderColor="#E2E8F0"
                    borderRadius="16px"
                    p="5"
                    maxW="480px"
                    mx="auto"
                    textAlign="left"
                    mb="6"
                  >
                    <HStack justify="space-between" mb="2.5" pb="2" borderBottom="1px dashed #E2E8F0">
                      <Text fontSize="13px" color="#64748B">Transaction Reference:</Text>
                      <Text fontSize="13px" fontWeight="700" color="#0F172A" fontFamily="monospace">
                        {transactionRef}
                      </Text>
                    </HStack>

                    <HStack justify="space-between" mb="2.5" pb="2" borderBottom="1px dashed #E2E8F0">
                      <Text fontSize="13px" color="#64748B">Total Contributed:</Text>
                      <Text fontSize="15px" fontWeight="800" color="#059669">
                        {activeCurrencyConfig.symbol}
                        {selectedAmount.toLocaleString()} {currency}{" "}
                        <Text as="span" fontSize="12px" fontWeight="600" color="#64748B">
                          ({frequency === "monthly" ? "Monthly" : "One-Time"})
                        </Text>
                      </Text>
                    </HStack>

                    <HStack justify="space-between" mb="2.5" pb="2" borderBottom="1px dashed #E2E8F0">
                      <Text fontSize="13px" color="#64748B">Designated Cause:</Text>
                      <Text fontSize="13px" fontWeight="700" color="#0F172A">
                        {DESIGNATIONS.find((d) => d.id === designation)?.label}
                      </Text>
                    </HStack>

                    <HStack justify="space-between">
                      <Text fontSize="13px" color="#64748B">Impact Allocation:</Text>
                      <Text fontSize="13px" fontWeight="600" color="#334155" maxW="240px" textAlign="right">
                        {activeImpactText}
                      </Text>
                    </HStack>
                  </Box>

                  <HStack justify="center" gap="3" flexWrap="wrap">
                    <Button
                      onClick={handleResetForm}
                      bg="#051B64"
                      color="#FFFFFF"
                      fontSize="14px"
                      fontWeight="700"
                      px="6"
                      py="3"
                      h="auto"
                      borderRadius="12px"
                      _hover={{ bg: "#0A257F" }}
                    >
                      Make Another Contribution
                    </Button>

                    <Link href="/impact">
                      <Button
                        variant="outline"
                        borderColor="#CBD5E1"
                        color="#334155"
                        fontSize="14px"
                        fontWeight="700"
                        px="6"
                        py="3"
                        h="auto"
                        borderRadius="12px"
                        _hover={{ bg: "#F1F5F9" }}
                      >
                        Explore Our Impact →
                      </Button>
                    </Link>
                  </HStack>
                </Box>
              ) : (
                /* The Active Donation Form */
                <form onSubmit={handleSubmitDonation}>
                  {/* Step 1: Giving Frequency Selector */}
                  <Box mb="6">
                    <Text fontSize="13px" fontWeight="700" color="#64748B" textTransform="uppercase" letterSpacing="0.05em" mb="2.5">
                      1. Choose Giving Frequency
                    </Text>

                    <SimpleGrid columns={2} gap="3">
                      <Button
                        type="button"
                        onClick={() => setFrequency("monthly")}
                        bg={frequency === "monthly" ? "#051B64" : "#F8FAFC"}
                        color={frequency === "monthly" ? "#FFFFFF" : "#334155"}
                        border="1px solid"
                        borderColor={frequency === "monthly" ? "#051B64" : "#E2E8F0"}
                        borderRadius="12px"
                        py="3.5"
                        h="auto"
                        position="relative"
                        transition="all 0.2s ease"
                        _hover={{
                          md: {
                            borderColor: "#051B64",
                          },
                        }}
                      >
                        <VStack gap="0.5">
                          <HStack gap="1.5">
                            <HeartIcon size={16} color={frequency === "monthly" ? "#34D399" : "#059669"} />
                            <Text fontSize="14px" fontWeight="800">
                              Monthly Champion
                            </Text>
                          </HStack>
                          <Box
                            px="2"
                            py="0.5"
                            bg={frequency === "monthly" ? "rgba(52, 211, 153, 0.2)" : "rgba(16, 185, 129, 0.12)"}
                            color={frequency === "monthly" ? "#34D399" : "#047857"}
                            borderRadius="full"
                            fontSize="10px"
                            fontWeight="700"
                          >
                            Most Sustainable Impact
                          </Box>
                        </VStack>
                      </Button>

                      <Button
                        type="button"
                        onClick={() => setFrequency("once")}
                        bg={frequency === "once" ? "#051B64" : "#F8FAFC"}
                        color={frequency === "once" ? "#FFFFFF" : "#334155"}
                        border="1px solid"
                        borderColor={frequency === "once" ? "#051B64" : "#E2E8F0"}
                        borderRadius="12px"
                        py="3.5"
                        h="auto"
                        transition="all 0.2s ease"
                        _hover={{
                          md: {
                            borderColor: "#051B64",
                          },
                        }}
                      >
                        <VStack gap="0.5">
                          <HStack gap="1.5">
                            <SparklesIcon size={16} color={frequency === "once" ? "#38BDF8" : "#0284C7"} />
                            <Text fontSize="14px" fontWeight="800">
                              One-Time Gift
                            </Text>
                          </HStack>
                          <Text fontSize="11px" color={frequency === "once" ? "#CBD5E1" : "#64748B"} fontWeight="500">
                            Immediate Support
                          </Text>
                        </VStack>
                      </Button>
                    </SimpleGrid>
                  </Box>

                  {/* Step 2: Currency & Preset Matrix */}
                  <Box mb="6">
                    <Flex justify="space-between" align="center" mb="2.5" wrap="wrap" gap="2">
                      <Text fontSize="13px" fontWeight="700" color="#64748B" textTransform="uppercase" letterSpacing="0.05em">
                        2. Select Donation Amount
                      </Text>

                      {/* Currency Buttons */}
                      <HStack gap="1" bg="#F1F5F9" p="1" borderRadius="10px">
                        {(["NGN", "USD", "GBP"] as CurrencyCode[]).map((curr) => (
                          <Button
                            key={curr}
                            type="button"
                            onClick={() => handleCurrencyChange(curr)}
                            bg={currency === curr ? "#FFFFFF" : "transparent"}
                            color={currency === curr ? "#0F172A" : "#64748B"}
                            boxShadow={currency === curr ? "0 2px 6px rgba(0, 0, 0, 0.08)" : "none"}
                            fontSize="11px"
                            fontWeight="800"
                            px="2.5"
                            py="1"
                            minW="auto"
                            h="26px"
                            borderRadius="7px"
                            transition="all 0.15s ease"
                          >
                            {curr === "NGN" ? "₦ NGN" : curr === "USD" ? "$ USD" : "£ GBP"}
                          </Button>
                        ))}
                      </HStack>
                    </Flex>

                    {/* Preset Amount Grid */}
                    <SimpleGrid columns={{ base: 2, sm: 2 }} gap="3" mb="3">
                      {activeCurrencyConfig.options.map((option) => {
                        const isSelected = selectedAmount === option.amount && !customAmount
                        return (
                          <Box
                            key={option.amount}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleSelectPreset(option.amount)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                handleSelectPreset(option.amount)
                              }
                            }}
                            p={{ base: "3.5", sm: "4" }}
                            bg={isSelected ? "rgba(5, 27, 100, 0.04)" : "#FFFFFF"}
                            border="2px solid"
                            borderColor={isSelected ? "#051B64" : "#E2E8F0"}
                            borderRadius="14px"
                            textAlign="left"
                            cursor="pointer"
                            transition="all 0.2s ease"
                            position="relative"
                            _hover={{
                              md: {
                                borderColor: isSelected ? "#051B64" : "#94A3B8",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Flex justify="space-between" align="center" mb="1">
                              <Text
                                fontSize={{ base: "17px", sm: "19px" }}
                                fontWeight="800"
                                color={isSelected ? "#051B64" : "#0F172A"}
                              >
                                {option.label}
                              </Text>
                              {isSelected && (
                                <Box color="#051B64">
                                  <CheckCircleIcon size={16} />
                                </Box>
                              )}
                            </Flex>
                            <Text
                              fontSize="11px"
                              color={isSelected ? "#334155" : "#64748B"}
                              lineHeight="1.3"
                              fontWeight="500"
                            >
                              {option.impact}
                            </Text>
                          </Box>
                        )
                      })}
                    </SimpleGrid>

                    {/* Custom Amount Entry */}
                    <Box
                      p="3.5"
                      bg="#FFFFFF"
                      border="1px solid"
                      borderColor={customAmount ? "#051B64" : "#E2E8F0"}
                      borderRadius="14px"
                    >
                      <Flex align="center" gap="2">
                        <Text fontSize="14px" fontWeight="800" color="#051B64" minW="40px">
                          {activeCurrencyConfig.symbol} {currency}
                        </Text>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder={`Enter custom amount (min. ${activeCurrencyConfig.symbol}${activeCurrencyConfig.minCustom.toLocaleString()})`}
                          value={customAmount}
                          onChange={(e) => handleCustomAmountChange(e.target.value)}
                          style={{
                            width: "100%",
                            border: "none",
                            outline: "none",
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#0F172A",
                            background: "transparent",
                          }}
                        />
                      </Flex>
                    </Box>
                  </Box>

                  {/* Step 3: Designation / Cause Allocation */}
                  <Box mb="6">
                    <Text fontSize="13px" fontWeight="700" color="#64748B" textTransform="uppercase" letterSpacing="0.05em" mb="2">
                      3. Direct My Contribution To
                    </Text>

                    <select
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#0F172A",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #CBD5E1",
                        borderRadius: "12px",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      {DESIGNATIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </Box>

                  {/* Step 4: Donor Details */}
                  <Box mb="6">
                    <Text fontSize="13px" fontWeight="700" color="#64748B" textTransform="uppercase" letterSpacing="0.05em" mb="2.5">
                      4. Your Contact Information
                    </Text>

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mb="3">
                      <Box>
                        <label
                          htmlFor="donor-first-name"
                          style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}
                        >
                          First Name *
                        </label>
                        <input
                          id="donor-first-name"
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="e.g. Oluwaseun"
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            fontSize: "14px",
                            color: "#0F172A",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            outline: "none",
                          }}
                        />
                      </Box>

                      <Box>
                        <label
                          htmlFor="donor-last-name"
                          style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}
                        >
                          Last Name *
                        </label>
                        <input
                          id="donor-last-name"
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Adeyemi"
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            fontSize: "14px",
                            color: "#0F172A",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            outline: "none",
                          }}
                        />
                      </Box>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mb="3">
                      <Box>
                        <label
                          htmlFor="donor-email"
                          style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}
                        >
                          Email Address (for official receipt) *
                        </label>
                        <input
                          id="donor-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="oluwaseun@example.com"
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            fontSize: "14px",
                            color: "#0F172A",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            outline: "none",
                          }}
                        />
                      </Box>

                      <Box>
                        <label
                          htmlFor="donor-phone"
                          style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}
                        >
                          Phone Number (optional)
                        </label>
                        <input
                          id="donor-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 800 000 0000"
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            fontSize: "14px",
                            color: "#0F172A",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                            outline: "none",
                          }}
                        />
                      </Box>
                    </SimpleGrid>

                    {/* Anonymous & Dedication Checkboxes */}
                    <VStack align="stretch" gap="2" mt="2">
                      <Flex as="label" align="center" gap="2.5" cursor="pointer">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          style={{ width: "16px", height: "16px", accentColor: "#051B64", cursor: "pointer" }}
                        />
                        <Text fontSize="12px" color="#475569" fontWeight="500">
                          Keep my donation anonymous in public partner acknowledgments
                        </Text>
                      </Flex>

                      <Flex as="label" align="center" gap="2.5" cursor="pointer">
                        <input
                          type="checkbox"
                          checked={isDedication}
                          onChange={(e) => setIsDedication(e.target.checked)}
                          style={{ width: "16px", height: "16px", accentColor: "#051B64", cursor: "pointer" }}
                        />
                        <Text fontSize="12px" color="#475569" fontWeight="500">
                          Dedicate this donation in honor or in memory of someone
                        </Text>
                      </Flex>
                    </VStack>

                    {/* Expanded Dedication Inputs */}
                    {isDedication && (
                      <Box mt="3" p="3.5" bg="#F1F5F9" borderRadius="12px">
                        <Box mb="2">
                          <label
                            htmlFor="dedication-name"
                            style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "3px" }}
                          >
                            Honoree Name
                          </label>
                          <input
                            id="dedication-name"
                            type="text"
                            value={dedicationName}
                            onChange={(e) => setDedicationName(e.target.value)}
                            placeholder="e.g. In Honor of Mrs. B. Alabi"
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              fontSize: "13px",
                              borderRadius: "8px",
                              border: "1px solid #CBD5E1",
                              background: "#FFFFFF",
                            }}
                          />
                        </Box>

                        <Box>
                          <label
                            htmlFor="dedication-note"
                            style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "3px" }}
                          >
                            Optional Message
                          </label>
                          <input
                            id="dedication-note"
                            type="text"
                            value={dedicationNote}
                            onChange={(e) => setDedicationNote(e.target.value)}
                            placeholder="A personal note from you..."
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              fontSize: "13px",
                              borderRadius: "8px",
                              border: "1px solid #CBD5E1",
                              background: "#FFFFFF",
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>

                  {/* Step 5: Payment Gateway vs Bank Transfer Toggle */}
                  <Box mb="6">
                    <Text fontSize="13px" fontWeight="700" color="#64748B" textTransform="uppercase" letterSpacing="0.05em" mb="2.5">
                      5. Payment Method
                    </Text>

                    <SimpleGrid columns={2} gap="3">
                      <Button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        bg={paymentMethod === "card" ? "#051B64" : "#F8FAFC"}
                        color={paymentMethod === "card" ? "#FFFFFF" : "#334155"}
                        border="1px solid"
                        borderColor={paymentMethod === "card" ? "#051B64" : "#E2E8F0"}
                        borderRadius="12px"
                        py="3"
                        h="auto"
                        transition="all 0.15s ease"
                      >
                        <HStack gap="2">
                          <LockIcon size={16} color={paymentMethod === "card" ? "#34D399" : "#059669"} />
                          <Text fontSize="13px" fontWeight="700">
                            Card / Instant Pay
                          </Text>
                        </HStack>
                      </Button>

                      <Button
                        type="button"
                        onClick={() => setPaymentMethod("bank_transfer")}
                        bg={paymentMethod === "bank_transfer" ? "#051B64" : "#F8FAFC"}
                        color={paymentMethod === "bank_transfer" ? "#FFFFFF" : "#334155"}
                        border="1px solid"
                        borderColor={paymentMethod === "bank_transfer" ? "#051B64" : "#E2E8F0"}
                        borderRadius="12px"
                        py="3"
                        h="auto"
                        transition="all 0.15s ease"
                      >
                        <HStack gap="2">
                          <BanknoteIcon size={16} color={paymentMethod === "bank_transfer" ? "#38BDF8" : "#0284C7"} />
                          <Text fontSize="13px" fontWeight="700">
                            Direct Bank Wire
                          </Text>
                        </HStack>
                      </Button>
                    </SimpleGrid>
                  </Box>

                  {/* Error Notification */}
                  {errorMessage && (
                    <Box
                      p="3"
                      mb="4"
                      bg="#FEF2F2"
                      border="1px solid #FECACA"
                      borderRadius="10px"
                      color="#B91C1C"
                      fontSize="13px"
                      fontWeight="600"
                    >
                      {errorMessage}
                    </Box>
                  )}

                  {/* Submission CTA Button */}
                  {paymentMethod === "card" ? (
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      w="100%"
                      h="52px"
                      bg="#051B64"
                      color="#FFFFFF"
                      fontSize="16px"
                      fontWeight="800"
                      borderRadius="14px"
                      boxShadow="0 4px 16px rgba(5, 27, 100, 0.25)"
                      transition="all 0.2s ease"
                      _hover={{
                        md: {
                          bg: "#0A257F",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(5, 27, 100, 0.3)",
                        },
                      }}
                      _active={{ transform: "translateY(0)" }}
                    >
                      <HStack gap="2">
                        <LockIcon size={18} color="#34D399" />
                        <Text>
                          {isProcessing
                            ? "Connecting to Secure Gateway..."
                            : `Complete Contribution: ${activeCurrencyConfig.symbol}${selectedAmount.toLocaleString()} ${frequency === "monthly" ? "/ Month" : ""}`}
                        </Text>
                      </HStack>
                    </Button>
                  ) : (
                    <Box
                      p="4"
                      bg="#F1F5F9"
                      border="1px solid #CBD5E1"
                      borderRadius="12px"
                      textAlign="center"
                    >
                      <Text fontSize="14px" fontWeight="700" color="#0F172A" mb="1">
                        Direct Bank & Wire Transfer Details
                      </Text>
                      <Text fontSize="12px" color="#64748B" mb="3">
                        Review official corporate account numbers and international wire details below.
                      </Text>
                      <a href="#bank-details">
                        <Button
                          type="button"
                          bg="#0F172A"
                          color="#FFFFFF"
                          fontSize="13px"
                          fontWeight="700"
                          px="5"
                          py="2.5"
                          h="auto"
                          borderRadius="8px"
                          _hover={{ bg: "#1E293B" }}
                        >
                          View Official Bank Accounts ↓
                        </Button>
                      </a>
                    </Box>
                  )}

                  {/* Trust Footer */}
                  <Flex justify="center" align="center" gap="4" mt="4" flexWrap="wrap">
                    <HStack gap="1.5" color="#64748B" fontSize="11px">
                      <ShieldCheckIcon size={14} color="#059669" />
                      <Text>256-Bit SSL Encrypted</Text>
                    </HStack>
                    <Text color="#CBD5E1">•</Text>
                    <HStack gap="1.5" color="#64748B" fontSize="11px">
                      <CheckCircleIcon size={14} color="#059669" />
                      <Text>Instant Tax Receipt Issued</Text>
                    </HStack>
                    <Text color="#CBD5E1">•</Text>
                    <HStack gap="1.5" color="#64748B" fontSize="11px">
                      <HeartIcon size={14} color="#059669" />
                      <Text>Cancel Monthly Anytime</Text>
                    </HStack>
                  </Flex>
                </form>
              )}
            </Box>
          </Box>

          {/* Right Column: Dynamic Giving Summary & Reassurance (5 Columns on Desktop) */}
          <Box gridColumn={{ base: "span 1", lg: "span 5" }}>
            <VStack align="stretch" gap="5">
              {/* Dynamic Gift Recap Card */}
              <Box
                bg="linear-gradient(135deg, #051B64 0%, #0F2B88 100%)"
                borderRadius="24px"
                p={{ base: "6", sm: "7" }}
                color="#FFFFFF"
                boxShadow="0 10px 25px -5px rgba(5, 27, 100, 0.25)"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top="-15%"
                  right="-15%"
                  w="200px"
                  h="200px"
                  bg="radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(5, 27, 100, 0) 70%)"
                  filter="blur(30px)"
                  pointerEvents="none"
                />

                <HStack gap="2" mb="3">
                  <Box p="1.5" borderRadius="8px" bg="rgba(255, 255, 255, 0.12)">
                    <HeartIcon size={16} color="#34D399" />
                  </Box>
                  <Text
                    fontSize="11px"
                    fontWeight="800"
                    letterSpacing="0.06em"
                    textTransform="uppercase"
                    color="#34D399"
                  >
                    Your Impact Summary
                  </Text>
                </HStack>

                <Heading as="h3" fontSize={{ base: "22px", sm: "26px" }} fontWeight="800" mb="2">
                  {activeCurrencyConfig.symbol}
                  {selectedAmount ? selectedAmount.toLocaleString() : "0"}{" "}
                  <Text as="span" fontSize="14px" fontWeight="600" color="#93C5FD">
                    {currency} / {frequency === "monthly" ? "month" : "one-time"}
                  </Text>
                </Heading>

                <Text fontSize="13px" color="rgba(226, 232, 240, 0.9)" lineHeight="1.5" mb="4">
                  {activeImpactText}
                </Text>

                <Box
                  pt="4"
                  borderTop="1px solid"
                  borderColor="rgba(255, 255, 255, 0.15)"
                >
                  <Text fontSize="12px" fontWeight="700" color="#93C5FD" mb="2">
                    Why Regular Champions Matter:
                  </Text>
                  <Text fontSize="12px" color="rgba(226, 232, 240, 0.85)" lineHeight="1.5">
                    Monthly recurring donations allow our field team to commit to full-semester
                    secondary school maker hubs, order student science kits in advance, and guarantee
                    ongoing mentorship schedules without disruption.
                  </Text>
                </Box>
              </Box>

              {/* Donor Stewardship & Safeguards Card */}
              <Box
                bg="#FFFFFF"
                borderRadius="24px"
                border="1px solid"
                borderColor="#E2E8F0"
                p={{ base: "5", sm: "6" }}
              >
                <Heading as="h4" fontSize="16px" fontWeight="800" color="#0F172A" mb="3">
                  Our Pledge to Every Donor
                </Heading>

                <VStack align="stretch" gap="3">
                  {[
                    {
                      icon: <ShieldCheckIcon size={16} color="#059669" />,
                      title: "Strict Non-Profit Stewardship",
                      desc: "Every fund received is audited annually and applied directly to approved student programs.",
                    },
                    {
                      icon: <LockIcon size={16} color="#0284C7" />,
                      title: "Zero Data Sharing",
                      desc: "Your personal details and contact information are confidential and never commercialized.",
                    },
                    {
                      icon: <FileTextIcon size={16} color="#7C3AED" />,
                      title: "Tax & Compliance Receipts",
                      desc: "Automated receipts are dispatched promptly upon settlement for organizational records.",
                    },
                  ].map((pledge, idx) => (
                    <Flex key={idx} gap="3" align="flex-start">
                      <Box mt="0.5" flexShrink={0}>
                        {pledge.icon}
                      </Box>
                      <Box>
                        <Text fontSize="13px" fontWeight="700" color="#1E293B">
                          {pledge.title}
                        </Text>
                        <Text fontSize="12px" color="#64748B" lineHeight="1.4">
                          {pledge.desc}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </VStack>
              </Box>

              {/* Direct Donor Contact Help Card */}
              <Box
                bg="#F1F5F9"
                borderRadius="20px"
                p="5"
                border="1px solid"
                borderColor="#E2E8F0"
              >
                <HStack gap="2" mb="1.5">
                  <UsersIcon size={16} color="#051B64" />
                  <Text fontSize="13px" fontWeight="800" color="#0F172A">
                    Need Help or Custom Invoicing?
                  </Text>
                </HStack>
                <Text fontSize="12px" color="#64748B" mb="3">
                  For donor support, foundation grants, or corporate gift matching, speak directly
                  with our donor relations desk.
                </Text>
                <HStack gap="2">
                  <a href="mailto:donations@iimpactinitiative.org">
                    <Button
                      size="sm"
                      bg="#FFFFFF"
                      color="#051B64"
                      border="1px solid #CBD5E1"
                      fontSize="12px"
                      fontWeight="700"
                      h="34px"
                      borderRadius="8px"
                      _hover={{ bg: "#F8FAFC" }}
                    >
                      Email Donor Desk
                    </Button>
                  </a>
                  <Link href="/contact">
                    <Button
                      size="sm"
                      variant="plain"
                      color="#051B64"
                      fontSize="12px"
                      fontWeight="700"
                      h="34px"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Visit Contact Desk →
                    </Button>
                  </Link>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
