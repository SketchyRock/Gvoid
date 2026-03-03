import React from 'react';
import useTimer, { MODES } from '../../hooks/useTimer';
import { useSettings } from '../../contexts/SettingsContext';

export default function PomodoroTimer() {
    const { settings } = useSettings();
    const {
        formattedTime,
        isActive,
        mode,
        sessionsCompleted,
        toggleTimer,
        changeMode
    } = useTimer();

    // If in a break, use a softer color to indicate rest phase
    const isFocus = mode === MODES.FOCUS;
    const timerTextColor = isFocus ? 'text-blue-soft' : 'text-gray-300';

    return (
        <div className="text-center space-y-6">

            {/* Mode Indicator */}
            <div className="flex flex-col items-center gap-2">
                <div className="text-gray-300 text-xs tracking-[0.3em] uppercase transition-opacity duration-500 opacity-100">
                    {isFocus ? 'Focus Session' : 'Rest Break'}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Session {sessionsCompleted + 1} of {settings.dailyGoal}
                </div>
            </div>

            {/* Main Timer Display */}
            <button
                onClick={toggleTimer}
                className={`w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-soft rounded-2xl transition-transform active:scale-95`}
                title={isActive ? "Pause Timer" : "Start Timer"}
            >
                <h1 className={`text-9xl font-light tracking-tighter ${timerTextColor} select-none tabular-nums transition-colors duration-500`}>
                    {formattedTime}
                </h1>
                {/* Play/Pause Indicator (always visible) */}
                <div className={`mt-2 text-sm transition-all duration-300 group-hover:scale-105 ${isActive ? 'opacity-100 text-gray-400 group-hover:text-gray-200' : 'opacity-100 text-blue-soft group-hover:text-blue-glow'}`}>
                    {isActive ? 'Click to Pause' : 'Click to Start'}
                </div>
            </button>

            {/* Quick Toggle Controls */}
            <div className="flex justify-center gap-6 text-sm transition-opacity duration-500 block opacity-100">
                <button
                    onClick={() => changeMode(MODES.FOCUS)}
                    className={`transition-colors flex flex-col items-center gap-1 ${isFocus ? 'text-blue-soft font-medium' : 'text-gray-300 hover:text-gray-100'}`}
                >
                    <span>Focus</span>
                    {isFocus && <div className="w-1/2 h-0.5 bg-blue-soft rounded-full -mt-1 animate-fade-in" />}
                </button>
                <button
                    onClick={() => changeMode(MODES.BREAK)}
                    className={`transition-colors flex flex-col items-center gap-1 ${!isFocus ? 'text-blue-soft font-medium' : 'text-gray-300 hover:text-gray-100'}`}
                >
                    <span>Break</span>
                    {!isFocus && <div className="w-1/2 h-0.5 bg-blue-soft rounded-full -mt-1 animate-fade-in" />}
                </button>
            </div>
        </div>
    );
}
