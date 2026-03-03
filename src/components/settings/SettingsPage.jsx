import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

export default function SettingsPage({ isOpen, onClose }) {
    const { settings, updateSettings, resetToDefaults } = useSettings();

    if (!isOpen) return null;

    const handleToggle = (key) => {
        updateSettings({ [key]: !settings[key] });
    };

    const handleChange = (key, value) => {
        updateSettings({ [key]: value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
            <div className="bg-gray-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-700">
                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold tracking-tight">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Timer Durations */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-soft border-b border-gray-700 pb-2">Timer Intervals (Minutes)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Pomodoro</label>
                                <input
                                    type="number"
                                    value={settings.pomodoroLength}
                                    onChange={(e) => handleChange('pomodoroLength', parseInt(e.target.value) || 0)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-soft outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Short Break</label>
                                <input
                                    type="number"
                                    value={settings.shortBreakLength}
                                    onChange={(e) => handleChange('shortBreakLength', parseInt(e.target.value) || 0)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-soft outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Long Break</label>
                                <input
                                    type="number"
                                    value={settings.longBreakLength}
                                    onChange={(e) => handleChange('longBreakLength', parseInt(e.target.value) || 0)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-soft outline-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Automation */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-soft border-b border-gray-700 pb-2">Automation</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Auto-start Breaks</p>
                                    <p className="text-xs text-gray-400">Automatically start a break when focus ends</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('autoStartBreaks')}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoStartBreaks ? 'bg-blue-soft' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.autoStartBreaks ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Auto-start Pomodoros</p>
                                    <p className="text-xs text-gray-400">Automatically start next focus session after break</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('autoStartPomodoros')}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoStartPomodoros ? 'bg-blue-soft' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.autoStartPomodoros ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Long Break Interval</p>
                                    <p className="text-xs text-gray-400">Number of sessions before a long break</p>
                                </div>
                                <input
                                    type="number"
                                    value={settings.longBreakInterval}
                                    onChange={(e) => handleChange('longBreakInterval', parseInt(e.target.value) || 4)}
                                    className="w-20 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-soft outline-none text-right"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Audio */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-soft border-b border-gray-700 pb-2">Audio & Notifications</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Alarm Sound</label>
                                <select
                                    value={settings.alarmSound}
                                    onChange={(e) => handleChange('alarmSound', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-soft outline-none"
                                >
                                    <option value="digital">Digital (Classic)</option>
                                    <option value="bell">Temple Bell</option>
                                    <option value="chime">Crystal Chime</option>
                                    <option value="wood">Wood Tap</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium">Alarm Volume</label>
                                    <span className="text-xs text-gray-400">{settings.alarmVolume}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={settings.alarmVolume}
                                    onChange={(e) => handleChange('alarmVolume', parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-soft"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Task Completion Sound</p>
                                    <p className="text-xs text-gray-400">Play a sound when a task is finished</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('taskSound')}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.taskSound ? 'bg-blue-soft' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.taskSound ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Visuals */}
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-soft border-b border-gray-700 pb-2">Visuals</h3>
                        <div className="flex flex-col gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Theme</label>
                                <select
                                    value={settings.theme}
                                    onChange={(e) => handleChange('theme', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-soft outline-none"
                                >
                                    <option value="deep-focus">Deep Focus (Purple & Dark Grey)</option>
                                    <option value="clean-minimalist">Clean Minimalist (Blue & Light Grey)</option>
                                    <option value="solar-retro">Solar Retro (Yellow/Orange & Brown)</option>
                                    <option value="evergreen-forest">Evergreen Forest (Green & Slate)</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Timer in Tab Title</p>
                                    <p className="text-xs text-gray-400">See remaining time in the browser tab</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('timerInTitle')}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.timerInTitle ? 'bg-blue-soft' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.timerInTitle ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Daily Goal (Sessions)</p>
                                    <p className="text-xs text-gray-400">Target number of focus sessions per day</p>
                                </div>
                                <input
                                    type="number"
                                    value={settings.dailyGoal}
                                    onChange={(e) => handleChange('dailyGoal', parseInt(e.target.value) || 1)}
                                    className="w-20 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-soft outline-none text-right"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-700 bg-gray-800/50 flex justify-between gap-4">
                    <button
                        onClick={resetToDefaults}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Reset to Defaults
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-blue-soft hover:bg-blue-glow text-white rounded-lg font-medium transition-all transform active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
