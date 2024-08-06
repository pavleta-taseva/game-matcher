import GoogleProvider from 'next-auth/providers/google';
import connectDB from 'config/database';
import User from 'models/User';
import { UserProps } from '@/src/types/user';

const clientId = process.env.GOOGLE_CLIENT_ID || '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: UserProps) {
      await connectDB();
      const userExists = await User.findOne({ email: user.email });

      if (!userExists) {
        const username = user.username.slice(0, 20);

        await User.create({
          email: user.email,
          username,
          image: user.image,
        })
      }

      return true;
    },
    async session({ session }: any) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    }
  }
};
