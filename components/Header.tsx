
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { TEXTS } from '../constants';
import { Language } from '../types';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

export const Header: React.FC = () => {
  const { theme, setTheme, language, setLanguage } = useAppContext();
  const texts = TEXTS[language];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <header className="bg-white/70 dark:bg-warm-gray-800/70 backdrop-blur-md p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-pastel-blue-dark dark:text-pastel-blue-light">{texts.appName}</h1>
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-warm-gray-100 dark:bg-warm-gray-700 text-warm-gray-800 dark:text-warm-gray-100 rounded-md p-2 border-transparent focus:ring-2 focus:ring-pastel-blue-DEFAULT focus:border-transparent"
          >
            {Object.values(Language).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-warm-gray-700 dark:text-warm-gray-200 hover:bg-warm-gray-200 dark:hover:bg-warm-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
