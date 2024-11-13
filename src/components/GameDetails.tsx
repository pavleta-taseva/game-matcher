'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getGameById } from 'services/gamesAPI';
import { GameProps } from '@/src/types/components';
import Link from 'next/link';

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
    <div className="w-full min-h-screen bg-background-primaryBlack text-textColor-primaryLight font-doHyeon">
      <div
        className="relative w-full h-[400px] flex items-center justify-center bg-cover bg-center rounded-b-3xl"
        style={{
          backgroundImage: `url(${game?.background_image || '/images/default-game.jpg'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background-darkPurple to-transparent opacity-80 rounded-b-3xl"></div>
        <h1 className="relative text-5xl lg:text-6xl font-bold text-textColor-primaryPurple">
          {game?.name || 'Game Title'}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row w-11/12 mx-auto mt-8 gap-8">
        <div className="flex w-full lg:w-3/4 bg-background-secondaryGrey p-6 rounded-3xl shadow-lg">
          <div className="flex flex-col gap-4 text-xl">
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-3xl font-semibold mb-4">Game Details</h2>
              <p className="text-primaryRed font-semibold text-xl">Official webpage:</p>
              <Link
                className="text-primaryPurple underline hover:text-lightPurple"
                href={game?.website || '#'}
                target="_blank"
              >
                {game?.website || 'Not available'}
              </Link>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="text-primaryRed font-semibold text-xl">Genres:</p>
              <span>
                {game?.genres?.map((genre) => genre.name).join(', ') || 'No information'}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="text-primaryRed font-semibold text-xl">Platform:</p>
              <span>
                {game?.parent_platforms
                  ?.map((detail) => detail.platform.name)
                  .join(', ') || 'No information'}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="text-primaryRed font-semibold text-xl">Metascore:</p>
              <span className="text-primaryLight">
                {game?.metacritic || 'No information'}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="text-primaryRed font-semibold text-xl">Available on:</p>
              <span>
                {game?.stores?.map((details) => details.store.name).join(', ') ||
                  'No information'}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2 text-justify">
              <p className="text-primaryRed font-semibold text-xl">Tags:</p>
              <span>
                {(game?.tags &&
                  game?.tags?.length > 0 &&
                  game?.tags?.map((tag) => tag.name).join(', ')) ||
                  'No information'}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 flex flex-col gap-4 mt-8">
          <div className="w-full h-64 bg-background-secondaryGrey rounded-3xl shadow-lg overflow-hidden">
            <img
              src={game?.background_image || '/images/default-game.jpg'}
              alt={game?.name || 'Game Thumbnail'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full p-4 bg-background-secondaryGrey rounded-3xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">More Information</h3>
            <Link
              href={game?.website || '#'}
              className="text-primaryPurple underline hover:text-lightPurple"
              target="_blank"
            >
              Visit Official Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;