import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { useSkillTree } from '../../contexts/SkillTreeContext';

export default function GlobalXPBar() {
    const { level, prestigeLevel, xp, xpNeeded, timerState, gameModifiers } = useGame();
    const { hasSkill } = useSkillTree();

    const safeXpNeeded = xpNeeded > 0 ? xpNeeded : 100;
    const safeXp = isNaN(xp) ? 0 : xp;
    const progressPercentage = Math.min((safeXp / safeXpNeeded) * 100, 100);

    const isPrestige = (prestigeLevel || 0) > 0;
    const isEclipse = hasSkill('eclipse');
    const hasVoidSense = hasSkill('void_sense');

    let currentRate = 2.5;
    if (timerState?.isActive) {
        if (timerState.mode === 'FOCUS') currentRate = 10;
        else if (timerState.mode === 'BREAK') currentRate = gameModifiers?.momentum ? 1.25 : 0;
    } else if (gameModifiers?.singularity) {
        currentRate = 2.75; // 2.5 * 1.1
    }

    return (
        <div className="hidden sm:flex absolute left-1/2 top-4 transform -translate-x-1/2 z-50 items-center gap-4 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-full px-5 py-2.5 shadow-2xl group transition-all duration-300 hover:border-blue-soft/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            title={hasVoidSense ? `Current Rate: +${currentRate} XP/min` : "Global Experience"}
        >
            {/* Level Badge */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-transform duration-300 group-hover:scale-110 shrink-0 relative ${isEclipse ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black border border-purple-500/50' : (isPrestige ? 'bg-gradient-to-br from-amber-400 to-orange-600' : 'bg-gradient-to-br from-purple-soft to-blue-soft')}`}>
                {isEclipse && (
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] border border-purple-400/30" />
                )}
                <span className={`text-white font-black relative z-10 ${isPrestige || isEclipse ? 'text-[9px]' : 'text-sm'} ${isEclipse ? 'text-purple-200 drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]' : ''}`}>
                    {isPrestige ? `P${prestigeLevel}` : level || 1}
                </span>
            </div>

            {/* Progress Bar Container */}
            <div className="flex flex-col gap-1 w-48 md:w-64">
                <div className="flex justify-between items-center text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                    <span className="text-gray-300 tracking-widest">{isPrestige ? 'Prestige' : 'Rank'}</span>
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
