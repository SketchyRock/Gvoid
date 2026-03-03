import React, { useState } from 'react';

import PomodoroTimer from './components/study/PomodoroTimer';
import CurrentFocus from './components/study/CurrentFocus';
import AmbientSound from './components/audio/AmbientSound';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 transition-colors duration-700 ease-in-out font-sans">

      {/* Navigation Area */}
      <nav className="fixed top-0 w-full h-20 transition-all duration-300 flex items-center justify-between px-8 bg-gradient-to-b from-gray-900 to-transparent z-50 hover:bg-gray-900/80 border-b border-transparent hover:border-gray-800">
        <div className="text-blue-soft font-semibold tracking-widest text-sm uppercase transition-transform hover:scale-105 cursor-default">Focus Space</div>
        <div className="flex gap-6 items-center">
          <AmbientSound />
          <button className="text-gray-300 hover:text-gray-100 hover:scale-105 transition-all text-sm">Settings</button>
        </div>
      </nav>

      {/* Main Focus Area */}
      <main className="flex flex-col items-center justify-center min-h-screen p-6 relative">
        <div className="w-full max-w-2xl flex flex-col items-center gap-16 animate-fade-in">

          <PomodoroTimer />

          <CurrentFocus />
        </div>
      </main>
    </div>
  );
}
