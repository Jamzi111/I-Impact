"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react"
import {
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  HeartHandshakeIcon,
  UsersIcon,
  BuildingIcon,
  TrophyIcon,
  MegaphoneIcon,
} from "@/components/icons"

interface InvolvementFormProps {
  selectedTrack: string
  onTrackChange: (trackId: string) => void
  onOpenSuccessModal: (data: any) => void
}

const TRACK_OPTIONS = [
  { id: "mentor", label: "Youth Mentor", icon: <HeartHandshakeIcon size={14} color="currentColor" /> },
  { id: "volunteer", label: "Event Volunteer", icon: <UsersIcon size={14} color="currentColor" /> },
  { id: "partner", label: "School / Corporate Partner", icon: <BuildingIcon size={14} color="currentColor" /> },
  { id: "sponsor", label: "Cohort Sponsor", icon: <TrophyIcon size={14} color="currentColor" /> },
  { id: "speaker", label: "Keynote Speaker", icon: <MegaphoneIcon size={14} color="currentColor" /> },
  { id: "community", label: "Community Member", icon: <SparklesIcon size={14} color="currentColor" /> },
]

const SKILL_AREAS = [
  "STEM & Robotics",
  "Career & Academic Guidance",
  "Event & Stage Operations",
  "Photography & Videography",
  "Public Speaking & Debate",
  "Fundraising & CSR",
  "Character & Spiritual Mentorship",
  "Community Mobilization",
]

const AVAILABILITY_OPTIONS = [
  "1 – 2 hours / week",
  "3 – 5 hours / week",
  "5+ hours / week",
  "Flexible / Event-Based",
]

