'use client'

import React, { useState, useEffect } from 'react';
import Search from '@/src/components/Search';
import FilterGames from '@/src/components/FilterGames';
import AllGames from '@/src/components/AllGames';
import MiniCard from '@/src/components/MiniCard';
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
    const [topGames, setTopGames] = useState<GameProps[]>();

    useEffect(() => {
        getGenres({ genres, setGenres });

        if (isSearching || isFiltered) {
            setTopGames(results?.sort((gameOne, gameTwo) => gameTwo.rating - gameOne.rating).slice(0, 3));
        }
    }, [totalGamesCount, isSearching, isFiltered]);

    return (
        <div className='flex flex-col w-full h-full gap-4'>

            <Search
                setResults={setResults}
                setTotalGamesCount={setTotalGamesCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                genres={genres}
                setIsSearching={setIsSearching}
                isFiltered={isFiltered}
                setIsFiltered={setIsFiltered}
                setTopGames={setTopGames}
            />

            <div className='flex w-full justify-between'>
                <FilterGames
                    genres={genres}
                    currentPage={currentPage}
                    setTotalGamesCount={setTotalGamesCount}
                    setResults={setResults}
                    isSearching={isSearching}
                    isFiltered={isFiltered}
                    setIsFiltered={setIsFiltered}
                    setTopGames={setTopGames}
                />

                <div className={`flex flex-col gap-4 w-8/12 p-8 text-justify bg-block opacity-90 shadow-grey select-none ${(isFiltered || isSearching) ? 'hidden' : 'block'}`}>
                    <div className='text-primary flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>
                        <SiRepublicofgamers className='text-secondary text-4xl' />
                        Welcome to GameMatch
                    </div>
                    <p> Game Matcher is a powerful search engine designed to help you explore a vast database of games and find the perfect match for your gaming interests. Whether you are into action-packed adventures, immersive role-playing games, or challenging puzzles, Game Matcher has you covered.
                    </p>

                    <div className='text-primary flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>How it Works</div>
                    <p> Using Game Matcher is simple. Just enter your search criteria in the search bar above, and our intelligent search engine will sift through our extensive database of games to find the best matches for you. You can search by game title, genre, platform, release date, and more, allowing you to narrow down your options and discover new and exciting games tailored to your preferences.</p>

                    <div className='text-primary flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>Explore, Discover, and Play</div>
                    <p> Once you have entered your search criteria, Game Matcher will present you with a curated list of games that match your preferences. Explore detailed game descriptions, view screenshots and trailers, read reviews, and learn more about each game to help you make an informed decision.</p>

                    <div className='text-primary flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>Get Started</div>
                    <p>Ready to embark on your gaming journey? Start searching now and discover a world of endless gaming possibilities with Game Matcher.</p>
                </div>

                <div className={`flex flex-col gap-4 w-8/12 p-8 text-justify bg-block opacity-90 shadow-grey select-none ${topGames && topGames?.length > 0 && (isFiltered || isSearching) ? 'block' : 'hidden'}`}>
                    <div className='text-primary flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>Top 3 of the most exceptional games</div>
                    <div className='grid gap-x-8 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-lg justify-items-center place-items-center w-full px-4'>
                        {topGames && topGames?.length > 0 &&
                            topGames?.map((game) => (
                                game?.id && <MiniCard key={game?.id} game={game} />
                            ))
                        }
                    </div>
                </div>
            </div>

            {results && results?.length > 0 && (isFiltered || isSearching) &&
                <AllGames gamesList={results} totalGamesCount={totalGamesCount} genres={genres} />
            }
        </div>
    )
}

export default HomePage;