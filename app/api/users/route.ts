'use server';

import connectDB from 'config/database';

export const GET = async (request: Request) => {
  try {
    await connectDB();
    return new Response(JSON.stringify({ message: 'Get request' }), {
      status: 200,
    });
  } catch (error) {
    console.log('error', error);
    return new Response('Something went wrong', { status: 500 });
  }
};