export function InvolvementForm({
  selectedTrack,
  onTrackChange,
  onOpenSuccessModal,
}: InvolvementFormProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [cityCountry, setCityCountry] = useState("")
  const [organization, setOrganization] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [availability, setAvailability] = useState("1 – 2 hours / week")
  const [motivation, setMotivation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.")
      return
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.")
      return
    }
    if (!phone.trim()) {
      setErrorMsg("Please provide your WhatsApp or mobile phone number.")
      return
    }
    if (!motivation.trim() || motivation.trim().length < 15) {
      setErrorMsg("Please provide a brief statement (at least 15 characters) on why you'd like to get involved.")
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      const submission = {
        fullName,
        email,
        phone,
        cityCountry: cityCountry || "Nigeria",
        organization: organization || "Independent",
        track: selectedTrack,
        trackLabel: TRACK_OPTIONS.find((t) => t.id === selectedTrack)?.label || selectedTrack,
        selectedSkills,
        availability,
        motivation,
        submittedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }

      onOpenSuccessModal(submission)

      // Clear form
      setFullName("")
      setEmail("")
      setPhone("")
      setCityCountry("")
      setOrganization("")
      setSelectedSkills([])
      setMotivation("")
    }, 900)
  }

  return (
    <Box
      as="section"
      id="application-form"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#FFFFFF"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "960px", xl: "1020px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Box
          bg="#FFFFFF"
          border="1.5px solid"
          borderColor="#E2E8F0"
          borderRadius="24px"
          boxShadow="0 16px 40px -12px rgba(5, 27, 100, 0.08)"
          p={{ base: "5", sm: "7", md: "10" }}
          position="relative"
        >
          {/* Form Header */}
          <Flex
            direction="column"
            align="center"
            textAlign="center"
            maxW="680px"
            mx="auto"
            mb="8"
          >
            <HStack
              gap="2"
              px="3"
              py="1"
              bg="rgba(20, 145, 145, 0.08)"
              border="1px solid"
              borderColor="rgba(20, 145, 145, 0.25)"
              borderRadius="full"
              mb="2.5"
            >
              <ShieldCheckIcon size={14} color="#149191" />
              <Text
                fontSize="11.5px"
                fontWeight="800"
                letterSpacing="0.06em"
                textTransform="uppercase"
                color="#0F766E"
              >
                Expression of Interest
              </Text>
            </HStack>
            <Heading
              as="h2"
              fontSize={{ base: "22px", sm: "26px", md: "32px" }}
              fontWeight="900"
              color="#051B64"
              lineHeight="1.2"
              mb="2"
            >
              Express Your Interest in Getting Involved
            </Heading>
            <Text fontSize="13.5px" color="#64748B" lineHeight="1.6">
              Complete the brief form below to share how you would like to participate.
              A member of our team will review your details and reach out to discuss upcoming opportunities.
            </Text>
          </Flex>

          {/* Track Selection Pills */}
          <Box mb="7">
            <Text fontSize="12px" fontWeight="800" color="#051B64" textTransform="uppercase" letterSpacing="0.05em" mb="2.5">
              1. Select Your Involvement Pathway:
            </Text>
            <Flex gap="2" wrap="wrap">
              {TRACK_OPTIONS.map((track) => {
                const isActive = selectedTrack === track.id
                return (
                  <Box
                    key={track.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onTrackChange(track.id)}
                    px="3.5"
                    py="2"
                    borderRadius="12px"
                    fontSize="12.5px"
                    fontWeight="700"
                    transition="all 0.18s ease"
                    bg={isActive ? "#051B64" : "#F8FAFC"}
                    color={isActive ? "#FFFFFF" : "#334155"}
                    border="1.5px solid"
                    borderColor={isActive ? "#051B64" : "#E2E8F0"}
                    cursor="pointer"
                    _hover={{
                      borderColor: isActive ? "#051B64" : "#CBD5E1",
                      bg: isActive ? "#071647" : "#F1F5F9",
                    }}
                  >
                    <HStack gap="1.5">
                      <Box>{track.icon}</Box>
                      <Text>{track.label}</Text>
                    </HStack>
                  </Box>
                )
              })}
            </Flex>
          </Box>

          {/* Error Banner */}
          {errorMsg && (
            <Box
              p="3"
              mb="6"
              bg="#FEF2F2"
              border="1px solid #FCA5A5"
              borderRadius="12px"
              color="#B91C1C"
              fontSize="13px"
              fontWeight="600"
            >
              {errorMsg}
            </Box>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <Text fontSize="12px" fontWeight="800" color="#051B64" textTransform="uppercase" letterSpacing="0.05em" mb="3">
              2. Your Contact & Background Information:
            </Text>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" mb="4">
              <Box>
                <Text as="label" fontSize="12px" fontWeight="700" color="#334155" mb="1" display="block">
                  Full Name <Text as="span" color="#EF4444">*</Text>
                </Text>
                <input
                  type="text"
                  placeholder="e.g. Samuel Adebayo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "13.5px",
                    color: "#0F172A",
                    outline: "none",
                    background: "#F8FAFC",
                  }}
                  required
                />
              </Box>

              <Box>
                <Text as="label" fontSize="12px" fontWeight="700" color="#334155" mb="1" display="block">
                  Email Address <Text as="span" color="#EF4444">*</Text>
                </Text>
                <input
                  type="email"
                  placeholder="samuel@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "13.5px",
                    color: "#0F172A",
                    outline: "none",
                    background: "#F8FAFC",
                  }}
                  required
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" mb="4">
              <Box>
                <Text as="label" fontSize="12px" fontWeight="700" color="#334155" mb="1" display="block">
                  Phone / WhatsApp Number <Text as="span" color="#EF4444">*</Text>
                </Text>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "13.5px",
                    color: "#0F172A",
                    outline: "none",
                    background: "#F8FAFC",
                  }}
                  required
                />
              </Box>

              <Box>
                <Text as="label" fontSize="12px" fontWeight="700" color="#334155" mb="1" display="block">
                  City, State & Country
                </Text>
                <input
                  type="text"
                  placeholder="e.g. Lagos, Nigeria"
                  value={cityCountry}
                  onChange={(e) => setCityCountry(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "13.5px",
                    color: "#0F172A",
                    outline: "none",
                    background: "#F8FAFC",
                  }}
                />
              </Box>
            </SimpleGrid>

            <Box mb="5">
              <Text as="label" fontSize="12px" fontWeight="700" color="#334155" mb="1" display="block">
                Current School, Company, or Organization
              </Text>
              <input
                type="text"
                placeholder="e.g. University of Lagos / Tech Corp / Lead City High"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1.5px solid #CBD5E1",
                  fontSize: "13.5px",
                  color: "#0F172A",
                  outline: "none",
                  background: "#F8FAFC",
                }}
              />
            </Box>

            {/* Skills & Strengths */}
            <Box mb="5">
              <Text fontSize="12px" fontWeight="800" color="#051B64" textTransform="uppercase" letterSpacing="0.05em" mb="2">
                3. Skills & Strengths You Bring (Select all that apply):
              </Text>
              <Flex gap="2" wrap="wrap">
                {SKILL_AREAS.map((skill) => {
                  const isChecked = selectedSkills.includes(skill)
                  return (
                    <Box
                      key={skill}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleSkill(skill)}
                      px="3"
                      py="1.5"
                      borderRadius="full"
                      fontSize="11.5px"
                      fontWeight="700"
                      transition="all 0.16s ease"
                      bg={isChecked ? "rgba(20, 145, 145, 0.12)" : "#F1F5F9"}
                      color={isChecked ? "#0F766E" : "#475569"}
                      border="1px solid"
                      borderColor={isChecked ? "#149191" : "#E2E8F0"}
                      cursor="pointer"
                    >
                      <HStack gap="1.5">
                        {isChecked && <CheckCircleIcon size={12} color="#0F766E" />}
                        <Text>{skill}</Text>
                      </HStack>
                    </Box>
                  )
                })}
              </Flex>
            </Box>

            {/* Availability */}
            <Box mb="5">
              <Text fontSize="12px" fontWeight="800" color="#051B64" textTransform="uppercase" letterSpacing="0.05em" mb="2">
                4. Your Weekly Availability:
              </Text>
              <Flex gap="2" wrap="wrap">
                {AVAILABILITY_OPTIONS.map((opt) => {
                  const isChosen = availability === opt
                  return (
                    <Box
                      key={opt}
                      role="button"
                      tabIndex={0}
                      onClick={() => setAvailability(opt)}
                      px="3"
                      py="1.5"
                      borderRadius="10px"
                      fontSize="12px"
                      fontWeight="700"
                      bg={isChosen ? "#051B64" : "#F8FAFC"}
                      color={isChosen ? "#FFFFFF" : "#475569"}
                      border="1px solid"
                      borderColor={isChosen ? "#051B64" : "#E2E8F0"}
                      cursor="pointer"
                    >
                      {opt}
                    </Box>
                  )
                })}
              </Flex>
            </Box>

            {/* Personal Statement / Motivation */}
            <Box mb="6">
              <Text as="label" fontSize="12px" fontWeight="700" color="#334155" mb="1" display="block">
                5. Brief Statement: Why do you want to get involved with I-Impact? <Text as="span" color="#EF4444">*</Text>
              </Text>
              <textarea
                rows={4}
                placeholder="Tell us a little about your personal drive, what inspires you to work with youth, or what kind of impact you hope to achieve together..."
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1.5px solid #CBD5E1",
                  fontSize: "13.5px",
                  color: "#0F172A",
                  outline: "none",
                  background: "#F8FAFC",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
                required
              />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              w="100%"
              h={{ base: "48px", md: "52px" }}
              bg="#149191"
              color="#FFFFFF"
              fontSize="14.5px"
              fontWeight="800"
              borderRadius="12px"
              boxShadow="0 4px 16px rgba(20, 145, 145, 0.35)"
              transition="all 0.2s ease"
              _hover={{
                bg: "#0F766E",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 20px rgba(20, 145, 145, 0.45)",
              }}
              _active={{ transform: "translateY(0)" }}
              disabled={isSubmitting}
            >
              <HStack gap="2">
                <Text>{isSubmitting ? "Submitting..." : "Submit Expression of Interest"}</Text>
                {!isSubmitting && <ArrowRightIcon size={16} />}
              </HStack>
            </Button>

            <HStack justify="center" gap="1.5" mt="3" color="#64748B" fontSize="11.5px">
              <ShieldCheckIcon size={14} color="#10B981" />
              <Text>Your details are treated confidentially and used solely for communication about I IMPACT initiatives.</Text>
            </HStack>
          </form>
        </Box>
      </Container>
    </Box>
  )
}

