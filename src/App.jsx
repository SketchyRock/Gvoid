import React, { useState } from 'react';

import PomodoroTimer from './components/study/PomodoroTimer';
import CurrentFocus from './components/study/CurrentFocus';
import AmbientSound from './components/audio/AmbientSound';

export default function App() {
  return (
    <div className="min-h-screen bg-zen-900 text-zen-100 transition-colors duration-700 ease-in-out font-sans">

      {/* Hidden Navigation Area (Reveals on mouse hover near the top) */}
      <nav className="fixed top-0 w-full h-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-between px-8 bg-gradient-to-b from-zen-900 to-transparent z-50">
        <div className="text-amber-soft font-semibold tracking-widest text-sm uppercase">Focus Space</div>
        <div className="flex gap-6 items-center">
          <AmbientSound />
          <button className="text-zen-300 hover:text-zen-100 transition-colors text-sm">Settings</button>
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
