import React, { useState } from 'react';
import useTasks, { MAX_TASKS } from '../../hooks/useTasks';

export default function CurrentFocus() {
    const { tasks, addTask, toggleTask, removeTask, clearCompleted, isFull } = useTasks([]);

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (addTask(inputValue)) {
            setInputValue('');
        }
    };

    const hasCompletedTasks = tasks.some(t => t.completed);

    return (
        <div className="w-full max-w-md transition-opacity duration-500 opacity-100">
            <div className="bg-zen-800 p-8 rounded-3xl border border-zen-700 shadow-2xl relative overflow-hidden group">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <h2 className="text-zen-300 text-xs uppercase tracking-[0.2em] font-semibold">
                        Current Focus
                        <span className="ml-2 font-normal opacity-50">({tasks.length}/{MAX_TASKS})</span>
                    </h2>

                    {/* Subtle clear button that appears when tasks are completed */}
                    {hasCompletedTasks && (
                        <button
                            onClick={clearCompleted}
                            className="text-xs text-zen-300 hover:text-amber-soft transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none"
                        >
                            Clear Done
                        </button>
                    )}
                </div>

                {/* Task List */}
                <ul className="space-y-4 relative z-10 mb-6 min-h-[140px]">
                    {tasks.length === 0 ? (
                        <li className="text-zen-300 text-sm italic text-center py-8 opacity-50">
                            What is your primary focus right now?
                        </li>
                    ) : (
                        tasks.map(task => (
                            <li
                                key={task.id}
                                className={`flex items-start gap-4 group/item transition-all duration-300 ${task.completed ? 'opacity-50' : 'opacity-100'}`}
                            >
                                {/* Custom Checkbox */}
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className={`w-5 h-5 mt-1 rounded-full border-2 transition-colors flex-shrink-0 flex items-center justify-center
                    ${task.completed
                                            ? 'border-amber-soft bg-amber-soft text-zen-900'
                                            : 'border-zen-700 hover:border-amber-soft group-hover/item:border-amber-soft'
                                        }`}
                                >
                                    {task.completed && <span className="text-xs text-center leading-none inline-block">✓</span>}
                                </button>

                                {/* Task Text */}
                                <span className={`text-lg flex-grow transition-all duration-300 ${task.completed ? 'text-zen-300 line-through decoration-zen-700' : 'text-zen-100'}`}>
                                    {task.text}
                                </span>

                                {/* Delete Button (visible on hover) */}
                                <button
                                    onClick={() => removeTask(task.id)}
                                    className="opacity-0 group-hover/item:opacity-100 text-zen-700 hover:text-red-400 transition-colors px-2 outline-none mt-1"
                                    title="Remove task"
                                >
                                    ✕
                                </button>
                            </li>
                        ))
                    )}
                </ul>

                {/* Add Task Form */}
                <form onSubmit={handleSubmit} className="relative z-10">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isFull}
                        placeholder={isFull ? "Focus on these 3 items first..." : "Add a focus task..."}
                        className="w-full bg-zen-900 border border-zen-700 rounded-xl px-4 py-3 text-zen-100 placeholder-zen-300 focus:outline-none focus:border-amber-soft focus:ring-1 focus:ring-amber-soft transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </form>

            </div>
        </div>
    );
}
