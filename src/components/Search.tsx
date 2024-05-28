import React, { useState } from 'react';
import { FaSearchPlus } from "react-icons/fa";
import { getGames } from 'services/api';
import { QueryResult } from 'types/api';
import { SearchProps } from 'types/components';

const Search = ({ setEffect }: SearchProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<QueryResult[]>([]);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // searchGames();
        getGames({ setEffect });
    };

    return (
        <div className='flex flex-col gap-2 items-center justify-center w-full my-8'>
            <form onSubmit={handleSubmit}
                className='flex gap-4 w-full items-center justify-center'>
                <div className='relative flex gap-4 lg:w-1/3 justify-center items-center'>
                    <FaSearchPlus className='absolute left-4 top-1/2 transform -translate-y-1/2 text-dark' fontSize={20} />
                    <input
                        name='searchInput'
                        type="text"
                        value={query}
                        onChange={handleChange} placeholder='Search games database...'
                        className='w-full h-10 pl-12 border rounded-md outline-none p-2 text-dark' />
                </div>

                <button type="submit"
                    className='w-fit px-2 lg:w-1/6 h-10 text-lg font-bold hover:text-xl hover:text-white bg-btnSecondary text-primary border rounded-md'>
                    Submit
                </button>
            </form >
            <ul>
                {results?.length > 0 && results?.map((game) => (
                    game?.id && <li key={game?.id}>Game found: {game?.name}</li>
                ))}
            </ul>
        </div >
    );
};

export default Search;
