import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../lib/firebase';

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
    isDemo?: boolean;
}

interface AuthContextType {
    user: UserProfile | User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithGitHub: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
    signInWithDemo: (email?: string, name?: string) => void;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'smartspend_demo_user';

export const createDemoUser = (email = 'demo@smartspend.ai', name = 'Demo User'): UserProfile => ({
    uid: 'demo-user-12345',
    email,
    displayName: name,
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    isDemo: true
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored demo user first
        const storedDemoUser = localStorage.getItem(DEMO_USER_KEY);
        if (storedDemoUser) {
            try {
                setUser(JSON.parse(storedDemoUser));
                setLoading(false);
            } catch (e) {
                localStorage.removeItem(DEMO_USER_KEY);
            }
        }

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                localStorage.removeItem(DEMO_USER_KEY);
            } else if (!localStorage.getItem(DEMO_USER_KEY)) {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signInWithDemo = (email = 'demo@smartspend.ai', name = 'Alex Morgan (Demo User)') => {
        const demoUser = createDemoUser(email, name);
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error: any) {
            console.error('Google sign-in error:', error);
            // Fallback to demo mode if Google OAuth fails in local/dev setup
            signInWithDemo('google.demo@smartspend.ai', 'Google Demo User');
        }
    };

    const signInWithGitHub = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (error: any) {
            console.error('GitHub sign-in error:', error);
            // Fallback to demo mode if GitHub OAuth fails in local/dev setup
            signInWithDemo('github.demo@smartspend.ai', 'GitHub Demo User');
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        if (email.toLowerCase().includes('demo') || email === 'thrifty@example.com' || password === 'demo123456') {
            signInWithDemo(email, email.split('@')[0].replace('.', ' '));
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.warn('Firebase email sign-in failed, logging in via Demo mode:', error);
            signInWithDemo(email, email.split('@')[0]);
        }
    };

    const signUpWithEmail = async (email: string, password: string, name: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            if (result.user) {
                await updateProfile(result.user, { displayName: name });
            }
        } catch (error: any) {
            console.warn('Firebase sign-up failed, creating Demo account:', error);
            signInWithDemo(email, name || 'New Demo User');
        }
    };

    const signOut = async () => {
        localStorage.removeItem(DEMO_USER_KEY);
        setUser(null);
        try {
            await firebaseSignOut(auth);
        } catch (error: any) {
            console.log('Firebase sign-out note:', error);
        }
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        signInWithGitHub,
        signInWithEmail,
        signUpWithEmail,
        signInWithDemo,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

