'use client';

import React, { useState, useEffect } from 'react';
import AllGames from '@/src/components/AllGames';
import Link from 'next/link';
import { GameProps } from '@/src/types/components';
import { getFavoriteGamesByUser } from 'services/gamesAPI';
import { useAuth } from '@/src/components/AuthProvider';

const FavoritesPage = () => {
  const [gamesList, setGamesList] = useState<GameProps[]>();
  const [totalGamesCount, setTotalGamesCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useAuth();
  console.log('user from favorites', user);
  useEffect(() => {
    getFavoriteGamesByUser({
      setGamesList,
      setTotalGamesCount,
      user,
    });
  }, []);

  return (
    <div className="h-auto min-h-screen w-full">
      <div className="mx-auto flex h-full w-11/12 flex-col lg:mt-24">
        {gamesList && gamesList?.length > 0 ? (
          <AllGames
            gamesList={gamesList}
            setGamesList={setGamesList}
            totalGamesCount={totalGamesCount}
            setTotalGamesCount={setTotalGamesCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center">
            <div className="text-center text-xl text-primaryLight md:text-2xl lg:text-4xl">
              Your favorites list is empty
            </div>
            <div className="cursor-pointer text-center text-xl text-primaryPurple underline hover:text-primaryLight md:text-2xl lg:text-4xl">
              <Link href={'/games'} aria-label="Browse all games">
                Browse our list of games
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
