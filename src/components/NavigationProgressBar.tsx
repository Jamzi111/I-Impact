"use client"

import React, { useState, useEffect, useRef, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

function ProgressBarInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const trickleTimers = useRef<NodeJS.Timeout[]>([])
  const safetyTimer = useRef<NodeJS.Timeout | null>(null)
  const finishTimeout = useRef<NodeJS.Timeout | null>(null)
  const resetTimeout = useRef<NodeJS.Timeout | null>(null)
  const isFirstRender = useRef(true)

  // Clear all pending timeouts
  const clearAllTimers = () => {
    trickleTimers.current.forEach((t) => clearTimeout(t))
    trickleTimers.current = []
    if (safetyTimer.current) clearTimeout(safetyTimer.current)
    if (finishTimeout.current) clearTimeout(finishTimeout.current)
    if (resetTimeout.current) clearTimeout(resetTimeout.current)
  }

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
    }
  }, [])

  // Start progress bar animation
  const startProgress = () => {
    clearAllTimers()
    setOpacity(1)
    setIsVisible(true)
    setProgress(25)

    // Progressive trickling steps
    const steps = [
      { delay: 150, value: 45 },
      { delay: 350, value: 65 },
      { delay: 650, value: 80 },
      { delay: 1100, value: 88 },
      { delay: 2000, value: 93 },
    ]

    steps.forEach(({ delay, value }) => {
      const timer = setTimeout(() => {
        setProgress((prev) => (prev < value ? value : prev))
      }, delay)
      trickleTimers.current.push(timer)
    })

    // Safety fallback: auto-complete if navigation takes too long or errors
    safetyTimer.current = setTimeout(() => {
      finishProgress()
    }, 7000)
  }

  // Complete progress bar animation
  const finishProgress = () => {
    clearAllTimers()
    setProgress(100)

    // Hold at 100% briefly so the user sees completion, then fade out
    finishTimeout.current = setTimeout(() => {
      setOpacity(0)

      // Once faded out, reset state
      resetTimeout.current = setTimeout(() => {
        setIsVisible(false)
        setProgress(0)
      }, 250)
    }, prefersReducedMotion ? 50 : 250)
  }

  // Listen for route changes to complete navigation
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // When route changes, finish progress bar
    finishProgress()
  }, [pathname, searchParams])

  // Global click & popstate listeners for link navigations
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleAnchorClick = (event: MouseEvent) => {
      // Ignore right clicks, modifier keys (Cmd, Ctrl, Shift, Alt)
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target as HTMLElement | null
      const anchor = target?.closest("a") as HTMLAnchorElement | null
      if (!anchor || !anchor.href) return

      // Ignore new tabs, downloads, external mailto/tel protocols
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.href.startsWith("mailto:") ||
        anchor.href.startsWith("tel:")
      ) {
        return
      }

      try {
        const currentUrl = new URL(window.location.href)
        const targetUrl = new URL(anchor.href, window.location.href)

        // Ignore external hosts
        if (targetUrl.origin !== currentUrl.origin) return

        // Ignore hash-only changes on current page (e.g. /about#story when already at /about)
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search &&
          targetUrl.hash
        ) {
          return
        }

        // Ignore clicks to identical URL
        if (targetUrl.href === currentUrl.href) {
          return
        }

        // Start progress bar
        startProgress()
      } catch (e) {
        // Fallback for invalid URLs
      }
    }

    const handlePopState = () => {
      startProgress()
    }

    window.addEventListener("click", handleAnchorClick, true)
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("click", handleAnchorClick, true)
      window.removeEventListener("popstate", handlePopState)
      clearAllTimers()
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      role="progressbar"
      aria-label="Page navigation progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 99999,
        pointerEvents: "none",
        opacity: opacity,
        transition: prefersReducedMotion ? "none" : "opacity 200ms ease-in-out",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "#10B981",
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.7), 0 0 4px #10B981",
          borderRadius: "0 2px 2px 0",
          transition: prefersReducedMotion
            ? "none"
            : "width 240ms cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
        }}
      >
        {/* Leading edge subtle glowing peg */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "80px",
            boxShadow: "0 0 12px #10B981, 0 0 6px #10B981",
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  )
}

export function NavigationProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarInner />
    </Suspense>
  )
}

