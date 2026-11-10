"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react"
import { ChevronDownIcon, SparklesIcon } from "@/components/icons"

const FAQS = [
  {
    question: "Who can get involved with I IMPACT INITIATIVE?",
    answer:
      "Anyone with a sincere desire to support youth development is welcome—including working professionals, university students, educators, and community organizations. What matters most is your willingness to encourage and empower the next generation.",
  },
  {
    question: "Do I need previous teaching or professional mentoring experience?",
    answer:
      "No formal teaching experience is required. We look for individuals with integrity, maturity, and practical life lessons to share. Before you begin, our team provides an introductory orientation covering expectations and healthy communication with youth.",
  },
  {
    question: "Can I participate or mentor remotely?",
    answer:
      "Yes. Several engagement opportunities—including virtual career discussions, remote guidance sessions, and digital resource support—can be conducted from anywhere with reliable internet access.",
  },
  {
    question: "How do schools and community groups partner with I IMPACT?",
    answer:
      "School principals, guidance counsellors, or community leaders can submit an expression of interest through our form. Our team will schedule an initial conversation to understand your needs and explore how our programmes can complement your students' growth.",
  },
  {
    question: "What are the expectations around working with young people?",
    answer:
      "We hold high standards for safety, respect, and positive reinforcement. To ensure youth are protected, we conduct introductory alignment conversations and ensure that all interactions occur in transparent, accountable environments.",
  },
  {
    question: "How is financial or programme support utilized?",
    answer:
      "Sponsorships and contributions directly fund youth learning materials, workshop resources, and event logistics. We believe in clear accountability and share updates on the outcomes of programmes your support helps make possible.",
  },
]

export function InvolvementFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Box
      as="section"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#FFFFFF"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "920px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          maxW="720px"
          mx="auto"
          mb={{ base: "8", md: "12" }}
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
            <SparklesIcon size={13} color="#149191" />
            <Text
              fontSize="11.5px"
              fontWeight="800"
              letterSpacing="0.06em"
              textTransform="uppercase"
              color="#0F766E"
            >
              Frequently Asked Questions
            </Text>
          </HStack>
          <Heading
            as="h2"
            fontSize={{ base: "22px", sm: "28px", md: "34px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.2"
            mb="2.5"
          >
            Questions You Might Have
          </Heading>
          <Text fontSize="13.5px" color="#64748B" lineHeight="1.6">
            Realistic answers regarding our expectations, eligibility, and partnership models.
          </Text>
        </Flex>

        <VStack align="stretch" gap="3.5">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <Box
                key={i}
                border="1.5px solid"
                borderColor={isOpen ? "#149191" : "#E2E8F0"}
                borderRadius="16px"
                bg={isOpen ? "#F8FAFC" : "#FFFFFF"}
                transition="all 0.2s ease"
                overflow="hidden"
              >
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleFAQ(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggleFAQ(i)
                    }
                  }}
                  w="100%"
                  p={{ base: "4", sm: "5" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  textAlign="left"
                  cursor="pointer"
                  _hover={{ bg: "#F8FAFC" }}
                >
                  <Text
                    fontSize={{ base: "13.5px", sm: "15px" }}
                    fontWeight="800"
                    color="#051B64"
                    pr="4"
                  >
                    {faq.question}
                  </Text>
                  <Box
                    transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    transition="transform 0.2s ease"
                    color={isOpen ? "#149191" : "#64748B"}
                    flexShrink={0}
                  >
                    <ChevronDownIcon size={18} />
                  </Box>
                </Box>

                {isOpen && (
                  <Box px={{ base: "4", sm: "5" }} pb={{ base: "4", sm: "5" }} pt="0">
                    <Text fontSize="13px" color="#475569" lineHeight="1.65">
                      {faq.answer}
                    </Text>
                  </Box>
                )}
              </Box>
            )
          })}
        </VStack>
      </Container>
    </Box>
  )
}
