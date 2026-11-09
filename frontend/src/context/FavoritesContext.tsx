'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: number[]; // motorcycle IDs
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([1, 3]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('motho_favorites');
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      if (typeof window !== 'undefined') {
        localStorage.setItem('motho_favorites', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
