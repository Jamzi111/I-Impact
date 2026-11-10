"use client"

import React, { useEffect } from "react"
import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react"
import {
  CheckCircleIcon,
  CloseIcon,
} from "@/components/icons"

interface InvolvementSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  submission: {
    fullName: string
    email: string
    phone: string
    trackLabel: string
    submittedAt: string
  } | null
}

export function InvolvementSuccessModal({
  isOpen,
  onClose,
  submission,
}: InvolvementSuccessModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !submission) return null

  // Generate deterministic reference
  const refCode = `IMP-${Math.floor(1000 + Math.random() * 9000)}`

  return (
    <Box
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex={1200}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: "4", sm: "6" }}
      bg="rgba(5, 27, 100, 0.75)"
      backdropFilter="blur(8px)"
      onClick={onClose}
    >
      <Box
        bg="#FFFFFF"
        borderRadius="24px"
        maxW="540px"
        w="100%"
        p={{ base: "6", sm: "8" }}
        boxShadow="0 25px 50px -12px rgba(5, 27, 100, 0.35)"
        position="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "8px",
            borderRadius: "50%",
            color: "#64748B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloseIcon size={18} />
        </button>

        {/* Celebration Header */}
        <Flex direction="column" align="center" textAlign="center" mb="5">
          <Box
            w="64px"
            h="64px"
            borderRadius="full"
            bg="#ECFDF5"
            border="2px solid #A7F3D0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="#059669"
            mb="3"
            boxShadow="0 8px 20px rgba(5, 150, 105, 0.2)"
          >
            <CheckCircleIcon size={36} />
          </Box>

          <Heading
            id="success-modal-title"
            as="h3"
            fontSize={{ base: "20px", sm: "24px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.2"
            mb="1.5"
          >
            Interest Received!
          </Heading>

          <Text fontSize="13.5px" color="#64748B" maxW="420px">
            Thank you, <Text as="span" fontWeight="700" color="#051B64">{submission.fullName}</Text>.
            We have received your expression of interest to participate with I IMPACT INITIATIVE.
          </Text>
        </Flex>

        {/* Reference Ticket Card */}
        <Box
          bg="#F8FAFC"
          border="1px solid #E2E8F0"
          borderRadius="16px"
          p="4"
          mb="5"
        >
          <Flex justify="space-between" align="center" mb="2" pb="2" borderBottom="1px solid #E2E8F0">
            <Text fontSize="11px" fontWeight="700" color="#64748B">
              REFERENCE CODE
            </Text>
            <Text fontSize="13px" fontWeight="900" color="#149191" letterSpacing="0.05em">
              {refCode}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center" mb="2">
            <Text fontSize="11.5px" color="#64748B">
              Pathway:
            </Text>
            <Text fontSize="12px" fontWeight="700" color="#051B64">
              {submission.trackLabel}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center">
            <Text fontSize="11.5px" color="#64748B">
              Submitted:
            </Text>
            <Text fontSize="12px" fontWeight="600" color="#64748B">
              {submission.submittedAt}
            </Text>
          </Flex>
        </Box>

        {/* Onboarding Roadmap */}
        <Box mb="6">
          <Text fontSize="11px" fontWeight="800" color="#051B64" textTransform="uppercase" letterSpacing="0.06em" mb="2.5">
            What to Expect Next:
          </Text>
          <VStack align="stretch" gap="2.5">
            <HStack align="flex-start" gap="2.5">
              <Box
                w="20px"
                h="20px"
                borderRadius="full"
                bg="#149191"
                color="#FFFFFF"
                fontSize="11px"
                fontWeight="800"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                mt="0.5"
              >
                1
              </Box>
              <Text fontSize="12.5px" color="#334155" lineHeight="1.4">
                <strong>Review:</strong> Our team reviews your information and considers available programme schedules.
              </Text>
            </HStack>

            <HStack align="flex-start" gap="2.5">
              <Box
                w="20px"
                h="20px"
                borderRadius="full"
                bg="#051B64"
                color="#FFFFFF"
                fontSize="11px"
                fontWeight="800"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                mt="0.5"
              >
                2
              </Box>
              <Text fontSize="12.5px" color="#334155" lineHeight="1.4">
                <strong>Contact:</strong> A team representative will reach out to discuss how your interests align with upcoming activities.
              </Text>
            </HStack>

            <HStack align="flex-start" gap="2.5">
              <Box
                w="20px"
                h="20px"
                borderRadius="full"
                bg="#059669"
                color="#FFFFFF"
                fontSize="11px"
                fontWeight="800"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                mt="0.5"
              >
                3
              </Box>
              <Text fontSize="12.5px" color="#334155" lineHeight="1.4">
                <strong>Orientation & Engagement:</strong> You will receive clear guidelines before being introduced to your role.
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Action Button */}
        <Button
          onClick={onClose}
          w="100%"
          h="44px"
          bg="#051B64"
          color="#FFFFFF"
          borderRadius="12px"
          fontSize="13px"
          fontWeight="700"
          _hover={{ bg: "#071647" }}
        >
          Return to Get Involved
        </Button>
      </Box>
    </Box>
  )
}
