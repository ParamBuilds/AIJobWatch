import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Calendar, Filter, Sparkles, Layers, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';
import { AdSlot } from '../components/AdSlot';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { Reveal } from '../components/animations/Reveal';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';
import timelineData from '../data/timeline.json';
import sectorsData from '../data/sectors.json';
import { TimelineMilestone, Sector } from '../types';

export const TimelinePage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const milestones = timelineData as (TimelineMilestone & { verify?: boolean })[];
  const sectors = sectorsData as Sector[];

  const filteredMilestones = selectedSector === 'all'
    ? milestones
    : milestones.filter((m) => m.sector === selectedSector);

  // Scroll-linked progress for drawing the central vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 90%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-5xl mx-auto">
      <SEOHelmet
        title="India AI Automation Timeline (2012–2035) – 29 Verifiable Milestones"
        description="Chronological forecast of artificial intelligence adoption waves across Indian IT, BPO, BFSI, Healthcare, and Agriculture from AlexNet to 2035."
        canonicalPath="/timeline"
      />

      <Breadcrumbs items={[{ label: 'Milestones Timeline' }]} />

      <Reveal>
        <div className="text-center max-w-2xl mx-auto my-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-full mb-3">
            <span>Diffusion Curve Analysis</span>
            <span aria-hidden="true">·</span>
            <span>2012 to 2035 Horizon</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
            India AI Automation Timeline
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            From the 2012 deep learning renaissance to projected 2035 freight automation. Scroll down to see milestone waves alternating across Indian industries.
          </p>
        </div>
      </Reveal>

      {/* Sector Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 my-6 flex items-center gap-2 overflow-x-auto text-xs shadow-xs">
        <span className="text-slate-400 font-mono uppercase text-[10px] pl-2 shrink-0 font-semibold">
          Filter Sector:
        </span>
        <button
          type="button"
          onClick={() => setSelectedSector('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 font-medium ${
            selectedSector === 'all'
              ? 'bg-teal-800 dark:bg-teal-700 text-white font-semibold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Milestones ({milestones.length})
        </button>

        {sectors.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setSelectedSector(s.slug)}
            className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 font-medium ${
              selectedSector === s.slug
                ? 'bg-teal-800 dark:bg-teal-700 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <AdSlot position="header" />

      {/* Scroll-Linked Timeline Stream */}
      <div ref={containerRef} className="relative my-12">
        {/* Background Grey Track Line (Desktop Centered / Mobile Left) */}
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

        {/* Scroll-linked Animated Foreground Line (Drawn on scroll) */}
        {!shouldReduceMotion && (
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 bg-gradient-to-b from-teal-600 via-amber-500 to-rose-600 -translate-x-1/2 origin-top"
          />
        )}

        <div className="space-y-10 sm:space-y-12">
          {filteredMilestones.map((m, idx) => {
            const isEven = idx % 2 === 0;

            const statusBadge =
              m.status === 'past'
                ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                : m.status === 'current'
                ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900/60'
                : 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-900/60';

            const impactColor =
              m.impactLevel === 'Transformational' ? 'text-rose-600 dark:text-rose-400' :
              m.impactLevel === 'High' ? 'text-orange-600 dark:text-orange-400' : 'text-amber-600 dark:text-amber-400';

            return (
              <div
                key={m.id}
                className="relative flex flex-col md:flex-row items-center"
              >
                {/* Timeline Center Node Circle */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 w-5 h-5 rounded-full border-3 border-white dark:border-slate-900 shadow-sm z-10 flex items-center justify-center bg-teal-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Card Container (Left on even, Right on odd for desktop) */}
                <div
                  className={`w-full pl-14 md:pl-0 md:w-1/2 ${
                    isEven ? 'md:pr-10 md:text-right' : 'md:ml-auto md:pl-10 md:text-left'
                  }`}
                >
                  <Reveal yOffset={16} delay={0.05}>
                    <div className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors text-left">
                      <AbstractCardAccent code={`HORIZON // ${m.year}`} />
                      {/* Top Bar: Year & Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="font-serif-heading font-bold text-xl text-slate-900 dark:text-slate-100">
                            {m.year}
                          </span>
                          <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${statusBadge}`}>
                            {m.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${impactColor}`}>
                            {m.impactLevel}
                          </span>
                          {m.verify && (
                            <span className="text-[10px] font-mono text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                              Peer Review
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Sector Link */}
                      <h2 className="text-base font-serif-heading font-bold text-slate-900 dark:text-slate-100 mt-3">
                        {m.title}
                      </h2>

                      <div className="text-[11px] font-mono text-teal-800 dark:text-teal-400 mt-0.5 font-semibold">
                        <Link to={`/sectors/${m.sector}`} className="hover:underline">
                          {m.sectorName}
                        </Link>
                      </div>

                      {/* Description */}
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {m.description}
                      </p>

                      {/* India Relevance Box */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/30 p-3 rounded-xl text-xs">
                        <strong className="text-slate-800 dark:text-slate-200 font-semibold block mb-0.5">
                          India Workforce Impact:
                        </strong>
                        <span className="text-slate-600 dark:text-slate-400 leading-snug">
                          {m.indiaRelevance}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AdSlot position="in-content" />

      <div className="mt-8">
        <DisclaimerBanner />
      </div>
    </div>
  );
};
