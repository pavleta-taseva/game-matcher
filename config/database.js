import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  if (connected) return console.log('MongoDB is already connected');

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  try {
    await mongoose.connect(uri);
    connected = true;
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
