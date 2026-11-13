"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react"
import {
  HeartHandshakeIcon,
  UsersIcon,
  BuildingIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  SparklesIcon,
  ArrowRightIcon,
  TrophyIcon,
} from "@/components/icons"

export interface TrackData {
  id: string
  title: string
  category: string
  badge: string
  badgeColor: string
  badgeBg: string
  icon: React.ReactNode
  iconBg: string
  description: string
  timeCommitment: string
  keyPerks: string[]
  ctaText: string
  donateHref?: string
}

export const INVOLVEMENT_TRACKS: TrackData[] = [
  {
    id: "mentor",
    title: "Youth Mentorship & Guidance",
    category: "Personal Guidance",
    badge: "Mentorship",
    badgeColor: "#059669",
    badgeBg: "#ECFDF5",
    icon: <HeartHandshakeIcon size={22} color="#149191" />,
    iconBg: "rgba(20, 145, 145, 0.12)",
    description:
      "Share your life experience and professional insights with emerging young leaders. Walk alongside students to offer encouragement, career advice, and personal perspectives.",
    timeCommitment: "Flexible based on programme arrangement",
    keyPerks: [
      "1-on-1 and small group guidance opportunities",
      "Orientation on working constructively with youth",
      "Opportunity to shape an aspiring leader's outlook",
      "Connection with fellow mentors and educators",
    ],
    ctaText: "Express Interest as a Mentor",
  },
  {
    id: "volunteer",
    title: "Community & Event Volunteering",
    category: "Hands-On Support",
    badge: "Volunteers",
    badgeColor: "#2563EB",
    badgeBg: "#EFF6FF",
    icon: <UsersIcon size={22} color="#051B64" />,
    iconBg: "rgba(5, 27, 100, 0.1)",
    description:
      "Be part of the team that brings our youth summits, community outreaches, and skill workshops to life. Help with logistics, attendee support, and event coordination.",
    timeCommitment: "Event-based (summits & workshop days)",
    keyPerks: [
      "Hands-on event coordination experience",
      "Behind-the-scenes contribution to youth gatherings",
      "Collaborative teamwork with energetic volunteers",
      "Certificate of volunteer participation",
    ],
    ctaText: "Join the Volunteer Team",
  },
  {
    id: "partner",
    title: "School & Institutional Partnerships",
    category: "Collaborative Alliances",
    badge: "Partnerships",
    badgeColor: "#7C3AED",
    badgeBg: "#F5F3FF",
    icon: <BuildingIcon size={22} color="#7C3AED" />,
    iconBg: "rgba(124, 58, 237, 0.12)",
    description:
      "Partner your secondary school, university group, or educational body with I IMPACT to explore collaborative leadership workshops, youth clubs, and student delegations.",
    timeCommitment: "Programme-specific collaboration",
    keyPerks: [
      "Youth development sessions tailored for your students",
      "Opportunities for student delegations at major events",
      "Collaborative planning with our education team",
      "Shared mission to build student confidence",
    ],
    ctaText: "Discuss a School Partnership",
  },
  {
    id: "sponsor",
    title: "Programme Sponsorship & Support",
    category: "Financial & In-Kind Giving",
    badge: "Support",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB",
    icon: <TrophyIcon size={22} color="#D97706" />,
    iconBg: "rgba(217, 119, 6, 0.12)",
    description:
      "Support youth initiatives by funding event passes, learning materials, and practical tools for students who need them most. Every contribution creates an opportunity.",
    timeCommitment: "One-time or recurring contribution",
    keyPerks: [
      "Direct support for youth learning opportunities",
      "Transparent reporting on programme delivery",
      "Acknowledgment in programme communications",
      "Meaningful alignment with youth development goals",
    ],
    ctaText: "Support a Programme",
  },
  {
    id: "speaker",
    title: "Keynote Speakers & Facilitators",
    category: "Knowledge Sharing",
    badge: "Speakers",
    badgeColor: "#059669",
    badgeBg: "#ECFDF5",
    icon: <MegaphoneIcon size={22} color="#059669" />,
    iconBg: "rgba(5, 150, 105, 0.12)",
    description:
      "Deliver inspiring talks, career masterclasses, or skills workshops at our youth conferences and local events. Share practical lessons that spark curiosity.",
    timeCommitment: "Session or conference-based",
    keyPerks: [
      "Platform to address motivated young audiences",
      "Interactive Q&A sessions with students",
      "Opportunity to inspire future professionals in your field",
      "Featured speaker profile across event materials",
    ],
    ctaText: "Express Interest as a Speaker",
  },
  {
    id: "community",
    title: "Community Advocates & Ambassadors",
    category: "Grassroots Advocates",
    badge: "Community",
    badgeColor: "#0D9488",
    badgeBg: "#CCFBF1",
    icon: <SparklesIcon size={22} color="#0D9488" />,
    iconBg: "rgba(13, 148, 136, 0.12)",
    description:
      "Help raise awareness of I IMPACT programmes in your school, campus, or local community. Share upcoming opportunities with peers and help mobilise youth.",
    timeCommitment: "Flexible, self-paced engagement",
    keyPerks: [
      "Access to official announcements and event materials",
      "Direct involvement in local youth mobilization",
      "Leadership experience representing an initiative",
      "Connection with our community team",
    ],
    ctaText: "Join as an Advocate",
  },
]

