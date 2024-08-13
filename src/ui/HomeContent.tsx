import React from 'react';
import { SiRepublicofgamers } from 'react-icons/si';
import { HomeContentProps } from '@/src/types/elements';

const HomeContent = ({ isFiltered, isSearching }: HomeContentProps) => {
  return (
    <div
      className={`flex select-none flex-col gap-4 bg-secondaryGrey p-8 text-justify opacity-90 shadow-grey lg:my-12 ${isFiltered || isSearching ? 'hidden' : 'block'} lg:w-8/12`}
    >
      <div className="purple-purse-regular flex flex-row items-center justify-center gap-2 text-center text-2xl text-primaryLight md:text-3xl">
        <SiRepublicofgamers className="hidden text-secondaryBlue md:block" />
        Welcome to GameMatcher
      </div>
      <p>
        {' '}
        Game Matcher is a powerful search engine designed to help you explore a
        vast database of games and find the perfect match for your gaming
        interests. Whether you are into action-packed adventures, immersive
        role-playing games, or challenging puzzles, Game Matcher has you
        covered.
      </p>

      <div className="purple-purse-regular flex flex-row items-center justify-center gap-2 text-center text-2xl text-primaryLight md:text-3xl">
        How it Works
      </div>
      <p>
        {' '}
        Using Game Matcher is simple. Just enter your search criteria in the
        search bar above, and our intelligent search engine will sift through
        our extensive database of games to find the best matches for you. You
        can search by game title, genre, platform, release date, and more,
        allowing you to narrow down your options and discover new and exciting
        games tailored to your preferences.
      </p>

      <div className="purple-purse-regular flex flex-row items-center justify-center gap-2 text-center text-2xl text-primaryLight md:text-3xl">
        Explore, Discover, and Play
      </div>
      <p>
        {' '}
        Once you have entered your search criteria, Game Matcher will present
        you with a curated list of games that match your preferences. Explore
        detailed game descriptions, view screenshots and trailers, read reviews,
        and learn more about each game to help you make an informed decision.
      </p>

      <div className="purple-purse-regular flex flex-row items-center justify-center gap-2 text-center text-2xl text-primaryLight md:text-3xl">
        Get Started
      </div>
      <p>
        Ready to embark on your gaming journey? Start searching now and discover
        a world of endless gaming possibilities with Game Matcher. Or you might
        want to use the filter on below instead.
      </p>
    </div>
  );
};

export default HomeContent;
