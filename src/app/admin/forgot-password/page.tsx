"use client"

import React, { useState } from "react"
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  HStack,
  Spinner,
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { MailIcon, ArrowRightIcon, ShieldIcon, CheckCircleIcon } from "@/components/icons"

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (!res.ok && !data.success) {
        throw new Error(data.error || "Failed to process request.")
      }

      setSubmitted(true)
    } catch (err: any) {
      console.error("Forgot password request error:", err)
      setErrorMessage(err.message || "Failed to submit request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg="#F8FAFC"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: "4", sm: "6" }}
    >
      <Box w="full" maxW="440px">
        {/* Brand Logo */}
        <Box textAlign="center" mb="6">
          <Box
            bg="white"
            px="4"
            py="2"
            borderRadius="12px"
            border="1px solid #E2E8F0"
            display="inline-flex"
            alignItems="center"
            boxShadow="0 2px 8px rgba(0,0,0,0.06)"
          >
            <Image
              src="/iimpact-logo2.png"
              alt="I-IMPACT Initiative Logo"
              width={120}
              height={34}
              style={{ height: "30px", width: "auto", objectFit: "contain" }}
              priority
            />
          </Box>
        </Box>

        {/* Card */}
        <Box
          bg="white"
          borderRadius="20px"
          p={{ base: "6", sm: "8" }}
          border="1px solid #E2E8F0"
          boxShadow="0 10px 30px rgba(15, 23, 42, 0.05)"
        >
          {submitted ? (
            <VStack gap="4" textAlign="center" py="4">
              <Box
                w="48px"
                h="48px"
                borderRadius="full"
                bg="#ECFDF5"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="#059669"
              >
                <CheckCircleIcon size={28} />
              </Box>

              <Heading as="h2" fontSize="20px" fontWeight="800" color="#0F172A">
                Check Your Inbox
              </Heading>

              <Text fontSize="13.5px" color="#64748B" lineHeight="1.6">
                If an active administrator account exists for <strong>{email}</strong>, a secure password recovery link has been dispatched.
              </Text>

              <Link href="/admin/login" style={{ textDecoration: "none", width: "100%" }}>
                <Button
                  w="full"
                  h="44px"
                  bg="#051B64"
                  color="white"
                  borderRadius="10px"
                  fontSize="13.5px"
                  fontWeight="700"
                  _hover={{ bg: "#0A2580" }}
                  mt="2"
                >
                  Return to Sign In
                </Button>
              </Link>
            </VStack>
          ) : (
            <>
              <VStack gap="1.5" align="flex-start" mb="6">
                <Heading as="h2" fontSize="22px" fontWeight="800" color="#0F172A">
                  Reset Password
                </Heading>
                <Text fontSize="13.5px" color="#64748B">
                  Enter your registered administrator email to receive recovery instructions.
                </Text>
              </VStack>

              {errorMessage && (
                <Box
                  bg="#FEF2F2"
                  border="1px solid #FECACA"
                  p="3.5"
                  borderRadius="10px"
                  mb="5"
                  color="#991B1B"
                  fontSize="13px"
                  fontWeight="600"
                >
                  {errorMessage}
                </Box>
              )}

              <form onSubmit={handleSubmit}>
                <VStack gap="4.5" align="stretch">
                  <Box>
                    <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1.5" display="block">
                      Administrator email
                    </Text>
                    <Box position="relative">
                      <Box position="absolute" left="14px" top="13px" color="#94A3B8" pointerEvents="none">
                        <MailIcon size={16} />
                      </Box>
                      <Input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@i-impact.org"
                        pl="42px"
                        pr="14px"
                        h="46px"
                        fontSize="14px"
                        bg="#FFFFFF"
                        borderColor="#CBD5E1"
                        borderRadius="10px"
                        _focus={{ borderColor: "#051B64", boxShadow: "0 0 0 1px #051B64" }}
                      />
                    </Box>
                  </Box>

                  <Button
                    type="submit"
                    w="full"
                    h="46px"
                    bg="#051B64"
                    color="white"
                    borderRadius="10px"
                    fontSize="14px"
                    fontWeight="700"
                    _hover={{ bg: "#0A2580" }}
                    disabled={loading}
                    mt="1"
                  >
                    {loading ? (
                      <HStack gap="2">
                        <Spinner size="xs" color="white" />
                        <Text>Sending Instructions...</Text>
                      </HStack>
                    ) : (
                      <HStack gap="2">
                        <Text>Send Reset Link</Text>
                        <ArrowRightIcon size={14} />
                      </HStack>
                    )}
                  </Button>

                  <Box textAlign="center" pt="2">
                    <Link
                      href="/admin/login"
                      style={{
                        fontSize: "13px",
                        color: "#051B64",
                        fontWeight: "700",
                        textDecoration: "none",
                      }}
                    >
                      ← Back to Sign In
                    </Link>
                  </Box>
                </VStack>
              </form>

              <Box mt="6" pt="5" borderTop="1px solid #F1F5F9" textAlign="center">
                <HStack justify="center" gap="1.5" color="#64748B" mb="1">
                  <ShieldIcon size={14} color="#64748B" />
                  <Text fontSize="12px" fontWeight="700" textTransform="uppercase" letterSpacing="0.04em">
                    Restricted Access
                  </Text>
                </HStack>
                <Text fontSize="12px" color="#64748B" lineHeight="1.5">
                  Password recovery links are only sent to approved administrator accounts on record.
                </Text>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

