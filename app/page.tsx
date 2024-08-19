'use client';

import React, { useState, useEffect } from 'react';
import Search from '@/src/components/Search';
import AllGames from '@/src/components/AllGames';
import HomeContent from '@/src/ui/HomeContent';
import { GameProps } from '@/src/types/components';
import { getGenres } from 'services/gamesAPI';
// import FilterGames from '@/src/components/FilterGames';

const HomePage = () => {
  const [results, setResults] = useState<GameProps[]>();
  const [genres, setGenres] = useState<string[]>([]);
  const [totalGamesCount, setTotalGamesCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    getGenres({ genres, setGenres });
  }, [totalGamesCount, isSearching, isFiltered]);

  return (
    <>
      <div className="mt-20 flex h-auto w-full flex-col gap-4">
        <Search
          setResults={setResults}
          setTotalGamesCount={setTotalGamesCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          genres={genres}
          setIsSearching={setIsSearching}
          isFiltered={isFiltered}
          setIsFiltered={setIsFiltered}
        />

        <div className="mx-auto flex w-full justify-center gap-12 md:gap-12 lg:w-11/12 lg:flex-row lg:justify-start lg:gap-8">
          {results && results?.length > 0 && (isFiltered || isSearching) && (
            <AllGames
              gamesList={results}
              setGamesList={setResults}
              totalGamesCount={totalGamesCount}
              setTotalGamesCount={setTotalGamesCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
        <HomeContent isFiltered={isFiltered} isSearching={isSearching} />
      </div>
    </>
  );
};

export default HomePage;
