'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getGameById } from 'services/gamesAPI';
import { GameProps } from '@/src/types/components';

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
    <>
      <div color="colors-light">
        <p className="font-bold">Genres:</p>
        {game?.genres?.map((genre) => genre.name).join(', ') ||
          'No information'}
      </div>
      <div color="colors-light">
        <p className="font-bold">Platform:</p>
        {game?.parent_platforms
          ?.map((detail) => detail.platform.name)
          .join(', ') || 'No information'}
      </div>
      <div color="colors-light">
        <p className="font-bold">Metascore:</p>
        {game?.metacritic || 'No information'}
      </div>
      <div color="colors-light">
        <p className="font-bold">Available on:</p>
        {game?.stores?.map((details) => details.store.name).join(', ') ||
          'No information'}
      </div>
      <div color="colors-light">
        <p className="font-bold">Tags:</p>
        {(game?.tags &&
          game?.tags?.length > 0 &&
          game?.tags?.map((tag) => tag.name).join(', ')) ||
          'No information'}
      </div>
    </>
  );
};

export default GameDetails;
