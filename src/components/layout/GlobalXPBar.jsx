import React from 'react';
import { useGame } from '../../contexts/GameContext';

export default function GlobalXPBar() {
    const { level, xp, xpNeeded } = useGame();

    const safeXpNeeded = xpNeeded > 0 ? xpNeeded : 100;
    const safeXp = isNaN(xp) ? 0 : xp;
    const progressPercentage = Math.min((safeXp / safeXpNeeded) * 100, 100);

    return (
        <div className="hidden sm:flex absolute left-1/2 top-4 transform -translate-x-1/2 z-50 items-center gap-4 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-full px-5 py-2.5 shadow-2xl group transition-all duration-300 hover:border-blue-soft/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            {/* Level Badge */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-soft to-blue-soft shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-transform duration-300 group-hover:scale-110 shrink-0">
                <span className="text-white font-black text-sm">{level || 1}</span>
            </div>

            {/* Progress Bar Container */}
            <div className="flex flex-col gap-1 w-48 md:w-64">
                <div className="flex justify-between items-center text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                    <span className="text-gray-300 tracking-widest">Rank</span>
                    <span className="font-mono tracking-wider">
                        {Math.floor(safeXp)} <span className="text-gray-600">/</span> {safeXpNeeded} <span className="text-purple-soft/80">XP</span>
                    </span>
                </div>

                {/* Bar */}
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                    <div
                        className="h-full bg-gradient-to-r from-blue-soft to-purple-soft rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${progressPercentage}%` }}
                    >
                        {/* Glow tip */}
                        <div className="absolute top-0 right-0 w-2 h-full bg-white/40 blur-[1px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
