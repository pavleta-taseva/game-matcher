'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type MainLayoutProps = {
    children: React.ReactNode;
};

interface AuthContextProps {
    user: any;
    loginUser: (email: string, password: string) => Promise<void>;
    logout: () => void;
    registerUser: (email: string, username: string, password: string, confirmPassword: string, gender: string) => Promise<void>;
    isLoading: boolean;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const AuthProvider = ({ children }: MainLayoutProps) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            setUser(decoded);
        }
        setIsLoading(false);
    }, []);

    const loginUser = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                throw new Error(data.message);
            } else {
                localStorage.setItem('token', data.token);
                const decoded = jwtDecode<JwtPayload>(data.token);
                setUser(decoded);
                setIsLoading(false);
                setIsLoggedIn(true);
                router.replace('/');
            }
            return data.user;
        } catch (error) {
            setIsLoading(false);
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    };

    const registerUser = async (email: string, username: string, password: string, confirmPassword: string, gender: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password, confirmPassword, gender }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                throw new Error(data.message);
            } else {
                localStorage.setItem('token', data.token);
                const decoded = jwtDecode<JwtPayload>(data.token);
                setUser(decoded);
                toast.success('Signed up successfully!');
                setIsLoading(false);
                setIsLoggedIn(true);
                router.replace('/');
            }
            return data.user;
        } catch (error) {
            setIsLoading(false);
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    };


    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logout, registerUser, isLoading, isLoggedIn }}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;