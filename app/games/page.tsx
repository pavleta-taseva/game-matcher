'use client'

import React, { useState, useEffect } from 'react';
import AllGames from '@/src/components/AllGames';
import { GameProps } from 'types/components';
import { getGamesByPage } from 'services/api';

const Games = () => {
    const [gamesList, setGamesList] = useState<GameProps[]>();
    const [totalGamesCount, setTotalGamesCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        getGamesByPage({ setGamesList, setTotalGamesCount, currentPage, setCurrentPage });
    }, []);

    return (
        <div className='flex flex-col w-full h-full gap-4'>
            {gamesList && gamesList?.length > 0 &&
                <AllGames gamesList={gamesList} setGamesList={setGamesList} totalGamesCount={totalGamesCount} setTotalGamesCount={setTotalGamesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            }
        </div>
    )
}

export default Games;