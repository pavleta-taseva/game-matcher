import React, { useState } from 'react';
import { FaSearchPlus } from "react-icons/fa";

type QueryResult = {
    id: string,
    name: string,
}

interface SearchProps {
    setEffect: (effect: boolean) => void;
}

const Search = ({ setEffect }: SearchProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<QueryResult[]>([]);

    const searchGames = async () => {
        setEffect(true);

        try {
            const response = await fetch(`https://api.rawg.io/api/games?search=${query}`);
            const resultFound = await response.json();
            setResults(resultFound);
            setEffect(false);
        } catch (error) {
            console.error('Error searching games:', error);
        }
    };

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        searchGames();
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
                    className='w-fit px-2 lg:w-1/6 h-10 text-lg font-semibold hover:font-bold hover:text-xl hover:text-black hover:opacity-75 bg-btnPrimary text-dark border rounded-md'>
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
