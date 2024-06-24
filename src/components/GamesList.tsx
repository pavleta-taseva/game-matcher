import React from 'react';
import { SearchProps } from 'types/components';
import Game from './Game';

const GamesList = ({ results }: SearchProps) => {
    return (
        <>
            <h2 className="text-xl text-right font-semibold text-secondary">Found {results?.length} items</h2>
            <div className='grid gap-x-2 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-lg justify-items-center place-items-center w-full py-12 px-4 mt-4 bg-block opacity-90 shadow-grey'>
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