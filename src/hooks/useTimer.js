/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useStats } from '../contexts/StatsContext';
import { useGame } from '../contexts/GameContext';
import { useSkillTree } from '../contexts/SkillTreeContext';
import useSound from './useSound';

export const MODES = {
    FOCUS: 'FOCUS',
    BREAK: 'BREAK'
};

export default function useTimer(initialMode = 'FOCUS') {
    const { settings } = useSettings();
    const { recordSession } = useStats();
    const { playAlarm } = useSound();
    const { addXp, grantBonusVoidMatter, setDoubleNextReward, gameModifiers } = useGame();
    const { hasSkill } = useSkillTree();

    const [mode, setMode] = useState(initialMode);
    const [isActive, setIsActive] = useState(false);

    // Derived configuration based on settings
    const [timeLeft, setTimeLeft] = useState(settings.pomodoroLength * 60);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);

    // Void Stability tracking
    const offTabTimeStr = useRef(0); // in ms
    const lastBlurTime = useRef(null);

    // Skill Tree state
    const firstPauseUsed = useRef(false);
    const consecutivePerfectCount = useRef(0);

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

    // Format MM:SS
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

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

                // Deep Breath logic
                let penaltyTimeMs = offTabTimeStr.current;
                if (hasSkill('deep_breath') && firstPauseUsed.current) {
                    penaltyTimeMs = Math.max(0, penaltyTimeMs - 300000); // 5 mins forgiven
                }

                const totalDurationMs = getDuration(MODES.FOCUS) * 1000;
                let efficiency = 100 - ((penaltyTimeMs / totalDurationMs) * 100);
                efficiency = Math.max(0, Math.min(100, efficiency)); // Bound between 0 and 100

                const durationMins = getDuration(MODES.FOCUS) / 60;

                // Record session
                recordSession(durationMins, efficiency);

                // --- Skill Tree Bonuses ---
                if (durationMins >= 25) {
                    let xpGain = hasSkill('iron_will') ? 5 : 0;
                    if (gameModifiers?.flatXpBonus) {
                        xpGain += gameModifiers.flatXpBonus;
                    }
                    if (xpGain > 0) addXp(xpGain);

                    if (efficiency === 100) {
                        consecutivePerfectCount.current += 1;
                        const threshold = hasSkill('event_horizon') ? 2 : (hasSkill('chain_reaction') ? 3 : Infinity);
                        if (consecutivePerfectCount.current >= threshold) {
                            setDoubleNextReward(true);
                            consecutivePerfectCount.current = 0;
                        }
                    } else {
                        consecutivePerfectCount.current = 0;
                    }
                } else {
                    consecutivePerfectCount.current = 0;
                }

                if (hasSkill('focus_lens') && efficiency === 100) {
                    grantBonusVoidMatter(1);
                }

                if (hasSkill('deep_void') && durationMins >= 45) {
                    grantBonusVoidMatter(2);
                }

                if (hasSkill('stargazer')) {
                    const hour = new Date().getHours();
                    if (hour >= 22 || hour < 5) {
                        grantBonusVoidMatter(1);
                    }
                }

                if (gameModifiers?.voidMatterChance) {
                    // E.g. voidMatterChance: 0.15 means 15% chance
                    if (Math.random() < gameModifiers.voidMatterChance) {
                        grantBonusVoidMatter(1);
                    }
                }

                // Reset stats for next focus
                offTabTimeStr.current = 0;
                firstPauseUsed.current = false;
            }

            setMode(newMode);
            setTimeLeft(getDuration(newMode));

            // Auto-start logic
            const shouldAutoStart = (newMode === MODES.BREAK && settings.autoStartBreaks) ||
                (newMode === MODES.FOCUS && settings.autoStartPomodoros);
            setIsActive(shouldAutoStart);
        }

        return () => clearInterval(intervalId);
    }, [isActive, timeLeft, mode, getDuration, settings, playAlarm, recordSession, addXp, grantBonusVoidMatter, hasSkill, setDoubleNextReward, gameModifiers]);

    // Terminal Commands Listener
    useEffect(() => {
        const handleTerminalPlay = () => setIsActive(true);
        const handleTerminalPause = () => setIsActive(false);
        const handleTerminalSkip = () => setTimeLeft(0);
        const handleTerminalYield = (e) => {
            if (e.detail && e.detail.minutes !== undefined) {
                setTimeLeft(e.detail.minutes * 60);
            }
        };

        window.addEventListener('terminal-play', handleTerminalPlay);
        window.addEventListener('terminal-pause', handleTerminalPause);
        window.addEventListener('terminal-skip', handleTerminalSkip);
        window.addEventListener('terminal-yield', handleTerminalYield);

        return () => {
            window.removeEventListener('terminal-play', handleTerminalPlay);
            window.removeEventListener('terminal-pause', handleTerminalPause);
            window.removeEventListener('terminal-skip', handleTerminalSkip);
            window.removeEventListener('terminal-yield', handleTerminalYield);
        };
    }, []);

    const toggleTimer = () => {
        if (isActive && mode === MODES.FOCUS && hasSkill('deep_breath') && !firstPauseUsed.current) {
            firstPauseUsed.current = true;
        }
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(getDuration(mode));
        if (mode === MODES.FOCUS) {
            firstPauseUsed.current = false;
        }
    };

    const changeMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(getDuration(newMode));
        if (newMode === MODES.FOCUS) {
            offTabTimeStr.current = 0;
            lastBlurTime.current = null;
            firstPauseUsed.current = false;
        }
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
