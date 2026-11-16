import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import Application from "@/models/Application"
import Subscriber from "@/models/Subscriber"
import ContactMessage from "@/models/ContactMessage"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    await connectDB()
    const pingTime = Date.now() - startTime

    const isConnected = mongoose.connection.readyState === 1
    const dbName = mongoose.connection.db?.databaseName || "iimpact_database"

    const [applicationsCount, subscribersCount, messagesCount] = await Promise.all([
      Application.countDocuments().catch(() => 0),
      Subscriber.countDocuments().catch(() => 0),
      ContactMessage.countDocuments().catch(() => 0),
    ])

    return NextResponse.json({
      success: true,
      database: {
        status: isConnected ? "connected" : "disconnected",
        databaseName: dbName,
        pingMs: pingTime,
        host: mongoose.connection.host || "cluster0.pwjztnh.mongodb.net",
        collections: {
          applications: applicationsCount,
          subscribers: subscribersCount,
          contact_messages: messagesCount,
        },
      },
      system: {
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || "development",
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("[Admin Settings API Error]:", error)

    const isWhitelistError =
      error?.name === "MongooseServerSelectionError" ||
      error?.message?.includes("timed out") ||
      error?.message?.includes("whitelist")

    return NextResponse.json({
      success: false,
      isDatabaseOffline: isWhitelistError,
      error: isWhitelistError
        ? "MongoDB Atlas cluster unreachable. Please verify network IP whitelist."
        : error.message || "Failed to inspect system status",
      database: {
        status: "disconnected",
        databaseName: "iimpact_database",
        pingMs: -1,
        host: "cluster0.pwjztnh.mongodb.net",
        collections: {
          applications: 0,
          subscribers: 0,
          contact_messages: 0,
        },
      },
      system: {
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || "development",
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
      },
    })
  }
}
