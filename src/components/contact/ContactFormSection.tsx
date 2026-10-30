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
  Badge,
  chakra,
} from "@chakra-ui/react"
import Link from "next/link"
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@/components/icons"

const CATEGORIES = [
  { id: "partnerships", label: "Schools & Hubs" },
  { id: "mentorship", label: "Youth Mentorship" },
  { id: "donors", label: "Donors & Grants" },
  { id: "media", label: "Media & Speaking" },
  { id: "general", label: "General Inquiry" },
]

export function ContactFormSection() {
  const [selectedCategory, setSelectedCategory] = useState("partnerships")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [organization, setOrganization] = useState("")
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return // Bot trap

    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 900)
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setFullName("")
    setEmail("")
    setPhone("")
    setOrganization("")
    setMessage("")
  }

  return (
    <Box
      as="section"
      id="message-form"
      py={{ base: "14", sm: "16", md: "20" }}
      bg="linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)"
      position="relative"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1280px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: "10", lg: "12" }}>
          {/* Left Column: Smart Contact Form (7 cols) */}
          <Box gridColumn={{ base: "span 1", lg: "span 7" }}>
            <Box
              bg="#FFFFFF"
              borderRadius="24px"
              p={{ base: "6", sm: "8", md: "10" }}
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 10px 30px -5px rgba(5, 27, 100, 0.05)"
            >
              <VStack align="flex-start" gap="1.5" mb="6">
                <Text
                  fontSize="11.5px"
                  fontWeight="800"
                  color="#149191"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                >
                  DIRECT INQUIRY FORM
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: "22px", sm: "26px", md: "28px" }}
                  fontWeight="900"
                  color="#051B64"
                  letterSpacing="-0.02em"
                >
                  Send a Direct Message
                </Heading>
                <Text fontSize="14px" color="#64748B" lineHeight="1.5">
                  Select your inquiry topic below and our regional coordination team will direct
                  your message to the right department.
                </Text>
              </VStack>

              {/* Inquiry Type Category Filter Pills */}
              <Box mb="6">
                <Text fontSize="12.5px" fontWeight="700" color="#334155" mb="2.5">
                  Inquiry Department:
                </Text>
                <Flex wrap="wrap" gap="2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id
                    return (
                      <chakra.button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        px="3.5"
                        py="1.5"
                        borderRadius="full"
                        fontSize="12.5px"
                        fontWeight="700"
                        cursor="pointer"
                        transition="all 0.2s ease"
                        bg={isSelected ? "#051B64" : "#F1F5F9"}
                        color={isSelected ? "#FFFFFF" : "#475569"}
                        border="1px solid"
                        borderColor={isSelected ? "#051B64" : "transparent"}
                        _hover={{
                          bg: isSelected ? "#051B64" : "#E2E8F0",
                          transform: "translateY(-1px)",
                        }}
                      >
                        {cat.label}
                      </chakra.button>
                    )
                  })}
                </Flex>
              </Box>

              {isSubmitted ? (
                <Box
                  bg="#F0FDF4"
                  border="1px solid #86EFAC"
                  borderRadius="16px"
                  p={{ base: "6", md: "8" }}
                  textAlign="center"
                >
                  <Box
                    w="52px"
                    h="52px"
                    borderRadius="full"
                    bg="#DCFCE7"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                    mb="3"
                  >
                    <CheckCircleIcon size={28} color="#16A34A" />
                  </Box>
                  <Heading as="h3" fontSize="20px" fontWeight="800" color="#166534" mb="2">
                    Message Received Successfully!
                  </Heading>
                  <Text fontSize="14px" color="#15803D" maxW="460px" mx="auto" mb="5" lineHeight="1.5">
                    Thank you, <strong>{fullName}</strong>. Your inquiry has been routed to our{" "}
                    <strong>{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</strong>{" "}
                    desk. A coordinator will follow up via <strong>{email}</strong> within 24 business hours.
                  </Text>
                  <Button
                    onClick={handleReset}
                    size="sm"
                    bg="#16A34A"
                    color="#FFFFFF"
                    fontWeight="700"
                    px="5"
                    borderRadius="full"
                    _hover={{ bg: "#15803D" }}
                  >
                    Send Another Message
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Honeypot hidden input */}
                  <div style={{ display: "none" }}>
                    <input
                      type="text"
                      name="website_hp"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" mb="4">
                    {/* Full Name */}
                    <Box>
                      <Text as="label" fontSize="12.5px" fontWeight="700" color="#334155" mb="1.5" display="block">
                        Full Name <Text as="span" color="#EF4444">*</Text>
                      </Text>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Samuel Adeleke"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{
                          width: "100%",
                          height: "44px",
                          padding: "0 14px",
                          borderRadius: "12px",
                          backgroundColor: "#F8FAFC",
                          border: "1px solid #CBD5E1",
                          fontSize: "14px",
                          color: "#0F172A",
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#149191"
                          e.target.style.boxShadow = "0 0 0 3px rgba(20, 145, 145, 0.12)"
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#CBD5E1"
                          e.target.style.boxShadow = "none"
                        }}
                      />
                    </Box>

                    {/* Email Address */}
                    <Box>
                      <Text as="label" fontSize="12.5px" fontWeight="700" color="#334155" mb="1.5" display="block">
                        Email Address <Text as="span" color="#EF4444">*</Text>
                      </Text>
                      <input
                        type="email"
                        required
                        placeholder="e.g. principal@school.edu.ng"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          height: "44px",
                          padding: "0 14px",
                          borderRadius: "12px",
                          backgroundColor: "#F8FAFC",
                          border: "1px solid #CBD5E1",
                          fontSize: "14px",
                          color: "#0F172A",
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#149191"
                          e.target.style.boxShadow = "0 0 0 3px rgba(20, 145, 145, 0.12)"
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#CBD5E1"
                          e.target.style.boxShadow = "none"
                        }}
                      />
                    </Box>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" mb="4">
                    {/* Phone / WhatsApp */}
                    <Box>
                      <Text as="label" fontSize="12.5px" fontWeight="700" color="#334155" mb="1.5" display="block">
                        Phone / WhatsApp Number
                      </Text>
                      <input
                        type="tel"
                        placeholder="e.g. +234 803 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          width: "100%",
                          height: "44px",
                          padding: "0 14px",
                          borderRadius: "12px",
                          backgroundColor: "#F8FAFC",
                          border: "1px solid #CBD5E1",
                          fontSize: "14px",
                          color: "#0F172A",
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#149191"
                          e.target.style.boxShadow = "0 0 0 3px rgba(20, 145, 145, 0.12)"
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#CBD5E1"
                          e.target.style.boxShadow = "none"
                        }}
                      />
                    </Box>

                    {/* Organization / Affiliation */}
                    <Box>
                      <Text as="label" fontSize="12.5px" fontWeight="700" color="#334155" mb="1.5" display="block">
                        School / Organization (Optional)
                      </Text>
                      <input
                        type="text"
                        placeholder="e.g. Apex High School / Tech Hub"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        style={{
                          width: "100%",
                          height: "44px",
                          padding: "0 14px",
                          borderRadius: "12px",
                          backgroundColor: "#F8FAFC",
                          border: "1px solid #CBD5E1",
                          fontSize: "14px",
                          color: "#0F172A",
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#149191"
                          e.target.style.boxShadow = "0 0 0 3px rgba(20, 145, 145, 0.12)"
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#CBD5E1"
                          e.target.style.boxShadow = "none"
                        }}
                      />
                    </Box>
                  </SimpleGrid>

                  {/* Message Field */}
                  <Box mb="5">
                    <Flex justify="space-between" align="center" mb="1.5">
                      <Text as="label" fontSize="12.5px" fontWeight="700" color="#334155">
                        Your Message <Text as="span" color="#EF4444">*</Text>
                      </Text>
                      <Text fontSize="11px" color="#94A3B8">
                        {message.length}/1000 characters
                      </Text>
                    </Flex>
                    <textarea
                      required
                      maxLength={1000}
                      rows={4}
                      placeholder="Briefly describe what you'd like to collaborate on, inquire about, or discuss..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        backgroundColor: "#F8FAFC",
                        border: "1px solid #CBD5E1",
                        fontSize: "14px",
                        color: "#0F172A",
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "inherit",
                        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#149191"
                        e.target.style.boxShadow = "0 0 0 3px rgba(20, 145, 145, 0.12)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#CBD5E1"
                        e.target.style.boxShadow = "none"
                      }}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    w="100%"
                    h="48px"
                    bg="#051B64"
                    color="#FFFFFF"
                    fontSize="15px"
                    fontWeight="800"
                    borderRadius="14px"
                    boxShadow="0 4px 14px rgba(5, 27, 100, 0.2)"
                    disabled={isSubmitting}
                    _hover={{
                      bg: "#0A257F",
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 20px rgba(5, 27, 100, 0.25)",
                    }}
                    _active={{ transform: "translateY(0)" }}
                    transition="all 0.2s ease"
                  >
                    {isSubmitting ? "Transmitting to Coordinator..." : "Send Message Directly →"}
                  </Button>
                </form>
              )}
            </Box>
          </Box>

          {/* Right Column: Direct Regional Hubs & Contact Channels (5 cols) */}
          <Box gridColumn={{ base: "span 1", lg: "span 5" }}>
            <VStack align="stretch" gap="5">
              {/* WhatsApp Instant Connect Card */}
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
                  top="-20%"
                  right="-15%"
                  w="200px"
                  h="200px"
                  bg="radial-gradient(circle, rgba(20, 145, 145, 0.3) 0%, transparent 70%)"
                  pointerEvents="none"
                />

                <Badge
                  bg="rgba(16, 185, 129, 0.2)"
                  color="#34D399"
                  border="1px solid rgba(52, 211, 153, 0.3)"
                  px="2.5"
                  py="0.8"
                  borderRadius="full"
                  fontSize="11px"
                  fontWeight="800"
                  mb="3"
                >
                  INSTANT MESSAGING
                </Badge>
                <Heading as="h3" fontSize="20px" fontWeight="900" mb="2">
                  Prefer WhatsApp?
                </Heading>
                <Text fontSize="13px" color="#CBD5E1" mb="5" lineHeight="1.5">
                  Connect with our community coordinator for rapid conference inquiries, venue
                  locations, and cohort registration assistance.
                </Text>

                <Link
                  href="https://wa.me/2348004467228?text=Hello%20I-Impact%20Team%2C%20I%20would%20like%20to%20inquire%20about..."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    w="100%"
                    h="44px"
                    bg="#25D366"
                    color="#064E3B"
                    fontSize="13.5px"
                    fontWeight="800"
                    borderRadius="12px"
                    _hover={{ bg: "#22C55E", transform: "translateY(-1px)" }}
                    transition="all 0.2s ease"
                  >
                    Open WhatsApp Hotline →
                  </Button>
                </Link>
              </Box>

              {/* Regional Operational Hubs Card */}
              <Box
                bg="#FFFFFF"
                borderRadius="24px"
                p={{ base: "6", sm: "7" }}
                border="1px solid"
                borderColor="#E2E8F0"
                boxShadow="0 4px 20px -2px rgba(5, 27, 100, 0.04)"
              >
                <VStack align="flex-start" gap="4">
                  <Text
                    fontSize="11px"
                    fontWeight="800"
                    color="#149191"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                  >
                    PHYSICAL DESKS & DIRECT HOTLINES
                  </Text>

                  {/* Lagos Operational Hub */}
                  <Box w="100%" pb="3.5" borderBottom="1px solid" borderColor="#F1F5F9">
                    <HStack align="flex-start" gap="3">
                      <Box
                        w="36px"
                        h="36px"
                        borderRadius="10px"
                        bg="#EFF6FF"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        color="#2563EB"
                        mt="0.5"
                      >
                        <MapPinIcon size={18} />
                      </Box>
                      <Box>
                        <Text fontSize="14px" fontWeight="800" color="#051B64">
                          Lagos Operations Hub
                        </Text>
                        <Text fontSize="12.5px" color="#64748B" lineHeight="1.4">
                          Victoria Island & Ikeja Tech Corridor, Lagos, Nigeria
                        </Text>
                      </Box>
                    </HStack>
                  </Box>

                  {/* Abuja Regional Desk */}
                  <Box w="100%" pb="3.5" borderBottom="1px solid" borderColor="#F1F5F9">
                    <HStack align="flex-start" gap="3">
                      <Box
                        w="36px"
                        h="36px"
                        borderRadius="10px"
                        bg="#ECFDF5"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        color="#059669"
                        mt="0.5"
                      >
                        <MapPinIcon size={18} />
                      </Box>
                      <Box>
                        <Text fontSize="14px" fontWeight="800" color="#051B64">
                          Abuja Regional Desk
                        </Text>
                        <Text fontSize="12.5px" color="#64748B" lineHeight="1.4">
                          Central Business District (CBD), Abuja FCT, Nigeria
                        </Text>
                      </Box>
                    </HStack>
                  </Box>

                  {/* Direct Phone Line */}
                  <Box w="100%" pb="3.5" borderBottom="1px solid" borderColor="#F1F5F9">
                    <HStack align="flex-start" gap="3">
                      <Box
                        w="36px"
                        h="36px"
                        borderRadius="10px"
                        bg="#FEF3C7"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        color="#D97706"
                        mt="0.5"
                      >
                        <PhoneIcon size={18} />
                      </Box>
                      <Box>
                        <Text fontSize="14px" fontWeight="800" color="#051B64">
                          Toll-Free / Direct Voice
                        </Text>
                        <Link href="tel:+2348004467228" style={{ textDecoration: "none" }}>
                          <Text
                            fontSize="13px"
                            fontWeight="700"
                            color="#149191"
                            _hover={{ textDecoration: "underline" }}
                          >
                            +234 (0) 800 I-IMPACT
                          </Text>
                        </Link>
                      </Box>
                    </HStack>
                  </Box>

                  {/* Operational Hours */}
                  <Box w="100%">
                    <HStack align="flex-start" gap="3">
                      <Box
                        w="36px"
                        h="36px"
                        borderRadius="10px"
                        bg="#F1F5F9"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        color="#475569"
                        mt="0.5"
                      >
                        <ClockIcon size={18} />
                      </Box>
                      <Box>
                        <Text fontSize="14px" fontWeight="800" color="#051B64">
                          Desk Operating Hours
                        </Text>
                        <Text fontSize="12.5px" color="#64748B" lineHeight="1.4">
                          Monday – Friday: 8:00 AM – 5:00 PM (WAT)
                        </Text>
                        <Text fontSize="11px" color="#94A3B8" mt="0.5">
                          Weekend safeguarding emergencies handled on-call
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                </VStack>
              </Box>

              {/* Safeguarding Commitment Card */}
              <Box
                bg="#F8FAFC"
                borderRadius="18px"
                p="4"
                border="1px solid"
                borderColor="#E2E8F0"
              >
                <HStack align="center" gap="2.5">
                  <ShieldCheckIcon size={20} color="#149191" />
                  <Text fontSize="12px" color="#475569" lineHeight="1.4">
                    <strong>Student Safeguarding:</strong> All communications involving minors are monitored under our Child Protection & Ethics Policy.
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
