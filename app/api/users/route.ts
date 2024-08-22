'use server';

import connectDB from 'config/database';
import User from 'models/User';

export const GET = async () => {
  try {
    await connectDB();
    const users = await User.find({});

    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    console.log('error', error);
    return new Response('Something went wrong', { status: 500 });
  }
};
