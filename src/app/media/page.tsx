"use client"

import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreFooterCTA } from "@/components/cta"
import {
  MediaHero,
  MediaGalleryGrid,
  VideoHighlightsSection,
  PressKitBanner,
  MediaViewerModal,
} from "@/components/media"

export default function MediaPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const handleOpenViewer = (item: any) => {
    setSelectedMedia(item)
    setIsViewerOpen(true)
  }

  const handleCloseViewer = () => {
    setIsViewerOpen(false)
    setSelectedMedia(null)
  }

  return (
    <Box
      minH="100vh"
      bg="#FFFFFF"
      display="flex"
      flexDirection="column"
      overflowX="hidden"
      w="100%"
      maxW="100%"
    >
      {/* Universal Fixed Header - White variant */}
      <Header variant="white" />

      <Box as="main" flex="1" overflowX="hidden" w="100%" maxW="100%">
        {/* 1. Media Archive Hero & Category Filter */}
        <MediaHero
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 2. Photo & Video Album Grid */}
        <MediaGalleryGrid
          selectedCategory={selectedCategory}
          onSelectItem={handleOpenViewer}
        />

        {/* 3. Featured Video Documentary Spotlight */}
        <VideoHighlightsSection onPlayVideo={handleOpenViewer} />

        {/* 4. Press Kit & Media Inquiry Banner */}
        <PressKitBanner />

        {/* 5. PreFooter Call to Action */}
        <PreFooterCTA />
      </Box>

      {/* Universal Footer */}
      <Footer />

      {/* Fullscreen Media Lightbox Viewer */}
      <MediaViewerModal
        item={selectedMedia}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
      />
    </Box>
  )
}

