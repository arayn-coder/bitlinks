import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDb from "@/db/connectDb";
import User from "@/models/User";


export const authOptions = {
  providers: [

    // =========================
    // GITHUB LOGIN
    // =========================

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // =========================
    // EMAIL + PASSWORD LOGIN
    // =========================

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        await connectDb();

        

        if (!credentials?.email || !credentials?.password) {
         
          return null;
        }

        const email = credentials.email.trim().toLowerCase();

        const user = await User.findOne({
          email: email,
        });


        if (!user) {
          return null;
        }

        if (!user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );


        if (!passwordMatch) {
          return null;
        }


        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {

    // =========================
    // SIGN IN
    // =========================

    async signIn({ user, account }) {
      if (account?.provider === "github") {
        await connectDb();

        const currentUser = await User.findOne({
          email: user.email,
        });

        if (!currentUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
      }

      return true;
    },

    // =========================
    // SESSION
    // =========================

    async session({ session }) {
      await connectDb();

      const dbUser = await User.findOne({
        email: session.user.email,
      });

      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.name = dbUser.username;
        session.user.username = dbUser.username;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };