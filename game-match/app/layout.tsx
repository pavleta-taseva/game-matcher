import React from 'react';
import '@/assets/styles/globals.css';

type MainLayoutProps = {
    children: React.ReactNode
}

export const metadata = {
    title: 'GameMatch | Find the perfect game for you',
    description: 'Game matcher is an application that helps users find new games to play based on their preferences and gaming habits. The application will allow users to input their favorite genres, preferred platforms (PC, console, mobile), gameplay features (single-player, multiplayer, cooperative), and other relevant criteria.',
    keywords: 'video games, game matching, find game'
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <html lang='en'>
            <head>

            </head>
            <body><div>{children}</div></body>
        </html>
    )
}

export default MainLayout;