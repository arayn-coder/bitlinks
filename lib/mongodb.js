import dns from "dns/promises";
import { MongoClient } from "mongodb";

// Force Node.js promise-based DNS resolver to use public DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

// Show only the host, NEVER the password
const mongoHost = uri.match(/@([^/?]+)/)?.[1];

console.log("================================");
console.log("MongoDB host:", mongoHost);
console.log("MongoDB URI exists:", !!uri);
console.log("================================");

const options = {
  family: 4,
  serverSelectionTimeoutMS: 10000,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;