import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {

  const { shorturl } = await params;

  console.log("Short URL:", shorturl);

  const client = await clientPromise;

  const db = client.db("bitlinks");
  const collection = db.collection("url");

  const doc = await collection.findOne({
    shorturl: shorturl,
  });

  if (doc) {
    redirect(doc.url);
  }

  // Short URL doesn't exist
  redirect("/");
}