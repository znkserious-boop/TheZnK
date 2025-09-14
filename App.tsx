
import React from 'react';
import { useAppContext } from './hooks/useAppContext';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';

const App: React.FC = () => {
  const { userProfile } = useAppContext();

  return (
    <div className="min-h-screen text-warm-gray-800 dark:text-warm-gray-100">
      {userProfile ? (
        <>
          <Header />
          <Dashboard />
        </>
      ) : (
        <Onboarding />
      )}
    </div>
  );
};

export default App;
