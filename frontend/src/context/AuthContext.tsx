'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, rememberMe?: boolean) => Promise<User>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const setAuthCookies = (token: string, role: string, rememberMe = true) => {
  if (typeof document !== 'undefined') {
    const maxAge = rememberMe ? ' max-age=2592000;' : '';
    document.cookie = `motho_token=${encodeURIComponent(token)}; path=/;${maxAge} SameSite=Lax`;
    document.cookie = `motho_role=${encodeURIComponent(role)}; path=/;${maxAge} SameSite=Lax`;
  }
};

const saveAuthSession = (user: User, token: string, rememberMe: boolean) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  const otherStorage = rememberMe ? sessionStorage : localStorage;
  storage.setItem('motho_role', user.role);
  storage.setItem('motho_user', JSON.stringify(user));
  storage.setItem('motho_token', token);
  otherStorage.removeItem('motho_role');
  otherStorage.removeItem('motho_user');
  otherStorage.removeItem('motho_token');
  setAuthCookies(token, user.role, rememberMe);
};

const clearAuthCookies = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'motho_token=; path=/; max-age=0; SameSite=Lax';
    document.cookie = 'motho_role=; path=/; max-age=0; SameSite=Lax';
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Start unauthenticated by default
  const [role, setRole] = useState<UserRole>('customer');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore the browser-only session after hydration; server rendering cannot read browser storage.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem('motho_token') ? localStorage : sessionStorage;
      const storedRole = storage.getItem('motho_role') as UserRole;
      const storedUser = storage.getItem('motho_user');
      const storedToken = storage.getItem('motho_token');

      if (storedUser && storedToken) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          const activeRole = storedRole || parsed.role || 'customer';
          setRole(activeRole);
          setAuthCookies(storedToken, activeRole, storage === localStorage);
        } catch {
          setUser(null);
          clearAuthCookies();
        }
      } else {
        setUser(null);
        clearAuthCookies();
      }
      setIsLoading(false);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    const matched = MOCK_USERS.find(u => u.role === newRole) || {
      id: Date.now(),
      name: `${newRole.toUpperCase()} User`,
      email: `${newRole}@motho.com`,
      phone: "+855 12 000 000",
      role: newRole,
      created_at: new Date().toISOString()
    };
    setUser(matched);
    const token = 'mock_sanctum_token_' + Date.now();
    if (typeof window !== 'undefined') saveAuthSession(matched, token, true);
  };

  const login = async (email: string, _password?: string, rememberMe = true): Promise<User> => {
    // Look up mock user or create authenticated session
    const normalizedEmail = email.trim().toLowerCase();
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === normalizedEmail);
    const token = 'mock_sanctum_token_' + Date.now();

    if (found) {
      setUser(found);
      setRole(found.role);
      if (typeof window !== 'undefined') saveAuthSession(found, token, rememberMe);
      return found;
    } else {
      // Default customer login
      const newUser: User = {
        id: Date.now(),
        name: normalizedEmail.split('@')[0],
        email: normalizedEmail,
        phone: "+855 12 000 000",
        role: 'customer',
        created_at: new Date().toISOString()
      };
      setUser(newUser);
      setRole('customer');
      if (typeof window !== 'undefined') saveAuthSession(newUser, token, rememberMe);
      return newUser;
    }
  };

  const logout = () => {
    setUser(null);
    setRole('customer');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('motho_role');
      localStorage.removeItem('motho_user');
      localStorage.removeItem('motho_token');
      sessionStorage.removeItem('motho_role');
      sessionStorage.removeItem('motho_user');
      sessionStorage.removeItem('motho_token');
      clearAuthCookies();
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem('motho_token') ? localStorage : sessionStorage;
      storage.setItem('motho_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
