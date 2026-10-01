"use client"

import React, { useState } from "react"
import { Box, Flex, Text, HStack } from "@chakra-ui/react"
import Link from "next/link"
import { SparklesIcon, ArrowRightIcon, CloseIcon } from "../icons"

interface AnnouncementBarProps {
  badgeText?: string
  message?: string
  linkText?: string
  href?: string
}

export function AnnouncementBar({
  badgeText = "NEW COHORT",
  message = "Raising Champions Everyday — Applications for 2026 Leadership Mentorship are open!",
  linkText = "Apply Now",
  href = "/programs/mentorship",
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Box
      bg="linear-gradient(90deg, #051B64 0%, #0c3898 50%, #149191 100%)"
      color="white"
      py="1"
      px="3"
      fontSize="11px"
      fontWeight="medium"
      position="relative"
      transition="all 0.3s ease"
    >
      <Flex
        maxW="1360px"
        mx="auto"
        align="center"
        justify="center"
        position="relative"
        gap="2.5"
        wrap="wrap"
        textAlign="center"
      >
        <HStack gap="1.5" justify="center">
          <Box
            bg="rgba(255, 255, 255, 0.2)"
            color="white"
            px="1.5"
            py="0.2"
            borderRadius="full"
            fontSize="9px"
            fontWeight="bold"
            letterSpacing="wider"
            display="inline-flex"
            alignItems="center"
            gap="1"
          >
            <SparklesIcon size={10} color="#FACC15" />
            {badgeText}
          </Box>
          <Text fontSize="11px" fontWeight="medium">
            {message}
          </Text>
        </HStack>

        <Link href={href}>
          <HStack
            gap="1"
            color="yellow.300"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ textDecoration: "underline", color: "yellow.200" }}
          >
            <Text fontSize="11px">{linkText}</Text>
            <ArrowRightIcon size={10} />
          </HStack>
        </Link>

        {/* Dismiss Button */}
        <Box
          as="button"
          aria-label="Close announcement"
          onClick={() => setIsVisible(false)}
          position={{ base: "static", md: "absolute" }}
          right="0"
          p="1"
          borderRadius="md"
          color="whiteAlpha.800"
          _hover={{ color: "white", bg: "whiteAlpha.200" }}
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CloseIcon size={14} />
        </Box>
      </Flex>
    </Box>
  )
}
