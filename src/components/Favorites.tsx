import React, { useState } from 'react';
import AllGames from '@/src/components/AllGames';
import { useAuth } from '@/../context/AuthProvider';
import Link from 'next/link';

const Favorites = () => {
  const { isLoading, gamesList, setGamesList, setTotalGamesCount } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="mx-auto flex h-full w-11/12 flex-col lg:mt-24">
      {!isLoading && gamesList?.length > 0 && (
        <AllGames
          gamesList={gamesList}
          setGamesList={setGamesList}
          totalGamesCount={gamesList?.length ?? 0}
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
