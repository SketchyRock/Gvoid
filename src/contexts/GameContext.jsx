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
    const [isTimerActive, setIsTimerActive] = useState(false);

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

    // Core Idle Loop (Every 60 seconds)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setGameState(prev => {
                // Rate: 10 XP/min when studying, 2.5 XP/min when passive (0.25x)
                const xpGain = isTimerActive ? 10 : 2.5;
                let newXp = prev.xp + xpGain;
                let newLevel = prev.level;
                let newPrestigeLevel = prev.prestigeLevel || 0;
                let newVoidMatter = prev.voidMatter;

                let xpNeeded = calculateXpNeeded(newLevel, newPrestigeLevel);

                // Handle multi-leveling up
                while (newXp >= xpNeeded) {
                    newXp -= xpNeeded;

                    if (newLevel < 50) {
                        newLevel += 1;
                        newVoidMatter += 1;
                    } else {
                        // Beyond level 50, prestige levels start
                        newPrestigeLevel += 1;
                        newLevel = 50; // Cap base level at 50
                        newVoidMatter += 2; // Prestige bonus
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
            });
        }, 60000); // 60 seconds

        return () => clearInterval(intervalId);
    }, [isTimerActive, calculateXpNeeded]);

    const xpNeededForCurrentLevel = calculateXpNeeded(gameState.level, gameState.prestigeLevel);

    const resetGame = () => {
        setGameState(DEFAULT_STATE);
    };

    return (
        <GameContext.Provider value={{
            ...gameState,
            xpNeeded: xpNeededForCurrentLevel,
            isTimerActive,
            setTimerActive: setIsTimerActive,
            resetGame
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
