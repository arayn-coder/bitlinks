import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    console.log("Session:", session);

    if (!session) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized"
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    // Check whether short URL already exists
    const doc = await collection.findOne({
      shorturl: body.shorturl
    });

    if (doc) {
      return Response.json(
        {
          success: false,
          error: true,
          message: "URL already exists!"
        },
        { status: 409 }
      );
    }

    const result = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,

      userId: session.user.id,
      email: session.user.email,
      username: session.user.username,

      createdAt: new Date()
    });

    return Response.json({
      success: true,
      error: false,
      message: "URL Generated Successfully",
      data: result
    });

  } catch (error) {
    console.error("API Error:", error);

    return Response.json(
      {
        success: false,
        error: true,
        message: "Failed to generate URL",
        details: error.message
      },
      { status: 500 }
    );
  }
}