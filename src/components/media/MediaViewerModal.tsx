"use client"

import React from "react"
import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  CloseIcon,
  MapPinIcon,
  CalendarIcon,
  PlayIcon,
  ShareIcon,
  CameraIcon,
} from "@/components/icons"

interface MediaViewerModalProps {
  item: any | null
  isOpen: boolean
  onClose: () => void
}

export function MediaViewerModal({ item, isOpen, onClose }: MediaViewerModalProps) {
  if (!isOpen || !item) return null

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: "3", sm: "6" }}
    >
      {/* Backdrop */}
      <Box
        position="absolute"
        inset="0"
        bg="rgba(5, 11, 28, 0.88)"
        backdropFilter="blur(10px)"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <Box
        position="relative"
        zIndex={1}
        w="100%"
        maxW="820px"
        maxH="92vh"
        bg="#0B132B"
        borderRadius="24px"
        boxShadow="0 30px 70px -15px rgba(0, 0, 0, 0.7)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.12)"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        color="#FFFFFF"
      >
        {/* Modal Top Bar */}
        <Flex
          justify="space-between"
          align="center"
          p={{ base: "4", sm: "5" }}
          borderBottom="1px solid rgba(255, 255, 255, 0.08)"
          bg="rgba(15, 23, 42, 0.6)"
        >
          <HStack gap="2.5">
            <Box
              px="2.5"
              py="1"
              borderRadius="full"
              bg="rgba(16, 185, 129, 0.18)"
              color="#34D399"
              fontSize="11px"
              fontWeight="800"
              textTransform="uppercase"
            >
              {item.categoryLabel}
            </Box>
            <HStack gap="1" color="#94A3B8" fontSize="12px">
              <MapPinIcon size={13} color="#94A3B8" />
              <Text>{item.location}</Text>
            </HStack>
          </HStack>

          <Button
            onClick={onClose}
            variant="plain"
            p="2"
            minW="auto"
            h="auto"
            color="#94A3B8"
            _hover={{ color: "#FFFFFF", bg: "rgba(255, 255, 255, 0.1)" }}
            borderRadius="8px"
            aria-label="Close modal"
          >
            <CloseIcon size={20} />
          </Button>
        </Flex>

        {/* Media Preview Container */}
        <Box
          position="relative"
          w="100%"
          h={{ base: "260px", sm: "380px", md: "440px" }}
          bg="#000000"
          overflow="hidden"
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 820px) 100vw, 820px"
            style={{ objectFit: "cover" }}
          />

          {item.type === "video" && (
            <Flex
              position="absolute"
              inset="0"
              bg="rgba(0, 0, 0, 0.4)"
              align="center"
              justify="center"
            >
              <Box
                w="64px"
                h="64px"
                borderRadius="full"
                bg="#149191"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 10px 30px rgba(20, 145, 145, 0.5)"
                cursor="pointer"
                transition="transform 0.2s ease"
                _hover={{ transform: "scale(1.1)" }}
              >
                <PlayIcon size={26} color="#FFFFFF" />
              </Box>
            </Flex>
          )}
        </Box>

        {/* Bottom Details */}
        <Box p={{ base: "4", sm: "6" }} bg="#0F172A">
          <Flex
            justify="space-between"
            align={{ base: "flex-start", sm: "center" }}
            direction={{ base: "column", sm: "row" }}
            gap="2"
            mb="2"
          >
            <Heading as="h3" fontSize={{ base: "17px", sm: "20px" }} fontWeight="800" color="#FFFFFF">
              {item.title}
            </Heading>
            <Text fontSize="12px" color="#34D399" fontWeight="700">
              {item.year} Cohort
            </Text>
          </Flex>

          <Text fontSize="13px" color="#94A3B8" lineHeight="1.6" mb="4">
            {item.caption}
          </Text>

          <Flex justify="space-between" align="center" pt="3" borderTop="1px solid rgba(255, 255, 255, 0.08)">
            <HStack gap="1.5" color="#64748B" fontSize="12px">
              <CameraIcon size={14} color="#34D399" />
              <Text>Official I-Impact Initiative Archive</Text>
            </HStack>

            <Button
              onClick={onClose}
              bg="#1E293B"
              color="#FFFFFF"
              fontSize="12.5px"
              fontWeight="700"
              px="4"
              py="2"
              h="36px"
              borderRadius="8px"
              _hover={{ bg: "#334155" }}
            >
              Close Viewer
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

