"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react"
import {
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  FileTextIcon,
  UploadIcon,
  CopyIcon,
  CheckIcon,
  CloseIcon,
} from "@/components/icons"
import {
  PATHWAY_CONFIGS,
  normalizePathwayId,
  APPROVED_PATHWAYS,
} from "@/config/pathways"
import {
  PathwayId,
  ApplicantDetails,
} from "@/types/application"

interface InvolvementFormProps {
  selectedTrack: string
  onTrackChange: (trackId: string) => void
  onOpenSuccessModal?: (data: any) => void
}

interface FileUploadState {
  isUploading: boolean
  url: string
  fileName: string
  error: string
}

export function InvolvementForm({
  selectedTrack,
  onTrackChange,
}: InvolvementFormProps) {
  // 1. Current Pathway state
  const currentPathway: PathwayId = normalizePathwayId(selectedTrack)
  const currentConfig = PATHWAY_CONFIGS[currentPathway]

  // 2. Stepper state (1: Personal Info, 2: Pathway Details, 3: Review & Submit)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)

  // 3. Shared Applicant Details
  const [applicant, setApplicant] = useState<ApplicantDetails>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "Nigeria",
  })

  // 4. Pathway-specific dynamic answers store (persists across pathway switches)
  const [pathwayAnswers, setPathwayAnswers] = useState<Record<PathwayId, Record<string, any>>>({
    mentorship: { mentorshipFormat: "Either", mentorshipAreas: [], preferredAgeGroups: [] },
    volunteering: { availabilitySchedule: "Both", areasOfInterest: [], physicalEventAttendance: "Yes", virtualActivitiesAvailability: "Yes" },
    partnerships: { partnershipInterests: [] },
    sponsorship: { applicantType: "Individual", supportPreference: "One-time", supportTypes: [] },
    speaking: { preferredFormat: "Either", speakingTopics: [], preferredParticipation: [] },
    ambassadors: { preferredRepresentation: "University or campus", outreachInterests: [] },
  })

  // 5. File upload states per field name
  const [uploadStates, setUploadStates] = useState<Record<string, FileUploadState>>({})

  // 6. Safeguarding acknowledgement
  const [safeguardingAcknowledged, setSafeguardingAcknowledged] = useState(false)

  // 7. Submission lifecycle states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submittedData, setSubmittedData] = useState<{
    reference: string
    pathway: PathwayId
    pathwayTitle: string
    applicantName: string
    submittedAt: string
  } | null>(null)
  const [copiedRef, setCopiedRef] = useState(false)

  const formTopRef = useRef<HTMLDivElement>(null)

  // Sync pathway when prop changes
  useEffect(() => {
    setFormError(null)
  }, [selectedTrack])

  // Scroll to form helper
  const scrollToFormTop = () => {
    if (formTopRef.current) {
      const headerOffset = 90
      const elementPosition = formTopRef.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  // Handle pathway selection from the in-form pathway switcher
  const handleSelectPathway = (newPathway: PathwayId) => {
    onTrackChange(newPathway)
    setFormError(null)
    setFieldErrors({})
  }

  // Update applicant personal details
  const handleApplicantChange = (field: keyof ApplicantDetails, value: string) => {
    setApplicant((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  // Update pathway-specific answer
  const handlePathwayAnswerChange = (field: string, value: any) => {
    setPathwayAnswers((prev) => ({
      ...prev,
      [currentPathway]: {
        ...prev[currentPathway],
        [field]: value,
      },
    }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  // Toggle checkbox in group
  const handleCheckboxToggle = (field: string, optionValue: string) => {
    const currentList: string[] = Array.isArray(pathwayAnswers[currentPathway]?.[field])
      ? pathwayAnswers[currentPathway][field]
      : []
    const updated = currentList.includes(optionValue)
      ? currentList.filter((item) => item !== optionValue)
      : [...currentList, optionValue]
    handlePathwayAnswerChange(field, updated)
  }

  // File upload handler
  const handleFileUpload = async (fieldName: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setUploadStates((prev) => ({
        ...prev,
        [fieldName]: { isUploading: false, url: "", fileName: "", error: "File exceeds 5MB size limit." },
      }))
      return
    }

    setUploadStates((prev) => ({
      ...prev,
      [fieldName]: { isUploading: true, url: "", fileName: file.name, error: "" },
    }))

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setUploadStates((prev) => ({
          ...prev,
          [fieldName]: { isUploading: false, url: data.url, fileName: file.name, error: "" },
        }))
        handlePathwayAnswerChange(fieldName, data.url)
        handlePathwayAnswerChange(`${fieldName}Name`, file.name)
      } else {
        setUploadStates((prev) => ({
          ...prev,
          [fieldName]: { isUploading: false, url: "", fileName: "", error: data.error || "File upload failed." },
        }))
      }
    } catch {
      setUploadStates((prev) => ({
        ...prev,
        [fieldName]: { isUploading: false, url: "", fileName: "", error: "Network error during upload." },
      }))
    }
  }

  // Validate Step 1
  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {}
    if (!applicant.fullName.trim() || applicant.fullName.trim().length < 2) {
      errors.fullName = "Full name is required (at least 2 characters)."
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!applicant.email.trim() || !emailRegex.test(applicant.email.trim())) {
      errors.email = "A valid email address is required."
    }
    const phoneRegex = /^[+0-9\s\-().]{7,25}$/
    if (!applicant.phone.trim() || !phoneRegex.test(applicant.phone.trim())) {
      errors.phone = "A valid phone or WhatsApp number is required (min 7 digits)."
    }
    if (!applicant.city.trim()) {
      errors.city = "City is required."
    }
    if (!applicant.state.trim()) {
      errors.state = "State is required."
    }
    if (!applicant.country.trim()) {
      errors.country = "Country is required."
    }

    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setFormError("Please fill in all required personal information fields correctly before continuing.")
      return false
    }
    setFormError(null)
    return true
  }

  // Validate Step 2
  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {}
    const currentAnswers = pathwayAnswers[currentPathway] || {}

    for (const section of currentConfig.sections) {
      for (const field of section.fields) {
        if (field.condition) {
          const depValue = currentAnswers[field.condition.field]
          const isConditionMet = Array.isArray(depValue)
            ? depValue.includes(field.condition.value)
            : depValue === field.condition.value
          if (!isConditionMet) continue
        }

        const value = currentAnswers[field.name]

        if (field.type === "checkbox-group") {
          if (field.required && (!Array.isArray(value) || value.length === 0)) {
            errors[field.name] = `Please select at least one option for ${field.label}.`
          }
        } else if (field.type === "file") {
          // File is optional per specification
        } else {
          if (field.required && (!value || String(value).trim().length === 0)) {
            errors[field.name] = `${field.label} is required.`
          }
        }
      }
    }

    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setFormError("Please complete all required pathway questions before moving to the review step.")
      return false
    }
    setFormError(null)
    return true
  }

  // Stepper navigation
  const handleProceedToStep2 = () => {
    if (validateStep1()) {
      setCurrentStep(2)
      scrollToFormTop()
    }
  }

  const handleProceedToStep3 = () => {
    if (validateStep2()) {
      setCurrentStep(3)
      scrollToFormTop()
    }
  }

  // Final Submission to MongoDB Atlas API
  const handleSubmitFinal = async () => {
    setFormError(null)

    if (!safeguardingAcknowledged) {
      setFormError("Please acknowledge the safeguarding and application review policy before submitting.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        pathway: currentPathway,
        applicantDetails: applicant,
        pathwayDetails: pathwayAnswers[currentPathway],
        safeguardingAcknowledged: true,
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmittedData({
          reference: data.applicationReference,
          pathway: currentPathway,
          pathwayTitle: currentConfig.title,
          applicantName: applicant.fullName,
          submittedAt: new Date(data.submittedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        })
        scrollToFormTop()
      } else {
        setFormError(data.error || "Failed to submit application. Please check your connection and try again.")
      }
    } catch {
      setFormError("A network error occurred while submitting your application. Your information is preserved; please try submitting again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyReference = () => {
    if (submittedData?.reference) {
      navigator.clipboard.writeText(submittedData.reference)
      setCopiedRef(true)
      setTimeout(() => setCopiedRef(false), 2500)
    }
  }

  const handleStartNewApplication = () => {
    setSubmittedData(null)
    setCurrentStep(1)
    setSafeguardingAcknowledged(false)
    setFormError(null)
    setFieldErrors({})
    scrollToFormTop()
  }

  const inputBaseStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    height: "42px",
    padding: "0 14px",
    borderRadius: "10px",
    border: `1px solid ${hasError ? "#EF4444" : "#CBD5E1"}`,
    fontSize: "13.5px",
    outline: "none",
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    boxSizing: "border-box",
  })

  const textareaBaseStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: `1px solid ${hasError ? "#EF4444" : "#CBD5E1"}`,
    fontSize: "13px",
    lineHeight: "1.5",
    outline: "none",
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    boxSizing: "border-box",
  })

  const formContent = (
    <Box>
      {/* If submitted, show confirmation screen */}
      {submittedData ? (
        <Box
          bg="#FFFFFF"
          border="2px solid"
          borderColor="#10B981"
          borderRadius="24px"
          boxShadow="0 20px 48px -12px rgba(16, 185, 129, 0.18)"
          p={{ base: "6", sm: "8", md: "10" }}
          textAlign="center"
        >
          <Box
            w="64px"
            h="64px"
            borderRadius="full"
            bg="#ECFDF5"
            color="#10B981"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            mb="4"
            border="2px solid"
            borderColor="#A7F3D0"
          >
            <CheckCircleIcon size={34} color="#10B981" />
          </Box>

          <Heading
            as="h2"
            fontSize={{ base: "22px", sm: "26px", md: "30px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.2"
            mb="3"
          >
            Your application has been received.
          </Heading>

          <Text
            fontSize={{ base: "14px", md: "15px" }}
            color="#475569"
            maxW="640px"
            mx="auto"
            lineHeight="1.6"
            mb="6"
          >
            Thank you, <strong>{submittedData.applicantName}</strong>. Your expression of interest for the{" "}
            <strong>{submittedData.pathwayTitle}</strong> pathway has been recorded in our official database.
          </Text>

          {/* Application Reference Callout */}
          <Box
            bg="#F8FAFC"
            border="1.5px dashed"
            borderColor="#CBD5E1"
            borderRadius="16px"
            p={{ base: "4", md: "5" }}
            maxW="480px"
            mx="auto"
            mb="6"
          >
            <Text fontSize="11px" fontWeight="800" color="#64748B" textTransform="uppercase" letterSpacing="0.06em" mb="1">
              APPLICATION REFERENCE CODE
            </Text>
            <Flex align="center" justify="center" gap="3">
              <Text fontSize={{ base: "20px", sm: "22px" }} fontWeight="900" color="#051B64" letterSpacing="0.04em">
                {submittedData.reference}
              </Text>
              <Button
                size="xs"
                h="28px"
                px="3"
                borderRadius="8px"
                bg="#FFFFFF"
                border="1px solid #CBD5E1"
                color="#0F172A"
                onClick={handleCopyReference}
                _hover={{ bg: "#F1F5F9" }}
              >
                <HStack gap="1.5">
                  {copiedRef ? <CheckIcon size={12} color="#10B981" /> : <CopyIcon size={12} />}
                  <Text fontSize="11px" fontWeight="700">
                    {copiedRef ? "Copied" : "Copy"}
                  </Text>
                </HStack>
              </Button>
            </Flex>
            <Text fontSize="11px" color="#94A3B8" mt="1.5">
              Submitted on {submittedData.submittedAt}
            </Text>
          </Box>

          {/* Next Steps / Review Notice (Honest, strictly non-presumptive) */}
          <Box
            bg="#EFF6FF"
            border="1px solid"
            borderColor="#BFDBFE"
            borderRadius="14px"
            p={{ base: "4", md: "5" }}
            maxW="640px"
            mx="auto"
            mb="7"
            textAlign="left"
          >
            <HStack align="flex-start" gap="3">
              <Box color="#2563EB" mt="0.5" flexShrink={0}>
                <ShieldCheckIcon size={20} color="#2563EB" />
              </Box>
              <Box>
                <Text fontSize="13px" fontWeight="800" color="#1E3A8A" mb="1">
                  What happens next?
                </Text>
                <Text fontSize="12px" color="#1E40AF" lineHeight="1.55">
                  Our team reviews applications on a rolling cohort basis. Please note that submission does not guarantee acceptance or immediate placement. If your profile aligns with upcoming initiatives, an I IMPACT coordinator will reach out via email or WhatsApp to discuss next steps and safeguarding orientation.
                </Text>
              </Box>
            </HStack>
          </Box>

          <Flex justify="center" gap="3" wrap="wrap">
            <Button
              onClick={handleStartNewApplication}
              bg="#051B64"
              color="#FFFFFF"
              size="md"
              h="42px"
              px="6"
              fontSize="13px"
              fontWeight="700"
              borderRadius="12px"
              _hover={{ bg: "#071647" }}
            >
              Submit Another Application
            </Button>
          </Flex>
        </Box>
      ) : (
        /* Main Multi-Step Form Card */
        <Box
          bg="#FFFFFF"
          border="1.5px solid"
          borderColor="#E2E8F0"
          borderRadius="24px"
          boxShadow="0 16px 40px -12px rgba(5, 27, 100, 0.08)"
          p={{ base: "5", sm: "7", md: "10" }}
          position="relative"
        >
          {/* Top Form Header with Pathway Details & Close button if modal */}
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align={{ base: "flex-start", sm: "center" }}
            gap="3"
            mb="6"
            pb="5"
            borderBottom="1px solid"
            borderColor="#F1F5F9"
          >
            <Box>
              <HStack gap="2" mb="1.5">
                <Box
                  px="2.5"
                  py="0.5"
                  borderRadius="full"
                  bg={currentConfig.badgeBg}
                  color={currentConfig.badgeColor}
                  fontSize="11px"
                  fontWeight="800"
                  letterSpacing="0.04em"
                  textTransform="uppercase"
                >
                  {currentConfig.badge}
                </Box>
                <Text fontSize="11.5px" color="#64748B" fontWeight="600">
                  Pathway Application
                </Text>
              </HStack>
              <Heading
                as="h2"
                fontSize={{ base: "19px", sm: "22px", md: "24px" }}
                fontWeight="900"
                color="#051B64"
                lineHeight="1.2"
              >
                Apply: {currentConfig.title}
              </Heading>
            </Box>

            <HStack gap="2">
              {/* Step indicator pills */}
              <HStack gap="1.5" align="center" bg="#F8FAFC" p="1.5" borderRadius="full" border="1px solid #E2E8F0">
                {[
                  { num: 1, label: "Personal" },
                  { num: 2, label: "Pathway" },
                  { num: 3, label: "Review" },
                ].map((s) => {
                  const isActive = currentStep === s.num
                  const isDone = currentStep > s.num
                  return (
                    <Box
                      key={s.num}
                      px="3"
                      py="1"
                      borderRadius="full"
                      bg={isActive ? "#051B64" : isDone ? "#ECFDF5" : "transparent"}
                      color={isActive ? "#FFFFFF" : isDone ? "#059669" : "#64748B"}
                      fontSize="11px"
                      fontWeight="800"
                      transition="all 0.2s"
                    >
                      {isDone ? `✓ ${s.label}` : `${s.num}. ${s.label}`}
                    </Box>
                  )
                })}
              </HStack>
            </HStack>
          </Flex>

          {/* Pathway Selector Pills (Allows visitor to change selected pathway anytime) */}
          <Box mb="7">
            <Text fontSize="11.5px" fontWeight="800" color="#64748B" textTransform="uppercase" letterSpacing="0.05em" mb="2.5">
              SELECT PARTICIPATION PATHWAY
            </Text>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} gap="2">
              {APPROVED_PATHWAYS.map((pId) => {
                const pConfig = PATHWAY_CONFIGS[pId]
                const isSelected = pId === currentPathway
                return (
                  <button
                    key={pId}
                    type="button"
                    onClick={() => handleSelectPathway(pId)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "auto",
                      padding: "10px 8px",
                      borderRadius: "12px",
                      border: `1.5px solid ${isSelected ? "#149191" : "#E2E8F0"}`,
                      backgroundColor: isSelected ? "rgba(20, 145, 145, 0.08)" : "#FFFFFF",
                      color: isSelected ? "#0F766E" : "#475569",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontWeight: isSelected ? 800 : 600,
                        lineHeight: 1.2,
                        textAlign: "center",
                      }}
                    >
                      {pConfig.badge}
                    </span>
                  </button>
                )
              })}
            </SimpleGrid>
          </Box>

          {/* Error Notification Banner */}
          {formError && (
            <Box
              bg="#FEF2F2"
              border="1px solid"
              borderColor="#F87171"
              borderRadius="12px"
              p="3.5"
              mb="6"
              color="#991B1B"
            >
              <HStack gap="2" align="flex-start">
                <Text fontSize="14px" fontWeight="700">⚠️</Text>
                <Text fontSize="13px" fontWeight="600" lineHeight="1.4">
                  {formError}
                </Text>
              </HStack>
            </Box>
          )}

          {/* ================= STEP 1: PERSONAL INFORMATION ================= */}
          {currentStep === 1 && (
            <Box>
              <Box mb="6">
                <Heading as="h3" fontSize="16px" fontWeight="800" color="#051B64" mb="1">
                  Step 1: Your Contact Information
                </Heading>
                <Text fontSize="13px" color="#64748B">
                  Every application collects these core contact details so our team can follow up with you.
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" mb="6">
                {/* Full Name */}
                <Box>
                  <label htmlFor="fullName" style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#0F172A", marginBottom: "4px" }}>
                    Full Name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={applicant.fullName}
                    onChange={(e) => handleApplicantChange("fullName", e.target.value)}
                    placeholder="e.g., Olumide Adebayo"
                    style={inputBaseStyle(!!fieldErrors.fullName)}
                  />
                  {fieldErrors.fullName && (
                    <Text fontSize="11px" color="#EF4444" mt="1">
                      {fieldErrors.fullName}
                    </Text>
                  )}
                </Box>

                {/* Email Address */}
                <Box>
                  <label htmlFor="email" style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#0F172A", marginBottom: "4px" }}>
                    Email Address <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={applicant.email}
                    onChange={(e) => handleApplicantChange("email", e.target.value)}
                    placeholder="olumide@example.com"
                    style={inputBaseStyle(!!fieldErrors.email)}
                  />
                  {fieldErrors.email && (
                    <Text fontSize="11px" color="#EF4444" mt="1">
                      {fieldErrors.email}
                    </Text>
                  )}
                </Box>

                {/* Phone / WhatsApp */}
                <Box>
                  <label htmlFor="phone" style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#0F172A", marginBottom: "4px" }}>
                    Phone Number / WhatsApp <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={applicant.phone}
                    onChange={(e) => handleApplicantChange("phone", e.target.value)}
                    placeholder="+234 800 000 0000"
                    style={inputBaseStyle(!!fieldErrors.phone)}
                  />
                  {fieldErrors.phone && (
                    <Text fontSize="11px" color="#EF4444" mt="1">
                      {fieldErrors.phone}
                    </Text>
                  )}
                </Box>

                {/* City */}
                <Box>
                  <label htmlFor="city" style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#0F172A", marginBottom: "4px" }}>
                    City <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={applicant.city}
                    onChange={(e) => handleApplicantChange("city", e.target.value)}
                    placeholder="e.g., Ikeja, Ibadan, Abuja, Nairobi"
                    style={inputBaseStyle(!!fieldErrors.city)}
                  />
                  {fieldErrors.city && (
                    <Text fontSize="11px" color="#EF4444" mt="1">
                      {fieldErrors.city}
                    </Text>
                  )}
                </Box>

                {/* State */}
                <Box>
                  <label htmlFor="state" style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#0F172A", marginBottom: "4px" }}>
                    State / Province <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={applicant.state}
                    onChange={(e) => handleApplicantChange("state", e.target.value)}
                    placeholder="e.g., Lagos, Oyo, FCT, Nairobi County"
                    style={inputBaseStyle(!!fieldErrors.state)}
                  />
                  {fieldErrors.state && (
                    <Text fontSize="11px" color="#EF4444" mt="1">
                      {fieldErrors.state}
                    </Text>
                  )}
                </Box>

                {/* Country */}
                <Box>
                  <label htmlFor="country" style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#0F172A", marginBottom: "4px" }}>
                    Country <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={applicant.country}
                    onChange={(e) => handleApplicantChange("country", e.target.value)}
                    placeholder="e.g., Nigeria, Ghana, Kenya, United Kingdom"
                    style={inputBaseStyle(!!fieldErrors.country)}
                  />
                  {fieldErrors.country && (
                    <Text fontSize="11px" color="#EF4444" mt="1">
                      {fieldErrors.country}
                    </Text>
                  )}
                </Box>
              </SimpleGrid>

              <Flex justify="flex-end" pt="4" borderTop="1px solid #F1F5F9">
                <Button
                  onClick={handleProceedToStep2}
                  bg="#051B64"
                  color="#FFFFFF"
                  h="44px"
                  px="7"
                  fontSize="13.5px"
                  fontWeight="800"
                  borderRadius="12px"
                  _hover={{ bg: "#071647", transform: "translateY(-1px)" }}
                >
                  <HStack gap="2">
                    <Text>Continue to Pathway Questions</Text>
                    <ArrowRightIcon size={14} />
                  </HStack>
                </Button>
              </Flex>
            </Box>
          )}

          {/* ================= STEP 2: PATHWAY SPECIFIC QUESTIONS ================= */}
          {currentStep === 2 && (
            <Box>
              <Box mb="6">
                <HStack gap="2" mb="1">
                  <SparklesIcon size={16} color="#149191" />
                  <Heading as="h3" fontSize="16px" fontWeight="800" color="#051B64">
                    Step 2: {currentConfig.title} Specific Questions
                  </Heading>
                </HStack>
                <Text fontSize="13px" color="#64748B">
                  {currentConfig.formIntro}
                </Text>
              </Box>

              {/* Render Dynamic Sections & Fields */}
              <VStack gap="6" align="stretch" mb="8">
                {currentConfig.sections.map((section) => (
                  <Box
                    key={section.id}
                    bg="#F8FAFC"
                    border="1px solid #E2E8F0"
                    borderRadius="16px"
                    p={{ base: "4", sm: "5", md: "6" }}
                  >
                    <Heading as="h4" fontSize="14px" fontWeight="800" color="#051B64" mb="1">
                      {section.title}
                    </Heading>
                    {section.description && (
                      <Text fontSize="12px" color="#64748B" mb="4">
                        {section.description}
                      </Text>
                    )}

                    <VStack gap="4" align="stretch" mt="3">
                      {section.fields.map((field) => {
                        const currentAnswers = pathwayAnswers[currentPathway] || {}

                        if (field.condition) {
                          const depValue = currentAnswers[field.condition.field]
                          const isMet = Array.isArray(depValue)
                            ? depValue.includes(field.condition.value)
                            : depValue === field.condition.value
                          if (!isMet) return null
                        }

                        const fieldValue = currentAnswers[field.name]
                        const error = fieldErrors[field.name]

                        return (
                          <Box key={field.name}>
                            {/* Label */}
                            <Flex justify="space-between" align="center" mb="1">
                              <label
                                htmlFor={field.name}
                                style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#0F172A" }}
                              >
                                {field.label}{" "}
                                {field.required ? (
                                  <span style={{ color: "#EF4444" }}>*</span>
                                ) : (
                                  <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 500 }}>(Optional)</span>
                                )}
                              </label>
                            </Flex>

                            {/* Helper text */}
                            {field.helperText && (
                              <Text fontSize="11px" color="#64748B" mb="1.5">
                                {field.helperText}
                              </Text>
                            )}

                            {/* RENDER BY FIELD TYPE */}
                            {field.type === "textarea" && (
                              <textarea
                                id={field.name}
                                value={fieldValue || ""}
                                onChange={(e) => handlePathwayAnswerChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                rows={3}
                                style={textareaBaseStyle(!!error)}
                              />
                            )}

                            {field.type === "select" && (
                              <select
                                id={field.name}
                                value={fieldValue || ""}
                                onChange={(e) => handlePathwayAnswerChange(field.name, e.target.value)}
                                style={inputBaseStyle(!!error)}
                              >
                                <option value="">{field.placeholder || "Select an option..."}</option>
                                {field.options?.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            )}

                            {field.type === "radio" && (
                              <SimpleGrid columns={{ base: 1, sm: field.options && field.options.length <= 3 ? field.options.length : 2 }} gap="2">
                                {field.options?.map((opt) => {
                                  const isChecked = fieldValue === opt.value
                                  return (
                                    <label
                                      key={opt.value}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        padding: "10px",
                                        borderRadius: "10px",
                                        border: `1.5px solid ${isChecked ? "#149191" : "#E2E8F0"}`,
                                        backgroundColor: isChecked ? "rgba(20, 145, 145, 0.08)" : "#FFFFFF",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        name={field.name}
                                        value={opt.value}
                                        checked={isChecked}
                                        onChange={() => handlePathwayAnswerChange(field.name, opt.value)}
                                        style={{ accentColor: "#149191", cursor: "pointer" }}
                                      />
                                      <span style={{ fontSize: "12.5px", fontWeight: isChecked ? 700 : 500, color: "#0F172A" }}>
                                        {opt.label}
                                      </span>
                                    </label>
                                  )
                                })}
                              </SimpleGrid>
                            )}

                            {field.type === "checkbox-group" && (
                              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
                                {field.options?.map((opt) => {
                                  const currentList: string[] = Array.isArray(fieldValue) ? fieldValue : []
                                  const isChecked = currentList.includes(opt.value)
                                  return (
                                    <label
                                      key={opt.value}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        padding: "10px",
                                        borderRadius: "10px",
                                        border: `1.5px solid ${isChecked ? "#10B981" : "#E2E8F0"}`,
                                        backgroundColor: isChecked ? "#ECFDF5" : "#FFFFFF",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        value={opt.value}
                                        checked={isChecked}
                                        onChange={() => handleCheckboxToggle(field.name, opt.value)}
                                        style={{ accentColor: "#10B981", cursor: "pointer" }}
                                      />
                                      <span style={{ fontSize: "12.5px", fontWeight: isChecked ? 700 : 500, color: "#0F172A" }}>
                                        {opt.label}
                                      </span>
                                    </label>
                                  )
                                })}
                              </SimpleGrid>
                            )}

                            {field.type === "file" && (
                              <Box
                                border="1.5px dashed"
                                borderColor={error ? "#EF4444" : "#CBD5E1"}
                                borderRadius="12px"
                                p="4"
                                bg="#FFFFFF"
                                textAlign="center"
                              >
                                {uploadStates[field.name]?.url ? (
                                  <Flex align="center" justify="space-between" bg="#ECFDF5" p="3" borderRadius="10px" border="1px solid #A7F3D0">
                                    <HStack gap="2">
                                      <FileTextIcon size={18} color="#059669" />
                                      <Text fontSize="12.5px" fontWeight="700" color="#065F46">
                                        {uploadStates[field.name].fileName || "Document Uploaded"}
                                      </Text>
                                    </HStack>
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      color="#DC2626"
                                      onClick={() => {
                                        setUploadStates((prev) => {
                                          const u = { ...prev }
                                          delete u[field.name]
                                          return u
                                        })
                                        handlePathwayAnswerChange(field.name, "")
                                        handlePathwayAnswerChange(`${field.name}Name`, "")
                                      }}
                                    >
                                      Remove
                                    </Button>
                                  </Flex>
                                ) : (
                                  <Box>
                                    <input
                                      id={field.name}
                                      type="file"
                                      accept={field.accept || ".pdf,.doc,.docx"}
                                      style={{ display: "none" }}
                                      onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) handleFileUpload(field.name, file)
                                      }}
                                    />
                                    <label htmlFor={field.name} style={{ cursor: "pointer", display: "inline-block" }}>
                                      <Box color="#149191" mb="1" display="flex" justifyContent="center">
                                        <UploadIcon size={24} />
                                      </Box>
                                      <Text fontSize="12.5px" fontWeight="700" color="#051B64">
                                        {uploadStates[field.name]?.isUploading
                                          ? "Uploading file..."
                                          : "Click to upload document"}
                                      </Text>
                                      <Text fontSize="11px" color="#94A3B8">
                                        PDF or Word document up to 5MB
                                      </Text>
                                    </label>
                                  </Box>
                                )}
                                {uploadStates[field.name]?.error && (
                                  <Text fontSize="11px" color="#EF4444" mt="1.5">
                                    {uploadStates[field.name].error}
                                  </Text>
                                )}
                              </Box>
                            )}

                            {(field.type === "text" || field.type === "email" || field.type === "tel" || field.type === "url" || field.type === "number") && (
                              <input
                                id={field.name}
                                type={field.type}
                                value={fieldValue || ""}
                                onChange={(e) => handlePathwayAnswerChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                style={inputBaseStyle(!!error)}
                              />
                            )}

                            {error && (
                              <Text fontSize="11px" color="#EF4444" mt="1">
                                {error}
                              </Text>
                            )}
                          </Box>
                        )
                      })}
                    </VStack>
                  </Box>
                ))}
              </VStack>

              <Flex justify="space-between" pt="4" borderTop="1px solid #F1F5F9">
                <Button
                  onClick={() => {
                    setCurrentStep(1)
                    scrollToFormTop()
                  }}
                  variant="outline"
                  borderColor="#CBD5E1"
                  color="#475569"
                  h="44px"
                  px="5"
                  fontSize="13.5px"
                  fontWeight="700"
                  borderRadius="12px"
                  _hover={{ bg: "#F8FAFC" }}
                >
                  Back to Contact Info
                </Button>
                <Button
                  onClick={handleProceedToStep3}
                  bg="#051B64"
                  color="#FFFFFF"
                  h="44px"
                  px="7"
                  fontSize="13.5px"
                  fontWeight="800"
                  borderRadius="12px"
                  _hover={{ bg: "#071647", transform: "translateY(-1px)" }}
                >
                  <HStack gap="2">
                    <Text>Review Your Application</Text>
                    <ArrowRightIcon size={14} />
                  </HStack>
                </Button>
              </Flex>
            </Box>
          )}

          {/* ================= STEP 3: REVIEW & SUBMIT ================= */}
          {currentStep === 3 && (
            <Box>
              <Box mb="6">
                <Heading as="h3" fontSize="16px" fontWeight="800" color="#051B64" mb="1">
                  Step 3: Review & Confirm Submission
                </Heading>
                <Text fontSize="13px" color="#64748B">
                  Please review your responses before final submission to our database.
                </Text>
              </Box>

              {/* Summary Card */}
              <Box bg="#F8FAFC" border="1px solid #E2E8F0" borderRadius="16px" p={{ base: "4", sm: "6" }} mb="6">
                <Flex justify="space-between" align="center" pb="3" mb="3" borderBottom="1px solid #E2E8F0">
                  <HStack gap="2">
                    <Box
                      px="2.5"
                      py="0.5"
                      borderRadius="full"
                      bg={currentConfig.badgeBg}
                      color={currentConfig.badgeColor}
                      fontSize="11px"
                      fontWeight="800"
                      letterSpacing="0.04em"
                      textTransform="uppercase"
                    >
                      {currentConfig.badge}
                    </Box>
                    <Text fontSize="13px" fontWeight="800" color="#051B64">
                      {currentConfig.title}
                    </Text>
                  </HStack>
                  <Button
                    size="xs"
                    variant="ghost"
                    color="#149191"
                    onClick={() => setCurrentStep(1)}
                  >
                    Edit Details
                  </Button>
                </Flex>

                {/* Applicant Details Summary */}
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mb="4">
                  <Box>
                    <Text fontSize="11px" fontWeight="700" color="#64748B">FULL NAME</Text>
                    <Text fontSize="13px" fontWeight="700" color="#0F172A">{applicant.fullName}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" fontWeight="700" color="#64748B">EMAIL ADDRESS</Text>
                    <Text fontSize="13px" fontWeight="700" color="#0F172A">{applicant.email}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" fontWeight="700" color="#64748B">PHONE / WHATSAPP</Text>
                    <Text fontSize="13px" fontWeight="700" color="#0F172A">{applicant.phone}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" fontWeight="700" color="#64748B">LOCATION</Text>
                    <Text fontSize="13px" fontWeight="700" color="#0F172A">
                      {applicant.city}, {applicant.state}, {applicant.country}
                    </Text>
                  </Box>
                </SimpleGrid>

                {/* Pathway Questions Summary */}
                <Box pt="3" borderTop="1px dashed #CBD5E1">
                  <Text fontSize="11.5px" fontWeight="800" color="#051B64" textTransform="uppercase" letterSpacing="0.05em" mb="2">
                    KEY PATHWAY RESPONSES
                  </Text>
                  <VStack align="stretch" gap="2">
                    {Object.entries(pathwayAnswers[currentPathway] || {}).map(([key, val]) => {
                      if (!val || (Array.isArray(val) && val.length === 0)) return null
                      if (key.endsWith("Name") && !key.startsWith("entity")) return null

                      let label = key
                      for (const sec of currentConfig.sections) {
                        const f = sec.fields.find((fld) => fld.name === key)
                        if (f) {
                          label = f.label
                          break
                        }
                      }

                      const displayVal = Array.isArray(val) ? val.join(", ") : String(val)

                      return (
                        <Box key={key} fontSize="12px">
                          <span style={{ fontWeight: 700, color: "#475569" }}>
                            {label}:{" "}
                          </span>
                          <span style={{ color: "#0F172A" }}>
                            {displayVal.length > 120 ? `${displayVal.slice(0, 120)}...` : displayVal}
                          </span>
                        </Box>
                      )
                    })}
                  </VStack>
                </Box>
              </Box>

              {/* Safeguarding & Privacy Acknowledgement (Section 10) */}
              <Box
                bg="#F0FDF4"
                border="1.5px solid"
                borderColor="#86EFAC"
                borderRadius="16px"
                p={{ base: "4", sm: "5" }}
                mb="6"
              >
                <HStack align="flex-start" gap="3" mb="3">
                  <Box color="#10B981" mt="0.5" flexShrink={0}>
                    <ShieldCheckIcon size={20} color="#10B981" />
                  </Box>
                  <Box>
                    <Text fontSize="13px" fontWeight="800" color="#065F46" mb="1">
                      Safeguarding & Participation Acknowledgement
                    </Text>
                    <Text fontSize="12px" color="#166534" lineHeight="1.55" mb="2">
                      I IMPACT INITIATIVE is dedicated to youth empowerment and takes child and vulnerable youth safety seriously. Please note that submitting an application does not guarantee acceptance. All submissions undergo structured review, and participation in activities involving youth may require additional review, orientation, and adherence to our safeguarding standards.
                    </Text>
                    <Text fontSize="11.5px" color="#15803D" lineHeight="1.5">
                      Your contact information will only be used by authorized coordinators for application assessment. (A dedicated Privacy Policy page is currently being finalised for formal launch).
                    </Text>
                  </Box>
                </HStack>

                {/* Mandatory Checkbox */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    paddingTop: "8px",
                    borderTop: "1px solid #BBF7D0",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={safeguardingAcknowledged}
                    onChange={(e) => setSafeguardingAcknowledged(e.target.checked)}
                    style={{ accentColor: "#10B981", marginTop: "3px", cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#065F46", lineHeight: 1.4 }}>
                    I confirm the accuracy of the information provided above and acknowledge the safeguarding review process.
                  </span>
                </label>
              </Box>

              <Flex justify="space-between" pt="4" borderTop="1px solid #F1F5F9">
                <Button
                  onClick={() => {
                    setCurrentStep(2)
                    scrollToFormTop()
                  }}
                  variant="outline"
                  borderColor="#CBD5E1"
                  color="#475569"
                  h="44px"
                  px="5"
                  fontSize="13.5px"
                  fontWeight="700"
                  borderRadius="12px"
                  _hover={{ bg: "#F8FAFC" }}
                  disabled={isSubmitting}
                >
                  Back to Pathway Questions
                </Button>
                <Button
                  onClick={handleSubmitFinal}
                  bg="#10B981"
                  color="#FFFFFF"
                  h="46px"
                  px="8"
                  fontSize="14px"
                  fontWeight="900"
                  borderRadius="12px"
                  boxShadow="0 4px 14px rgba(16, 185, 129, 0.4)"
                  _hover={{ bg: "#059669", transform: "translateY(-1px)", boxShadow: "0 6px 18px rgba(16, 185, 129, 0.5)" }}
                  disabled={isSubmitting || !safeguardingAcknowledged}
                >
                  <HStack gap="2">
                    <Text>{isSubmitting ? "Submitting to Database..." : "Confirm & Submit Application"}</Text>
                    <ArrowRightIcon size={14} />
                  </HStack>
                </Button>
              </Flex>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )

  return (
    <Box
      as="section"
      id="application-form"
      ref={formTopRef}
      py={{ base: "10", sm: "14", md: "18" }}
      bg="#FFFFFF"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "960px", xl: "1040px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        {formContent}
      </Container>
    </Box>
  )
}
