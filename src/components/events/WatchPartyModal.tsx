"use client"

import React, { useState } from "react"
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Badge,
} from "@chakra-ui/react"
import {
  CloseIcon,
  CheckCircleIcon,
  MapPinIcon,
  UsersIcon,
  SparklesIcon,
} from "@/components/icons"

interface WatchPartyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WatchPartyModal({ isOpen, onClose }: WatchPartyModalProps) {
  const [formData, setFormData] = useState({
    hostName: "",
    email: "",
    phone: "",
    hubName: "",
    cityCountry: "",
    venueType: "Secondary School Hall",
    expectedAttendees: "50–100 Teens",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  const handleReset = () => {
    setIsSubmitted(false)
    onClose()
  }

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="4"
      bg="rgba(5, 12, 30, 0.75)"
      backdropFilter="blur(8px)"
      animation="fadeIn 0.2s ease"
    >
      <Box
        w="100%"
        maxW="560px"
        maxH="90vh"
        overflowY="auto"
        bg="#FFFFFF"
        borderRadius="2xl"
        boxShadow="0 25px 60px -15px rgba(0, 0, 0, 0.4)"
        border="1px solid rgba(5, 27, 100, 0.1)"
        p={{ base: "5", sm: "6" }}
        position="relative"
      >
        {/* Close Button */}
        <Box
          as="button"
          aria-label="Close modal"
          onClick={handleReset}
          position="absolute"
          top="4"
          right="4"
          p="2"
          borderRadius="lg"
          color="#64748B"
          _hover={{ bg: "#F1F5F9", color: "#0F172A" }}
          cursor="pointer"
        >
          <CloseIcon size={18} />
        </Box>

        {isSubmitted ? (
          <VStack py="8" textAlign="center" gap="4">
            <Box
              w="64px"
              h="64px"
              borderRadius="full"
              bg="#ECFDF5"
              color="#059669"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CheckCircleIcon size={36} color="#059669" />
            </Box>
            <VStack gap="1">
              <Badge bg="#059669" color="#FFFFFF" px="3" py="0.5" borderRadius="full">
                HOST APPLICATION RECEIVED
              </Badge>
              <Heading as="h3" fontSize="22px" fontWeight="800" color="#051B64">
                Watch Party Hub Registered!
              </Heading>
              <Text fontSize="14px" color="#64748B" maxW="400px">
                Thank you, <strong>{formData.hostName}</strong>. Our Regional Mobilization Team will
                reach out to <strong>{formData.email}</strong> within 24 hours with your Host Tool Kit,
                printable banners, and broadcast stream key.
              </Text>
            </VStack>

            <Box p="4" bg="#F8FAFC" borderRadius="xl" w="100%" textAlign="left">
              <Text fontSize="12px" fontWeight="700" color="#051B64" mb="1">
                HOST PACK INCLUDES:
              </Text>
              <Text fontSize="13px" color="#475569">
                • High-definition two-way broadcast stream access
              </Text>
              <Text fontSize="13px" color="#475569">
                • Printable delegate workbooks & official certificates template
              </Text>
              <Text fontSize="13px" color="#475569">
                • Facilitator discussion guides for post-keynote breakout circles
              </Text>
            </Box>

            <Button
              w="100%"
              h="46px"
              bg="#051B64"
              color="#FFFFFF"
              borderRadius="xl"
              fontWeight="700"
              onClick={handleReset}
            >
              Done & Return to Events
            </Button>
          </VStack>
        ) : (
          <form onSubmit={handleSubmit}>
            <VStack align="flex-start" gap="4">
              {/* Header */}
              <Box pr="8">
                <HStack gap="1.5" mb="1">
                  <SparklesIcon size={14} color="#059669" />
                  <Text fontSize="11px" fontWeight="800" color="#059669" letterSpacing="0.05em">
                    COMMUNITY & REGIONAL MOBILIZATION
                  </Text>
                </HStack>
                <Heading as="h2" fontSize="22px" fontWeight="800" color="#051B64" lineHeight="1.2">
                  Host an AS A TEEN Regional Watch Party
                </Heading>
                <Text fontSize="13px" color="#64748B" mt="1">
                  Broadcast our flagship summit live to teenagers in your city, school auditorium,
                  church hall, or community innovation hub.
                </Text>
              </Box>

              {/* Form Input Fields */}
              <VStack gap="3.5" w="100%">
                <Flex gap="3" w="100%" direction={{ base: "column", sm: "row" }}>
                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                      Lead Host Name *
                    </Text>
                    <input
                      required
                      type="text"
                      value={formData.hostName}
                      onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                      placeholder="e.g. Pastor David or Mrs. Eze"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #CBD5E1",
                        fontSize: "13.5px",
                        outline: "none",
                      }}
                    />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                      Hub / Center Name *
                    </Text>
                    <input
                      required
                      type="text"
                      value={formData.hubName}
                      onChange={(e) => setFormData({ ...formData, hubName: e.target.value })}
                      placeholder="e.g. Grace Hall Youth Center"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #CBD5E1",
                        fontSize: "13.5px",
                        outline: "none",
                      }}
                    />
                  </Box>
                </Flex>

                <Flex gap="3" w="100%" direction={{ base: "column", sm: "row" }}>
                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                      Official Email *
                    </Text>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="host@hub.org"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #CBD5E1",
                        fontSize: "13.5px",
                        outline: "none",
                      }}
                    />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                      Phone / WhatsApp *
                    </Text>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234..."
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #CBD5E1",
                        fontSize: "13.5px",
                        outline: "none",
                      }}
                    />
                  </Box>
                </Flex>

                <Flex gap="3" w="100%" direction={{ base: "column", sm: "row" }}>
                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                      City & Country *
                    </Text>
                    <input
                      required
                      type="text"
                      value={formData.cityCountry}
                      onChange={(e) =>
                        setFormData({ ...formData, cityCountry: e.target.value })
                      }
                      placeholder="e.g. Ibadan, Nigeria or Accra, Ghana"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #CBD5E1",
                        fontSize: "13.5px",
                        outline: "none",
                      }}
                    />
                  </Box>

                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                      Expected Teen Attendees *
                    </Text>
                    <select
                      value={formData.expectedAttendees}
                      onChange={(e) =>
                        setFormData({ ...formData, expectedAttendees: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #CBD5E1",
                        fontSize: "13px",
                        outline: "none",
                        background: "#FFFFFF",
                      }}
                    >
                      <option>20–50 Teens</option>
                      <option>50–100 Teens</option>
                      <option>100–300 Teens</option>
                      <option>300+ Teens (Multi-school assembly)</option>
                    </select>
                  </Box>
                </Flex>

                <Box w="100%">
                  <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                    Venue Facility Type *
                  </Text>
                  <select
                    value={formData.venueType}
                    onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #CBD5E1",
                      fontSize: "13px",
                      outline: "none",
                      background: "#FFFFFF",
                    }}
                  >
                    <option>Secondary School Auditorium</option>
                    <option>Community / Church Youth Hall</option>
                    <option>Tech Innovation Hub / Co-working Space</option>
                    <option>Library / Educational Resource Center</option>
                  </select>
                </Box>
              </VStack>

              {/* Submit Button */}
              <Button
                type="submit"
                w="100%"
                h="48px"
                bg="#051B64"
                color="#FFFFFF"
                borderRadius="xl"
                fontWeight="700"
                fontSize="14.5px"
                mt="2"
                _hover={{ bg: "#04144A" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Application..." : "Submit Watch Party Application"}
              </Button>
            </VStack>
          </form>
        )}
      </Box>
    </Box>
  )
}
