import React, { useState, useEffect } from 'react';
import { searchGames } from 'services/gamesAPI';
import { SearchProps } from '@/src/types/components';
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
}: SearchProps) => {
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
    <div className="mb-4 mt-8 flex w-full lg:w-4/6 self-center flex-col justify-start gap-2 lg:my-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="m-auto p-0 align-top font-doHyeon text-4xl sm:text-6xl md:text-6xl leading-none">
          Find your new
        </div>
        <div className="m-auto p-0 align-top font-doHyeon text-4xl sm:text-6xl md:text-6xl leading-none">
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
