import React from 'react';
import { useStats } from '../../contexts/StatsContext';

export default function StatsCoreMetrics({ onSelectMetric }) {
    const { metrics, stats } = useStats();

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-soft border-b border-gray-700 pb-2">Core Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
                <button
                    onClick={() => onSelectMetric('totalFocus')}
                    className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group hover:border-blue-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-soft text-left w-full h-full"
                >
                    <div className="absolute inset-0 bg-blue-soft/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-3xl font-light text-white mb-1 group-hover:scale-110 transition-transform tabular-nums">{metrics.totalFocusHours}<span className="text-lg text-gray-500">h</span></span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Total Focus</span>
                </button>

                <button
                    onClick={() => onSelectMetric('avgSession')}
                    className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group hover:border-purple-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-soft text-left w-full h-full"
                >
                    <div className="absolute inset-0 bg-purple-soft/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-3xl font-light text-white mb-1 group-hover:scale-110 transition-transform tabular-nums">{metrics.avgSessionLength}<span className="text-lg text-gray-500">m</span></span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Avg Session</span>
                </button>

                <button
                    onClick={() => onSelectMetric('focusEfficiency')}
                    className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group hover:border-emerald-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left w-full h-full"
                >
                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-3xl font-light text-white mb-1 group-hover:scale-110 transition-transform tabular-nums">{metrics.overallFocusEfficiency}<span className="text-lg text-gray-500">%</span></span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 text-center leading-tight mt-1">Focus<br />Efficiency</span>
                </button>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-soft border-b border-gray-700 pb-2 mt-2">Milestones</h3>
            <div className="grid grid-cols-2 gap-4">
                <MilestoneCard
                    active={stats.milestones.first50m}
                    title="Deep Diver"
                    desc="Completed 50+ min session"
                    icon="🌊"
                />
                <MilestoneCard
                    active={stats.milestones.streak7Day}
                    title="Void Walker"
                    desc="7-day focus streak"
                    icon="🌌"
                />
            </div>
        </div>
    );
}

function MilestoneCard({ active, title, desc, icon }) {
    return (
        <div className={`p-4 rounded-xl border flex items-center gap-4 transition-all duration-500 ${active ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-gray-900 border-gray-800 opacity-50 grayscale'}`}>
            <div className="text-2xl drop-shadow-md">{icon}</div>
            <div>
                <h4 className={`text-sm font-bold ${active ? 'text-gray-100' : 'text-gray-500'}`}>{title}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{desc}</p>
            </div>
        </div>
    )
}
