'use client'

import React from 'react';
import Search from '@/src/components/Search';

const HomePage = () => {
    return (
        <div className='flex flex-col w-full h-full gap-16'>
            <Search />
            <div className='flex flex-col gap-8 w-1/2 self-center text-justify'>
                <span className='font-bold text-3xl'>Welcome to Game Matcher</span>
                <p> Game Matcher is a powerful search engine designed to help you explore a vast database of games and find the perfect match for your gaming interests. Whether you're into action-packed adventures, immersive role-playing games, or challenging puzzles, Game Matcher has you covered.
                </p>

                <span className='font-bold text-2xl'>How it Works</span>
                <p> Using Game Matcher is simple. Just enter your search criteria in the search bar above, and our intelligent search engine will sift through our extensive database of games to find the best matches for you. You can search by game title, genre, platform, release date, and more, allowing you to narrow down your options and discover new and exciting games tailored to your preferences.</p>

                <span className='font-bold text-2xl'>Explore, Discover, and Play</span>
                <p> Once you've entered your search criteria, Game Matcher will present you with a curated list of games that match your preferences. Explore detailed game descriptions, view screenshots and trailers, read reviews, and learn more about each game to help you make an informed decision.</p>

                <span className='font-bold text-2xl'>Get Started</span>
                <p>Ready to embark on your gaming journey? Start searching now and discover a world of endless gaming possibilities with Game Matcher.</p>
            </div>
        </div>
    )
}

export default HomePage;