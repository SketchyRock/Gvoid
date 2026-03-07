import React, { useState, useEffect, useRef } from 'react';
import useSound from '../../hooks/useSound';

const SOUND_TRACKS = [
    { id: 'lofi', label: 'Lo-Fi', videoId: 'jfKfPfyJRdk', desc: 'Study' },
    { id: 'rain', label: 'Rain', videoId: 'mPZkdNFkNps', desc: 'Ambient' },
    { id: 'brown', label: 'Brown', videoId: 'RqzGzwTY-6w', desc: 'Focus' },
    { id: 'deep-house', label: 'House', videoId: 'p_VVk6QySMU', desc: 'Flow' },
    { id: 'breakcore', label: 'Break', videoId: 'ngsOzD_WqL8', desc: 'Crank' },
    { id: 'fogcore', label: 'Fog', videoId: 'co403gTZScc', desc: 'Dark' }
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

    const isInitialLoad = useRef(true);

    // Handle Track changes
    useEffect(() => {
        if (!playerRef.current || !isReady) return;

        // Skip the initial load on mount to prevent blocked autoplay issues.
        // The YouTube player is already initialized with the default videoId.
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            return;
        }

        // Load and play the new video automatically when a user selects a different track
        playerRef.current.loadVideoById(activeTrack.videoId);
        setIsPlaying(true);

    }, [activeTrack.videoId, isReady]);

    const { playClick } = useSound();

    const togglePlay = () => {
        playClick();
        setIsPlaying(!isPlaying);
    };

    const handleTrackChange = (id) => {
        playClick();
        setActiveTrackId(id);
        setIsMenuOpen(false);
    };

    return (
        <div className="w-full h-full transition-opacity duration-500 opacity-100 flex flex-col">
            <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden group h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 relative z-10 shrink-0">
                    <h2 className="text-gray-300 text-[10px] uppercase tracking-[0.2em] font-semibold">
                        Ambient Sound
                    </h2>
                </div>

                {/* Hidden YouTube Player Container */}
                <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
                    <div ref={containerRef} />
                </div>

                <div className="flex flex-col relative z-10 flex-1 justify-between">
                    {/* Controls Row */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            disabled={!isReady}
                            className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm text-sm
                                ${!isReady ? 'bg-gray-700 text-gray-500 cursor-not-allowed' :
                                    isPlaying ? 'bg-blue-soft text-gray-900 hover:bg-blue-glow shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-blue-soft'}`}
                            title={!isReady ? 'Loading...' : isPlaying ? 'Pause Audio' : 'Play Audio'}
                        >
                            {!isReady ? '⌛' : isPlaying ? '⏸' : '▶'}
                        </button>

                        <div className="flex-1">
                            <div className="flex justify-between text-[9px] text-gray-500 mb-1 uppercase tracking-widest">
                                <span>Volume</span>
                                <span>{volume}%</span>
                            </div>
                            <div className="flex items-center gap-2 group/volume">
                                <span className="text-[10px] text-gray-400 group-hover/volume:scale-110 transition-transform cursor-default">
                                    {volume > 50 ? '🔊' : volume > 0 ? '🔉' : '🔈'}
                                </span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={volume}
                                    onChange={(e) => setVolume(parseInt(e.target.value))}
                                    className="w-full h-1 accent-blue-soft cursor-pointer transition-transform opacity-70 hover:opacity-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Track Selector */}
                    <div className="grid grid-cols-3 gap-1.5 mt-3">
                        {SOUND_TRACKS.map(track => (
                            <button
                                key={track.id}
                                onClick={() => handleTrackChange(track.id)}
                                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg transition-all hover:-translate-y-0.5 group/btn
                                    ${activeTrackId === track.id
                                        ? 'bg-gray-700 text-blue-soft shadow-md border border-gray-600 ring-1 ring-blue-soft/20'
                                        : 'text-gray-400 hover:text-gray-200 bg-gray-900/40 hover:bg-gray-700/50 border border-transparent'}`}
                            >
                                <span className="text-[9px] font-bold tracking-tighter leading-none mb-0.5">
                                    {track.label}
                                </span>
                                <span className={`text-[7px] uppercase tracking-tighter opacity-50 group-hover/btn:opacity-100 transition-opacity
                                    ${activeTrackId === track.id ? 'text-blue-soft/80' : 'text-gray-500'}`}>
                                    {track.desc}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
