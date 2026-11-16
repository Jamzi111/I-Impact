export const ADMIN_COOKIE_NAME = "iimpact_admin_session"

const SECRET_KEY =
  process.env.ADMIN_JWT_SECRET ||
  process.env.ADMIN_API_KEY ||
  "iimpact-super-secure-production-jwt-key-2026-initiative"

export interface AdminSessionPayload {
  adminId: string
  name: string
  email: string
  role: string
  exp: number
}

// Convert string to base64url
function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ""
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

// Convert base64url to string
function fromBase64Url(base64Url: string): string {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  while (base64.length % 4) {
    base64 += "="
  }
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

// Import HMAC key using Web Crypto
async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder()
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  )
}

// Sign an Admin session token
export async function signSessionToken(
  payload: Omit<AdminSessionPayload, "exp">,
  expiresInDays = 7
): Promise<string> {
  const fullPayload: AdminSessionPayload = {
    ...payload,
    exp: Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
  }

  const payloadStr = JSON.stringify(fullPayload)
  const encodedPayload = toBase64Url(payloadStr)

  const key = await getHmacKey(SECRET_KEY)
  const signatureBytes = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(encodedPayload)
  )

  let binary = ""
  const bytes = new Uint8Array(signatureBytes)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  const encodedSignature = btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  return `${encodedPayload}.${encodedSignature}`
}

// Verify an Admin session token (works on Edge runtime & Node runtime)
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    if (!token || !token.includes(".")) return null

    const [encodedPayload, encodedSignature] = token.split(".")
    if (!encodedPayload || !encodedSignature) return null

    const key = await getHmacKey(SECRET_KEY)

    // Reconstruct signature bytes
    let base64 = encodedSignature.replace(/-/g, "+").replace(/_/g, "/")
    while (base64.length % 4) {
      base64 += "="
    }
    const binary = atob(base64)
    const sigBytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      sigBytes[i] = binary.charCodeAt(i)
    }

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(encodedPayload)
    )

    if (!isValid) return null

    const jsonStr = fromBase64Url(encodedPayload)
    const payload: AdminSessionPayload = JSON.parse(jsonStr)

    // Check expiration
    if (Date.now() > payload.exp) {
      return null
    }

    return payload
  } catch (err) {
    return null
  }
}

// Hash password with PBKDF2 (100,000 iterations)
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  )
  const keyBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  )
  return Array.from(new Uint8Array(keyBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

// Generate random salt
export function generateSalt(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

