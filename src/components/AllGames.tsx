import React from 'react';
import { SearchProps } from 'types/components';
import GameCard from './GameCard';

const AllGames = ({ gamesList, totalGamesCount }: SearchProps) => {
    return (
        <>
            <h2 className="text-xl text-right font-semibold text-secondary">
                Items found: {totalGamesCount && totalGamesCount.toLocaleString('en')}
            </h2>
            <div className='grid gap-x-2 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-lg justify-items-center place-items-center w-full py-12 px-4 mt-4 bg-block opacity-90 shadow-grey'>
                {gamesList && gamesList?.length > 0 &&
                    gamesList?.map((game) => (
                        game?.id && <GameCard key={game?.id} game={game} />
                    ))
                }
            </div>
        </>
    )
}

export default AllGames;