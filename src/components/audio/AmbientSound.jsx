import React, { useState, useEffect, useRef } from 'react';

const SOUND_TRACKS = [
    // Lofi Girl live stream
    { id: 'lofi', label: 'Lo-Fi Chill', videoId: 'jfKfPfyJRdk' },
    // 10 hours of heavy rain
    { id: 'rain', label: 'Heavy Rain', videoId: 'mPZkdNFkNps' },
    // 12 hours of deep brown noise
    { id: 'brown', label: 'Brown Noise', videoId: 'RqzGzwTY-6w' }
];

export default function AmbientSound() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTrackId, setActiveTrackId] = useState(SOUND_TRACKS[0].id);
    const [volume, setVolume] = useState(50);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const playerRef = useRef(null);
    const containerRef = useRef(null);

    const activeTrack = SOUND_TRACKS.find(t => t.id === activeTrackId);

    // Initialize YouTube IFrame API
    useEffect(() => {
        // Load YouTube API script
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player(containerRef.current, {
                height: '10', // Needs to be > 0
                width: '10',
                videoId: activeTrack.videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    // Origin is required for iframe API security
                    origin: window.location.origin,
                },
                events: {
                    onReady: (event) => {
                        setIsReady(true);
                        event.target.setVolume(volume);
                    },
                    onStateChange: (event) => {
                        // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        } else if (event.data === window.YT.PlayerState.PAUSED) {
                            setIsPlaying(false);
                        } else if (event.data === window.YT.PlayerState.ENDED) {
                            // Re-loop manually if required
                            event.target.playVideo();
                        }
                    }
                }
            });
        };

        return () => {
            // Cleanup script & player
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
            }
            delete window.onYouTubeIframeAPIReady;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle Play/Pause changes
    useEffect(() => {
        if (!playerRef.current || !isReady) return;

        if (isPlaying) {
            playerRef.current.playVideo();
        } else {
            playerRef.current.pauseVideo();
        }
    }, [isPlaying, isReady]);

    // Handle Volume changes
    useEffect(() => {
        if (!playerRef.current || !isReady) return;
        playerRef.current.setVolume(volume);
    }, [volume, isReady]);

    // Handle Track changes
    useEffect(() => {
        if (!playerRef.current || !isReady) return;

        // Load and play the new video
        playerRef.current.loadVideoById(activeTrack.videoId);
        setIsPlaying(true);

    }, [activeTrack.videoId, isReady]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const handleTrackChange = (id) => {
        setActiveTrackId(id);
        setIsMenuOpen(false);
    };

    return (
        <div className="relative">

            {/* Hidden YouTube Player Container */}
            {/* We use 10x10 instead of hidden to prevent browser autoplay blocks */}
            <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
                <div ref={containerRef} />
            </div>

            {/* Button to toggle menu */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 text-zen-300 hover:text-amber-soft transition-colors text-sm px-3 py-2 rounded-lg hover:bg-zen-800"
                title="Ambient Sounds"
            >
                <span>{isPlaying ? '🔊' : '🔈'}</span>
                <span>{activeTrack.label}</span>
            </button>

            {/* Audio Control Menu */}
            {isMenuOpen && (
                <div className="absolute top-12 right-0 w-56 bg-zen-800 border border-zen-700 rounded-xl shadow-2xl p-4 z-50 animate-fade-in origin-top-right">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs uppercase tracking-widest text-zen-300">Soundscape</h3>
                        <button
                            onClick={togglePlay}
                            disabled={!isReady}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                ${!isReady ? 'bg-zen-700 text-zen-500 cursor-not-allowed' :
                                    isPlaying ? 'bg-amber-soft text-zen-900' : 'bg-zen-700 text-zen-100 hover:bg-zen-600 hover:text-amber-soft'}`}
                        >
                            {!isReady ? '⌛' : isPlaying ? '⏸' : '▶'}
                        </button>
                    </div>

                    <div className="space-y-1 mb-4">
                        {SOUND_TRACKS.map(track => (
                            <button
                                key={track.id}
                                onClick={() => handleTrackChange(track.id)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeTrackId === track.id ? 'bg-zen-700 text-amber-soft' : 'text-zen-300 hover:bg-zen-700 hover:text-zen-100'}`}
                            >
                                {track.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2 mt-4 pt-4 border-t border-zen-700">
                        <div className="flex justify-between text-xs text-zen-300">
                            <span>Volume</span>
                            <span>{volume}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={volume}
                            onChange={(e) => setVolume(parseInt(e.target.value))}
                            className="w-full accent-amber-soft"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
