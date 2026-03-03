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
          <div className="flex items-baseline gap-4 group/brand">
            <h1 className="text-3xl font-black tracking-tighter cursor-default bg-gradient-to-r from-blue-soft to-purple-soft bg-clip-text text-transparent transition-all duration-500 group-hover/brand:to-blue-soft group-hover/brand:from-purple-soft group-hover/brand:scale-105 group-hover/brand:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              Gvoid
            </h1>
            <a
              href="https://github.com/SketchyRock"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-[10px] font-bold text-gray-500 hover:text-purple-soft transition-all tracking-[0.2em] uppercase group/link"
            >
              by SketchyRock
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-soft transition-all duration-300 group-hover/link:w-full"></span>
            </a>
          </div>
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
