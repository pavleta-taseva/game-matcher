'use client';

import React from 'react';
import AuthProvider from '@/src/components/AuthProvider';
import '@/assets/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/ui/Footer';

type ClientLayoutProps = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <div className="flex min-h-screen flex-col bg-opacity-50 bg-deepPurple bg-cover bg-center bg-no-repeat font-mono text-primaryLight bg-blend-overlay">
          <ProtectedRoute>
            <Navbar />
            <div className="min-h-screen w-full px-2 py-2 lg:px-8">
              <ToastContainer stacked />
              {children}
            </div>
            <Footer />
          </ProtectedRoute>
        </div>
      </AuthProvider>
    </SessionProvider>
  );
};

export default ClientLayout;
