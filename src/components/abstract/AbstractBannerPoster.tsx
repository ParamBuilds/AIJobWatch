import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Layers, Sparkles, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AbstractBannerPosterProps {
  className?: string;
  themeVariant?: 'home' | 'sector' | 'timeline';
  title?: string;
  subtitle?: string;
}

export const AbstractBannerPoster: React.FC<AbstractBannerPosterProps> = ({
  className = '',
  themeVariant = 'home',
  title = 'THE MACRO DISPLACEMENT FIELD',
  subtitle = 'Algorithmic Task Substitution & Occupational Resilience across 40 Indian Careers (2025–2035)',
}) => {
  const [activeTab, setActiveTab] = useState<'contours' | 'dispersion' | 'vectors'>('contours');
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Nodes for the abstract dispersion visualization
  const vectorNodes = [
    { id: 1, label: 'Data Entry & Triage', x: 120, y: 70, risk: 'Very High', color: '#EF4444', score: 92, year: '2025–2027' },
    { id: 2, label: 'BPO Tier-1 Voice', x: 260, y: 110, risk: 'Very High', color: '#EF4444', score: 78, year: '2027–2030' },
    { id: 3, label: 'Junior Code Generation', x: 420, y: 85, risk: 'High', color: '#F97316', score: 74, year: '2026–2029' },
    { id: 4, label: 'Financial Auditing', x: 570, y: 140, risk: 'Moderate', color: '#F59E0B', score: 62, year: '2028–2032' },
    { id: 5, label: 'Ayurvedic & Clinical', x: 720, y: 190, risk: 'Low', color: '#10B981', score: 28, year: '2033+' },
    { id: 6, label: 'Courtroom Litigator', x: 860, y: 175, risk: 'Low', color: '#10B981', score: 22, year: '2035+' },
  ];

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-800 bg-[#F9F7F1] dark:bg-[#090E17] text-slate-900 dark:text-slate-100 shadow-sm transition-all duration-300 ${className}`}
      aria-label="Abstract Research Poster Banner"
    >
      {/* Abstract Background Noise & Technical Grid Matrix */}
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#0F766E_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Decorative Technical Coordinate Borders & Corner Markers */}
      <div className="absolute top-2 left-3 font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-600 select-none pointer-events-none flex items-center gap-2">
        <span className="text-teal-700 dark:text-teal-400 font-bold">┌ // IND-INDEX</span>
        <span>LAT: 28°36&apos;N</span>
        <span>LON: 77°12&apos;E</span>
        <span className="hidden sm:inline">HORIZON: 2025–2035</span>
      </div>

      <div className="absolute top-2 right-3 font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-600 select-none pointer-events-none flex items-center gap-2">
        <span className="hidden sm:inline">DIFFUSION TENSOR: ε-40</span>
        <span className="text-teal-700 dark:text-teal-400 font-bold">┐</span>
      </div>

      <div className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-600 select-none pointer-events-none">
        <span className="text-teal-700 dark:text-teal-400 font-bold">└ // RESEARCH SPEC</span>
      </div>

      <div className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-600 select-none pointer-events-none">
        <span className="text-teal-700 dark:text-teal-400 font-bold">┘ // CITATION REF 2026</span>
      </div>

      {/* Poster Interior Container */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        {/* Top Editorial Header Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest text-teal-800 dark:text-teal-300 bg-teal-100/60 dark:bg-teal-950/60 border border-teal-300/40 dark:border-teal-700/40">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse" />
              <span>Computational Cartography</span>
              <span>•</span>
              <span>Poster 01</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif-heading font-black tracking-tight text-slate-900 dark:text-slate-50 mt-1">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Interactive Mode Toggles */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-300/60 dark:border-slate-700/60 text-xs font-mono self-stretch sm:self-auto justify-between sm:justify-start">
            {[
              { id: 'contours', label: 'Contour Wave' },
              { id: 'vectors', label: 'Vector Drift' },
              { id: 'dispersion', label: 'Task Lattice' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'contours' | 'dispersion' | 'vectors')}
                className={`relative px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-teal-900 dark:text-teal-200'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="bannerActiveTab"
                    className="absolute inset-0 bg-white dark:bg-slate-900 rounded-md shadow-xs"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Abstract Generative Graphic Centerpiece */}
        <div className="relative my-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#070B12]/80 backdrop-blur-xs overflow-hidden p-4 sm:p-6">
          {/* Subtle Abstract Cartesian Grid Lines */}
          <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="abstractGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400 dark:text-slate-700" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#abstractGrid)" />
            </svg>
          </div>

          {/* VIEW 1: CONTOUR WAVE (Topological automation isobar curves) */}
          {activeTab === 'contours' && (
            <div className="relative">
              <svg viewBox="0 0 1000 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="waveGradTeal" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0F766E" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#0D9488" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="waveGradRed" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#F97316" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Horizon Year Labels at top */}
                {[
                  { yr: '2024', x: 80 },
                  { yr: '2026', x: 250 },
                  { yr: '2028', x: 450 },
                  { yr: '2030', x: 650 },
                  { yr: '2032', x: 820 },
                  { yr: '2035', x: 950 },
                ].map((item, i) => (
                  <g key={i}>
                    <line x1={item.x} y1="15" x2={item.x} y2="265" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" className="text-slate-300 dark:text-slate-800" />
                    <text x={item.x} y="25" fill="currentColor" className="text-slate-400 dark:text-slate-500 text-[10px] font-mono" textAnchor="middle">
                      {item.yr}
                    </text>
                  </g>
                ))}

                {/* Wave Layer 1: Physical Dexterity & Relational Judgment Floor (Low Risk) */}
                <path
                  d="M 30 230 C 180 220, 320 235, 480 215 C 640 195, 780 205, 970 190"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />
                <path
                  d="M 30 240 C 200 232, 350 242, 500 225 C 660 210, 800 218, 970 205"
                  stroke="#10B981"
                  strokeWidth="1.2"
                  strokeDasharray="6 6"
                  opacity="0.8"
                  className="animate-wave-flow"
                />

                {/* Wave Layer 2: Synthesizable Cognitive Labor (High Risk Shift) */}
                <path
                  d="M 30 180 C 180 140, 320 95, 500 65 C 680 40, 820 50, 970 45"
                  stroke="url(#waveGradRed)"
                  strokeWidth="3"
                />
                <path
                  d="M 30 195 C 190 160, 330 115, 510 85 C 690 60, 830 70, 970 65"
                  stroke="#EF4444"
                  strokeWidth="1.2"
                  strokeDasharray="8 6"
                  opacity="0.75"
                  className="animate-wave-flow"
                />

                {/* Wave Layer 3: Algorithmic Augmentation Frontier */}
                <path
                  d="M 30 140 C 160 110, 340 160, 520 120 C 700 85, 840 125, 970 110"
                  stroke="url(#waveGradTeal)"
                  strokeWidth="2"
                />

                {/* Abstract Node Pins */}
                <g>
                  <circle cx="250" cy="120" r="4.5" className="fill-rose-500 animate-ping opacity-75" />
                  <circle cx="250" cy="120" r="4.5" className="fill-rose-600" />
                  <line x1="250" y1="120" x2="250" y2="70" stroke="#EF4444" strokeWidth="1" />
                  <rect x="180" y="52" width="140" height="20" rx="3" fill="currentColor" className="text-white dark:text-slate-900 border border-rose-500" />
                  <text x="250" y="66" fill="currentColor" className="text-rose-600 dark:text-rose-400 font-mono text-[9px] font-bold" textAnchor="middle">
                    Tier-1 Voice Autopilot (2026)
                  </text>
                </g>

                <g>
                  <circle cx="500" cy="65" r="4.5" className="fill-amber-500" />
                  <line x1="500" y1="65" x2="500" y2="25" stroke="#F59E0B" strokeWidth="1" />
                  <rect x="430" y="10" width="140" height="20" rx="3" fill="currentColor" className="text-white dark:text-slate-900" />
                  <text x="500" y="24" fill="currentColor" className="text-amber-600 dark:text-amber-400 font-mono text-[9px] font-bold" textAnchor="middle">
                    Agentic Code Triage (2028)
                  </text>
                </g>

                <g>
                  <circle cx="820" cy="205" r="4.5" className="fill-emerald-500" />
                  <line x1="820" y1="205" x2="820" y2="245" stroke="#10B981" strokeWidth="1" />
                  <rect x="745" y="235" width="150" height="20" rx="3" fill="currentColor" className="text-white dark:text-slate-900" />
                  <text x="820" y="249" fill="currentColor" className="text-emerald-700 dark:text-emerald-400 font-mono text-[9px] font-bold" textAnchor="middle">
                    Embodied Clinical Resilience
                  </text>
                </g>
              </svg>
            </div>
          )}

          {/* VIEW 2: VECTOR DRIFT (Interactive nodes) */}
          {activeTab === 'vectors' && (
            <div className="relative">
              <svg viewBox="0 0 1000 260" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal Coordinate Axis */}
                <line x1="60" y1="210" x2="940" y2="210" stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-700" />
                <line x1="60" y1="40" x2="60" y2="210" stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-700" />
                
                <text x="60" y="30" fill="currentColor" className="text-slate-400 font-mono text-[10px]">TASK EXPOSURE (0-100)</text>
                <text x="940" y="225" fill="currentColor" className="text-slate-400 font-mono text-[10px]" textAnchor="end">TIME HORIZON (2025 → 2035)</text>

                {/* Connecting Vector Lines */}
                <path
                  d="M 120 70 L 260 110 L 420 85 L 570 140 L 720 190 L 860 175"
                  stroke="#0F766E"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />

                {/* Nodes */}
                {vectorNodes.map((n) => {
                  const isHovered = hoveredNode === n.id;
                  return (
                    <g
                      key={n.id}
                      onMouseEnter={() => setHoveredNode(n.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="cursor-pointer transition-transform"
                    >
                      {/* Pulse circle on hover */}
                      {isHovered && (
                        <circle cx={n.x} cy={n.y} r="18" fill={n.color} opacity="0.2" className="animate-pulse" />
                      )}
                      
                      {/* Stem */}
                      <line x1={n.x} y1={n.y} x2={n.x} y2="210" stroke={n.color} strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5" />
                      
                      {/* Core circle */}
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={isHovered ? 7 : 5}
                        fill={n.color}
                        stroke="#FAF8F4"
                        strokeWidth="2"
                      />

                      {/* Label */}
                      <text
                        x={n.x}
                        y={n.y - 12}
                        fill="currentColor"
                        className="text-slate-800 dark:text-slate-200 font-mono text-[10px] font-bold"
                        textAnchor="middle"
                      >
                        {n.label}
                      </text>

                      {/* Score Badge */}
                      <rect
                        x={n.x - 22}
                        y="218"
                        width="44"
                        height="18"
                        rx="4"
                        fill="currentColor"
                        className="text-slate-100 dark:text-slate-800"
                        stroke={n.color}
                        strokeWidth="1"
                      />
                      <text
                        x={n.x}
                        y="230"
                        fill={n.color}
                        className="font-mono text-[9px] font-bold"
                        textAnchor="middle"
                      >
                        {n.score}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {/* VIEW 3: TASK DENSITY LATTICE (Matrix of Indian task blocks) */}
          {activeTab === 'dispersion' && (
            <div className="relative">
              <svg viewBox="0 0 1000 240" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 11 Sector Pillars with Abstract Glyphs */}
                {[
                  { name: 'BPO Support', ratio: 78, col: '#EF4444', x: 80 },
                  { name: 'IT & Dev', ratio: 72, col: '#F97316', x: 160 },
                  { name: 'Banking', ratio: 65, col: '#F97316', x: 240 },
                  { name: 'Media/Content', ratio: 68, col: '#F97316', x: 320 },
                  { name: 'Retail Clerical', ratio: 58, col: '#F59E0B', x: 400 },
                  { name: 'Logistics Coord', ratio: 52, col: '#F59E0B', x: 480 },
                  { name: 'Legal Para', ratio: 48, col: '#F59E0B', x: 560 },
                  { name: 'Manufacturing', ratio: 42, col: '#10B981', x: 640 },
                  { name: 'Education', ratio: 38, col: '#10B981', x: 720 },
                  { name: 'Healthcare', ratio: 32, col: '#10B981', x: 800 },
                  { name: 'Agronomy', ratio: 26, col: '#10B981', x: 880 },
                ].map((s, idx) => {
                  const barH = (s.ratio / 100) * 140;
                  const yPos = 180 - barH;
                  return (
                    <g key={idx}>
                      {/* Background slot */}
                      <rect x={s.x - 18} y="40" width="36" height="140" rx="4" fill="currentColor" className="text-slate-100 dark:text-slate-800/40" />
                      
                      {/* Filled bar with gradient */}
                      <rect x={s.x - 16} y={yPos} width="32" height={barH} rx="3" fill={s.col} opacity="0.85" />
                      
                      {/* Technical hash mark */}
                      <line x1={s.x - 12} y1={yPos} x2={s.x + 12} y2={yPos} stroke="#FFFFFF" strokeWidth="1.5" />
                      
                      {/* Score label */}
                      <text x={s.x} y={yPos - 6} fill="currentColor" className="text-slate-700 dark:text-slate-300 font-mono text-[9px] font-bold" textAnchor="middle">
                        {s.ratio}%
                      </text>
                      
                      {/* Title */}
                      <text x={s.x} y="200" fill="currentColor" className="text-slate-500 dark:text-slate-400 font-mono text-[8.5px]" textAnchor="middle">
                        {s.name}
                      </text>
                    </g>
                  );
                })}

                {/* Base reference line */}
                <line x1="40" y1="180" x2="960" y2="180" stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-700" />
              </svg>
            </div>
          )}

          {/* Abstract Legend Strip */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 inline-block" />
                <span>Very High (&gt;75)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-orange-500 inline-block" />
                <span>High (60–74)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" />
                <span>Moderate (40–59)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" />
                <span>Low (&lt;40)</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Source: AIJobWatch Macro Task Matrix (40 Occupations)</span>
            </div>
          </div>
        </div>

        {/* Bottom Abstract Poster Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-mono text-[10px] text-teal-800 dark:text-teal-400 font-bold px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800">
              EXPLORE MATRIX
            </span>
            <span className="hidden md:inline">Compare exposure timelines, task decomposition & salary stability across Indian hubs.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/compare"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:border-teal-600 dark:hover:border-teal-500 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              <span>Compare Two Careers</span>
            </Link>

            <Link
              to="/timeline"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-teal-800 dark:bg-teal-700 text-white text-xs font-semibold hover:bg-teal-900 dark:hover:bg-teal-600 shadow-xs transition-colors"
            >
              <span>View 2023–2035 Timeline</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
