import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      unique: [true, 'Username already exists'],
      required: [true, 'Username is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm password is required'],
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
    },
    favorites: {
      type: [String],
      default: [],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
