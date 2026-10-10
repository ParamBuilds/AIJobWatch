import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, ShieldAlert, Cpu, Layers, Activity } from 'lucide-react';

interface AbstractFooterPosterProps {
  className?: string;
}

export const AbstractFooterPoster: React.FC<AbstractFooterPosterProps> = ({
  className = '',
}) => {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const indianHubs = [
    { name: 'Bengaluru', lat: '12.9716° N', lon: '77.5946° E', focus: 'IT Services & Frontier GenAI R&D', exposure: '72% Exposure', riskColor: '#F97316' },
    { name: 'NCR / Gurgaon / Noida', lat: '28.6139° N', lon: '77.2090° E', focus: 'BPO Back-Office, Legal & Logistics', exposure: '76% Exposure', riskColor: '#EF4444' },
    { name: 'Hyderabad', lat: '17.3850° N', lon: '78.4867° E', focus: 'Pharma Tech, Cloud DevOps & BFSI Triage', exposure: '65% Exposure', riskColor: '#F59E0B' },
    { name: 'Mumbai', lat: '19.0760° N', lon: '72.8777° E', focus: 'BFSI Risk, Wealth Triage & Media Content', exposure: '62% Exposure', riskColor: '#F59E0B' },
    { name: 'Pune', lat: '18.5204° N', lon: '73.8567° E', focus: 'Automotive CAD, Embedded & Mechanical Engg', exposure: '44% Exposure', riskColor: '#10B981' },
    { name: 'Chennai', lat: '13.0827° N', lon: '80.2707° E', focus: 'SaaS Architecture, Healthcare & Hardware Ops', exposure: '49% Exposure', riskColor: '#10B981' },
  ];

  return (
    <div className={`relative overflow-hidden border-t border-b border-slate-300 dark:border-slate-800 bg-[#FAF8F4] dark:bg-[#060A11] text-slate-900 dark:text-slate-100 transition-colors select-none ${className}`}>
      {/* Background Architectural Noise & Diagonal Hatch Vectors */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none bg-[radial-gradient(#0F766E_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Top Coordinate Rule & Frame Stamp */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-teal-700 dark:text-teal-400 font-bold">FIG. 04 // COMPREHENSIVE HORIZON POSTER</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">CARTOGRAPHY OF LABOUR TRANSITION</span>
          </div>
          <div className="flex items-center gap-4">
            <span>EPOCH: 2025.10–2035.12</span>
            <span>INDEX-REGISTRY: IN-40</span>
          </div>
        </div>

        {/* Poster Header Section */}
        <div className="pt-6 pb-4 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest font-semibold text-teal-700 dark:text-teal-400">
              NATIONAL MACRO-SYNTHESIS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-heading font-black text-slate-900 dark:text-slate-50 mt-1 tracking-tight">
              The Architecture of Work in India
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              A high-dimensional projection of task automatability, wage elasticity, and cultural discretion parameters across key Indian economic clusters over the next decade.
            </p>
          </div>

          {/* Key Metric Tags */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto font-mono text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Task Triage Frontier</span>
              <span className="text-base font-bold text-rose-600 dark:text-rose-400">64.2%</span>
              <span className="text-[10px] text-slate-500 block">Formal Desk Roles</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Physical Barrier</span>
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">89.1%</span>
              <span className="text-[10px] text-slate-500 block">Dexterity Insulation</span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Regulatory Friction</span>
              <span className="text-base font-bold text-amber-600 dark:text-amber-400">High</span>
              <span className="text-[10px] text-slate-500 block">Statutory Liability</span>
            </div>
          </div>
        </div>

        {/* Abstract Architectural SVG Visual Landscape */}
        <div className="relative my-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-[#070B14]/90 p-4 sm:p-6 overflow-hidden">
          {/* Subtle Vector Background Grid */}
          <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.25] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="footerAbstractGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-800" />
                  <circle cx="30" cy="30" r="0.8" fill="currentColor" className="text-slate-400 dark:text-slate-700" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#footerAbstractGrid)" />
            </svg>
          </div>

          {/* Generative Multi-Wave Harmonic Graph */}
          <div className="relative">
            <svg viewBox="0 0 1200 240" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Vertical Time Slice Decades */}
              {[150, 300, 450, 600, 750, 900, 1050].map((x, idx) => (
                <g key={idx}>
                  <line x1={x} y1="20" x2={x} y2="220" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" className="text-slate-200 dark:text-slate-800" />
                  <text x={x} y="235" fill="currentColor" className="text-slate-400 dark:text-slate-600 font-mono text-[9px]" textAnchor="middle">
                    {2024 + idx * 2}
                  </text>
                </g>
              ))}

              {/* Wave 1: Repetitive Symbolic Processing */}
              <path
                d="M 50 170 C 200 150, 320 80, 500 45 C 700 20, 900 35, 1150 25"
                stroke="#EF4444"
                strokeWidth="2.5"
                className="opacity-90"
              />
              <path
                d="M 50 185 C 210 165, 330 95, 510 60 C 710 35, 910 50, 1150 40"
                stroke="#EF4444"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                className="opacity-60 animate-wave-flow"
              />

              {/* Wave 2: Augmentation Zone (Human-in-the-Loop) */}
              <path
                d="M 50 130 C 220 120, 380 155, 600 115 C 800 80, 950 125, 1150 95"
                stroke="#0F766E"
                strokeWidth="2.2"
                className="opacity-95"
              />
              <path
                d="M 50 142 C 230 132, 390 168, 610 128 C 810 92, 960 138, 1150 108"
                stroke="#0F766E"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="opacity-50 animate-wave-flow"
              />

              {/* Wave 3: Physical & Tacit Interpersonal Stability */}
              <path
                d="M 50 205 C 220 200, 400 210, 620 195 C 840 185, 980 190, 1150 180"
                stroke="#10B981"
                strokeWidth="2"
                className="opacity-90"
              />

              {/* Mathematical Crosshairs & Intersection Callouts */}
              <g>
                <circle cx="500" cy="45" r="4" fill="#EF4444" />
                <circle cx="500" cy="45" r="10" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" />
                <line x1="500" y1="45" x2="500" y2="15" stroke="#EF4444" strokeWidth="0.8" />
                <text x="500" y="10" fill="#EF4444" className="font-mono text-[9px] font-bold" textAnchor="middle">
                  BPO &amp; Code Triage Parity
                </text>
              </g>

              <g>
                <circle cx="800" cy="80" r="4" fill="#0F766E" />
                <line x1="800" y1="80" x2="800" y2="50" stroke="#0F766E" strokeWidth="0.8" />
                <text x="800" y="44" fill="#0F766E" className="font-mono text-[9px] font-bold" textAnchor="middle">
                  Agentic Enterprise Supervisor
                </text>
              </g>

              <g>
                <circle cx="980" cy="190" r="4" fill="#10B981" />
                <line x1="980" y1="190" x2="980" y2="215" stroke="#10B981" strokeWidth="0.8" />
                <text x="980" y="226" fill="#10B981" className="font-mono text-[9px] font-bold" textAnchor="middle">
                  Embodied Physical Safety Net
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Geographic Hub Coordinates Strip */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                Major Indian Employment Clusters &amp; Automation Exposure Profile
              </span>
              <span className="text-[9px] font-mono text-slate-400">Hover / Click to inspect cluster</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {indianHubs.map((hub) => {
                const isSelected = activeCity === hub.name;
                return (
                  <button
                    key={hub.name}
                    onClick={() => setActiveCity(isSelected ? null : hub.name)}
                    onMouseEnter={() => setActiveCity(hub.name)}
                    className={`text-left p-2.5 rounded-lg border transition-all text-xs font-mono ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 dark:border-teal-600 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px] truncate">{hub.name}</span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hub.riskColor }} />
                    </div>
                    <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 truncate">{hub.lat}</div>
                    <div className="text-[10px] font-semibold mt-1" style={{ color: hub.riskColor }}>
                      {hub.exposure}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hub Detail Drawer if selected */}
            {activeCity && (
              <div className="mt-3 p-3 rounded-lg bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold font-mono text-teal-900 dark:text-teal-200 mr-2">{activeCity} Vector Profile:</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {indianHubs.find((h) => h.name === activeCity)?.focus}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-teal-800 dark:text-teal-400 font-semibold shrink-0">
                  {indianHubs.find((h) => h.name === activeCity)?.exposure}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Abstract Poster Colophon / Quick Navigation */}
        <div className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-600 dark:bg-teal-400 rounded-xs" />
            <span>AIJobWatch Data Architecture 2026 // Public Domain Education</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/methodology" className="hover:text-teal-700 dark:hover:text-teal-400 underline decoration-slate-300">
              Methodology &amp; Formula
            </Link>
            <Link to="/timeline" className="hover:text-teal-700 dark:hover:text-teal-400 underline decoration-slate-300">
              Milestone Horizon
            </Link>
            <Link to="/compare" className="hover:text-teal-700 dark:hover:text-teal-400 underline decoration-slate-300">
              Career Comparison
            </Link>
            <Link to="/quiz" className="hover:text-teal-700 dark:hover:text-teal-400 underline decoration-slate-300">
              Self Assessment Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
