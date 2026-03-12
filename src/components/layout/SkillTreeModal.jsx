import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { useSkillTree } from '../../contexts/SkillTreeContext';
import { useGame } from '../../contexts/GameContext';

export default function SkillTreeModal({ isOpen, onClose }) {
    const { skills, connections, hasSkill, canUnlock, unlockSkill } = useSkillTree();
    const { voidMatter } = useGame();
    const [selectedSkillId, setSelectedSkillId] = useState(null);
    const [scale, setScale] = useState(0.8);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleWheel = (e) => {
        // Prevent generic scrolling
        e.preventDefault();

        // Adjust scale
        setScale(prev => {
            const newScale = prev - e.deltaY * 0.001;
            return Math.min(Math.max(0.3, newScale), 2); // Bound zoom between 0.3x and 2x
        });
    };

    const handleRecenter = () => {
        animate(x, 0, { type: 'spring', stiffness: 200, damping: 25 });
        animate(y, 0, { type: 'spring', stiffness: 200, damping: 25 });
        setScale(0.8);
    };

    const handleNodeClick = (skillId) => {
        setSelectedSkillId(skillId);
    };

    const handleUnlock = () => {
        if (selectedSkillId && canUnlock(selectedSkillId)) {
            unlockSkill(selectedSkillId);
        }
    };

    if (!isOpen) return null;

    const selectedSkill = selectedSkillId ? skills[selectedSkillId] : null;

    const renderLines = () => {
        return connections.map((conn, idx) => {
            const sourceSkill = skills[conn.source];
            const targetSkill = skills[conn.target];
            const isUnlocked = hasSkill(conn.target);
            const isAvailable = canUnlock(conn.target) || hasSkill(conn.target);

            // Calculate positions based on percentage to create SVG coords
            // We assume a 1000x1000 coordinate space for easy SVG scaling
            const x1 = sourceSkill.position.x * 10;
            const y1 = sourceSkill.position.y * 10;
            const x2 = targetSkill.position.x * 10;
            const y2 = targetSkill.position.y * 10;

            const color = isUnlocked ? '#c084fc' : (isAvailable ? '#581c87' : '#3f3659');
            const strokeWidth = conn.isHub ? (isUnlocked ? 3 : 2) : (isUnlocked ? 4 : 2);
            const opacity = conn.isHub ? (isUnlocked ? 0.8 : 0.3) : (isUnlocked ? 1 : 0.4);
            const dashArray = conn.isHub && !isUnlocked ? "5,5" : "none";

            return (
                <line
                    key={idx}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    opacity={opacity}
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    className={`transition-all duration-700 ease-out ${isUnlocked ? "drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" : ""}`}
                />
            );
        });
    };

    const renderNodes = () => {
        return Object.values(skills).map(skill => {
            const unlocked = hasSkill(skill.id);
            const available = canUnlock(skill.id);
            const isSelected = selectedSkillId === skill.id;

            let bgColor = 'bg-gray-800 border-gray-600';
            let shadow = 'shadow-none';
            if (unlocked) {
                bgColor = 'bg-purple-900 border-purple-400 text-white';
                shadow = 'shadow-[0_0_15px_rgba(192,132,252,0.6)]';
            } else if (available) {
                bgColor = 'bg-gray-800 border-purple-soft text-gray-300';
                shadow = 'shadow-[0_0_10px_rgba(192,132,252,0.3)]';
            }

            const isMinor = skill.type === 'minor';
            const nodeSizeClass = isMinor ? 'w-4 h-4 md:w-5 md:h-5' : 'w-10 h-10 md:w-12 md:h-12';

            return (
                <div
                    key={skill.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                    style={{ left: `${skill.position.x}%`, top: `${skill.position.y}%` }}
                    onClick={() => handleNodeClick(skill.id)}
                >
                    <div
                        className={`${nodeSizeClass} rounded-full border-2 flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${bgColor} ${shadow} ${isSelected ? 'ring-4 ring-white' : ''}`}
                    >
                        {/* Hexagon shape visually, implemented simply with roundness for now, or use an inner div */}
                        {available && !unlocked && (
                            <div
                                className="absolute inset-0 rounded-full border-2 border-purple-soft opacity-60 animate-ping"
                                style={{ animationDuration: '2s' }}
                            />
                        )}
                        {!isMinor && (
                            <span className="text-[9px] md:text-[10px] font-bold text-center leading-tight px-1 drop-shadow-md">
                                {skill.tier > 0 ? `T${skill.tier}` : ''}
                            </span>
                        )}
                    </div>
                    {!isMinor && (
                        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            <span className={`text-[9px] md:text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest ${unlocked ? 'text-purple-300 bg-gray-900/80 backdrop-blur' : 'text-gray-500'}`}>
                                {skill.name}
                            </span>
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[100] flex bg-gray-900/95 backdrop-blur-xl overflow-hidden"
            >
                {/* Background stars/particles */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #c084fc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-3 bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white rounded-full transition-all group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Area: Tree Canvas */}
                <div
                    className="flex-1 relative overflow-hidden flex items-center justify-center min-h-screen cursor-grab active:cursor-grabbing"
                    onWheel={handleWheel}
                >
                    {/* Header: Void Matter balance */}
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-4 bg-gray-900/80 p-4 rounded-2xl border border-gray-700/50 shadow-2xl">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-soft to-blue-soft flex items-center justify-center shadow-[0_0_15px_rgba(192,132,252,0.5)]">
                            <span className="text-white font-black text-xl">{voidMatter}</span>
                        </div>
                        <div>
                            <div className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Available</div>
                            <div className="text-lg font-black text-purple-soft tracking-wider">VOID MATTER</div>
                        </div>
                    </div>

                    {/* Zoom & Pan Controls Overlay */}
                    <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2 bg-gray-900/80 p-2 rounded-xl border border-gray-700/50 shadow-2xl">
                        <button onClick={() => setScale(s => Math.min(s + 0.2, 2))} className="p-2 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors" title="Zoom In">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </button>
                        <button onClick={handleRecenter} className="p-2 hover:bg-gray-800 rounded-lg text-purple-400 hover:text-purple-300 transition-colors" title="Recenter View">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                        <button onClick={() => setScale(s => Math.max(s - 0.2, 0.3))} className="p-2 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors" title="Zoom Out">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                        </button>
                    </div>

                    <motion.div
                        className="relative w-[2400px] h-[2400px] shrink-0"
                        style={{ scale, x, y }}
                        drag
                        dragConstraints={{ left: -1200, right: 1200, top: -1200, bottom: 1200 }}
                        dragElastic={0.1}
                    >
                        {/* SVG Lines Layer */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                            {renderLines()}
                        </svg>

                        {/* HTML Nodes Layer */}
                        {renderNodes()}
                    </motion.div>
                </div>

                {/* Right Area: Sidebar */}
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="w-80 md:w-96 bg-gray-900 border-l border-gray-800/80 shadow-2xl flex flex-col z-20 shrink-0"
                >
                    <div className="p-8 flex flex-col h-full">
                        <h2 className="text-2xl font-black text-white tracking-wider mb-2 uppercase">The Talent Tree</h2>
                        <p className="text-sm text-gray-400 mb-8 leading-relaxed">Channel Void Matter to bend the flow of time and unlock powerful permanent passive abilities.</p>

                        <div className="flex-1">
                            {selectedSkill ? (
                                <motion.div
                                    key={selectedSkill.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 relative overflow-hidden group"
                                >
                                    {/* Subtle background glow for selected item */}
                                    <div className="absolute -inset-10 bg-gradient-to-br from-purple-soft/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-white tracking-widest uppercase">{selectedSkill.name}</h3>
                                            <span className="text-xs font-bold px-2 py-1 bg-gray-900 rounded text-gray-400 border border-gray-700 tracking-widest">
                                                TIER {selectedSkill.tier}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                                            {selectedSkill.description}
                                        </p>

                                        {/* Status / Cost */}
                                        <div className="mt-auto">
                                            {hasSkill(selectedSkill.id) ? (
                                                <div className="w-full py-3 bg-purple-900/50 border border-purple-500/50 rounded-xl text-center text-purple-200 font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(192,132,252,0.2)]">
                                                    Unlocked
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex justify-between items-center text-sm font-bold tracking-widest text-gray-400">
                                                        <span>Cost:</span>
                                                        <span className={voidMatter >= selectedSkill.cost ? 'text-purple-400' : 'text-red-400'}>
                                                            {selectedSkill.cost} VM
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={handleUnlock}
                                                        disabled={!canUnlock(selectedSkill.id)}
                                                        className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 ${
                                                            canUnlock(selectedSkill.id)
                                                                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(192,132,252,0.4)] hover:shadow-[0_0_30px_rgba(192,132,252,0.6)] hover:scale-[1.02]'
                                                                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {canUnlock(selectedSkill.id) ? 'Unlock Ability' : 'Locked'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <p className="text-sm tracking-widest uppercase font-bold text-center">Select a node<br/>to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
