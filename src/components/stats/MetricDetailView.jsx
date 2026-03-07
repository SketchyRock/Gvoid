import React from 'react';
import { useStats } from '../../contexts/StatsContext';

export default function MetricDetailView({ activeMetric, onBack }) {
    const { metrics } = useStats();

    // Safety check just in case stats load slowly
    if (!metrics || !metrics.detailedMetrics) return null;

    const details = metrics.detailedMetrics;

    const renderContent = () => {
        switch (activeMetric) {
            case 'totalFocus':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-100">Total Focus</h3>
                                <p className="text-sm text-gray-400">Total time spent in focus sessions</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <StatCard
                                label="Busiest Day"
                                value={details.totalFocus.busiestWeekday}
                                description="Highest total time spent focusing"
                            />
                            <StatCard
                                label="Productive Time"
                                value={details.totalFocus.productiveTime}
                                description="Time of day with most focus"
                            />
                        </div>
                    </div>
                );
            case 'avgSession':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-100">Average Session</h3>
                                <p className="text-sm text-gray-400">Average length of all your focus blocks</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <StatCard
                                label="Longest Session"
                                value={`${details.avgSession.longestSession}m`}
                                description="Your longest focused duration"
                            />
                            <StatCard
                                label="Deep Focus"
                                value={details.avgSession.sessionsOver60}
                                description="Sessions longer than 60 minutes"
                            />
                            <StatCard
                                label="Total Sessions"
                                value={details.avgSession.totalSessions}
                                description="Total completed pomodoros"
                                className="col-span-2"
                            />
                        </div>
                    </div>
                );
            case 'focusEfficiency':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-100">Focus Efficiency</h3>
                                <p className="text-sm text-gray-400">Time spent consistently active in Gvoid</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <StatCard
                                label="Perfect Sessions"
                                value={details.focusEfficiency.perfectSessions}
                                description="Sessions with 100% efficiency"
                            />
                            <StatCard
                                label="7-Day Avg"
                                value={`${details.focusEfficiency.last7DaysAverageEfficiency}%`}
                                description="Efficiency over the last week"
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 relative animate-fade-in shadow-xl w-full">
            <button
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest font-bold font-sans hover:-translate-x-1 duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
            </button>
            {renderContent()}
        </div>
    );
}

function StatCard({ label, value, description, className = '' }) {
    return (
        <div className={`bg-gray-900 border border-gray-700/50 rounded-xl p-5 flex flex-col justify-center ${className}`}>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{label}</span>
            <span className="text-2xl font-semibold text-white mb-2 tracking-tight">{value}</span>
            <span className="text-xs text-gray-500 leading-snug">{description}</span>
        </div>
    );
}
