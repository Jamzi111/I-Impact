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
  CalendarIcon,
  MapPinIcon,
  SparklesIcon,
} from "@/components/icons"
import { EventData } from "./eventsData"

interface EventRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  selectedEvent?: EventData | null
}

export function EventRegistrationModal({
  isOpen,
  onClose,
  selectedEvent,
}: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Secondary School Student",
    attendanceMode: "In-Person (Landmark Centre, Lagos)",
    organization: "",
    cityCountry: "Lagos, Nigeria",
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
          aria-label="Close registration"
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
              <Badge bg="#10B981" color="#FFFFFF" px="3" py="0.5" borderRadius="full">
                PASS CONFIRMED
              </Badge>
              <Heading as="h3" fontSize="22px" fontWeight="800" color="#051B64">
                You&apos;re Registered!
              </Heading>
              <Text fontSize="14px" color="#64748B" maxW="380px">
                Welcome to {selectedEvent?.title || "AS A TEEN Conference 2026"}! We have sent your
                delegate confirmation details to <strong>{formData.email}</strong>.
              </Text>
            </VStack>

            <Box p="4" bg="#F8FAFC" borderRadius="xl" w="100%" textAlign="left">
              <Text fontSize="12px" fontWeight="700" color="#051B64" mb="1">
                EVENT HIGHLIGHTS:
              </Text>
              <Text fontSize="13px" color="#475569">
                • Mode: {formData.attendanceMode}
              </Text>
              <Text fontSize="13px" color="#475569">
                • Dates: {selectedEvent?.dateDisplay || "Nov 6–8, 2026"}
              </Text>
              <Text fontSize="13px" color="#475569">
                • Venue: {selectedEvent?.venue || "Landmark Centre, Victoria Island"}
              </Text>
            </Box>

            <Button
              w="100%"
              h="46px"
              bg="#059669"
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
                    OFFICIAL DELEGATE REGISTRATION
                  </Text>
                </HStack>
                <Heading as="h2" fontSize="22px" fontWeight="800" color="#051B64" lineHeight="1.2">
                  {selectedEvent?.title || "Register for Summit"}
                </Heading>
                <Text fontSize="13px" color="#64748B" mt="1">
                  Free admission for students, fellows, and youth leaders. Fill out the details
                  below to generate your delegate pass.
                </Text>
              </Box>

              {/* Event Quick Info Banner */}
              {selectedEvent && (
                <Box p="3" bg="#F1F5F9" borderRadius="xl" w="100%">
                  <Flex justify="space-between" align="center" fontSize="12px" color="#334155">
                    <HStack gap="1.5">
                      <CalendarIcon size={14} color="#149191" />
                      <Text fontWeight="700">{selectedEvent.dateDisplay}</Text>
                    </HStack>
                    <HStack gap="1.5">
                      <MapPinIcon size={14} color="#051B64" />
                      <Text lineClamp={1} maxW="200px">
                        {selectedEvent.venue.split("&")[0]}
                      </Text>
                    </HStack>
                  </Flex>
                </Box>
              )}

              {/* Form Input Fields */}
              <VStack gap="3.5" w="100%">
                <Box w="100%">
                  <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                    Full Name *
                  </Text>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Oluwaseun Adeleke"
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

                <Flex gap="3" w="100%" direction={{ base: "column", sm: "row" }}>
                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                      Email Address *
                    </Text>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
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
                      placeholder="+234 800 000 0000"
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
                      Delegate Category *
                    </Text>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                      <option>Secondary School Student</option>
                      <option>Teen Tech Innovator</option>
                      <option>Collegiate Fellow / Undergraduate</option>
                      <option>Educator / Teacher Delegation Head</option>
                      <option>Parent / Guardian / Chaperone</option>
                      <option>Youth Mentor / Professional</option>
                    </select>
                  </Box>

                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                      Attendance Mode *
                    </Text>
                    <select
                      value={formData.attendanceMode}
                      onChange={(e) =>
                        setFormData({ ...formData, attendanceMode: e.target.value })
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
                      <option>In-Person (Landmark Centre, Lagos)</option>
                      <option>Virtual Live Stream (Google Meet / YouTube)</option>
                      <option>Regional Watch Party Hub</option>
                    </select>
                  </Box>
                </Flex>

                <Flex gap="3" w="100%" direction={{ base: "column", sm: "row" }}>
                  <Box flex="1">
                    <Text fontSize="12px" fontWeight="700" color="#334155" mb="1">
                      School or Organization
                    </Text>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                      placeholder="e.g. Kings College Lagos"
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
                      City & Country *
                    </Text>
                    <input
                      required
                      type="text"
                      value={formData.cityCountry}
                      onChange={(e) =>
                        setFormData({ ...formData, cityCountry: e.target.value })
                      }
                      placeholder="e.g. Lagos, Nigeria"
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
              </VStack>

              {/* Submit Button */}
              <Button
                type="submit"
                w="100%"
                h="48px"
                bg="#059669"
                color="#FFFFFF"
                borderRadius="xl"
                fontWeight="700"
                fontSize="14.5px"
                mt="2"
                _hover={{ bg: "#047857" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Generating Delegate Pass..." : "Confirm Free Registration"}
              </Button>
            </VStack>
          </form>
        )}
      </Box>
    </Box>
  )
}
