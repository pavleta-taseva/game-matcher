'use client';

import React, { useState, useEffect } from 'react';
import Search from '@/src/components/Search';
import FilterGames from '@/src/components/FilterGames';
import AllGames from '@/src/components/AllGames';
import HomeContent from '@/src/ui/HomeContent';
import { GameProps } from 'types/components';
import { getGenres } from 'services/api';

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
      <div className="flex flex-col w-full h-auto gap-4">
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

        <div className="flex w-full lg:w-11/12 gap-12 md:gap-12 mx-auto justify-center lg:flex-row lg:justify-start lg:gap-8">
          <FilterGames
            genres={genres}
            currentPage={currentPage}
            setTotalGamesCount={setTotalGamesCount}
            setResults={setResults}
            isSearching={isSearching}
            isFiltered={isFiltered}
            setIsFiltered={setIsFiltered}
          />

          <HomeContent isFiltered={isFiltered} isSearching={isSearching} />

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
      </div>
    </>
  );
};

export default HomePage;
