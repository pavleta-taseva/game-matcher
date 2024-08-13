import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import Spinner from '@/src/ui/Spinner';
import PaginationElement from '@/src/ui/PaginationElement';
import { SearchProps } from '@/src/types/components';
import { getGamesByPage } from 'services/gamesAPI';

const AllGames = ({
  gamesList,
  setGamesList,
  totalGamesCount,
  setTotalGamesCount,
  currentPage,
  setCurrentPage,
}: SearchProps) => {
  const [countOfGamesPerPage] = useState(30);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (totalGamesCount && gamesList) {
      const pagesCount = Math.ceil(totalGamesCount / countOfGamesPerPage);
      setTotalPages(pagesCount);
    }
  }, [totalGamesCount]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

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
        <h2 className="font-semibold mb-12 text-sm text-secondaryBlue lg:text-xl">
          Items found: {totalGamesCount && totalGamesCount.toLocaleString('en')}
        </h2>
      </div>
      {!loading ? (
        <div className="grid w-full grid-cols-1 place-items-center justify-items-center gap-x-2 gap-y-8 overflow-auto rounded-lg bg-secondaryGrey px-4 py-12 opacity-90 shadow-grey md:grid-cols-2 lg:grid-cols-3">
          {gamesList &&
            gamesList?.length > 0 &&
            gamesList?.map(
              (game) => game?.id && <GameCard key={game?.id} game={game} />
            )}
        </div>
      ) : (
        <Spinner loading={loading} />
      )}
    </div>
  );
};

export default AllGames;
