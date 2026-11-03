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
import { ChevronDownIcon, HeartIcon } from "@/components/icons"

interface FAQItem {
  question: string
  answer: string
}

const DONATE_FAQS: FAQItem[] = [
  {
    question: "Is my donation tax-deductible or eligible for formal non-profit certification?",
    answer:
      "Yes. I-Impact Initiative is a duly registered non-profit organization dedicated to youth and community development. We issue automated official receipts for every contribution, and for corporate donors or major gifts, our finance desk provides full settlement documentation and audited CSR acknowledgment letters.",
  },
  {
    question: "Can I donate internationally from outside Nigeria?",
    answer:
      "Absolutely. International supporters, diaspora alumni, and global partners can donate online using debit/credit cards in USD ($) or GBP (£), or via our direct international Domiciliary Wire transfer (Zenith Bank Plc, SWIFT code: ZEIBNGLA). All international transactions are processed securely with standard bank-grade encryption.",
  },
  {
    question: "How do monthly recurring donations work, and can I pause or cancel anytime?",
    answer:
      "When you choose 'Monthly Champion', your selected amount is automatically debited every 30 days. You will receive an automated email receipt on each renewal. You have full freedom to update your payment details, pause, or cancel your recurring sponsorship at any time by emailing donations@iimpactinitiative.org.",
  },
  {
    question: "Can I restrict my contribution to a specific program or secondary school?",
    answer:
      "Yes. In the donation widget above, you can designate your contribution to 'Secondary School STEM & Maker Kits', 'Youth Mentorship & AS A TEEN Summits', or 'Girl-Child Tech Inclusion'. If you wish to sponsor a specific school or regional cluster, you can specify this in the dedication note or contact our team directly.",
  },
  {
    question: "What safeguarding standards govern the students and programs we fund?",
    answer:
      "Safeguarding is central to our operational ethos. Every mentor, volunteer, and field facilitator undergoes verified identity vetting, reference checks, and mandatory youth safeguarding training before engaging with secondary school students in any workshop or summit.",
  },
  {
    question: "Can our organization or employer match our charitable contributions?",
    answer:
      "Yes. Many corporate organizations and foundations offer 1:1 or 2:1 matching gift programs for employee donations. Simply forward your corporate matching portal link or form to donations@iimpactinitiative.org, and our administrative office will submit the required confirmation.",
  },
]

export function DonateFAQ() {
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
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "960px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Box textAlign="center" mb={{ base: "10", md: "14" }}>
          <HStack
            justify="center"
            gap="2"
            px="3"
            py="1"
            bg="rgba(5, 27, 100, 0.08)"
            borderRadius="full"
            w="fit-content"
            mx="auto"
            mb="3"
          >
            <HeartIcon size={14} color="#051B64" />
            <Text
              fontSize="12px"
              fontWeight="800"
              color="#051B64"
              letterSpacing="0.06em"
              textTransform="uppercase"
            >
              Donor Questions Answered
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "26px", sm: "32px", md: "38px" }}
            fontWeight="800"
            color="#0F172A"
            letterSpacing="-0.02em"
            mb="3"
          >
            Frequently Asked Questions
          </Heading>

          <Text fontSize={{ base: "14px", sm: "16px" }} color="#64748B" maxW="600px" mx="auto">
            Everything you need to know about our stewardship, payment methods, and non-profit governance.
          </Text>
        </Box>

        {/* Accordion List */}
        <VStack align="stretch" gap="3">
          {DONATE_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <Box
                key={idx}
                borderRadius="16px"
                border="1px solid"
                borderColor={isOpen ? "#051B64" : "#E2E8F0"}
                bg={isOpen ? "#FAFCFF" : "#FFFFFF"}
                transition="all 0.2s ease"
                overflow="hidden"
              >
                <Box
                  cursor="pointer"
                  role="button"
                  tabIndex={0}
                  w="100%"
                  p={{ base: "4", sm: "5" }}
                  textAlign="left"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap="4"
                  onClick={() => toggle(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggle(idx)
                    }
                  }}
                  _hover={{
                    md: {
                      bg: isOpen ? "#FAFCFF" : "#F8FAFC",
                    },
                  }}
                  aria-expanded={isOpen}
                >
                  <Text
                    fontSize={{ base: "14px", sm: "16px" }}
                    fontWeight="700"
                    color={isOpen ? "#051B64" : "#1E293B"}
                    lineHeight="1.4"
                  >
                    {faq.question}
                  </Text>
                  <Box
                    transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    transition="transform 0.2s ease"
                    color={isOpen ? "#051B64" : "#94A3B8"}
                    flexShrink={0}
                  >
                    <ChevronDownIcon size={18} />
                  </Box>
                </Box>

                {isOpen && (
                  <Box
                    px={{ base: "4", sm: "5" }}
                    pb={{ base: "4", sm: "5" }}
                    pt="1"
                    borderTop="1px solid"
                    borderColor="#F1F5F9"
                  >
                    <Text
                      fontSize={{ base: "13px", sm: "14px" }}
                      color="#475569"
                      lineHeight="1.6"
                    >
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
