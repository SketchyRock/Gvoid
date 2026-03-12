/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GameContext = createContext();

const LOCAL_STORAGE_KEY = 'gvoid_game_state';

const DEFAULT_STATE = {
    level: 1,
    prestigeLevel: 0,
    xp: 0,
    voidMatter: 0
};

export const GameProvider = ({ children }) => {
    // Timer active state fed from the app (managed externally so GameContext doesn't depend on Pomodoro directly)
    const [timerState, setTimerState] = useState({ isActive: false, mode: 'FOCUS' });
    const [doubleNextReward, setDoubleNextReward] = useState(false);

    // Modifiers fed from SkillTreeContext
    const [gameModifiers, setGameModifiers] = useState({ singularity: false, momentum: false, voidAscendant: false });

    const [gameState, setGameState] = useState(() => {
        try {
            const savedStr = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedStr) {
                const parsed = JSON.parse(savedStr);
                // Ensure it didn't accidentally save as { level: undefined } or a nested object { level: { level: 1 } }
                if (typeof parsed.level === 'number' && typeof parsed.xp === 'number') {
                    return {
                        level: parsed.level,
                        prestigeLevel: parsed.prestigeLevel || 0,
                        xp: parsed.xp,
                        voidMatter: parsed.voidMatter || 0
                    };
                }
            }
            return DEFAULT_STATE;
        } catch (error) {
            console.error('Failed to load game state from localStorage:', error);
            return DEFAULT_STATE;
        }
    });

    // Save to localStorage when state changes
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
        } catch (error) {
            console.error('Failed to save game state to localStorage:', error);
        }
    }, [gameState]);

    // Function to calculate XP needed for the NEXT level
    const calculateXpNeeded = useCallback((level, prestigeLevel) => {
        if (level < 50) {
            // ESO-inspired Leveling (1-50)
            if (level < 15) return Math.floor(100 + (level - 1) * 50); // 1-15: Easy
            if (level < 30) return Math.floor(1000 + (level - 15) * 500); // 16-30: Somewhat Difficult
            return Math.floor(10000 + (level - 30) * 2500); // 31-50: A Grind
        } else {
            // Prestige Level (Infinite)
            // 1-250: Easy, 251-500: A little harder, explodes after 500
            const p = (prestigeLevel || 0) + 1;
            const base = 250;
            const linearPart = p * 15;
            // Kick in the exponential difficulty after level 500
            const exponentialPart = p > 500 ? Math.pow((p - 500) / 10, 6) : 0;
            return Math.floor(base + linearPart + exponentialPart);
        }
    }, []);

    const processXpGain = useCallback((prev, baseXpGain, modifiers) => {
        let finalXpGain = baseXpGain;
        if (modifiers?.xpMultiplier) {
             finalXpGain += (baseXpGain * modifiers.xpMultiplier);
        }

        // Apply any specific modifiers
        if (doubleNextReward) {
            finalXpGain *= 2;
        }

        let newXp = prev.xp + finalXpGain;
        let newLevel = prev.level;
        let newPrestigeLevel = prev.prestigeLevel || 0;
        let newVoidMatter = prev.voidMatter;

        let xpNeeded = calculateXpNeeded(newLevel, newPrestigeLevel);

        while (newXp >= xpNeeded) {
            newXp -= xpNeeded;

            if (newLevel < 50) {
                newLevel += 1;
                newVoidMatter += 1;
                if (modifiers.voidAscendant) newVoidMatter += 2;
            } else {
                newPrestigeLevel += 1;
                newLevel = 50;
                newVoidMatter += 2;
                if (modifiers.voidAscendant) newVoidMatter += 2;
            }

            xpNeeded = calculateXpNeeded(newLevel, newPrestigeLevel);

            if (newLevel > 10000 || newPrestigeLevel > 100000) break;
        }

        return {
            ...prev,
            level: newLevel,
            prestigeLevel: newPrestigeLevel,
            xp: newXp,
            voidMatter: newVoidMatter
        };
    }, [calculateXpNeeded, doubleNextReward]);

    const addXp = useCallback((amount) => {
        setGameState(prev => processXpGain(prev, amount, gameModifiers));
    }, [processXpGain, gameModifiers]);

    // Core Idle Loop (Every 60 seconds)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setGameState(prev => {
                // Rate: 10 XP/min when studying, 2.5 XP/min when passive (0.25x)
                let baseGain = 2.5; // passive

                if (timerState.isActive) {
                    if (timerState.mode === 'FOCUS') {
                        baseGain = 10;
                    } else if (timerState.mode === 'BREAK') {
                        // Normally 0, but with momentum it's half of passive (1.25)
                        baseGain = gameModifiers.momentum ? 1.25 : 0;
                    }
                }

                // Singularity: +10% to completely idle passive gains OR all gains?
                // The plan says "All passive background XP gains are permanently increased by 10%".
                // Let's assume it only applies to the 2.5 idle and 1.25 momentum, not the 10 focus.
                let xpGain = baseGain;
                if (!timerState.isActive && gameModifiers.singularity) {
                    xpGain = baseGain * 1.1;
                }

                return processXpGain(prev, xpGain, gameModifiers);
            });
        }, 60000); // 60 seconds

        return () => clearInterval(intervalId);
    }, [timerState, gameModifiers, processXpGain]);

    const xpNeededForCurrentLevel = calculateXpNeeded(gameState.level, gameState.prestigeLevel);

    const subtractVoidMatter = useCallback((amount) => {
        setGameState(prev => ({
            ...prev,
            voidMatter: Math.max(0, prev.voidMatter - amount)
        }));
    }, []);

    const grantBonusVoidMatter = useCallback((amount) => {
        setGameState(prev => {
            const finalAmount = doubleNextReward ? amount * 2 : amount;
            // The flag is consumed by the timer hook, but we apply it here
            return {
                ...prev,
                voidMatter: prev.voidMatter + finalAmount
            };
        });
    }, [doubleNextReward]);

    const consumeDoubleNextRewardFlag = useCallback(() => {
        const wasDouble = doubleNextReward;
        setDoubleNextReward(false);
        return wasDouble;
    }, [doubleNextReward]);

    const resetGame = () => {
        setGameState(DEFAULT_STATE);
    };

    return (
        <GameContext.Provider value={{
            ...gameState,
            xpNeeded: xpNeededForCurrentLevel,
            timerState,
            setTimerState,
            doubleNextReward,
            setDoubleNextReward,
            subtractVoidMatter,
            grantBonusVoidMatter,
            consumeDoubleNextRewardFlag,
            addXp,
            setGameModifiers,
            gameModifiers,
            resetGame
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
