import connectDB from "@/config/database";
import User from "@/models/User";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ profile }) {
      // 1. connect to the database
      await connectDB();
      //   2. check if user exist
      const user = await User.findOne({ email: profile.email });
      //   3. if not create user
      if (!user) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //   4. return true to allow sign in
      return true;
    },
    async session({ session }) {
      // 1. get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. assign user id from the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
