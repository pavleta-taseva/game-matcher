'use server';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from 'config/database';
import User from 'models/User';

export const GET = async (request: NextRequest) => {
  await connectDB();
  const userId = request.nextUrl.pathname.split('/')[3];

  try {
    const user = await User.findById(userId);
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log('error', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};
