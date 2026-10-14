"use client"

import React from "react"
import { Box } from "@chakra-ui/react"

export interface LiveDotProps {
  color?: string
  size?: number | string
}

export function LiveDot({ color = "currentColor", size = 6 }: LiveDotProps) {
  const pixelSize = typeof size === "number" ? `${size}px` : size

  return (
    <Box
      as="span"
      position="relative"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      w={pixelSize}
      h={pixelSize}
      color={color}
      flexShrink={0}
      aria-hidden="true"
    >
      {/* Living pulse radar ping ring */}
      <Box
        as="span"
        position="absolute"
        inset="-1px"
        borderRadius="full"
        bg="currentColor"
        className="animate-dot-ping"
      />
      {/* Living core dot with luminous ambient glow */}
      <Box
        as="span"
        position="relative"
        w="100%"
        h="100%"
        borderRadius="full"
        bg="currentColor"
        boxShadow="0 0 6px currentColor"
        className="animate-dot-core"
      />
    </Box>
  )
}
