"use client"

import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Login page has its own standalone full-screen layout
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <Box minH="100vh" bg="#F8FAFC" position="relative">
      {/* Desktop Fixed Sidebar */}
      <Box
        display={{ base: "none", lg: "block" }}
        position="fixed"
        top="0"
        left="0"
        bottom="0"
        zIndex={150}
      >
        <AdminSidebar />
      </Box>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileSidebarOpen && (
        <Box
          display={{ base: "block", lg: "none" }}
          position="fixed"
          inset="0"
          zIndex={200}
        >
          {/* Backdrop blur overlay */}
          <Box
            position="absolute"
            inset="0"
            bg="rgba(5, 27, 100, 0.6)"
            backdropFilter="blur(4px)"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Sliding Sidebar Container */}
          <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            w="270px"
            maxW="85vw"
            zIndex={201}
            boxShadow="8px 0 32px rgba(0, 0, 0, 0.4)"
          >
            <AdminSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
          </Box>
        </Box>
      )}

      {/* Main Administrative Workspace */}
      <Box
        ml={{ base: "0", lg: "264px" }}
        minH="100vh"
        display="flex"
        flexDirection="column"
      >
        {/* Top Header */}
        <AdminHeader onOpenMobile={() => setIsMobileSidebarOpen(true)} />

        {/* Dynamic Page Content */}
        <Box as="main" flex="1" p={{ base: "4", sm: "6", lg: "8" }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
