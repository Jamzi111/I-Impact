// import connectDB from "@/lib/mongodb";

// export async function GET() {
//   try {
//     await connectDB();

//     return Response.json({
//       success: true,
//       message: "MongoDB connected successfully!",
//       database: "iimpact_database",
//     });

//   } catch (error) {
//     return Response.json(
//       {
//         success: false,
//         message: "Database connection failed",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


import mongoose from "mongoose";
import { randomUUID } from "crypto";
import connectDB from "@/lib/mongodb";

const getTestCollection = () => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("MongoDB database is not available");
  }

  return db.collection("connection_tests");
};

// CREATE: Insert a test document
export async function POST() {
  try {
    await connectDB();

    const collection = getTestCollection();

    const testDocument = {
      testId: randomUUID(),
      type: "temporary_connection_test",
      message: "I IMPACT MongoDB CRUD test",
      createdAt: new Date(),
    };

    await collection.insertOne(testDocument);

    // READ: Retrieve the document we just inserted
    const retrievedDocument = await collection.findOne({
      testId: testDocument.testId,
    });

    return Response.json({
      success: true,
      created: true,
      retrieved: !!retrievedDocument,
      testId: testDocument.testId,
      document: retrievedDocument,
    }, { status: 201 });

  } catch (error) {
    console.error("MongoDB test error:", error);

    return Response.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

// READ: Retrieve a test document using its ID
export async function GET(request) {
  try {
    await connectDB();

    const testId = new URL(request.url).searchParams.get("testId");

    if (!testId) {
      return Response.json({
        success: true,
        message: "MongoDB connection is working",
        database: mongoose.connection.name,
      });
    }

    const document = await getTestCollection().findOne({
      testId,
      type: "temporary_connection_test",
    });

    if (!document) {
      return Response.json({
        success: false,
        message: "Test document not found",
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      document,
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

// DELETE: Remove only our temporary test document
export async function DELETE(request) {
  try {
    await connectDB();

    const testId = new URL(request.url).searchParams.get("testId");

    if (!testId) {
      return Response.json({
        success: false,
        message: "A testId is required",
      }, { status: 400 });
    }

    const result = await getTestCollection().deleteOne({
      testId,
      type: "temporary_connection_test",
    });

    return Response.json({
      success: true,
      deleted: result.deletedCount === 1,
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
