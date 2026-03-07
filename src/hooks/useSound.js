import { useCallback, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';

// Standard high-quality, royalty-free sound effects URLs
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/rse/soundfx/soundfx.d';

const SOUNDS = {
    // Alarm variants
    digital: `${CDN_BASE}/alarm1.mp3`,    // Digital Alert
    bell: `${CDN_BASE}/resonance1.mp3`,   // Resonant Bell
    chime: `${CDN_BASE}/resonance2.mp3`,  // High Chime
    wood: `${CDN_BASE}/resonance3.mp3`,   // Deep Resonant Wood-like sound

    // UI Feedback (Minecraft-inspired)
    success: `${CDN_BASE}/bling4.mp3`,    // Sweet high-pitched XP-like ding
    click: `${CDN_BASE}/click1.mp3`       // Snappy wooden button click
};

export default function useSound() {
    const { settings } = useSettings();
    const audioRef = useRef(null);

    const playSound = useCallback((soundKey, volumeMultiplier = 1) => {
        const url = SOUNDS[soundKey];
        if (!url) return;

        // If a sound is already playing, stop it and reset
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const audio = new Audio(url);
        // Apply global setting and then the specific sound multiplier
        const finalVolume = (settings.alarmVolume / 100) * volumeMultiplier;
        audio.volume = Math.min(1, Math.max(0, finalVolume));
        audioRef.current = audio;

        audio.play().catch(err => {
            console.warn("Audio playback failed (browser may require interaction first):", err);
        });
    }, [settings.alarmVolume]);

    const playClick = useCallback(() => {
        // Reduce click volume by half (50%)
        playSound('click', 0.5);
    }, [playSound]);

    const playTaskDone = useCallback(() => {
        if (settings.taskSound) {
            // Increase XP volume by 25% (1.25x)
            playSound('success', 1.25);
        }
    }, [settings.taskSound, playSound]);

    const playAlarm = useCallback(() => {
        playSound(settings.alarmSound || 'digital');
    }, [settings.alarmSound, playSound]);

    return {
        playClick,
        playTaskDone,
        playAlarm
    };
}
