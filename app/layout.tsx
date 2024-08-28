import React from 'react';
import '@/assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import connectDB from 'config/database';
import ClientLayout from './ClientLayout';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'GameMatcher | Find the perfect game for you',
  description:
    'Game matcher is an application that helps users find new games to play based on their preferences and gaming habits.',
  keywords: 'video games, game matching, find game',
};

const MainLayout = async ({ children }: MainLayoutProps) => {
  await connectDB();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Game Matcher is a powerful search engine designed to help you explore a vast database of games and find the perfect match for your gaming interests."
        />
        <meta name="keywords" content="games, search, gaming, add, lists" />
        <meta name="author" content="Pavleta Taseva" />
        <meta
          name="google-site-verification"
          content="zHKR0pclLl-QAA5g95yJ9Q70AGbdErKHluQ3oZ8ki7U"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Purple+Purse&display=swap"
          rel="stylesheet"
        />
        <script src="https://accounts.google.com/gsi/client" async></script>
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Purple+Purse&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default MainLayout;
