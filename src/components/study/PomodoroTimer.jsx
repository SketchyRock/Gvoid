import React from 'react';
import useTimer, { INTERVALS, MODES } from '../../hooks/useTimer';

export default function PomodoroTimer() {
    const {
        formattedTime,
        isActive,
        mode,
        selectedInterval,
        toggleTimer,
        changeInterval
    } = useTimer('POMODORO');

    // If in a break, use a softer color to indicate rest phase
    const isFocus = mode === MODES.FOCUS;
    const timerTextColor = isFocus ? 'text-blue-soft' : 'text-gray-300';

    // Handlers for switching intervals
    const handleIntervalChange = (key) => () => changeInterval(key);

    return (
        <div className="text-center space-y-6">

            {/* Mode Indicator */}
            <div className="text-gray-300 text-xs tracking-[0.3em] uppercase transition-opacity duration-500 opacity-100">
                {isFocus ? 'Focus Session' : 'Rest Break'}
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

            {/* Timer Interval Controls */}
            <div className="flex justify-center gap-6 text-sm transition-opacity duration-500 block opacity-100">
                {Object.entries(INTERVALS).map(([key, config]) => {
                    const isSelected = selectedInterval === key;
                    return (
                        <button
                            key={key}
                            onClick={handleIntervalChange(key)}
                            className={`transition-colors flex flex-col items-center gap-1 ${isSelected ? 'text-blue-soft font-medium' : 'text-gray-300 hover:text-gray-100'}`}
                        >
                            <span>{config.label}</span>
                            {/* Animated underline indicator for the active interval */}
                            {isSelected && (
                                <div className="w-1/2 h-0.5 bg-blue-soft rounded-full -mt-1 animate-fade-in" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
