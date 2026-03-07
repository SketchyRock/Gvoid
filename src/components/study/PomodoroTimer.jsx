import React from 'react';
import useTimer, { MODES } from '../../hooks/useTimer';
import { useSettings } from '../../contexts/SettingsContext';
import useSound from '../../hooks/useSound';
import { useGame } from '../../contexts/GameContext';

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
    const { playClick } = useSound();
    const { setTimerActive } = useGame();

    React.useEffect(() => {
        setTimerActive(isActive);
    }, [isActive, setTimerActive]);

    const handleToggle = () => {
        playClick();
        toggleTimer();
    };

    const handleChangeMode = (newMode) => {
        playClick();
        changeMode(newMode);
    };

    // If in a break, use a softer color to indicate rest phase
    const isFocus = mode === MODES.FOCUS;
    const timerTextColor = isFocus ? 'text-blue-soft' : 'text-gray-300';

    return (
        <div className="w-full h-full transition-opacity duration-500 opacity-100">
            <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden group h-full flex flex-col justify-between">
                {/* Header */}
                <div className="flex justify-between items-center relative z-10 flex-col gap-1">
                    <h2 className="text-gray-300 text-[10px] uppercase tracking-[0.3em] font-semibold transition-opacity duration-500">
                        {isFocus ? 'Focus Session' : 'Rest Break'}
                    </h2>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest">
                        Session {sessionsCompleted + 1} of {settings.dailyGoal}
                    </div>
                </div>

                <div className="text-center w-full relative z-10 flex-1 flex flex-col justify-center">
                    {/* Main Timer Display */}
                    <button
                        onClick={handleToggle}
                        className={`w-full group/timer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-soft rounded-2xl transition-transform active:scale-95 py-2`}
                        title={isActive ? "Pause Timer" : "Start Timer"}
                    >
                        <h1 className={`text-6xl font-light tracking-tighter ${timerTextColor} select-none tabular-nums transition-colors duration-500`}>
                            {formattedTime}
                        </h1>
                        {/* Play/Pause Indicator (always visible) */}
                        <div className={`mt-1 text-xs transition-all duration-300 group-hover/timer:scale-105 ${isActive ? 'opacity-100 text-gray-400 group-hover/timer:text-gray-200' : 'opacity-100 text-blue-soft group-hover/timer:text-blue-glow'}`}>
                            {isActive ? 'Click to Pause' : 'Click to Start'}
                        </div>
                    </button>
                </div>

                {/* Quick Toggle Controls */}
                <div className="flex justify-center gap-6 text-xs transition-opacity duration-500 opacity-100 relative z-10">
                    <button
                        onClick={() => handleChangeMode(MODES.FOCUS)}
                        className={`transition-colors flex flex-col items-center gap-1 ${isFocus ? 'text-blue-soft font-medium' : 'text-gray-300 hover:text-gray-100'}`}
                    >
                        <span>Focus</span>
                        {isFocus && <div className="w-1/2 h-0.5 bg-blue-soft rounded-full -mt-1 animate-fade-in" />}
                    </button>
                    <button
                        onClick={() => handleChangeMode(MODES.BREAK)}
                        className={`transition-colors flex flex-col items-center gap-1 ${!isFocus ? 'text-blue-soft font-medium' : 'text-gray-300 hover:text-gray-100'}`}
                    >
                        <span>Break</span>
                        {!isFocus && <div className="w-1/2 h-0.5 bg-blue-soft rounded-full -mt-1 animate-fade-in" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
