import React from 'react';
import { HomeContentProps } from '@/src/types/elements';

const HomeContent = ({ isFiltered, isSearching }: HomeContentProps) => {
  return (
    <div
      className={`my-6 grid w-5/6 select-none grid-cols-1 justify-between gap-8 self-center p-0 md:grid-cols-2 md:gap-28 ${isFiltered || isSearching ? 'hidden' : 'block'}`}
    >
      <div className="flex w-full flex-col items-center justify-start gap-2 text-2xl md:w-10/12 md:gap-4">
        <span className="text-2xl md:text-3xl">Welcome to GameMatcher</span>
        <span className="md:text-lg text-justify text-base text-primaryLight">
          Game Matcher is a powerful search engine designed to help you explore
          a vast database of games and find the perfect match for your gaming
          interests.
        </span>
        <span className="md:text-lg text-justify text-base text-primaryLight">
          Using Game Matcher is simple. Just enter your search criteria in the
          search bar above, and our intelligent search engine will sift through
          our extensive database of games.
        </span>
      </div>

      <div className="flex w-full flex-col items-center justify-start gap-2 md:w-10/12 md:gap-4">
        <span className="text-2xl md:text-3xl">How it Works</span>
        <span className="md:text-lg text-justify text-base text-primaryLight">
          Our search engine will find the best matches for you. You can filter
          your searching, which will allow you to narrow down your options and
          discover new and exciting games tailored to your preferences.
        </span>
        <span className="md:text-lg text-justify text-base text-primaryLight">
          Once you have entered your search criteria, you can start exploring
          detailed game descriptions and learn more about each game to help you
          make an informed decision.
        </span>
      </div>
    </div>
  );
};

export default HomeContent;
