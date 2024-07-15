import React, { useState, useEffect } from 'react';
import { FaSearchPlus } from "react-icons/fa";
import { searchGames } from 'services/api';
import { SearchProps } from 'types/components';

const Search = ({ setResults, setTotalGamesCount, currentPage, setCurrentPage, genres, setIsSearching, isFiltered, setIsFiltered, setTopGames }: SearchProps) => {
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        if (isFiltered) {
            setQuery('');
            setResults && setResults([]);
            setTopGames && setTopGames([]);
        }
    }, [isFiltered, setResults, query]);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(event.target.value);

        if (event.target.value === '' && setResults && setTopGames && setIsSearching) {
            setResults([]);
            setTopGames([]);
            setIsSearching(false);
            return;
        }
        searchGames({ query, setResults, setTotalGamesCount, currentPage, genres });
        setIsSearching && setIsSearching(true);
        setIsFiltered && setIsFiltered(false);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (query === '' && setResults && setIsSearching && setTopGames) {
            setResults([]);
            setTopGames([]);
            setIsSearching(false);
            return;
        }
        searchGames({ query, setResults, setTotalGamesCount, currentPage, genres });
        setCurrentPage && currentPage && setCurrentPage(currentPage + 1);
    };

    return (
        <div className='flex flex-col gap-2 items-center justify-center w-full my-8'>
            <form onSubmit={handleSubmit}
                className='flex gap-4 w-full items-center justify-center'>
                <div className='relative flex gap-4 lg:w-1/3 justify-center items-center'>
                    <FaSearchPlus className='absolute left-4 top-1/2 transform -translate-y-1/2 text-primaryGrey' fontSize={20} />
                    <input
                        name='searchInput'
                        type="text"
                        value={isFiltered ? '' : query}
                        onChange={handleChange} placeholder='Search games database...'
                        className='w-full h-10 pl-12 border rounded-md outline-none p-2 text-primaryGrey' />
                </div>

                <button type="submit"
                    className='w-fit px-2 border-2 border-neutral-50 rounded-md lg:w-1/6 h-10 text-xl font-bold hover:text-2xl bg-primaryBlue text-primaryDark'>
                    Search
                </button>
            </form >
        </div >
    );
};

export default Search;
