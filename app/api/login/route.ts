'use server';

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from 'config/database';
import User from 'models/User';

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { email, password } = body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials!' },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      gender: user.gender,
      favorites: user.favorites,
    };

    return NextResponse.json(
      {
        message: 'User signed in successfully',
        token,
        userData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error signing in user:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
