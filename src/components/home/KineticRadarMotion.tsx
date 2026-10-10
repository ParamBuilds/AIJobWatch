import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Zap, Activity, Radio, Cpu, Sparkles, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RadarNode {
  id: string;
  name: string;
  category: string;
  score: number; // 0-100
  threatLevel: 'Critical' | 'Elevated' | 'Moderate' | 'Resilient';
  cityHotspot: string;
  timeline: string;
  angle: number; // in degrees
  distance: number; // normalized radius 0.2 to 0.85
  tasksAffected: string;
  countermeasure: string;
  slug: string;
}

const RADAR_NODES: RadarNode[] = [
  {
    id: 'bpo',
    name: 'BPO Telecaller / Executive',
    category: 'Customer Support',
    score: 88,
    threatLevel: 'Critical',
    cityHotspot: 'Gurugram & Hyderabad',
    timeline: '1–2 Years',
    tasksAffected: 'Voice scripts, Tier-1 inquiry routing, CRM updates',
    countermeasure: 'Pivot to Voice Agent Escalation & Workflow Specialist',
    slug: 'customer-support-executive',
    angle: 35,
    distance: 0.78,
  },
  {
    id: 'qa',
    name: 'Junior Software QA Tester',
    category: 'IT & Software',
    score: 79,
    threatLevel: 'Critical',
    cityHotspot: 'Bengaluru & Pune',
    timeline: '1–3 Years',
    tasksAffected: 'Manual test scripting, basic regression runs, bug reporting',
    countermeasure: 'Upskill to AI-Assisted Test Orchestration & Security Auditing',
    slug: 'software-qa-tester',
    angle: 110,
    distance: 0.72,
  },
  {
    id: 'bank',
    name: 'Bank Clerk / Teller',
    category: 'Banking & Finance',
    score: 82,
    threatLevel: 'Critical',
    cityHotspot: 'Mumbai & Chennai',
    timeline: '2–3 Years',
    tasksAffected: 'Cheque clearing, account data entry, ledger reconciliation',
    countermeasure: 'Move toward Wealth Advisory, MSME Lending & Risk Compliance',
    slug: 'bank-clerk',
    angle: 195,
    distance: 0.75,
  },
  {
    id: 'content',
    name: 'SEO & Copywriter',
    category: 'Media & Marketing',
    score: 84,
    threatLevel: 'Critical',
    cityHotspot: 'Delhi NCR & Bengaluru',
    timeline: 'Immediate (2025–2026)',
    tasksAffected: 'Keyword articles, product descriptions, email draft blasts',
    countermeasure: 'Deepen Technical Thought Leadership, Brand Positioning & Editorial Strategy',
    slug: 'content-writer',
    angle: 285,
    distance: 0.76,
  },
  {
    id: 'data',
    name: 'Data Analyst',
    category: 'Analytics',
    score: 58,
    threatLevel: 'Moderate',
    cityHotspot: 'Hyderabad & Pune',
    timeline: '3–5 Years',
    tasksAffected: 'Standard SQL queries, basic dashboard building in Tableau',
    countermeasure: 'Transition into Predictive Modeling, Data Storytelling & Business Strategy',
    slug: 'data-analyst',
    angle: 65,
    distance: 0.50,
  },
  {
    id: 'ca',
    name: 'Chartered Accountant (CA)',
    category: 'Finance & Audit',
    score: 54,
    threatLevel: 'Moderate',
    cityHotspot: 'Mumbai & Ahmedabad',
    timeline: '4–6 Years',
    tasksAffected: 'Routine book audits, GST reconciliations, voucher tallying',
    countermeasure: 'Focus on Forensic Auditing, M&A Tax Structuring & Board Advisory',
    slug: 'chartered-accountant',
    angle: 155,
    distance: 0.46,
  },
  {
    id: 'nurse',
    name: 'ICU & Staff Nurse',
    category: 'Healthcare',
    score: 18,
    threatLevel: 'Resilient',
    cityHotspot: 'Kochi, Delhi & Chennai',
    timeline: '10+ Years (Highly Protected)',
    tasksAffected: 'Vitals logging, medication cross-checks (augmented, not replaced)',
    countermeasure: 'Bedside patient empathy, complex intravenous triage & motor care',
    slug: 'staff-nurse',
    angle: 235,
    distance: 0.28,
  },
  {
    id: 'civil',
    name: 'Civil Site Engineer',
    category: 'Construction & Infra',
    score: 32,
    threatLevel: 'Resilient',
    cityHotspot: 'Noida, Mumbai & Bengaluru',
    timeline: '8–10 Years',
    tasksAffected: 'Structural inspection logs, site sensor monitoring',
    countermeasure: 'Physical site supervision, contractor liaison & municipal safety',
    slug: 'civil-site-engineer',
    angle: 325,
    distance: 0.35,
  },
];

