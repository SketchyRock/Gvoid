import React, { useState } from 'react';
import useSound from '../../hooks/useSound';
import Heatmap from './Heatmap';
import StatsCoreMetrics from './StatsCoreMetrics';
import MetricDetailView from './MetricDetailView';
import { useStats } from '../../contexts/StatsContext';

export default function StatsPage({ isOpen, onClose }) {
    const { playClick } = useSound();
    const { stats } = useStats();
    const [activeMetric, setActiveMetric] = useState(null);

    if (!isOpen) return null;

    const handleClose = () => {
        playClick();
        onClose();
        setTimeout(() => setActiveMetric(null), 300);
    };

    const handleSelectMetric = (metricId) => {
        playClick();
        setActiveMetric(metricId);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4 w-screen h-screen">
            <div className="bg-gray-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-700">
                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <h2 className="text-xl font-semibold tracking-tight relative z-10 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Mission Control
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white relative z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-10">
                    {activeMetric ? (
                        <MetricDetailView
                            activeMetric={activeMetric}
                            onBack={() => { playClick(); setActiveMetric(null); }}
                        />
                    ) : (
                        <div className="space-y-8 animate-fade-in">
                            <StatsCoreMetrics onSelectMetric={handleSelectMetric} />
                            <Heatmap sessions={stats.sessions} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
