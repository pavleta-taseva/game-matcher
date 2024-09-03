'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFavoriteGamesByUser } from 'services/gamesAPI';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { GameProps } from '../types/components';

type MainLayoutProps = {
  children: React.ReactNode;
};

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerUser: (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string
  ) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  gamesList: GameProps[];
  setGamesList: (results: GameProps[]) => void;
  totalGamesCount: number;
  setTotalGamesCount: (totalGamesCount: number) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }: MainLayoutProps) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gamesList, setGamesList] = useState<GameProps[]>([]);
  const [totalGamesCount, setTotalGamesCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (status === 'loading') {
      setIsLoading(true);
    } else if (status === 'authenticated' && session?.user) {
      setUser(session.user);
      setIsLoading(false);
      setIsLoggedIn(true);
    } else if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setUser(decoded);
      setIsLoading(false);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  }, [session, status, isLoggedIn]);

  useEffect(() => {
    const fetchFavoriteGames = async () => {
      try {
        await getFavoriteGamesByUser({
          setGamesList,
          setTotalGamesCount,
          user,
        });
      } catch (error) {
        console.error('Error fetching favorite games:', error);
      }
    };

    fetchFavoriteGames();
  }, [isLoading]);

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        throw new Error(data.message);
      } else {
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode<JwtPayload>(data.token);
        setUser(decoded);
        setIsLoading(false);
        setIsLoggedIn(true);
        router.replace('/');
      }
      return data.user;
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  };

  const registerUser = async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string
  ) => {
    setIsLoading(true);
    const newUser = {
      email,
      username,
      password,
      confirmPassword,
      gender,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        throw new Error(data.message);
      } else {
        localStorage.setItem('token', data.token);
        setUser(data.newUser);
        toast.success('Signed up successfully!');
        setIsLoading(false);
        setIsLoggedIn(true);
        router.replace('/');
      }
      return data.newUser;
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  };

  const logout = async () => {
    router.replace('/login');
    setUser(null);
    setIsLoggedIn(false);

    if (session) {
      await signOut();
      localStorage.removeItem('nextauth.message');
    } else {
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        logout,
        registerUser,
        isLoading,
        setIsLoading,
        isLoggedIn,
        setIsLoggedIn,
        gamesList,
        setGamesList,
        totalGamesCount,
        setTotalGamesCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
