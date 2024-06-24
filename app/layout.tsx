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
            </head>
            <body>
                <div
                    className="flex flex-col bg-controller font-mono text-primary bg-primary bg-opacity-50 bg-center bg-cover bg-no-repeat bg-blend-overlay">
                    <Navbar />
                    <div className="container mx-auto p-4 h-full">
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    )
}

export default MainLayout;