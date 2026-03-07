import React, { useState, useEffect } from 'react';

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the splash screen
        const hasSeenSplash = localStorage.getItem('gvoid_has_seen_splash');

        // Show immediately if they haven't seen it
        if (!hasSeenSplash) {
            setIsVisible(true);
        }
    }, []);

    const handleEnter = () => {
        // Start fade out animation
        setIsFadingOut(true);

        // Save state immediately so refresh doesn't show it again
        localStorage.setItem('gvoid_has_seen_splash', 'true');

        // Wait for CSS fade-out transition to complete before unmounting
        setTimeout(() => {
            setIsVisible(false);
        }, 800);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-xl transition-opacity duration-800 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
        >
            <div
                className={`max-w-2xl w-full p-10 bg-gray-900/60 border border-gray-700/50 rounded-3xl shadow-2xl flex flex-col items-center text-center transform transition-all duration-800 delay-100 ${isFadingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
            >
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-6">
                    <img
                        src="/gvoid-logo.svg"
                        alt="Gvoid Logo"
                        className="w-16 h-16 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse"
                    />
                    <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-blue-soft via-purple-soft to-blue-soft bg-[length:200%_auto] bg-clip-text text-transparent">
                        Gvoid
                    </h1>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-light text-gray-200 mb-4 tracking-wide">
                    Welcome to the Next Dimension of Focus.
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
                    Gvoid is a modular, sticky-note styled Pomodoro environment designed to keep you locked in.
                    <br /><br />
                    As you focus, you generate <strong>Experience</strong> and <strong>Void Matter</strong>, feeding into an underlying interstellar idle game. Rank up your Core Power while you work.
                </p>

                {/* CTA Button */}
                <button
                    onClick={handleEnter}
                    className="group relative px-8 py-3 bg-purple-900/40 border border-purple-500/50 rounded-full text-white font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-purple-800/60 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <span className="relative z-10 flex items-center gap-2">
                        Enter the Void
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
}
