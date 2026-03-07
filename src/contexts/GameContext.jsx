import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GameContext = createContext();

const LOCAL_STORAGE_KEY = 'gvoid_game_state';

const DEFAULT_STATE = {
    level: 1,
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
    const calculateXpNeeded = useCallback((level) => {
        return Math.floor(100 * Math.pow(level, 2.5));
    }, []);

    // Core Idle Loop (Every 60 seconds)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setGameState(prev => {
                const xpGain = isTimerActive ? 10 : 1;
                let newXp = prev.xp + xpGain;
                let newLevel = prev.level;
                let newVoidMatter = prev.voidMatter;

                let xpNeeded = calculateXpNeeded(newLevel);

                // Handle multi-leveling up if XP gain is large (unlikely but safe)
                while (newXp >= xpNeeded) {
                    newXp -= xpNeeded;
                    newLevel += 1;
                    newVoidMatter += 1; // Gain 1 Void Matter per level
                    xpNeeded = calculateXpNeeded(newLevel);
                }

                return {
                    ...prev,
                    level: newLevel,
                    xp: newXp,
                    voidMatter: newVoidMatter
                };
            });
        }, 60000); // 60 seconds

        return () => clearInterval(intervalId);
    }, [isTimerActive, calculateXpNeeded]);

    const xpNeededForCurrentLevel = calculateXpNeeded(gameState.level);

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
