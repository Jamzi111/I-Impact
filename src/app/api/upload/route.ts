import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await fs.mkdir(uploadDir, { recursive: true })

    // Clean file name
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const fileName = `${Date.now()}-${sanitizedName}`
    const filePath = path.join(uploadDir, fileName)

    await fs.writeFile(filePath, buffer)

    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: file.name,
      size: file.size,
    })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ success: false, error: "File upload failed" }, { status: 500 })
  }
}
