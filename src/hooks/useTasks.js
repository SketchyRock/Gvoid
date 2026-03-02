import { useState, useCallback } from 'react';

export const MAX_TASKS = 3;

export default function useTasks(initialTasks = []) {
    const [tasks, setTasks] = useState(initialTasks);

    // Add a new task if under the limit
    const addTask = useCallback((text) => {
        if (text.trim() === '') return false;

        setTasks(prevTasks => {
            if (prevTasks.length >= MAX_TASKS) return prevTasks;

            return [...prevTasks, {
                id: crypto.randomUUID(),
                text: text.trim(),
                completed: false,
                createdAt: Date.now()
            }];
        });
        return true;
    }, []);

    // Toggle completion status
    const toggleTask = useCallback((id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }, []);

    // Remove a task entirely
    const removeTask = useCallback((id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }, []);

    // Clear all completed tasks to make room for new ones
    const clearCompleted = useCallback(() => {
        setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    }, []);

    return {
        tasks,
        addTask,
        toggleTask,
        removeTask,
        clearCompleted,
        isFull: tasks.length >= MAX_TASKS,
        activeCount: tasks.filter(t => !t.completed).length
    };
}
