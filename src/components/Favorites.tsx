import React, { useState } from 'react';
import AllGames from '@/src/components/AllGames';
import Link from 'next/link';
import { useAuth } from '@/src/components/AuthProvider';

const Favorites = () => {
  const { isLoading, gamesList, setGamesList, totalGamesCount, setTotalGamesCount } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="mx-auto flex h-full w-11/12 flex-col lg:mt-24">
      {!isLoading && gamesList?.length > 0 && (
        <AllGames
          gamesList={gamesList}
          setGamesList={setGamesList}
          totalGamesCount={totalGamesCount}
          setTotalGamesCount={setTotalGamesCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {gamesList?.length <= 0 && (
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
  );
};

export default Favorites;