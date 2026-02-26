'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'redpot_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setUser(JSON.parse(stored));
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        // Mock auth — simulate API delay
        await new Promise((r) => setTimeout(r, 800));
        console.log('[Redpot Media] Login attempt:', { email, password: '***' });

        const mockUser: User = {
            id: 'usr_' + Date.now(),
            name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            email,
            createdAt: new Date().toISOString(),
        };

        setUser(mockUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
        return true;
    }, []);

    const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log('[Redpot Media] Signup attempt:', { name, email, password: '***' });

        const mockUser: User = {
            id: 'usr_' + Date.now(),
            name,
            email,
            createdAt: new Date().toISOString(),
        };

        setUser(mockUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
        return true;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
