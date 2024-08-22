import React, { useState, useEffect } from 'react';
import { searchGames } from 'services/gamesAPI';
import { GamesProps } from '@/src/types/components';
import SearchElement from '@/src/ui/SearchElement';

const Search = ({
  setResults,
  setTotalGamesCount,
  currentPage,
  setCurrentPage,
  genres,
  setIsSearching,
  isFiltered,
  setIsFiltered,
}: GamesProps) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (isFiltered) {
      setQuery('');
      setResults && setResults([]);
    }
  }, [isFiltered, setResults, query]);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuery(event.target.value);

    if (event.target.value === '' && setResults && setIsSearching) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const searchValue = event.target.value.toString();

    searchGames({
      query: searchValue,
      setResults,
      setTotalGamesCount,
      currentPage,
      genres,
    });
    setIsSearching && setIsSearching(true);
    setIsFiltered && setIsFiltered(false);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (query === '' && setResults && setIsSearching) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    searchGames({ query, setResults, setTotalGamesCount, currentPage, genres });
    setCurrentPage && currentPage && setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mb-4 mt-8 flex w-full flex-col justify-start gap-2 self-center lg:my-12 lg:w-4/6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="w-full p-0 text-center align-top font-doHyeon text-3xl leading-none md:text-4xl lg:text-5.5xl">
          Find your new
        </div>
        <div className="mb-4 w-full p-0 text-center align-top font-doHyeon text-3xl leading-none md:text-4xl lg:text-5.5xl">
          Favorite game
        </div>
        <SearchElement
          query={query}
          isFiltered={isFiltered}
          handleChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Search;
