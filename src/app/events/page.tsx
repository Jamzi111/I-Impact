"use client"

import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  EventHero,
  UpcomingEventsSection,
  PastEventsSection,
  GetInvolvedEventsSection,
  EventRegistrationModal,
  WatchPartyModal,
  EventDetailModal,
  EventData,
  INITIAL_UPCOMING_EVENTS,
} from "@/components/events"

export default function EventsPage() {
  // Modal States
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isWatchPartyOpen, setIsWatchPartyOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(INITIAL_UPCOMING_EVENTS[0])

  const handleOpenRegister = (event?: EventData) => {
    if (event) {
      setSelectedEvent(event)
    } else {
      setSelectedEvent(INITIAL_UPCOMING_EVENTS[0])
    }
    setIsRegisterOpen(true)
  }

  const handleOpenDetail = (event?: EventData) => {
    if (event) {
      setSelectedEvent(event)
    } else {
      setSelectedEvent(INITIAL_UPCOMING_EVENTS[0])
    }
    setIsDetailOpen(true)
  }

  const handleOpenWatchParty = () => {
    setIsWatchPartyOpen(true)
  }

  return (
    <Box minH="100vh" bg="#060B19" display="flex" flexDirection="column">
      {/* Universal Fixed Header - Synchronized with homepage header background on events page only */}
      <Header variant="event" />

      <Box as="main" flex="1">
        {/* 01. Featured Event Hero */}
        <EventHero
          onOpenRegisterModal={handleOpenRegister}
          onOpenWatchPartyModal={handleOpenWatchParty}
          onOpenDetailModal={handleOpenDetail}
        />

        {/* 02. Upcoming Events Section */}
        <UpcomingEventsSection
          onOpenRegisterModal={handleOpenRegister}
          onOpenDetailModal={handleOpenDetail}
        />

        {/* 03. Past Events & Historic Milestones Archive */}
        <PastEventsSection />

        {/* 04. Get Involved & Mobilization Section */}
        <GetInvolvedEventsSection
          onOpenWatchPartyModal={handleOpenWatchParty}
          onOpenRegisterModal={() => handleOpenRegister()}
        />
      </Box>

      {/* Interactive Registration Modal */}
      <EventRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        selectedEvent={selectedEvent}
      />

      {/* Interactive Watch Party Hub Application Modal */}
      <WatchPartyModal
        isOpen={isWatchPartyOpen}
        onClose={() => setIsWatchPartyOpen(false)}
      />

      {/* Detailed Event & Agenda Modal */}
      <EventDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        event={selectedEvent}
        onRegisterClick={handleOpenRegister}
      />

      {/* Universal Footer */}
      <Footer />
    </Box>
  )
}
