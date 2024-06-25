'use client'

import React, { useState, useEffect } from 'react';
import AllGames from '@/src/components/AllGames';
import { GameProps } from 'types/components';
import { getGames } from 'services/api';

const Games = () => {
    const [gamesList, setGamesList] = useState<GameProps[]>();
    const [totalGamesCount, setTotalGamesCount] = useState<number>(0);

    useEffect(() => {
        getGames({ setGamesList, setTotalGamesCount });
    }, []);

    return (
        <div className='flex flex-col w-full h-full gap-4'>
            {gamesList && gamesList?.length > 0 &&
                <AllGames gamesList={gamesList} totalGamesCount={totalGamesCount} />
            }
        </div>
    )
}

export default Games;