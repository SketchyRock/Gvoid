import React, { useState } from 'react';

import PomodoroTimer from './components/study/PomodoroTimer';
import CurrentFocus from './components/study/CurrentFocus';
import AmbientSound from './components/audio/AmbientSound';
import SettingsPage from './components/settings/SettingsPage';
import { SettingsProvider } from './contexts/SettingsContext';

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <SettingsProvider>
      <div className="h-screen flex flex-col bg-gray-900 text-gray-100 transition-colors duration-700 ease-in-out font-sans overflow-hidden">

        {/* Top Header Controls */}
        <header className="flex items-center justify-between w-full max-w-6xl mx-auto px-8 py-4 animate-fade-in shrink-0">
          <div className="text-blue-soft font-semibold tracking-widest text-sm uppercase transition-transform hover:scale-105 cursor-default">Focus Space</div>
          <div className="flex gap-6 items-center">
            <AmbientSound />
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-gray-300 hover:text-gray-100 hover:scale-105 transition-all text-sm"
            >
              Settings
            </button>
          </div>
        </header>

        {/* Main Focus Area - Scroll allowed only here and only if needed */}
        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-start p-6 relative">
          <div className="w-full max-w-2xl flex flex-col items-center gap-8 mt-4 animate-fade-in">
            <PomodoroTimer />
            <CurrentFocus />
          </div>
        </main>

        {/* Modals */}
        <SettingsPage isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </SettingsProvider>
  );
}