interface InvolvementTracksProps {
  onSelectTrack: (trackId: string) => void
  selectedTrack: string
}

export function InvolvementTracks({
  onSelectTrack,
  selectedTrack,
}: InvolvementTracksProps) {
  return (
    <Box
      as="section"
      id="involvement-tracks"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#F8FAFC"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
    >
      <span id="pathways" style={{ position: "relative", top: "-80px" }} />
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        {/* Section Header */}
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
              Ways to Get Involved
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
            Find a Pathway That Fits Your Strengths
          </Heading>
          <Text
            fontSize={{ base: "13.5px", sm: "14.5px" }}
            color="#64748B"
            lineHeight="1.6"
          >
            Whether you want to mentor, volunteer, partner your school, or support a programme,
            there are diverse ways to contribute to youth development.
          </Text>
        </Flex>

        {/* Tracks Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {INVOLVEMENT_TRACKS.map((track) => {
            const isSelected = selectedTrack === track.id
            return (
              <Box
                key={track.id}
                id={track.id}
                bg="#FFFFFF"
                borderRadius="20px"
                border="2px solid"
                borderColor={isSelected ? "#149191" : "#E2E8F0"}
                boxShadow={
                  isSelected
                    ? "0 12px 28px -8px rgba(20, 145, 145, 0.25)"
                    : "0 4px 16px -4px rgba(5, 27, 100, 0.05)"
                }
                p={{ base: "5", md: "6" }}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                transition="all 0.22s ease"
                _hover={{
                  borderColor: isSelected ? "#149191" : "#CBD5E1",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 24px -6px rgba(5, 27, 100, 0.1)",
                }}
              >
                <Box>
                  {/* Top Badge & Icon */}
                  <Flex justify="space-between" align="center" mb="4">
                    <Box
                      p="2.5"
                      borderRadius="14px"
                      bg={track.iconBg}
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {track.icon}
                    </Box>
                    <Box
                      px="2.5"
                      py="1"
                      borderRadius="full"
                      bg={track.badgeBg}
                      color={track.badgeColor}
                      fontSize="11px"
                      fontWeight="800"
                      letterSpacing="0.04em"
                      textTransform="uppercase"
                    >
                      {track.badge}
                    </Box>
                  </Flex>

                  {/* Title & Category */}
                  <Text
                    fontSize="11px"
                    fontWeight="800"
                    color="#149191"
                    textTransform="uppercase"
                    letterSpacing="0.06em"
                    mb="1"
                  >
                    {track.category}
                  </Text>
                  <Heading
                    as="h3"
                    fontSize={{ base: "17px", sm: "18px" }}
                    fontWeight="800"
                    color="#051B64"
                    lineHeight="1.3"
                    mb="2.5"
                  >
                    {track.title}
                  </Heading>

                  {/* Description */}
                  <Text
                    fontSize="13px"
                    color="#475569"
                    lineHeight="1.55"
                    mb="4"
                  >
                    {track.description}
                  </Text>

                  {/* Time Commitment Box */}
                  <Box
                    bg="#F8FAFC"
                    borderRadius="10px"
                    p="2.5"
                    mb="4"
                    border="1px solid"
                    borderColor="#F1F5F9"
                  >
                    <Text fontSize="10.5px" fontWeight="700" color="#64748B" mb="0.5">
                      COMMITMENT
                    </Text>
                    <Text fontSize="12px" fontWeight="700" color="#0F172A">
                      {track.timeCommitment}
                    </Text>
                  </Box>

                  {/* Key Highlights */}
                  <Box mb="5">
                    <Text fontSize="10.5px" fontWeight="800" color="#94A3B8" textTransform="uppercase" letterSpacing="0.05em" mb="2">
                      WHAT THIS ENTAILS
                    </Text>
                    {track.keyPerks.map((perk, i) => (
                      <HStack key={i} align="flex-start" gap="2" mb="1.5">
                        <Box color="#10B981" flexShrink={0} mt="0.5">
                          <SparklesIcon size={13} color="#10B981" />
                        </Box>
                        <Text fontSize="12px" color="#334155" lineHeight="1.4">
                          {perk}
                        </Text>
                      </HStack>
                    ))}
                  </Box>
                </Box>

                {/* Bottom Action */}
                <Box pt="3" borderTop="1px solid" borderColor="#F1F5F9">
                  <Button
                    onClick={() => onSelectTrack(track.id)}
                    w="100%"
                    size="sm"
                    h="40px"
                    fontSize="12.5px"
                    fontWeight="700"
                    bg={isSelected ? "#149191" : "#051B64"}
                    color="#FFFFFF"
                    borderRadius="10px"
                    transition="all 0.18s ease"
                    _hover={{
                      bg: isSelected ? "#0F766E" : "#149191",
                      transform: "translateY(-1px)",
                    }}
                  >
                    <HStack gap="1.5">
                      <Text>{isSelected ? "Selected — Fill Application Below" : track.ctaText}</Text>
                      <ArrowRightIcon size={13} />
                    </HStack>
                  </Button>
                </Box>
              </Box>
            )
          })}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
