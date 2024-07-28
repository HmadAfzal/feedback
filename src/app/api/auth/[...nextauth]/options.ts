import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { dbConnect } from '@/lib/dbConnect';
import UserModel from '@/models/userModel';
import { User as NextAuthUser} from 'next-auth';

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!githubClientId || !githubClientSecret || !googleClientId || !googleClientSecret) {
  throw new Error("Missing environment variables for GitHub or Google OAuth");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      if (account?.provider === 'github' || account?.provider === 'google') {
        const existingUser = await UserModel.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new UserModel({
            username: user.name || profile?.name,
            email: user.email,
            profilepic: user.image,
            providerAccountId: account.providerAccountId,
          });
          await newUser.save();
        } else {
          console.log("Existing User Found:", existingUser);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      await dbConnect();
      if (!user && token.email) {
        const dbUser = await UserModel.findOne({ email: token.email });
        console.log("Fetched User from DB:", dbUser);
        if (dbUser) {
          user = dbUser as NextAuthUser;
        }
      }
      
      if (user) {
        token._id = user._id?.toString();
        token.email = user.email;
        token.username = user.username;
        token.profilepic = user.profilepic;
        token.providerAccountId = user.providerAccountId;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.profilepic = token.profilepic;
        session.user.providerAccountId = token.providerAccountId;
      }
      console.log("Session:", session);
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
