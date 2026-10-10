import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Activity, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  ArrowRight, 
  Cpu, 
  ArrowLeftRight, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Calendar,
  Compass
} from 'lucide-react';
import ContributionSkyline, { PaletteName } from '@/components/ui/contribution-skyline';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';
import { AdSlot } from '../components/AdSlot';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';
import { useLanguage } from '../context/LanguageContext';
import sectorsData from '../data/sectors.json';
import jobsData from '../data/jobs.json';
import { Sector, Job } from '../types';

export const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPalette, setSelectedPalette] = useState<PaletteName>('ocean');
  const [skylineView, setSkylineView] = useState<'2d' | '3d'>('3d');

  const sectors = sectorsData as Sector[];
  const jobs = jobsData as Job[];

  // Macro Metrics
  const totalJobs = jobs.length;
  const avgRisk = Math.round(jobs.reduce((acc, j) => acc + j.score, 0) / totalJobs);
  const highRiskCount = jobs.filter((j) => j.score >= 60).length;
  const safeCount = jobs.filter((j) => j.score < 40).length;

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-6xl mx-auto">
      <SEOHelmet
        title="National AI Labor Activity & Exposure Dashboard – 3D Skyline Telemetry"
        description="Interactive 3D isometric contribution skyline tracking AI research dispatches, labor risk adjustments, and task automation milestones across India."
        canonicalPath="/dashboard"
      />

      <Breadcrumbs items={[{ label: 'National Dashboard' }]} />

      {/* Header Banner */}
      <div className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 rounded-full mb-3 font-semibold">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>REAL-TIME MACRO TELEMETRY // INDIA TRANSITION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          {t('dashboard.title', 'National AI Labor Activity & Exposure Dashboard')}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {t('dashboard.subtitle', '3D Isometric Skyline and telemetry of automation research releases, daily risk adjustments, and skill transition velocity across India.')}
        </p>
      </div>

      {/* Macro Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <AbstractCardAccent code="IDX // AGGREGATE" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-1">
            Avg India Exposure
          </div>
          <div className="text-2xl sm:text-3xl font-serif-heading font-black text-slate-900 dark:text-slate-50">
            {avgRisk}<span className="text-sm font-sans font-normal text-slate-400">/100</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Weighted cross-sector baseline across 40 formal occupations.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <AbstractCardAccent code="RISK // ACCELERATION" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold mb-1">
            High Exposure Occupations
          </div>
          <div className="text-2xl sm:text-3xl font-serif-heading font-black text-rose-600 dark:text-rose-400">
            {highRiskCount} <span className="text-xs font-sans font-normal text-slate-400">of 40 roles</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Roles facing heavy task compression within 2–4 years.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <AbstractCardAccent code="SAFE // INSULATION" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold mb-1">
            Resilient Anchors
          </div>
          <div className="text-2xl sm:text-3xl font-serif-heading font-black text-emerald-600 dark:text-emerald-400">
            {safeCount} <span className="text-xs font-sans font-normal text-slate-400">roles shielded</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Tactile, relational, and physical empathy moats.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <AbstractCardAccent code="HORIZON // 2025-35" />
          <div className="text-[10px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold mb-1">
            Transition Window
          </div>
          <div className="text-2xl sm:text-3xl font-serif-heading font-black text-teal-700 dark:text-teal-300">
            10 Yrs <span className="text-xs font-sans font-normal text-slate-400">diffusion</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Phased absorption from cognitive desk work to embodied robotics.
          </p>
        </div>
      </div>

      {/* Skyline Palette & Configuration Controls */}
      <div className="my-6 p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-serif-heading font-bold text-slate-900 dark:text-slate-100">
              {t('dashboard.skylineTitle', 'Yearly Automation Benchmark & Transition Events')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive 365-day isometric activity grid. Drag to orbit in 3D, double-click to reset angle, hover days to inspect milestone telemetry.
            </p>
          </div>

          {/* Palette Selector */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">Theme:</span>
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
              {(['ocean', 'github', 'ember', 'grape'] as PaletteName[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPalette(p)}
                  className={`px-2.5 py-1 rounded-md capitalize font-mono text-[11px] transition-colors ${
                    selectedPalette === p
                      ? 'bg-white dark:bg-slate-900 font-bold text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Contribution Skyline Canvas Centerpiece */}
        <div className="mt-4">
          <ContributionSkyline
            palette={selectedPalette}
            view={skylineView}
            onViewChange={setSkylineView}
            unit="milestone"
            unitPlural="milestones"
            heightScale={1.15}
            title={
              <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                Annual Labor Benchmark & Model Diffusion Skyline
              </span>
            }
          />
        </div>
      </div>

      {/* Sector Vulnerability & Quick Transition Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        {/* Sector Exposure Heatmap Summary */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif-heading font-bold text-lg text-slate-900 dark:text-slate-100">
                Leading Sector Vulnerability Profiles
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                National exposure index by economic segment
              </p>
            </div>
            <Link
              to="/#sectors"
              className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <span>All 11 Sectors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {sectors.slice(0, 6).map((sec) => (
              <div
                key={sec.slug}
                className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <Link
                    to={`/sectors/${sec.slug}`}
                    className="font-semibold text-sm text-slate-900 dark:text-slate-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                  >
                    {sec.name}
                  </Link>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {sec.employmentShareIndia} · Timeline: {sec.timeline}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-serif-heading font-bold ${
                    sec.avgScore >= 65 ? 'text-rose-600 dark:text-rose-400' :
                    sec.avgScore >= 45 ? 'text-amber-600 dark:text-amber-400' :
                    'text-teal-600 dark:text-teal-400'
                  }`}>
                    {sec.avgScore}/100
                  </span>
                  <div className="text-[10px] uppercase font-mono text-slate-400">
                    {sec.overallRisk}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Action Hub */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-serif-heading font-bold text-lg text-slate-900 dark:text-slate-100">
              Interactive Tools
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Navigate individual career dossiers, comparative radar analysis, and self-assessment tools.
            </p>

            <div className="space-y-3">
              <Link
                to="/quiz"
                className="flex items-center justify-between p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <div>
                    <div className="text-xs font-bold">Career Vulnerability Quiz</div>
                    <div className="text-[10px] opacity-80">Calculate your personal exposure score</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/compare"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ArrowLeftRight className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-xs font-bold">Compare Any 2 Careers</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Head-to-head radar analysis</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/timeline"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-xs font-bold">Adoption Timeline</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">2012–2035 India Milestones</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">Methodology Note</span>
            Data harmonized from National Sample Survey Office (PLFS), ILO automation matrix, and NASSCOM GCC dispatches.
          </div>
        </div>
      </div>

      <AdSlot position="in-content" />
    </div>
  );
};
