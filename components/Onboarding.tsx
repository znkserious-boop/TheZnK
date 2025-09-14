
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { TEXTS, ALL_MOODS, ALL_INTERESTS } from '../constants';
import { UserProfile, Mood, Interest } from '../types';

export const Onboarding: React.FC = () => {
  const { language, setUserProfile } = useAppContext();
  const texts = TEXTS[language];

  const [name, setName] = useState('');
  const [mood, setMood] = useState<Mood | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [error, setError] = useState('');

  const handleInterestToggle = (interest: Interest) => {
    setInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      }
      if (prev.length < 3) {
        return [...prev, interest];
      }
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mood || interests.length === 0) {
      setError('Please fill out all fields.');
      return;
    }
    const newUserProfile: UserProfile = {
      name,
      mood,
      interests,
      photoUrl: `https://picsum.photos/seed/${name}/200`,
    };
    setUserProfile(newUserProfile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-warm-gray-50 dark:bg-warm-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-warm-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-warm-gray-800 dark:text-warm-gray-100">{texts.onboardingTitle}</h2>
          <p className="text-warm-gray-500 dark:text-warm-gray-400 mt-2">{texts.onboardingSubtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300">{texts.yourName}</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={texts.yourNamePlaceholder}
              className="mt-1 block w-full px-3 py-2 bg-warm-gray-50 dark:bg-warm-gray-700 border border-warm-gray-300 dark:border-warm-gray-600 rounded-md shadow-sm placeholder-warm-gray-400 focus:outline-none focus:ring-pastel-blue-DEFAULT focus:border-pastel-blue-DEFAULT sm:text-sm text-warm-gray-800 dark:text-warm-gray-100"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300">{texts.selectMood}</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {ALL_MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`p-2 rounded-lg text-sm transition-all ${
                    mood === m 
                      ? 'bg-pastel-blue-DEFAULT text-white shadow-md scale-105' 
                      : 'bg-warm-gray-100 dark:bg-warm-gray-700 text-warm-gray-700 dark:text-warm-gray-200 hover:bg-warm-gray-200 dark:hover:bg-warm-gray-600'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300">{texts.selectInterests}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {ALL_INTERESTS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleInterestToggle(i)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    interests.includes(i)
                      ? 'bg-pastel-green-DEFAULT text-white shadow'
                      : 'bg-warm-gray-100 dark:bg-warm-gray-700 text-warm-gray-700 dark:text-warm-gray-200 hover:bg-warm-gray-200 dark:hover:bg-warm-gray-600'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pastel-blue-DEFAULT hover:bg-pastel-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-blue-DEFAULT transition-all transform hover:scale-105"
          >
            {texts.getStarted}
          </button>
        </form>
      </div>
    </div>
  );
};
