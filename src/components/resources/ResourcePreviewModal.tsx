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
} from "@chakra-ui/react"
import {
  CloseIcon,
  DownloadIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ShareIcon,
  HeadphonesIcon,
  PlayIcon,
  FileTextIcon,
  SparklesIcon,
} from "@/components/icons"

interface ResourcePreviewModalProps {
  resource: any | null
  isOpen: boolean
  onClose: () => void
}

export function ResourcePreviewModal({
  resource,
  isOpen,
  onClose,
}: ResourcePreviewModalProps) {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  if (!isOpen || !resource) return null

  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      setDownloaded(true)
    }, 1100)
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
      />

      {/* Modal Dialog */}
      <Box
        position="relative"
        zIndex={1}
        w="100%"
        maxW="640px"
        maxH="90vh"
        bg="#FFFFFF"
        borderRadius="24px"
        boxShadow="0 25px 60px -15px rgba(0, 0, 0, 0.35)"
        border="1px solid"
        borderColor="rgba(226, 232, 240, 0.9)"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Box p={{ base: "5", sm: "6" }} borderBottom="1px solid #F1F5F9" bg="#FAFCFF">
          <Flex justify="space-between" align="flex-start" gap="4">
            <Box>
              <HStack gap="2" mb="2">
                <Box
                  px="2.5"
                  py="0.8"
                  borderRadius="full"
                  bg="rgba(5, 27, 100, 0.08)"
                  color="#051B64"
                  fontSize="11px"
                  fontWeight="800"
                  textTransform="uppercase"
                >
                  {resource.format}
                </Box>
                <Text fontSize="12px" color="#64748B" fontWeight="600">
                  {resource.pagesOrDuration}
                </Text>
              </HStack>

              <Heading as="h3" fontSize={{ base: "18px", sm: "20px" }} fontWeight="800" color="#0F172A">
                {resource.title}
              </Heading>

              <Text fontSize="12px" color="#64748B" mt="1">
                By {resource.author}
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

        {/* Body Content */}
        <Box p={{ base: "5", sm: "6" }} overflowY="auto" flex="1">
          <Text fontSize="13px" color="#334155" lineHeight="1.6" mb="5">
            {resource.description}
          </Text>

          {resource.tableOfContents && (
            <Box mb="6">
              <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#0F172A" mb="3">
                Key Topics & Modules Covered:
              </Text>
              <VStack align="stretch" gap="2">
                {resource.tableOfContents.map((item: string, i: number) => (
                  <Flex key={i} gap="2" align="center" p="2.5" bg="#F8FAFC" borderRadius="10px" border="1px solid #EDF2F7">
                    <Box color="#10B981">
                      <CheckCircleIcon size={15} />
                    </Box>
                    <Text fontSize="12.5px" color="#1E293B" fontWeight="600">
                      {item}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          )}

          {/* Pricing / License Note */}
          <Box p="3.5" borderRadius="12px" bg="#F1F5F9" mb="5">
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase">
                  Access License
                </Text>
                <Text fontSize="13px" fontWeight="800" color="#0F172A">
                  {resource.price === "Free" ? "Open Educational Resource (Free for All Students)" : "Partner Curriculum License"}
                </Text>
              </Box>
              <Text fontSize="15px" fontWeight="900" color="#059669">
                {resource.priceLabel || (resource.price === "Free" ? "Free" : "Premium")}
              </Text>
            </Flex>
          </Box>
        </Box>

        {/* Footer Actions */}
        <Box p="4" bg="#FAFCFF" borderTop="1px solid #E2E8F0">
          <Flex justify="space-between" align="center" gap="3" wrap="wrap">
            <Button
              onClick={onClose}
              variant="outline"
              borderColor="#CBD5E1"
              color="#334155"
              fontSize="13px"
              fontWeight="700"
              px="4"
              py="2"
              h="40px"
              borderRadius="10px"
            >
              Close
            </Button>

            <Button
              onClick={handleDownload}
              disabled={downloading}
              bg="#051B64"
              color="#FFFFFF"
              fontSize="13px"
              fontWeight="700"
              px="5"
              py="2"
              h="40px"
              borderRadius="10px"
              _hover={{ bg: "#0A257F" }}
            >
              <HStack gap="2">
                <DownloadIcon size={16} />
                <Text>
                  {downloading
                    ? "Preparing Package..."
                    : downloaded
                    ? "Downloaded Successfully ✓"
                    : resource.price === "Free"
                    ? "Download Digital Copy (.PDF)"
                    : "Request License Brief"}
                </Text>
              </HStack>
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

