import connectDB from "@/config/database";
import User from "@/models/User";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    /*   error: "/error", */
  },
  callbacks: {
    //Invoked on Successful sign in
    async signIn({ profile }) {
      //1. Connect to the database
      await connectDB();
      //2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      //3. if not, create user
      if (!userExists) {
        //Truncate username if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4. Return true to allow sign in
      return true;
    },
    //Session callback function that modifies the session object
    async session({ session }) {
      //1. Get user from database
      const user = await User.findOne({ email: session.user.email });
      //2. Assign user if from the session
      session.user.id = user._id.toString();
      //3. Return session
      return session;
    },
  },
});

export { handler as GET, handler as POST };