export const KineticRadarMotion: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<RadarNode>(RADAR_NODES[0]);
  const [radarFilter, setRadarFilter] = useState<'all' | 'critical' | 'resilient'>('all');
  const [pulseTick, setPulseTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const filteredNodes = RADAR_NODES.filter((node) => {
    if (radarFilter === 'critical') return node.score >= 70;
    if (radarFilter === 'resilient') return node.score <= 40;
    return true;
  });

  // Calculate coordinates on 360x360 SVG canvas
  const center = 180;
  const maxRadius = 145;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl p-4 sm:p-6 lg:p-8">
      {/* Background cyber ambient glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              LIVE TELEMETRY // AI THREAT RADAR
            </span>
            <span className="text-slate-500 text-xs hidden sm:inline">|</span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">OCT 2026 REVISION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-white mt-1">
            Indian Workforce Automation Radar
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time displacement vectors mapped across automation wavefronts and resilient human moats.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setRadarFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              radarFilter === 'all'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Roles ({RADAR_NODES.length})
          </button>
          <button
            onClick={() => setRadarFilter('critical')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              radarFilter === 'critical'
                ? 'bg-rose-500 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-rose-300'
            }`}
          >
            High Risk (70%+)
          </button>
          <button
            onClick={() => setRadarFilter('resilient')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              radarFilter === 'resilient'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            Resilient Core
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Canvas on Left, Live Telemetry Inspector on Right */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        {/* Left: Animated Radar Graphic (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
            {/* SVG Interactive Radar Graphic */}
            <svg
              viewBox="0 0 360 360"
              className="w-full h-full drop-shadow-xl select-none"
            >
              <defs>
                {/* Radial Gradient for Radar Sweep */}
                <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                  <stop offset="80%" stopColor="#14b8a6" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                </linearGradient>

                <radialGradient id="centerCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Concentric Range Rings */}
              {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                <circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={maxRadius * scale}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray={scale === 1 ? 'none' : '4 4'}
                  opacity={0.6 + i * 0.1}
                />
              ))}

              {/* Ring Labels */}
              <text x={center} y={center - maxRadius * 0.25 - 4} fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                CORE SHIELD (0-25%)
              </text>
              <text x={center} y={center - maxRadius * 0.5 - 4} fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                AUGMENTED (25-50%)
              </text>
              <text x={center} y={center - maxRadius * 0.75 - 4} fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                ELEVATED (50-75%)
              </text>
              <text x={center} y={center - maxRadius * 1 - 4} fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle">
                DISPLACEMENT BOUNDARY (75-100%)
              </text>

              {/* Crosshair Lines */}
              <line x1={center - maxRadius} y1={center} x2={center + maxRadius} y2={center} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1={center} y1={center - maxRadius} x2={center} y2={center + maxRadius} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1={center - maxRadius * 0.7} y1={center - maxRadius * 0.7} x2={center + maxRadius * 0.7} y2={center + maxRadius * 0.7} stroke="#334155" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />
              <line x1={center - maxRadius * 0.7} y1={center + maxRadius * 0.7} x2={center + maxRadius * 0.7} y2={center - maxRadius * 0.7} stroke="#334155" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />

              {/* Center Core Glow */}
              <circle cx={center} cy={center} r={18} fill="url(#centerCore)" />
              <circle cx={center} cy={center} r={4} fill="#2dd4bf" />

              {/* Rotating Sweep Beam */}
              {!shouldReduceMotion && (
                <g className="origin-center animate-[spin_8s_linear_infinite]">
                  <line
                    x1={center}
                    y1={center}
                    x2={center + maxRadius}
                    y2={center}
                    stroke="#2dd4bf"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                  <polygon
                    points={`${center},${center} ${center + maxRadius},${center} ${center + maxRadius * 0.85},${center + 45}`}
                    fill="url(#sweepGradient)"
                  />
                </g>
              )}

              {/* Radar Nodes Blips */}
              {filteredNodes.map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                const r = maxRadius * node.distance;
                const x = center + r * Math.cos(rad);
                const y = center + r * Math.sin(rad);
                const isSelected = activeNode.id === node.id;
                const isHighThreat = node.score >= 70;
                const nodeColor = isHighThreat ? '#f43f5e' : node.score >= 50 ? '#f59e0b' : '#10b981';

                return (
                  <g
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring around node */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 16 : 10}
                      fill={nodeColor}
                      fillOpacity={isSelected ? 0.25 : 0.12}
                      className={isSelected ? 'animate-pulse' : ''}
                    />

                    {/* Node Core */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 6 : 4.5}
                      fill={nodeColor}
                      stroke="#0f172a"
                      strokeWidth="1.5"
                      className="transition-transform group-hover:scale-125"
                    />

                    {/* Node Text Label */}
                    <text
                      x={x + (x > center ? 8 : -8)}
                      y={y + 3}
                      fill={isSelected ? '#ffffff' : '#94a3b8'}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      textAnchor={x > center ? 'start' : 'end'}
                      className="transition-colors group-hover:fill-white select-none pointer-events-none"
                    >
                      {node.name.split(' ')[0]} ({node.score}%)
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Corner Bracket Motion Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-teal-500/70" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal-500/70" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal-500/70" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-teal-500/70" />
          </div>

          <div className="mt-3 text-[11px] font-mono text-slate-400 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> &gt;70% Vulnerable
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> 50-70% Hybrid
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> &lt;40% Protected
            </span>
          </div>
        </div>

        {/* Right: Detailed Telemetry Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                OCCUPATION INSPECTOR // ID: {activeNode.id.toUpperCase()}
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  activeNode.score >= 70
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : activeNode.score >= 50
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {activeNode.threatLevel} ({activeNode.score}/100)
              </span>
            </div>

            <div className="mt-4">
              <h4 className="text-xl font-bold font-serif-heading text-white">
                {activeNode.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-mono">
                <span>{activeNode.category}</span>
                <span>•</span>
                <span>Hubs: {activeNode.cityHotspot}</span>
              </div>
            </div>

            {/* Impact Metric Bars */}
            <div className="mt-5 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Task Automation Exposure</span>
                  <span className="text-white font-bold">{activeNode.score}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      activeNode.score >= 70
                        ? 'bg-gradient-to-r from-orange-500 to-rose-500'
                        : activeNode.score >= 50
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                        : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                    }`}
                    style={{ width: `${activeNode.score}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Impact Timeline Horizon</div>
                <div className="text-sm font-semibold text-slate-200 mt-0.5">
                  {activeNode.timeline}
                </div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Primary Tasks At Risk</div>
                <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {activeNode.tasksAffected}
                </div>
              </div>

              <div className="bg-teal-950/30 p-3 rounded-xl border border-teal-800/40">
                <div className="text-[11px] font-mono text-teal-400 uppercase font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-teal-400" />
                  Tactical Career Defense
                </div>
                <div className="text-xs text-teal-100 mt-0.5 leading-relaxed">
                  {activeNode.countermeasure}
                </div>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
            <Link
              to={`/jobs/${activeNode.slug}`}
              className="flex-1 text-center py-2 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs rounded-xl transition-all shadow-md"
            >
              Examine Full Analysis →
            </Link>
            <Link
              to="/roadmap"
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all"
            >
              Simulate Transition
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
