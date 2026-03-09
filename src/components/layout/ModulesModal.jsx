import React from 'react';
import useSound from '../../hooks/useSound';

export default function ModulesModal({ isOpen, onClose, activeModules, onToggleModule }) {
    const { playClick } = useSound();

    if (!isOpen) return null;

    const handleToggle = (key) => {
        playClick();
        onToggleModule(key);
    };

    const handleClose = () => {
        playClick();
        onClose();
    };

    const modules = [
        { id: 'timer', name: 'Pomodoro Timer', description: 'Core focus timer with customizable intervals.' },
        { id: 'tasks', name: 'Current Focus', description: 'Task management and goal tracking.' },
        { id: 'audio', name: 'Ambient Sound', description: 'Background audio for deep focus.' },
        { id: 'void', name: 'The Void', description: 'A visual representation of your focus essence.' }
    ];

    const activeCount = Object.values(activeModules).filter(Boolean).length;
    const isFull = activeCount >= 6;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
            <div className="bg-gray-800 w-full max-w-sm max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-700">
                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900/50">
                    <h2 className="text-xl font-semibold tracking-tight">Dashboard Modules</h2>
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
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <p className="text-sm text-gray-400 mb-4">Select which sticky notes you'd like to display on your dashboard.</p>

                    <div className="flex flex-col gap-4">
                        {modules.map(module => (
                            <div key={module.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:border-gray-600 transition-colors group">
                                <div className="pr-4">
                                    <p className="text-sm font-semibold text-gray-200 group-hover:text-blue-soft transition-colors">{module.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{module.description}</p>
                                </div>
                                <button
                                    onClick={() => handleToggle(module.id)}
                                    disabled={!activeModules[module.id] && isFull}
                                    className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${activeModules[module.id] ? 'bg-blue-soft shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-gray-700'} ${(!activeModules[module.id] && isFull) ? 'opacity-30 cursor-not-allowed' : ''}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${activeModules[module.id] ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-700 bg-gray-900/50 flex justify-end">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2 bg-blue-soft hover:bg-blue-glow text-white rounded-lg font-medium transition-all transform active:scale-95"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
