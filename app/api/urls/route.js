import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    console.log("URL API SESSION:", session);

    if (!session?.user?.id) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const client = await clientPromise;

    const db = client.db("bitlinks");
    const collection = db.collection("url");

    // Get only URLs created by the logged-in user
    const urls = await collection
      .find({
        userId: session.user.id,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    return Response.json({
      success: true,
      urls: urls,
    });

  } catch (error) {
    console.error("Fetch URLs Error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch URLs",
      },
      { status: 500 }
    );
  }
}