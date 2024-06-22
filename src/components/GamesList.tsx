import React from 'react';
import { SearchProps } from 'types/components';
import Game from './Game';

const GamesList = ({ results }: SearchProps) => {
    console.log('results from Search', results);
    return (
        <>
            <h2 className="text-2xl text-center font-semibold mb-2">Games found</h2>
            <div className='grid grid-cols-3 w-full gap-4 p-8 mt-8 text-justify bg-block opacity-90 shadow-grey select-none'>
                {results && results?.length > 0 &&
                    results?.map((game) => (
                        game?.id && <Game key={game?.id} game={game} />
                    ))
                }
            </div>
        </>
    )
}

export default GamesList;