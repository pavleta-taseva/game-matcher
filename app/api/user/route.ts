'use server';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from 'config/database';
import User from 'models/User';

export const PUT = async (request: NextRequest) => {
  await connectDB();
  const body = await request.json();
  const { userId, game } = body;
  const gameId = game?.id.toString();

  try {
    const currentUser = await User.findById(userId);

    const isGameAlreadyAdded = currentUser?.favorites?.includes(gameId);

    if (!isGameAlreadyAdded) {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            favorites: gameId,
          },
        },
        { new: true }
      );

      await User.updateOne(
        { _id: userId },
        { $push: { addedBy: currentUser._id } }
      );

      return new NextResponse(JSON.stringify(user.favorites), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({
          message: 'Game already added to favorites',
          status: 400,
        }),
        {}
      );
    }
  } catch (error) {
    console.log('error', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};
