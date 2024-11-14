'use server';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from 'config/database';
import User from 'models/User';
import Game from 'models/Game';
import { revalidatePath } from 'next/cache';

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

export const PUT = async (request: NextRequest) => {
  await connectDB();
  const body = await request.json();
  const { currentUser, id } = body;

  try {
    if (!currentUser)
      return new NextResponse(
        JSON.stringify({
          message: 'User does not exist',
          status: 400,
        }),
        {}
      );
    const gameToUpdate = await Game.findOne({ id });

    const gameUpdated = await Game.findByIdAndUpdate(
      gameToUpdate?._id,
      {
        $pull: { addedBy: currentUser?._id },
      },
      { new: true }
    );

    const userUpdated = await User.findByIdAndUpdate(
      currentUser._id,
      {
        $pull: { favorites: id },
      },
      { new: true }
    );
    revalidatePath('/favorites', 'page');
    return new NextResponse(JSON.stringify(userUpdated), {
      status: 200,
    });
  } catch (error) {
    console.error('error', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};
