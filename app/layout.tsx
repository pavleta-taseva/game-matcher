import React from 'react';
import '@/assets/styles/globals.css';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/ui/Footer';
import connectDB from 'config/database';
import AuthProvider from '@/src/components/AuthProvider';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'GameMatcher | Find the perfect game for you',
  description:
    'Game matcher is an application that helps users find new games to play based on their preferences and gaming habits. The application will allow users to input their favorite genres, preferred platforms (PC, console, mobile), gameplay features (single-player, multiplayer, cooperative), and other relevant criteria.',
  keywords: 'video games, game matching, find game',
};

const MainLayout = async ({ children }: MainLayoutProps) => {
  await connectDB();

  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Game Matcher is a powerful search engine designed to help you explore a vast database of games and find the perfect match for your gaming interests. Whether you are into action-packed adventures, immersive role-playing games, or challenging puzzles, Game Matcher has you covered."
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
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Purple+Purse&display=swap"
            as="style"
          />
          <script src="https://accounts.google.com/gsi/client" async></script>
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Purple+Purse&display=swap"
            />
          </noscript>
        </head>
        <body>
          <div className="flex min-h-screen flex-col bg-primaryBlack bg-opacity-50 bg-controller bg-cover bg-center bg-no-repeat font-mono text-primaryLight bg-blend-overlay">
            <Navbar />
            <div className="min-h-screen w-full px-2 py-2 lg:px-8">
              <ToastContainer stacked />
              <ProtectedRoute>{children}</ProtectedRoute>
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
