'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const setAuthCookies = (token: string, role: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `motho_token=${encodeURIComponent(token)}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `motho_role=${encodeURIComponent(role)}; path=/; max-age=2592000; SameSite=Lax`;
  }
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('motho_role') as UserRole;
      const storedUser = localStorage.getItem('motho_user');
      const storedToken = localStorage.getItem('motho_token');

      if (storedUser && storedToken) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          const activeRole = storedRole || parsed.role || 'customer';
          setRole(activeRole);
          setAuthCookies(storedToken, activeRole);
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('motho_role', newRole);
      localStorage.setItem('motho_user', JSON.stringify(matched));
      localStorage.setItem('motho_token', token);
      setAuthCookies(token, newRole);
    }
  };

  const login = async (email: string): Promise<boolean> => {
    // Look up mock user or create authenticated session
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    const token = 'mock_sanctum_token_' + Date.now();

    if (found) {
      setUser(found);
      setRole(found.role);
      if (typeof window !== 'undefined') {
        localStorage.setItem('motho_role', found.role);
        localStorage.setItem('motho_user', JSON.stringify(found));
        localStorage.setItem('motho_token', token);
        setAuthCookies(token, found.role);
      }
      return true;
    } else {
      // Default customer login
      const newUser: User = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        phone: "+855 12 000 000",
        role: 'customer',
        created_at: new Date().toISOString()
      };
      setUser(newUser);
      setRole('customer');
      if (typeof window !== 'undefined') {
        localStorage.setItem('motho_role', 'customer');
        localStorage.setItem('motho_user', JSON.stringify(newUser));
        localStorage.setItem('motho_token', token);
        setAuthCookies(token, 'customer');
      }
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    setRole('customer');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('motho_role');
      localStorage.removeItem('motho_user');
      localStorage.removeItem('motho_token');
      clearAuthCookies();
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('motho_user', JSON.stringify(updated));
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
