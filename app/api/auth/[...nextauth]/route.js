import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/dbConnection";
import { PromptMailUsers } from "@/model/schema";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile https://mail.google.com/',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60*60 * 24* 7, // 1 day
  },

  callbacks: {
    async signIn({ profile }) {
      await connectDB();

      if (!profile?.email) return false;

      const existingUser = await PromptMailUsers.findOne({ email: profile.email });

      if (existingUser) {
        existingUser.name = profile.name;
        existingUser.profileImage = profile.picture;
        existingUser.oauthId = profile.sub;
        existingUser.provider = "google";
        await existingUser.save();
      } else {
        await PromptMailUsers.create({
          name: profile.name,
          email: profile.email,
          oauthId: profile.sub,
          profileImage: profile.picture,
          provider: "google",
        });
      }

      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + account.expires_at * 1000; // usually 1 hour

      }
      return token;
    },


    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
