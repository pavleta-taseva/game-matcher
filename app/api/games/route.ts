'use server';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from 'config/database';
import Game from 'models/Game';
import User from 'models/User';

// @GET Get all games from the DB
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const games = await Game.find();

    if (games.length > 0) {
      return NextResponse.json(
        {
          message: 'Games list acquired successfully',
          games: games || [],
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({
        message: 'Error while fetching games list',
        status: 400,
      });
    }
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// @POST Create a game document in the database after game has been added to favorite
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { game, userId } = body;
  const id = game?.id.toString();

  try {
    const existingGame = await Game.findOne({ id });
    const currentUser = await User.findOne({ _id: userId });

    if (!existingGame) {
      const gameData = new Game({ ...game });
      currentUser.favorites.push(game?.id);
      gameData.addedBy.push(userId);
      await Promise.all([gameData.save(), currentUser.save()]);

      return NextResponse.json(
        {
          message: 'Game added to the list successfully',
          gameData,
        },
        { status: 200 }
      );
    } else {
      currentUser.favorites.push(game?.id);
      existingGame.addedBy.push(userId);
      await Promise.all([existingGame.save(), currentUser.save()]);

      return NextResponse.json(
        {
          message: 'Game already added to the list',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
