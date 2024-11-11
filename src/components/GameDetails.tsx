'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getGameById } from 'services/gamesAPI';
import { GameProps } from '@/src/types/components';
import Link from 'next/link.js';

const GameDetails = () => {
  const [game, setGame] = useState<GameProps>();
  const { id } = useParams();

  const getCurrentGame = async () => {
    if (id) {
      await getGameById({ id, setGame });
    }
  };

  useEffect(() => {
    getCurrentGame();
  }, []);

  return (
    <div className='w-full mt-12 flex flex-col items-center justify-center font-doHyeon text-xl'>
      <div className='flex place-items-center justify-items-center p-4 w-3/4 m-auto border-2 border-red-500'>
        <div className='flex flex-col'>
          <p className="text-primaryLight font-doHyeon text-2xl">{game?.name}</p>
          <div color="colors-light" className='flex gap-4'>
            <p className="text-primaryLight font-doHyeon text-2xl">Official webpage:</p>
            <Link className='text-primaryLight underline underline-offset-1' href={game?.website || ''} target='_blanc'>{game?.website}</Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col place-items-start justify-items-center p-4 w-3/4 m-auto border-2 border-red-500'>
        <div color="colors-light" className='flex gap-4'>
          <p className="text-primaryLight font-doHyeon">Genres:</p>
          {game?.genres?.map((genre) => genre.name).join(', ') ||
            'No information'}
        </div>
        <div color="colors-light" className='flex gap-4'>
          <p className="text-primaryLight font-doHyeon">Platform:</p>
          {game?.parent_platforms
            ?.map((detail) => detail.platform.name)
            .join(', ') || 'No information'}
        </div>
        <div color="colors-light" className='flex gap-4'>
          <p className="text-primaryLight font-doHyeon">Metascore:</p>
          {game?.metacritic || 'No information'}
        </div>
        <div color="colors-light" className='flex gap-4'>
          <p className="text-primaryLight font-doHyeon">Available on:</p>
          {game?.stores?.map((details) => details.store.name).join(', ') ||
            'No information'}
        </div>
        <div color="colors-light" className='flex gap-4'>
          <p className="text-primaryLight font-doHyeon">Tags:</p>
          {(game?.tags &&
            game?.tags?.length > 0 &&
            game?.tags?.map((tag) => tag.name).join(', ')) ||
            'No information'}
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
