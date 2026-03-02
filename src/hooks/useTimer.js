import { useState, useEffect, useCallback } from 'react';

// Common intervals in minutes
export const INTERVALS = {
    POMODORO: { focus: 25, break: 5, label: '25/5' },
    DEEP_WORK: { focus: 50, break: 10, label: '50/10' },
    FLOW: { focus: 90, break: 20, label: '90/20' }
};

export const MODES = {
    FOCUS: 'FOCUS',
    BREAK: 'BREAK'
};

export default function useTimer(initialInterval = 'POMODORO') {
    const [selectedInterval, setSelectedInterval] = useState(initialInterval);
    const [mode, setMode] = useState(MODES.FOCUS);
    const [timeLeft, setTimeLeft] = useState(INTERVALS[initialInterval].focus * 60);
    const [isActive, setIsActive] = useState(false);

    // Helper to get current phase duration in seconds
    const getDuration = useCallback((interval, currentMode) => {
        const mins = currentMode === MODES.FOCUS
            ? INTERVALS[interval].focus
            : INTERVALS[interval].break;
        return mins * 60;
    }, []);

    // Update time left when interval or mode changes
    useEffect(() => {
        setTimeLeft(getDuration(selectedInterval, mode));
        setIsActive(false); // Auto-pause when switching modes or intervals
    }, [selectedInterval, mode, getDuration]);

    // The main timer loop
    useEffect(() => {
        let intervalId = null;

        if (isActive && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished! Automatically switch modes
            if (mode === MODES.FOCUS) {
                setMode(MODES.BREAK);
            } else {
                setMode(MODES.FOCUS);
            }
            setIsActive(false);
        }

        return () => clearInterval(intervalId);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(getDuration(selectedInterval, mode));
    };

    const changeInterval = (newInterval) => {
        setSelectedInterval(newInterval);
        setMode(MODES.FOCUS); // Always reset to focus when changing scheme
    };

    // Format MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft,
        formattedTime: formatTime(timeLeft),
        isActive,
        mode,
        selectedInterval,
        toggleTimer,
        resetTimer,
        changeInterval,
        formatTime
    };
}
