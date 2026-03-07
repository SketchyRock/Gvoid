import React, { useEffect, useRef } from 'react';
import { useGame } from '../../contexts/GameContext';

export default function VoidStickyNote() {
    const canvasRef = useRef(null);
    const { isTimerActive, level } = useGame();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particles = [];
        const singularityRadius = 20;

        // Resize handler to ensure canvas dimensions match CSS bounds exactly
        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                // Using client dimensions prevents the canvas from scaling blurrily
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor(x, y, dx, dy, size, color) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
                this.color = color;
                this.life = 1; // Alpha
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
                ctx.fill();
            }

            update(centerX, centerY, active) {
                // Calculate direction to center
                const dx = centerX - this.x;
                const dy = centerY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Pull effect strength based on active state
                const pullStrength = active ? 0.05 : 0.005;
                const currentPull = Math.max(0.001, pullStrength * (100 / Math.max(10, distance)));

                this.dx += dx * currentPull * 0.01;
                this.dy += dy * currentPull * 0.01;

                // Orbit effect
                if (active) {
                    this.dx += dy * 0.015; // Tangential velocity creates spiral
                    this.dy -= dx * 0.015;
                } else {
                    this.dx += dy * 0.002;
                    this.dy -= dx * 0.002;
                }

                // Add slight friction to keep speeds reasonable
                this.dx *= 0.98;
                this.dy *= 0.98;

                this.x += this.dx;
                this.y += this.dy;

                // Fade out as it gets very close to the event horizon
                if (distance < singularityRadius * 1.5) {
                    this.life -= 0.08;
                }

                this.draw();
                return this.life > 0;
            }
        }

        let lastTime = Date.now();
        const render = () => {
            const now = Date.now();
            // Create a trailing effect by using a semi-transparent black overlay
            // Match the Gvoid theme's dark gray for a better blend (`bg-gray-900` roughly #1a1a24)
            ctx.fillStyle = 'rgba(26, 26, 36, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Spawn Particles
            // active: steady stream, idle: occasional dust
            if (isTimerActive || Math.random() < 0.1) {
                // Spawn mostly from outside the edge of the visible canvas for a flowing-in effect
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.max(canvas.width, canvas.height) / 2 + 50;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;

                // Colors: Blue Glow (#2dd4bf => 45, 212, 191) & Purple Soft (#c084fc => 192, 132, 252)
                const isPurple = Math.random() > 0.5;
                const color = isPurple ? '192, 132, 252' : '45, 212, 191';

                const speed = isTimerActive ? 2 : 0.5;
                const dx = (Math.random() - 0.5) * speed;
                const dy = (Math.random() - 0.5) * speed;

                particles.push(new Particle(x, y, dx, dy, Math.random() * 2 + 1, color));
            }

            // Draw Singularity Accretion Disk / Glow
            const pulse = isTimerActive ? Math.sin(now / 200) * 3 : Math.sin(now / 1000) * 1;
            const glowDist = isTimerActive ? 40 : 20;
            const coreGlow = ctx.createRadialGradient(
                centerX, centerY, singularityRadius * 0.8,
                centerX, centerY, singularityRadius + glowDist + pulse
            );

            coreGlow.addColorStop(0, '#000000'); // Pure black core
            coreGlow.addColorStop(0.2, '#000000');
            coreGlow.addColorStop(0.5, isTimerActive ? 'rgba(192, 132, 252, 0.4)' : 'rgba(88, 28, 135, 0.2)'); // Purple glow
            coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = coreGlow;
            ctx.beginPath();
            ctx.arc(centerX, centerY, singularityRadius + glowDist + pulse, 0, Math.PI * 2, false);
            ctx.fill();

            // Draw the Event Horizon boundary
            ctx.beginPath();
            ctx.arc(centerX, centerY, singularityRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = '#050505'; // True void
            ctx.fill();
            ctx.strokeStyle = isTimerActive ? 'rgba(45, 212, 191, 0.8)' : 'rgba(192, 132, 252, 0.3)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Update focus essence particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const isAlive = particles[i].update(centerX, centerY, isTimerActive);
                if (!isAlive) {
                    particles.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, [isTimerActive]);

    return (
        <div className="w-full h-full bg-gray-900 rounded-2xl border border-gray-700 shadow-xl overflow-hidden relative group flex flex-col items-center justify-center">
            {/* Header / Info overlay */}
            <div className="absolute top-0 left-0 w-full p-5 flex justify-between items-center z-10 pointer-events-none">
                <h2 className="text-gray-300 text-[10px] uppercase tracking-[0.3em] font-semibold">
                    The Void
                </h2>
                <div className={`text-[9px] uppercase tracking-widest ${isTimerActive ? 'text-blue-glow animate-pulse' : 'text-gray-500'}`}>
                    {isTimerActive ? 'Absorbing Focus' : 'Dormant'}
                </div>
            </div>

            {/* Canvas */}
            <div className="absolute inset-0 z-0">
                <canvas ref={canvasRef} className="w-full h-full block mix-blend-screen" />
            </div>

            {/* Bottom Info overlay */}
            <div className="absolute bottom-5 left-0 w-full px-5 flex justify-between items-end z-10 pointer-events-none">
                <div className="flex flex-col gap-1 drop-shadow-md">
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest">Core Power</span>
                    <span className="text-2xl font-light text-blue-soft leading-none">Lv. {level}</span>
                </div>
            </div>

            {/* Soft decorative ring matching the theme */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-10"></div>
        </div>
    );
}
