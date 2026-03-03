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
        <div className="flex items-center gap-4 bg-gray-800/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700/50 transition-all hover:bg-gray-800/60 hover:border-gray-600">
            {/* Hidden YouTube Player Container */}
            <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
                <div ref={containerRef} />
            </div>

            {/* Play/Pause Button */}
            <button
                onClick={togglePlay}
                disabled={!isReady}
                className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm
                    ${!isReady ? 'bg-gray-700 text-gray-500 cursor-not-allowed' :
                        isPlaying ? 'bg-blue-soft text-gray-900 hover:bg-blue-glow shadow-[0_0_12px_rgba(59,130,246,0.6)]' : 'bg-gray-700 text-gray-100 hover:bg-gray-600 hover:text-blue-soft'}`}
                title={!isReady ? 'Loading...' : isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
                {!isReady ? '⌛' : isPlaying ? '⏸' : '▶'}
            </button>

            {/* Track Selector */}
            <div className="flex items-center gap-1.5 border-l border-gray-700/80 pl-4">
                {SOUND_TRACKS.map(track => (
                    <button
                        key={track.id}
                        onClick={() => handleTrackChange(track.id)}
                        className={`text-xs px-2.5 py-1.5 rounded-md transition-all hover:-translate-y-0.5
                            ${activeTrackId === track.id ? 'bg-gray-700 text-blue-soft font-medium shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'}`}
                    >
                        {track.label}
                    </button>
                ))}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 border-l border-gray-700/80 pl-4 group">
                <span className="text-xs text-gray-400 group-hover:scale-110 transition-transform cursor-default" title={`Volume: ${volume}%`}>
                    {volume > 50 ? '🔊' : volume > 0 ? '🔉' : '🔈'}
                </span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-20 accent-blue-soft cursor-pointer hover:scale-[1.05] transition-transform opacity-70 hover:opacity-100"
                    title={`Volume: ${volume}%`}
                />
            </div>
        </div>
    );
}
