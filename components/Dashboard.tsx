import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { TEXTS, MOCK_USERS } from '../constants';
import { UserCard } from './UserCard';
import { ChatWindow } from './ChatWindow';
import { MockUser } from '../types';

// Haversine formula to calculate distance between two lat/lon points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}


export const Dashboard: React.FC = () => {
  const { language, userProfile, location, locationError, requestLocation } = useAppContext();
  const texts = TEXTS[language];
  
  const [showUsers, setShowUsers] = useState(false);
  const [chattingWith, setChattingWith] = useState<MockUser | null>(null);

  useEffect(() => {
    // Request location when the dashboard mounts
    if (!location) {
      requestLocation();
    }
  }, [location, requestLocation]);

  const nearbyUsers = useMemo(() => {
    if (!location || !userProfile) return [];

    return MOCK_USERS.filter(u => u.name !== userProfile.name)
        .map(user => {
            const distance = calculateDistance(
                location.latitude,
                location.longitude,
                user.latitude,
                user.longitude
            );
            return { ...user, distance };
        })
        .sort((a, b) => a.distance - b.distance);
  }, [location, userProfile]);


  if (!userProfile) return null;

  const handleFindFriends = () => {
    setShowUsers(true);
  };
  
  const handleStartChat = (user: MockUser) => {
    setChattingWith(user);
  };

  const handleCloseChat = () => {
    setChattingWith(null);
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="text-center bg-white dark:bg-warm-gray-800 p-8 rounded-2xl shadow-lg">
        <img src={userProfile.photoUrl} alt={userProfile.name} className="w-24 h-24 rounded-full mx-auto border-4 border-pastel-green-DEFAULT object-cover" />
        <h2 className="text-2xl font-bold mt-4 text-warm-gray-800 dark:text-warm-gray-100">
          {texts.welcomeBack} {userProfile.name}!
        </h2>
        <p className="mt-2 text-warm-gray-500 dark:text-warm-gray-400">{userProfile.mood}</p>
        <p className="mt-4 text-warm-gray-600 dark:text-warm-gray-300">{texts.findFriendsPrompt}</p>

        <div className="mt-6 min-h-[24px]">
          {!location && !locationError && <p className="text-pastel-blue-DEFAULT animate-pulse">{texts.gettingLocation}</p>}
          {locationError && <p className="text-red-500">{locationError}</p>}
        </div>

        <button
            onClick={handleFindFriends}
            disabled={!location}
            className="mt-6 py-4 px-8 bg-pastel-yellow-light text-pastel-yellow-dark font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg disabled:bg-warm-gray-200 disabled:dark:bg-warm-gray-700 disabled:text-warm-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
        >
            {texts.findFriendsButton}
        </button>
      </div>

      {showUsers && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center text-warm-gray-700 dark:text-warm-gray-200 mb-6">{texts.nearbyPeople}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nearbyUsers.map((user) => (
              <UserCard 
                key={user.id} 
                user={user} 
                distance={`${user.distance.toFixed(1)} ${texts.kmAway}`}
                currentUserInterests={userProfile.interests}
                onChat={handleStartChat}
              />
            ))}
          </div>
        </div>
      )}
      
      {chattingWith && <ChatWindow user={chattingWith} onClose={handleCloseChat} />}
    </main>
  );
};