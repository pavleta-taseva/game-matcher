'use server';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from 'config/database';
import Game from 'models/Game';

export const GET = async (request: NextRequest) => {
  await connectDB();
  const id = request.nextUrl.pathname.split('/')[3];

  try {
    const game = await Game.findOne({ id });
    return new NextResponse(JSON.stringify(game), {
      status: 200,
    });
  } catch (error) {
    console.log('error', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};
