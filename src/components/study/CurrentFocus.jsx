import React, { useState } from 'react';
import useTasks, { MAX_TASKS } from '../../hooks/useTasks';
import useSound from '../../hooks/useSound';

export default function CurrentFocus() {
    const { tasks, addTask, toggleTask, removeTask, clearCompleted, isFull } = useTasks([]);
    const { playClick } = useSound();

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (addTask(inputValue)) {
            playClick();
            setInputValue('');
        }
    };

    const handleClear = () => {
        playClick();
        clearCompleted();
    };

    const handleRemove = (id) => {
        playClick();
        removeTask(id);
    };

    const hasCompletedTasks = tasks.some(t => t.completed);

    return (
        <div className="w-full h-full transition-opacity duration-500 opacity-100 flex flex-col">
            <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden group h-full flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center mb-3 relative z-10 shrink-0">
                    <h2 className="text-gray-300 text-[10px] uppercase tracking-[0.2em] font-semibold">
                        Current Focus
                        <span className="ml-2 font-normal opacity-50">({tasks.length}/{MAX_TASKS})</span>
                    </h2>

                    {/* Clear button */}
                    {hasCompletedTasks && (
                        <button
                            onClick={handleClear}
                            className="text-[10px] text-gray-400 hover:text-blue-soft transition-all hover:scale-105 focus:outline-none focus:ring-1 focus:ring-blue-soft rounded px-1"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Task List */}
                <ul className="space-y-2 relative z-10 mb-3 flex-1 overflow-y-auto min-h-0 pr-1">
                    {tasks.length === 0 ? (
                        <li className="text-gray-300 text-xs italic text-center py-4 opacity-50 pt-8">
                            What is your primary focus?
                        </li>
                    ) : (
                        tasks.map(task => (
                            <li
                                key={task.id}
                                className={`flex items-start gap-3 group/item transition-all duration-300 ${task.completed ? 'opacity-50' : 'opacity-100'}`}
                            >
                                {/* Custom Checkbox */}
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className={`w-4 h-4 mt-0.5 rounded border transition-colors flex-shrink-0 flex items-center justify-center
                                        ${task.completed
                                            ? 'border-blue-soft bg-blue-soft text-gray-900'
                                            : 'border-gray-600 hover:border-blue-soft group-hover/item:border-blue-soft'
                                        }`}
                                >
                                    {task.completed && <span className="text-[10px] text-center leading-none inline-block">✓</span>}
                                </button>

                                {/* Task Text */}
                                <span className={`text-sm leading-tight flex-grow transition-all duration-300 ${task.completed ? 'text-gray-300 line-through decoration-gray-700' : 'text-gray-100'}`}>
                                    {task.text}
                                </span>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleRemove(task.id)}
                                    className="opacity-100 text-gray-500 hover:text-red-400 rounded transition-all outline-none hover:scale-110 text-xs"
                                    title="Remove task"
                                >
                                    ✕
                                </button>
                            </li>
                        ))
                    )}
                </ul>

                {/* Add Task Form */}
                <form onSubmit={handleSubmit} className="relative z-10 shrink-0 mt-auto">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isFull}
                        placeholder={isFull ? "Limit reached..." : "Add task..."}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-soft focus:ring-1 focus:ring-blue-soft transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </form>

            </div>
        </div>
    );
}
