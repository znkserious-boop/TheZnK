import React from 'react';
import { MockUser, Interest } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { TEXTS } from '../constants';
import { MessageIcon } from './icons/MessageIcon';

interface UserCardProps {
  user: MockUser;
  distance: string;
  currentUserInterests: Interest[];
  onChat: (user: MockUser) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, distance, currentUserInterests, onChat }) => {
  const { language } = useAppContext();
  const texts = TEXTS[language];

  const sharedInterests = user.interests.filter(interest => currentUserInterests.includes(interest));

  return (
    <div className="bg-white dark:bg-warm-gray-800 rounded-2xl shadow-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img src={user.photoUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-pastel-blue-light dark:border-pastel-blue-dark object-cover" />
      <h3 className="mt-4 text-lg font-bold text-warm-gray-800 dark:text-warm-gray-100">{user.name}</h3>
      <p className="text-sm text-warm-gray-500 dark:text-warm-gray-400">{distance}</p>
      <div className="mt-2 bg-warm-gray-100 dark:bg-warm-gray-700 rounded-full px-3 py-1 text-sm">{user.mood}</div>
      
      {sharedInterests.length > 0 && (
        <div className="mt-4 w-full">
          <h4 className="text-xs font-semibold text-warm-gray-600 dark:text-warm-gray-300 uppercase">{texts.sharedInterests}</h4>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {sharedInterests.map(interest => (
              <span key={interest} className="bg-pastel-green-light/50 text-pastel-green-dark dark:bg-pastel-green-dark/50 dark:text-pastel-green-light text-xs font-medium px-2.5 py-0.5 rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onChat(user)}
        className="mt-6 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pastel-blue-DEFAULT hover:bg-pastel-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-blue-DEFAULT transition-all"
      >
        <MessageIcon className="w-4 h-4 mr-2" />
        {texts.chat}
      </button>
    </div>
  );
};