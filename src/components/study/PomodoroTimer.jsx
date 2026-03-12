import React from 'react';
import useTimer, { MODES } from '../../hooks/useTimer';
import { useSettings } from '../../contexts/SettingsContext';
import useSound from '../../hooks/useSound';
import { useGame } from '../../contexts/GameContext';

export default function PomodoroTimer() {
    const { settings } = useSettings();
    const {
        timeLeft,
        formattedTime,
        isActive,
        mode,
        sessionsCompleted,
        toggleTimer,
        changeMode
    } = useTimer();
    const { playClick } = useSound();
    const { setTimerState } = useGame();

    React.useEffect(() => {
        setTimerState({ isActive, mode });
    }, [isActive, mode, setTimerState]);

    const handleToggle = () => {
        playClick();
        toggleTimer();
    };

    const handleChangeMode = (newMode) => {
        if (mode !== newMode) {
            playClick();
            changeMode(newMode);
        }
    };

    const isFocus = mode === MODES.FOCUS;

    // Calculate progress for the SVG ring
    const totalDuration = isFocus ? settings.pomodoroLength * 60 : settings.shortBreakLength * 60;
    const percentage = Math.max(0, Math.min(1, timeLeft / totalDuration));

    // SVG sizing
    const size = 96;
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2 - 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    // Draining counter-clockwise from the top
    const strokeDashoffset = (1 - percentage) * circumference;

    // Theming according to active/paused/00:00 state
    const isZero = timeLeft === 0;
    const strokeOpacity = isZero ? 1 : (!isActive && percentage < 1 ? 0.4 : 1);
    const ringColorClass = isZero ? 'text-gray-600' : (isFocus ? 'text-blue-soft' : 'text-emerald-400');
    const timerTextColor = isZero ? 'text-gray-500' : (isFocus ? 'text-blue-soft' : 'text-emerald-400');

    return (
        <div className="w-full h-full transition-opacity duration-500 opacity-100 flex flex-col">
            <div className="bg-gray-800 p-3 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden group h-full flex flex-col">
                {/* Header - Single Row */}
                <div className="flex justify-between items-center relative z-10 w-full mb-1">
                    <h2 className="text-gray-300 text-[8px] uppercase tracking-[0.2em] font-semibold transition-opacity duration-500 truncate mr-2">
                        {isFocus ? 'Focus Session' : 'Rest Break'}
                    </h2>
                    <div className="text-[8px] text-gray-500 uppercase tracking-widest whitespace-nowrap leading-none">
                        Session {sessionsCompleted + 1} of {settings.dailyGoal}
                    </div>
                </div>

                {/* Main Timer Display with Circular Progress Ring */}
                <div className="relative flex justify-center items-center flex-1 my-0.5">
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 drop-shadow-lg">
                        {/* Background track */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            className="text-gray-900/40"
                            strokeWidth={strokeWidth}
                            stroke="currentColor"
                            fill="transparent"
                        />
                        {/* Active progress */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            className={`${ringColorClass} transition-all duration-1000 ease-linear`}
                            strokeWidth={strokeWidth}
                            stroke="currentColor"
                            fill="transparent"
                            strokeDasharray={`${circumference} ${circumference}`}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            style={{ opacity: strokeOpacity }}
                        />
                    </svg>

                    {/* Centered Digital Display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                        <h1 className={`text-xl font-light tracking-widest ${timerTextColor} select-none tabular-nums transition-colors duration-500 mt-0.5 ml-0.5`}>
                            {formattedTime}
                        </h1>
                    </div>
                </div>

                {/* Bottom Controls - Single Row */}
                <div className="flex justify-between items-center w-full relative z-10 mt-auto pt-1">
                    <button
                        onClick={() => handleChangeMode(MODES.FOCUS)}
                        className={`text-[8px] uppercase tracking-wider transition-colors flex flex-col items-center gap-0.5 ${isFocus ? 'text-blue-soft font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <span>Focus</span>
                        {isFocus && <div className="w-full h-0.5 bg-blue-soft rounded-full animate-fade-in" />}
                    </button>

                    <div className="flex gap-1.5">
                        <button
                            onClick={handleToggle}
                            disabled={isActive}
                            className={`px-3 py-1 rounded-full font-medium text-[10px] transition-all duration-300 ${
                                isActive
                                ? 'bg-gray-800/80 text-gray-600 saturate-50 cursor-not-allowed'
                                : 'bg-blue-soft/10 text-blue-soft hover:bg-blue-soft/20 shadow-[0_0_10px_rgba(168,85,247,0.15)] active:scale-95'
                            }`}
                        >
                            Start
                        </button>
                        <button
                            onClick={handleToggle}
                            disabled={!isActive}
                            className={`px-3 py-1 rounded-full font-medium text-[10px] transition-all duration-300 ${
                                !isActive
                                ? 'bg-gray-800/80 text-gray-600 saturate-50 cursor-not-allowed'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600 active:scale-95'
                            }`}
                        >
                            Pause
                        </button>
                    </div>

                    <button
                        onClick={() => handleChangeMode(MODES.BREAK)}
                        className={`text-[8px] uppercase tracking-wider transition-colors flex flex-col items-center gap-0.5 ${!isFocus ? 'text-emerald-400 font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <span>Break</span>
                        {!isFocus && <div className="w-full h-0.5 bg-emerald-400 rounded-full animate-fade-in" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
