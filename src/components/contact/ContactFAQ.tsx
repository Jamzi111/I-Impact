"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@/components/icons"

interface FAQItem {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: "How can secondary schools and universities partner with I-Impact?",
    answer:
      "Institutions can partner with us to set up on-campus Innovation Hubs, receive curriculum licensing, and register student delegations for the annual AS A TEEN summit. Contact our partnerships desk at partnerships@iimpactinitiative.org to request an institutional partnership brief.",
  },
  {
    question: "What are the requirements to volunteer as a champion mentor?",
    answer:
      "We welcome passionate professionals, engineers, educators, and leaders who have at least 3+ years of professional or entrepreneurial experience. All prospective mentors undergo verified background checks and complete our mandatory Safeguarding & Youth Mentorship certification.",
  },
  {
    question: "How can donors and corporate CSR bodies verify financial accountability?",
    answer:
      "I-Impact adheres to strict nonprofit governance standards. We publish annual audited financial statements, offer CSR project impact tracking dashboards, and provide settlement receipts for direct sponsorship of underprivileged scholars.",
  },
  {
    question: "Are conferences and youth summits free to attend for teenagers?",
    answer:
      "Yes! Flagship initiatives such as the AS A TEEN summit and NEEDY NEEDS YOU community outreach programs are subsidized by our donor ecosystem and free for nominated student delegates. Travel and regional delegation arrangements are coordinated with partner schools.",
  },
  {
    question: "How quickly does the team respond to submitted inquiries?",
    answer:
      "Our team acknowledges and responds to all direct inquiries within 24 business hours. If your message relates to urgent student wellbeing or time-sensitive conference logistics, please use our WhatsApp hotline or call +234 (0) 800 I-IMPACT directly.",
  },
]

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <Box
      as="section"
      py={{ base: "14", sm: "16", md: "20" }}
      bg="#FFFFFF"
      borderTop="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "960px", xl: "1000px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <VStack align="center" textAlign="center" gap="2" mb={{ base: "10", md: "12" }}>
          <Box
            display="inline-flex"
            alignItems="center"
            gap="1.5"
            bg="rgba(5, 27, 100, 0.05)"
            color="#051B64"
            px="3"
            py="1"
            borderRadius="full"
            fontSize="11.5px"
            fontWeight="800"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            QUICK ANSWERS
          </Box>
          <Heading
            as="h2"
            fontSize={{ base: "24px", sm: "28px", md: "34px" }}
            fontWeight="900"
            color="#051B64"
            letterSpacing="-0.025em"
          >
            Frequently Asked Questions
          </Heading>
          <Text fontSize={{ base: "14px", md: "15px" }} color="#64748B" maxW="600px">
            Find immediate answers to our most common questions regarding school partnerships,
            mentorship, sponsorships, and summit registrations.
          </Text>
        </VStack>

        <VStack align="stretch" gap="3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <Box
                key={idx}
                bg={isOpen ? "#F8FAFF" : "#FFFFFF"}
                border="1px solid"
                borderColor={isOpen ? "#149191" : "#E2E8F0"}
                borderRadius="16px"
                p={{ base: "4.5", sm: "5", md: "5.5" }}
                transition="all 0.2s ease"
                cursor="pointer"
                onClick={() => toggle(idx)}
                boxShadow={isOpen ? "0 4px 14px rgba(20, 145, 145, 0.08)" : "none"}
              >
                <Flex justify="space-between" align="center" gap="4">
                  <Text
                    fontSize={{ base: "15px", md: "16px" }}
                    fontWeight="800"
                    color={isOpen ? "#051B64" : "#1E293B"}
                    lineHeight="1.4"
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
                </Flex>

                {isOpen && (
                  <Box pt="3.5" mt="2" borderTop="1px solid" borderColor="rgba(20, 145, 145, 0.15)">
                    <Text fontSize="14px" color="#475569" lineHeight="1.65">
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
