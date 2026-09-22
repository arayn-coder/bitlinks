import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(request, { params }) {
  try {
    // 1. Check logged-in user
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Get URL ID
    const { id } = await params;

    // 3. Validate MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid URL ID" },
        { status: 400 }
      );
    }

    // 4. Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    // 5. Delete ONLY if this URL belongs to logged-in user
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    });

    // 6. URL not found / doesn't belong to user
    if (result.deletedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "URL not found or you don't have permission to delete it",
        },
        { status: 404 }
      );
    }

    // 7. Successfully deleted
    return Response.json(
      {
        success: true,
        message: "URL deleted successfully",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE URL ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    // 1. Check logged-in user
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // 2. Get URL ID
    const { id } = await params;

    // 3. Validate MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid URL ID",
        },
        { status: 400 }
      );
    }

    // 4. Get data from frontend
    const body = await request.json();

    const { url, shorturl } = body;

    // 5. Validate data
    if (!url || !shorturl) {
      return Response.json(
        {
          success: false,
          message: "URL and short URL are required",
        },
        { status: 400 }
      );
    }

    // 6. Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    // 7. Update ONLY user's own URL
    const result = await collection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
        userId: session.user.id,
      },
      {
        $set: {
          url: url,
          shorturl: shorturl,
        },
      },
      {
        returnDocument: "after",
      }
    );

    // 8. URL not found
    if (!result) {
      return Response.json(
        {
          success: false,
          message:
            "URL not found or you don't have permission to edit it",
        },
        { status: 404 }
      );
    }

    // 9. Success
    return Response.json(
      {
        success: true,
        message: "URL updated successfully",
        url: result,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("PUT URL ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}