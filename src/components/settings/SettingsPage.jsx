import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import useSound from '../../hooks/useSound';

export default function SettingsPage({ isOpen, onClose, onResetLayouts }) {
    const { settings, updateSettings, resetToDefaults } = useSettings();
    const { playClick } = useSound();

    if (!isOpen) return null;

    const handleToggle = (key) => {
        playClick();
        updateSettings({ [key]: !settings[key] });
    };

    const handleChange = (key, value) => {
        playClick();
        updateSettings({ [key]: value });
    };

    const handleReset = () => {
        playClick();
        if (window.confirm('Reset all settings and widget positions to default?')) {
            resetToDefaults();
            if (onResetLayouts) onResetLayouts();
        }
    };

    const handleClose = () => {
        playClick();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
            <div className="bg-gray-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-700">
                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold tracking-tight">Settings</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <section className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-soft border-b border-gray-700 pb-2">Pomodoro Frequency (Work / Break)</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { focus: 25, break: 5, label: '25 / 5' },
                                { focus: 50, break: 10, label: '50 / 10' },
                                { focus: 90, break: 20, label: '90 / 20' }
                            ].map((option) => {
                                const isSelected = settings.pomodoroLength === option.focus && settings.shortBreakLength === option.break;
                                return (
                                    <button
                                        key={option.label}
                                        onClick={() => updateSettings({
                                            pomodoroLength: option.focus,
                                            shortBreakLength: option.break
                                        })}
                                        className={`py-3 px-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${isSelected
                                            ? 'bg-blue-soft/10 border-blue-soft text-blue-soft shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                                            : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        <span className={`text-lg font-bold ${isSelected ? 'text-white' : ''}`}>{option.label}</span>
                                        <span className="text-[10px] uppercase tracking-wider opacity-60">Minutes</span>
                                    </button>
                                );
                            })}
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
                                <div className="flex items-center gap-1 bg-gray-900 border border-gray-700 rounded-lg p-1">
                                    <button
                                        onClick={() => handleChange('dailyGoal', Math.max(1, (settings.dailyGoal || 1) - 1))}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-md transition-colors text-gray-400 hover:text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <div className="w-10 text-center font-bold text-sm select-none">
                                        {settings.dailyGoal}
                                    </div>
                                    <button
                                        onClick={() => handleChange('dailyGoal', (settings.dailyGoal || 1) + 1)}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-md transition-colors text-gray-400 hover:text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-700 bg-gray-800/50 flex justify-between gap-4">
                    <button
                        onClick={handleReset}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Reset to Defaults
                    </button>
                    <button
                        onClick={handleClose}
                        className="px-6 py-2 bg-blue-soft hover:bg-blue-glow text-white rounded-lg font-medium transition-all transform active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
