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
  ClockIcon,
  CalendarIcon,
  ShareIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/icons"

interface ArticleReaderModalProps {
  article: any | null
  isOpen: boolean
  onClose: () => void
}

export function ArticleReaderModal({
  article,
  isOpen,
  onClose,
}: ArticleReaderModalProps) {
  if (!isOpen || !article) return null

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
        bg="rgba(11, 15, 40, 0.75)"
        backdropFilter="blur(8px)"
        onClick={onClose}
      />

      {/* Reader Modal */}
      <Box
        position="relative"
        zIndex={1}
        w="100%"
        maxW="760px"
        maxH="92vh"
        bg="#FFFFFF"
        borderRadius="24px"
        boxShadow="0 30px 70px -15px rgba(0, 0, 0, 0.35)"
        border="1px solid"
        borderColor="rgba(226, 232, 240, 0.9)"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Box p={{ base: "4", sm: "5" }} borderBottom="1px solid #F1F5F9" bg="#FAFCFF">
          <Flex justify="space-between" align="center">
            <HStack gap="2">
              <Box
                px="2.5"
                py="0.8"
                borderRadius="full"
                bg="rgba(20, 145, 145, 0.12)"
                color="#149191"
                fontSize="11px"
                fontWeight="800"
                textTransform="uppercase"
              >
                {article.categoryLabel}
              </Box>
              <Text fontSize="12px" color="#64748B" fontWeight="600">
                {article.date} • {article.readTime}
              </Text>
            </HStack>

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

        {/* Scrollable Reader Body */}
        <Box p={{ base: "5", sm: "8" }} overflowY="auto" flex="1">
          <Heading
            as="h2"
            fontSize={{ base: "20px", sm: "26px" }}
            fontWeight="800"
            color="#0F172A"
            lineHeight="1.3"
            mb="3"
          >
            {article.title}
          </Heading>

          <Text fontSize="12.5px" color="#64748B" mb="5">
            By <Text as="span" fontWeight="700" color="#1E293B">{article.author}</Text>
          </Text>

          {/* Article Image if available */}
          {article.imageUrl && (
            <Box
              position="relative"
              w="100%"
              h={{ base: "220px", sm: "300px" }}
              borderRadius="16px"
              overflow="hidden"
              mb="6"
              bg="#0F172A"
            >
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                sizes="(max-width: 760px) 100vw, 760px"
                style={{ objectFit: "cover" }}
              />
            </Box>
          )}

          {/* Content Text */}
          <Box
            fontSize="14.5px"
            lineHeight="1.75"
            color="#334155"
          >
            {article.fullContent ? (
              <div style={{ whiteSpace: "pre-line" }}>{article.fullContent}</div>
            ) : (
              <Text>{article.excerpt}</Text>
            )}
          </Box>
        </Box>

        {/* Footer */}
        <Box p="4" bg="#FAFCFF" borderTop="1px solid #E2E8F0">
          <Flex justify="space-between" align="center">
            <HStack gap="1.5" color="#64748B" fontSize="12px">
              <CheckCircleIcon size={14} color="#059669" />
              <Text>Published by I-Impact Initiative</Text>
            </HStack>

            <Button
              onClick={onClose}
              bg="#051B64"
              color="#FFFFFF"
              fontSize="12.5px"
              fontWeight="700"
              px="4"
              py="2"
              h="36px"
              borderRadius="8px"
              _hover={{ bg: "#0A257F" }}
            >
              Done Reading
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
