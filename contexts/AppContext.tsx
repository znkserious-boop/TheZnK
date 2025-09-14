import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, UserProfile } from '../types';
import { TEXTS } from '../constants';

type Theme = 'light' | 'dark';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  location: GeolocationCoordinates | null;
  locationError: string | null;
  requestLocation: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // Fix: Imported TEXTS to resolve reference error.
            setLocationError(TEXTS[language].locationPermissionDenied);
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("The request to get user location timed out.");
            break;
          default:
            setLocationError("An unknown error occurred while fetching location.");
            break;
        }
      }
    );
  }, [language]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const contextValue = {
    theme,
    setTheme,
    language,
    setLanguage,
    userProfile,
    setUserProfile,
    location,
    locationError,
    requestLocation,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
