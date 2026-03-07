import React, { useMemo } from 'react';

export default function Heatmap({ sessions }) {
    // Generate the last 365 days
    const days = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayData = [];

        // Create a map of sessions by day
        const sessionMap = {};
        sessions.forEach(session => {
            const d = new Date(session.timestamp);
            d.setHours(0, 0, 0, 0);
            const time = d.getTime();
            sessionMap[time] = (sessionMap[time] || 0) + session.duration;
        });

        for (let i = 363; i >= 0; i--) {
            const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            const time = d.getTime();
            const minutes = sessionMap[time] || 0;
            dayData.push({ date: d, minutes, time });
        }
        return dayData;
    }, [sessions]);

    const getColor = (minutes) => {
        if (minutes === 0) return 'bg-gray-800 border-gray-700';
        if (minutes < 25) return 'bg-purple-900/40 border-purple-800/50';
        if (minutes < 50) return 'bg-purple-800/60 border-purple-700/50';
        if (minutes < 120) return 'bg-purple-600/80 border-purple-500/60';
        return 'bg-purple-500 border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]';
    };

    return (
        <div className="w-full">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-soft border-b border-gray-700 pb-2 mb-4">Focus Activity (364 Days)</h3>
            <div className="flex gap-1.5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent snap-x">
                {/* Split into weeks (cols) of 7 days (rows) */}
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1.5 snap-start">
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const dayData = days[weekIndex * 7 + dayIndex];
                            if (!dayData) return <div key={dayIndex} className="w-3.5 h-3.5 transparent" />;
                            return (
                                <div
                                    key={dayData.time}
                                    className={`w-3.5 h-3.5 rounded-sm border ${getColor(dayData.minutes)} transition-colors duration-300 hover:scale-125 hover:z-10`}
                                    title={`${dayData.date.toDateString()}: ${dayData.minutes} mins`}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
