import React, { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
  sector: string;
}

const SECTOR_COLORS = [
  '#14b8a6', // Teal
  '#06b6d4', // Cyan
  '#f59e0b', // Amber
  '#f43f5e', // Rose
  '#8b5cf6', // Violet
];

export const AIWorkforceParticleWave: React.FC<{ height?: number; className?: string }> = ({
  height = 240,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeSector, setActiveSector] = useState<string>('All');
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let h = (canvas.height = height);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particleCount = Math.min(Math.floor(width / 16), 55);
    const sectors = ['IT & Tech', 'BPO/Support', 'BFSI', 'Healthcare', 'Engineering'];
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorIndex = i % SECTOR_COLORS.length;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.5,
        color: SECTOR_COLORS[colorIndex],
        baseAlpha: Math.random() * 0.5 + 0.3,
        sector: sectors[colorIndex],
      });
    }

    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Draw subtle background neural wave curves
      waveOffset += 0.015;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.12)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 10) {
        const y = h * 0.5 + Math.sin(x * 0.008 + waveOffset) * 28 + Math.cos(x * 0.015 - waveOffset * 0.6) * 14;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 10) {
        const y = h * 0.55 + Math.sin(x * 0.012 - waveOffset * 0.8) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!shouldReduceMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off walls
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          // Mouse attraction / repel
          if (mouseRef.current.active) {
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              p.x -= (dx / dist) * 1.5;
              p.y -= (dy / dist) * 1.5;
            }
          }
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 85) * 0.22;
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = lineAlpha;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [height, shouldReduceMotion]);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 ${className}`}>
      <canvas ref={canvasRef} className="w-full block select-none cursor-crosshair" style={{ height }} />
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400 pointer-events-none select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          KINETIC AI VECTORS // 40 OCCUPATIONAL NODES INTERCONNECTED
        </span>
        <span className="hidden sm:inline text-slate-500">INTERACTIVE PARTICLE DYNAMICS • MOVE POINTER TO DISTORT</span>
      </div>
    </div>
  );
};
