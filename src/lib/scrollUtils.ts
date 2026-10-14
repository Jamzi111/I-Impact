/**
 * Utility for immediate / instant section scrolling without triggering hero animations or slow smooth scrolls.
 */

export function setTargetHash(hash: string) {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("about_target_hash", hash.replace("#", ""))
    } catch {
      // Ignore storage restrictions
    }
  }
}

export function consumeTargetHash(): string | null {
  if (typeof window === "undefined") return null
  try {
    const fromStorage = sessionStorage.getItem("about_target_hash")
    if (fromStorage) {
      sessionStorage.removeItem("about_target_hash")
      return fromStorage
    }
  } catch {
    // Ignore storage restrictions
  }

  if (window.location.hash) {
    return window.location.hash.replace("#", "")
  }
  return null
}

export function jumpToElement(id: string): boolean {
  if (typeof window === "undefined") return false
  const cleanId = id.replace("#", "")
  const el = document.getElementById(cleanId)
  if (!el) return false

  const html = document.documentElement
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = "auto"

  const headerOffset = 70
  const elementPosition = el.getBoundingClientRect().top + window.scrollY
  const targetY = Math.max(0, elementPosition - headerOffset)

  window.scrollTo({
    top: targetY,
    behavior: "instant" as ScrollBehavior,
  })

  requestAnimationFrame(() => {
    html.style.scrollBehavior = prevBehavior
  })
  return true
}
