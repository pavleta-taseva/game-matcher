import React from 'react';
import '@/assets/styles/globals.css';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import connectDB from 'config/database';

type MainLayoutProps = {
    children: React.ReactNode
}

export const metadata = {
    title: 'GameMatch | Find the perfect game for you',
    description: 'Game matcher is an application that helps users find new games to play based on their preferences and gaming habits. The application will allow users to input their favorite genres, preferred platforms (PC, console, mobile), gameplay features (single-player, multiplayer, cooperative), and other relevant criteria.',
    keywords: 'video games, game matching, find game'
}

const MainLayout = async ({ children }: MainLayoutProps) => {
    await connectDB();

    return (
        <html lang='en'>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Game Matcher is a powerful search engine designed to help you explore a vast database of games and find the perfect match for your gaming interests. Whether you are into action-packed adventures, immersive role-playing games, or challenging puzzles, Game Matcher has you covered." />
                <meta name="keywords" content="games, search, gaming, add, lists" />
                <meta name="author" content="Pavleta Taseva" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Purple+Purse&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <div
                    className="flex flex-col bg-controller font-mono text-primaryLight bg-primaryBlack bg-opacity-50 bg-center bg-cover bg-no-repeat bg-blend-overlay">
                    <Navbar />
                    <div className="w-full h-auto px-8 py-2">
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    )
}

export default MainLayout;