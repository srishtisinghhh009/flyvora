import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const STORAGE_USER_KEY = 'wayfold_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_USER_KEY);
      if (stored) return JSON.parse(stored);
      // Default demo logged-in user so user can immediately experience bookings/checkout if desired
      const defaultUser: User = {
        id: 'usr_default',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@example.in'
      };
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_USER_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Basic client-side simulation delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!email || !password) {
      return { success: false, error: 'Please provide both email and password.' };
    }

    if (!email.includes('@') || !email.includes('.')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Extract name from email for mock user
    const username = email.split('@')[0];
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1);

    const loggedUser: User = {
      id: `usr_${Date.now()}`,
      name: formattedName,
      email: email.trim().toLowerCase()
    };

    setUser(loggedUser);
    return { success: true };
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Please enter your full name.' };
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase()
    };

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
