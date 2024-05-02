import React, { useState } from 'react';

type QueryResult = {
    id: string,
    name: string,
}

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<QueryResult[]>([]);

    const searchGames = async () => {
        console.log('here');
        try {
            const response = await fetch(`https://api.rawg.io/api/games?search=${query}`);
            console.log('response', response)
            const resultFound = await response.json();
            console.log('resultFound', resultFound);
            setResults(resultFound);
        } catch (error) {
            console.error('Error searching games:', error);
        }
    };

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        console.log('event.target.value', event.target.value);
        setQuery(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        searchGames();
    };

    return (
        <div className='flex flex-col gap-2 items-center justify-center w-full mt-8'>
            <form onSubmit={handleSubmit}
                className='flex gap-4 w-full items-center justify-center'>
                <input type="text" value={query} onChange={handleChange} placeholder='Search games database...'
                    className='w-1/3 h-10 border rounded-md outline-none p-2 text-dark' />
                <button type="submit"
                    className='w-1/6 h-10 font-semibold hover:font-bold hover:opacity-75 bg-btnPrimary text-dark border rounded-md'>
                    Submit
                </button>
            </form>
            <ul>
                {results?.length > 0 && results?.map((game) => (
                    game?.id && <li key={game?.id}>Game found: {game?.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
