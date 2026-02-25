import React, { useRef, useEffect, useState } from 'react';
import { calculatePosition } from '../utils/physicsMapper';

const SimulationCanvas = ({ activeProcesses, isPaused, speed = 1, systemLoad = 9.8 }) => {
    const canvasRef = useRef(null);
    const [projectiles, setProjectiles] = useState([]);
    const requestRef = useRef();
    const startTimeRef = useRef();

    useEffect(() => {
        // Convert active processes to projectile state
        const newProjectiles = activeProcesses.map(p => ({
            ...p,
            t: 0,
            active: true,
            path: []
        }));
        setProjectiles(newProjectiles);
        startTimeRef.current = null;
    }, [activeProcesses]);

    const animate = (time) => {
        if (!isPaused) {
            if (!startTimeRef.current) startTimeRef.current = time;
            const deltaTime = (time - startTimeRef.current) / 1000 * speed;

            setProjectiles(prev => prev.map(p => {
                if (!p.active) return p;

                const { x, y } = calculatePosition(
                    p.physics.initialVelocity,
                    p.physics.angle,
                    p.physics.gravity,
                    p.t + deltaTime
                );

                // Ground collision or range limit
                const active = y >= 0;
                const newPath = [...p.path, { x, y }]; // Keep full trajectory

                return {
                    ...p,
                    t: p.t + deltaTime,
                    x: 50 + x, // Offset from left
                    y: 450 - y, // Offset from bottom (canvas height 500)
                    active,
                    path: newPath
                };
            }));

            startTimeRef.current = time;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        for (let i = 0; i <= canvas.width; i += 50) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i <= canvas.height; i += 50) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        // Draw Projectiles
        projectiles.forEach(p => {
            // Draw path/trail
            if (p.path.length > 1) {
                ctx.beginPath();
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.6; // Slightly transparent trail
                ctx.moveTo(50 + p.path[0].x, 450 - p.path[0].y);
                p.path.forEach(pos => {
                    ctx.lineTo(50 + pos.x, 450 - pos.y);
                });
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }

            // Draw Ball
            ctx.beginPath();
            ctx.arc(p.x || 50, p.y || 450, 10, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw Label
            ctx.fillStyle = '#fff';
            ctx.font = '12px Inter';
            ctx.fillText(p.name, (p.x || 50) - 10, (p.y || 450) - 15);
        });

        // Draw Ground
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 450);
        ctx.lineTo(canvas.width, 450);
        ctx.stroke();

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [projectiles, isPaused, speed]);

    return (
        <div className="glass-card w-full h-[520px] relative">
            <div className="absolute top-4 left-4 flex gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>X: Time</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>Y: Wait/Load</span>
                </div>
            </div>
            <canvas
                ref={canvasRef}
                width={1000}
                height={500}
                className="w-full h-full"
            />
        </div>
    );
};

export default SimulationCanvas;
