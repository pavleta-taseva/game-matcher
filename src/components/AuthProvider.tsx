'use client'

import React from 'react';
import { SessionProvider } from "next-auth/react";

type MainLayoutProps = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: MainLayoutProps) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default AuthProvider;