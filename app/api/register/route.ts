'use server';

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from 'config/database';
import User from 'models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key';

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { email, username, password, confirmPassword } = body;

  if (!email || !username || !password || !confirmPassword) {
    return NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Passwords don't match" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists!' },
        { status: 400 }
      );
    }

    if (existingUsername) {
      return NextResponse.json(
        { message: 'User with the same username already exists!' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    const newUser = new User({
      googleId: '',
      email,
      username,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      {
        message: 'User registered successfully',
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
