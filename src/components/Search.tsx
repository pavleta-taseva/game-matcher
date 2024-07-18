import React, { useState, useEffect } from 'react';
import { FaSearchPlus } from "react-icons/fa";
import { searchGames } from 'services/api';
import { SearchProps } from 'types/components';

const Search = ({ setResults, setTotalGamesCount, currentPage, setCurrentPage, genres, setIsSearching, isFiltered, setIsFiltered }: SearchProps) => {
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        if (isFiltered) {
            setQuery('');
            setResults && setResults([]);
        }
    }, [isFiltered, setResults, query]);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(event.target.value);

        if (event.target.value === '' && setResults && setIsSearching) {
            setResults([]);
            setIsSearching(false);
            return;
        }
        searchGames({ query, setResults, setTotalGamesCount, currentPage, genres });
        setIsSearching && setIsSearching(true);
        setIsFiltered && setIsFiltered(false);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
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
        <div className='flex flex-col gap-2 justify-start w-full my-12 lg:ml-12'>
            <form onSubmit={handleSubmit}
                className='flex flex-col lg:flex-row gap-4 lg:w-11/12'>
                <div className='relative flex gap-4 w-full lg:w-1/3 justify-center items-center'>
                    <FaSearchPlus className='absolute left-4 top-1/2 transform -translate-y-1/2 text-primaryGrey' fontSize={20} />
                    <input
                        name='searchInput'
                        type="text"
                        value={isFiltered ? '' : query}
                        onChange={handleChange} placeholder='Enter game name or genre...'
                        className='w-full h-10 pl-12 border rounded-md outline-none p-2 text-primaryGrey text-sm' />
                </div>

                <button type="submit"
                    className='px-2 border-2 border-neutral-50 rounded-md w-full md:w-1/6 h-10 text-base lg:text-xl font-bold bg-primaryBlue text-primaryDark hover:bg-primaryBlack hover:text-primaryLight'>
                    Search
                </button>
            </form >
        </div >
    );
};

export default Search;
