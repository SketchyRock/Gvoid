import { useState, useEffect, useCallback, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useStats } from '../contexts/StatsContext';
import useSound from './useSound';

export const MODES = {
    FOCUS: 'FOCUS',
    BREAK: 'BREAK'
};

export default function useTimer(initialMode = 'FOCUS') {
    const { settings } = useSettings();
    const { recordSession } = useStats();
    const { playAlarm } = useSound();
    const [mode, setMode] = useState(initialMode);
    const [isActive, setIsActive] = useState(false);

    // Derived configuration based on settings
    const [timeLeft, setTimeLeft] = useState(settings.pomodoroLength * 60);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);

    // Void Stability tracking
    const offTabTimeStr = useRef(0); // in ms
    const lastBlurTime = useRef(null);

    // Get current mode duration
    const getDuration = useCallback((currentMode) => {
        if (currentMode === MODES.FOCUS) return settings.pomodoroLength * 60;
        return settings.shortBreakLength * 60;
    }, [settings]);

    // Update time left when settings change (if not active)
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(getDuration(mode));
        }
    }, [settings.pomodoroLength, settings.shortBreakLength, mode, getDuration, isActive]);

    // Update tab title
    useEffect(() => {
        if (settings.timerInTitle) {
            const timeStr = formatTime(timeLeft);
            document.title = `${timeStr} - ${mode === MODES.FOCUS ? 'Focus' : 'Break'}`;
        } else {
            document.title = 'Gvoid';
        }
        return () => { document.title = 'Gvoid'; };
    }, [timeLeft, mode, settings.timerInTitle]);

    // Void Stability visibility listener
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (mode !== MODES.FOCUS || !isActive) return;

            if (document.hidden) {
                lastBlurTime.current = Date.now();
            } else {
                if (lastBlurTime.current) {
                    offTabTimeStr.current += (Date.now() - lastBlurTime.current);
                    lastBlurTime.current = null;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [mode, isActive]);

    // Cleanup blur time when paused
    useEffect(() => {
        if (!isActive && lastBlurTime.current) {
            offTabTimeStr.current += (Date.now() - lastBlurTime.current);
            lastBlurTime.current = null;
        }
    }, [isActive]);


    // The main timer loop
    useEffect(() => {
        let intervalId = null;

        if (isActive && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            // Timer finished!
            playAlarm();
            const newMode = mode === MODES.FOCUS ? MODES.BREAK : MODES.FOCUS;

            if (mode === MODES.FOCUS) {
                setSessionsCompleted(prev => prev + 1);

                // Calculate efficiency
                if (lastBlurTime.current) {
                    offTabTimeStr.current += (Date.now() - lastBlurTime.current);
                    lastBlurTime.current = null;
                }

                const totalDurationMs = getDuration(MODES.FOCUS) * 1000;
                let efficiency = 100 - ((offTabTimeStr.current / totalDurationMs) * 100);
                efficiency = Math.max(0, Math.min(100, efficiency)); // Bound between 0 and 100

                // Record session
                recordSession(getDuration(MODES.FOCUS) / 60, efficiency);

                // Reset stats for next focus
                offTabTimeStr.current = 0;
            }

            setMode(newMode);
            setTimeLeft(getDuration(newMode));

            // Auto-start logic
            const shouldAutoStart = (newMode === MODES.BREAK && settings.autoStartBreaks) ||
                (newMode === MODES.FOCUS && settings.autoStartPomodoros);
            setIsActive(shouldAutoStart);
        }

        return () => clearInterval(intervalId);
    }, [isActive, timeLeft, mode, getDuration, settings, playAlarm, recordSession]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(getDuration(mode));
    };

    const changeMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(getDuration(newMode));
        if (newMode === MODES.FOCUS) {
            offTabTimeStr.current = 0;
            lastBlurTime.current = null;
        }
    };

    // Format MM:SS
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft,
        formattedTime: formatTime(timeLeft),
        isActive,
        mode,
        sessionsCompleted,
        toggleTimer,
        resetTimer,
        changeMode,
        formatTime
    };
}
