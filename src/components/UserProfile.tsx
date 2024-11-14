'use client';

import React from 'react';
import { useAuth } from '@/../context/AuthProvider';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const UserProfile = () => {
  const { user, gamesList } = useAuth();
  const { data: session } = useSession();

  return (
    <div className="bg-background-primaryBlack text-textColor-primaryLight min-h-screen w-full font-doHyeon">
      <div className="bg-background-darkPurple flex h-[300px] w-full items-center justify-center rounded-b-3xl">
        <div className="flex flex-col items-center">
          <div className="relative mb-4 h-32 w-32">
            <Image
              src={user?.image || '/images/default-picture.png'}
              alt={user?.username || 'User Avatar'}
              width={128}
              height={128}
              className="rounded-full border-4 border-primaryPurple object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-primaryPurple">{`Welcome, ${user?.username || session?.user?.name || 'User'}!`}</h1>
        </div>
      </div>

      <div className="bg-background-secondaryGrey shadow-lg mx-auto flex w-11/12 flex-col rounded-3xl">
        <h2 className="font-semibold mb-4 text-2xl text-primaryRed">
          Profile Information
        </h2>
        <div className="flex flex-col gap-4 text-xl">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-xl text-primaryLight">Email:</p>
            <span>{user?.email || 'No email provided'}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-xl text-primaryLight">Username:</p>
            <span>
              {user?.username || session?.user?.name || 'No username provided'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-xl text-primaryLight">Gender:</p>
            <span>{user?.gender || 'Not specified'}</span>
          </div>
        </div>
      </div>

      <div className="bg-background-secondaryGrey shadow-lg mx-auto mt-8 w-11/12 gap-4 rounded-3xl">
        <h2 className="font-semibold mb-4 text-2xl text-primaryRed">
          Favorite games
        </h2>
        {gamesList && gamesList.length > 0 ? (
          <div className="grid w-fit grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gamesList.map((game) => (
              <div
                key={game.id}
                className="bg-background-primaryGrey shadow-md hover:bg-background-primaryPurple rounded-xl transition-all"
              >
                <h3 className="text-lg font-semibold">{game.name}</h3>
                <Link
                  href={`/games/${game.id}`}
                  className="hover:text-lightPurple text-primaryPurple underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-2xl text-primaryLight">
            No favorite games found.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
