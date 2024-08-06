import { GameProps } from './components';

export interface UserProps {
  user: {
    googleId: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    image: string;
    gender: string;
    favorites: GameProps[];
  };
}
