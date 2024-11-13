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
    <div className="bg-background-primaryBlack text-textColor-primaryLight min-h-screen w-full font-doHyeon">
      <div
        className="relative flex h-[400px] w-full items-center justify-center rounded-b-3xl bg-cover bg-center"
        style={{
          backgroundImage: `url(${game?.background_image || '/images/default-game.jpg'})`,
        }}
      >
        <div className="bg-gradient-to-b from-background-darkPurple to-transparent absolute inset-0 rounded-b-3xl opacity-80"></div>
        <h1 className="text-textColor-primaryPurple relative text-5xl font-bold lg:text-6xl">
          {game?.name || 'Game Title'}
        </h1>
      </div>

      <div className="mx-auto mt-8 flex w-11/12 flex-col gap-8 lg:flex-row">
        <div className="bg-background-secondaryGrey shadow-lg flex w-full rounded-3xl p-6 lg:w-3/4">
          <div className="flex flex-col gap-4 text-xl">
            <div className="flex flex-col items-start gap-2">
              <h2 className="font-semibold mb-4 text-3xl">Game Details</h2>
              <p className="font-semibold text-xl text-primaryRed">
                Official webpage:
              </p>
              <Link
                className="hover:text-lightPurple text-primaryPurple underline"
                href={game?.website || '#'}
                target="_blank"
              >
                {game?.website || 'Not available'}
              </Link>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="font-semibold text-xl text-primaryRed">Genres:</p>
              <span>
                {game?.genres?.map((genre) => genre.name).join(', ') ||
                  'No information'}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="font-semibold text-xl text-primaryRed">Platform:</p>
              <span>
                {game?.parent_platforms
                  ?.map((detail) => detail.platform.name)
                  .join(', ') || 'No information'}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="font-semibold text-xl text-primaryRed">
                Metascore:
              </p>
              <span className="text-primaryLight">
                {game?.metacritic || 'No information'}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="font-semibold text-xl text-primaryRed">
                Available on:
              </p>
              <span>
                {game?.stores
                  ?.map((details) => details.store.name)
                  .join(', ') || 'No information'}
              </span>
            </div>

            <div className="flex flex-col items-start gap-2 text-justify">
              <p className="font-semibold text-xl text-primaryRed">Tags:</p>
              <span>
                {(game?.tags &&
                  game?.tags?.length > 0 &&
                  game?.tags?.map((tag) => tag.name).join(', ')) ||
                  'No information'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-4 lg:w-1/4">
          <div className="bg-background-secondaryGrey shadow-lg h-64 w-full overflow-hidden rounded-3xl">
            <img
              src={game?.background_image || '/images/default-game.jpg'}
              alt={game?.name || 'Game Thumbnail'}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="bg-background-secondaryGrey shadow-lg w-full rounded-3xl p-4">
            <h3 className="font-semibold mb-2 text-xl">More Information</h3>
            <Link
              href={game?.website || '#'}
              className="hover:text-lightPurple text-primaryPurple underline"
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
