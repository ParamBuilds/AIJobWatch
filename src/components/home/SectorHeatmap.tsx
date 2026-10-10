import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { StaggerList, StaggerItem } from '../animations/StaggerList';
import { Reveal } from '../animations/Reveal';
import { ArrowRight, Info, Layers } from 'lucide-react';
import { AbstractMetricGlyph } from '../abstract/AbstractMetricGlyph';
import sectorsData from '../../data/sectors.json';
import { Sector } from '../../types';

export const SectorHeatmap: React.FC = () => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const sectors = sectorsData as Sector[];

  // Heatmap background color based on score
  const getHeatmapColor = (score: number) => {
    if (score >= 80) {
      return {
        bg: 'bg-rose-50/90 dark:bg-rose-950/30',
        border: 'border-rose-200 dark:border-rose-900/60',
        badge: 'text-rose-700 dark:text-rose-400 bg-rose-100/80 dark:bg-rose-900/40',
        bar: 'bg-rose-500',
      };
    }
    if (score >= 60) {
      return {
        bg: 'bg-orange-50/90 dark:bg-orange-950/30',
        border: 'border-orange-200 dark:border-orange-900/60',
        badge: 'text-orange-700 dark:text-orange-400 bg-orange-100/80 dark:bg-orange-900/40',
        bar: 'bg-orange-500',
      };
    }
    if (score >= 40) {
      return {
        bg: 'bg-amber-50/90 dark:bg-amber-950/30',
        border: 'border-amber-200 dark:border-amber-900/60',
        badge: 'text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/40',
        bar: 'bg-amber-500',
      };
    }
    return {
      bg: 'bg-teal-50/90 dark:bg-teal-950/30',
      border: 'border-teal-200 dark:border-teal-900/60',
      badge: 'text-teal-700 dark:text-teal-400 bg-teal-100/80 dark:bg-teal-900/40',
      bar: 'bg-teal-500',
    };
  };

  return (
    <section id="sectors" className="max-w-6xl mx-auto px-4 sm:px-6 my-16">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-teal-800 dark:text-teal-400 font-bold mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Cross-Industry Heatmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
              India Sector Exposure Heatmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Tiles are color-coded by average AI exposure score. Hover for impact windows, employment size, and key drivers.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Low (&lt;40)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Mod (40-59)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> High (60-79)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Very High (80+)
            </span>
          </div>
        </div>
      </Reveal>

      {/* Heatmap Grid */}
      <StaggerList staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sectors.map((sec, idx) => {
          const colors = getHeatmapColor(sec.avgScore);
          const isHovered = hoveredSlug === sec.slug;

          return (
            <StaggerItem key={sec.slug}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.18 } }}
                onMouseEnter={() => setHoveredSlug(sec.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="h-full"
              >
                <Link
                  to={`/sectors/${sec.slug}`}
                  className={`relative flex flex-col justify-between h-full p-4 rounded-xl border ${colors.border} ${colors.bg} shadow-xs hover:shadow-md transition-shadow group overflow-hidden`}
                >
                  {/* Abstract Corner Indicator */}
                  <span className="absolute top-1 right-1 font-mono text-[8px] text-slate-400/40 select-none pointer-events-none">
                    ┐
                  </span>
                  <span className="absolute bottom-1 left-1 font-mono text-[8px] text-slate-400/40 select-none pointer-events-none">
                    └
                  </span>

                  <div>
                    {/* Header: Name, Glyph & Score */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <AbstractMetricGlyph score={sec.avgScore} label={sec.overallRisk} size={22} />
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 block">
                            SEC-0{idx + 1}
                          </span>
                          <h3 className="font-serif-heading font-semibold text-base text-slate-900 dark:text-slate-100 group-hover:text-teal-800 dark:group-hover:text-teal-300 transition-colors">
                            {sec.name}
                          </h3>
                        </div>
                      </div>
                      <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${colors.badge} shrink-0`}>
                        {sec.avgScore}/100
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {sec.shortDesc}
                    </p>
                  </div>

                  {/* Meter Bar & Metadata */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
                    <div className="w-full bg-slate-200/60 dark:bg-slate-700/60 h-1.5 rounded-full overflow-hidden mb-2">
                      {shouldReduceMotion ? (
                        <div
                          style={{ width: `${sec.avgScore}%` }}
                          className={`h-full ${colors.bar}`}
                        />
                      ) : (
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${sec.avgScore}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: idx * 0.04 }}
                          className={`h-full ${colors.bar}`}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Timeline: <strong>{sec.timeline}</strong></span>
                      <span className="font-mono text-[10px]">{sec.employmentShareIndia}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Sector Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerList>
    </section>
  );
};
