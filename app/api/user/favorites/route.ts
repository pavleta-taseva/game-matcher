'use server';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from 'config/database';
import User from 'models/User';
import mongoose from 'mongoose';

export const PUT = async (request: NextRequest) => {
  await connectDB();
  const body = await request.json();
  const { userId, game } = body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { favorites: game.id.toString() } },
      { new: true }
    );
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log('error', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};
