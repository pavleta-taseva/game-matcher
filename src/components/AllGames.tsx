import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import PaginationElement from '@/src/ui/PaginationElement';
import { GamesProps } from '@/src/types/components';
import { getGamesByPage } from 'services/gamesAPI';
import { useAuth } from '@/src/components/AuthProvider';

const AllGames = ({
  gamesList,
  setGamesList,
  totalGamesCount,
  setTotalGamesCount,
  currentPage,
  setCurrentPage,
}: GamesProps) => {
  const [countOfGamesPerPage] = useState(32);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { isLoading } = useAuth();

  useEffect(() => {
    if (totalGamesCount && gamesList) {
      const pagesCount = Math.ceil(totalGamesCount / countOfGamesPerPage);
      setTotalPages(pagesCount);
    }
  }, [totalGamesCount]);

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage && setCurrentPage(value);
    await getGamesByPage({
      setGamesList,
      setTotalGamesCount,
      currentPage: value,
      setCurrentPage,
    });
  };

  return (
    <div className="mt-4 flex h-full w-full flex-col justify-between self-center lg:mt-0 lg:w-11/12">
      <div className="flex flex-col justify-between">
        <PaginationElement
          totalPages={totalPages}
          currentPage={currentPage}
          handleChange={handleChange}
        />
        <h2 className="font-semibold mb-12 text-sm text-primaryPurple lg:text-xl">
          Items found: {totalGamesCount && totalGamesCount.toLocaleString('en')}
        </h2>
      </div>
      {!isLoading && (
        <>
          <div className="grid w-full grid-cols-1 place-items-center justify-items-center gap-x-4 gap-y-8 overflow-auto px-4 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-2">
            {gamesList &&
              gamesList?.length > 0 &&
              gamesList?.map(
                (game, index) =>
                  game?.id && (
                    <GameCard
                      key={game?.id || index}
                      game={game}
                      id={game?.id.toString()}
                    />
                  )
              )}
          </div>
          <PaginationElement
            totalPages={totalPages}
            currentPage={currentPage}
            handleChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default AllGames;
