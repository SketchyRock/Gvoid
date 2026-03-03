import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    // Default settings
    const defaultSettings = {
        pomodoroLength: 25,
        shortBreakLength: 5,
        longBreakLength: 15,
        longBreakInterval: 4,
        autoStartBreaks: false,
        autoStartPomodoros: false,
        alarmSound: 'digital',
        alarmVolume: 50,
        desktopNotifications: false,
        theme: 'deep-focus',
        timerInTitle: true,
        dailyGoal: 8,
        taskSound: true
    };

    // Load from localStorage or use defaults
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('pomodoro-settings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    });

    // Save to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
    }, [settings]);

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', settings.theme);
    }, [settings.theme]);

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const resetToDefaults = () => {
        setSettings(defaultSettings);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, resetToDefaults }}>
            {children}
        </SettingsContext.Provider>
    );
};
