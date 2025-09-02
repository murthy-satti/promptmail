import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/dbConnection";
import { PromptMailUsers } from "@/model/schema";

// 🔄 Refresh Access Token with Google
async function refreshAccessToken(token) {
  try {
    const url = "https://oauth2.googleapis.com/token";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://mail.google.com/",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 🔒 30 days max
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
      // First login
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at ? Date.now() + (account.expires_in * 1000) : Date.now() + 3600 * 1000;

        // ✅ Add custom 30-day expiry
        token.customExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
      }

      // 🔒 If passed 30 days → force re-login
      if (Date.now() > token.customExpiry) {
        return { ...token, error: "TokenExpired" };
      }

      // If access token still valid → return it
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Otherwise refresh
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      // Expose custom expiry
      session.tokenExpiry = token.customExpiry;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
