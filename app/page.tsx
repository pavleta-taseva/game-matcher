'use client'

import React, { useState, useEffect } from 'react';
import Search from '@/src/components/Search';
import FilterGames from '@/src/components/FilterGames';
import AllGames from '@/src/components/AllGames';
import { GameProps } from 'types/components';
import { getGenres } from 'services/api';
import { SiRepublicofgamers } from "react-icons/si";

const HomePage = () => {
    const [results, setResults] = useState<GameProps[]>();
    const [genres, setGenres] = useState<string[]>([]);
    const [totalGamesCount, setTotalGamesCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);

    useEffect(() => {
        getGenres({ genres, setGenres });
    }, [totalGamesCount, isSearching, isFiltered]);

    return (
        <>
            <div className='flex flex-col w-full h-auto gap-4'>
                <Search
                    setResults={setResults}
                    setTotalGamesCount={setTotalGamesCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    genres={genres}
                    setIsSearching={setIsSearching}
                    isFiltered={isFiltered}
                    setIsFiltered={setIsFiltered}
                />

                <div className='flex w-full lg:w-11/12 flex-col-reverse gap-12 md:flex-col-reverse md:gap-12 mx-auto justify-center lg:flex-row lg:justify-start lg:gap-8'>
                    <FilterGames
                        genres={genres}
                        currentPage={currentPage}
                        setTotalGamesCount={setTotalGamesCount}
                        setResults={setResults}
                        isSearching={isSearching}
                        isFiltered={isFiltered}
                        setIsFiltered={setIsFiltered}
                    />

                    <div className={`flex flex-col gap-4 p-8 lg:my-12 text-justify bg-secondaryGrey opacity-90 shadow-grey select-none ${(isFiltered || isSearching) ? 'hidden' : 'block'} lg:w-8/12`}>
                        <div className='text-primaryLight flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>
                            <SiRepublicofgamers className='text-secondaryBlue text-2xl lg:text-4xl' />
                            Welcome to GameMatcher
                        </div>
                        <p> Game Matcher is a powerful search engine designed to help you explore a vast database of games and find the perfect match for your gaming interests. Whether you are into action-packed adventures, immersive role-playing games, or challenging puzzles, Game Matcher has you covered.
                        </p>

                        <div className='text-primaryLight flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>How it Works</div>
                        <p> Using Game Matcher is simple. Just enter your search criteria in the search bar above, and our intelligent search engine will sift through our extensive database of games to find the best matches for you. You can search by game title, genre, platform, release date, and more, allowing you to narrow down your options and discover new and exciting games tailored to your preferences.</p>

                        <div className='text-primaryLight flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>Explore, Discover, and Play</div>
                        <p> Once you have entered your search criteria, Game Matcher will present you with a curated list of games that match your preferences. Explore detailed game descriptions, view screenshots and trailers, read reviews, and learn more about each game to help you make an informed decision.</p>

                        <div className='text-primaryLight flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>Get Started</div>
                        <p>Ready to embark on your gaming journey? Start searching now and discover a world of endless gaming possibilities with Game Matcher. Or you might want to use the filter on below instead.</p>
                    </div>
                    {results && results?.length > 0 && (isFiltered || isSearching) &&
                        <AllGames gamesList={results} setGamesList={setResults} totalGamesCount={totalGamesCount} setTotalGamesCount={setTotalGamesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    }
                </div>
            </div>
        </>
    )
}

export default HomePage;