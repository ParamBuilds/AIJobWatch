import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CountUp } from '../animations/CountUp';
import { Reveal } from '../animations/Reveal';
import { Briefcase, Layers, BookOpen, Lock } from 'lucide-react';
import { AbstractCardAccent } from '../abstract/AbstractCardAccent';
import { useLanguage } from '../../context/LanguageContext';

export const StatsStrip: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const stats = [
    {
      value: 40,
      suffix: '',
      label: t('stats.jobsCount', 'Indian Careers Analyzed'),
      description: t('stats.jobsDesc', 'Decomposed into discrete automatable tasks'),
      icon: Briefcase,
    },
    {
      value: 11,
      suffix: '',
      label: t('stats.sectorsCount', 'Economic Sectors Covered'),
      description: t('stats.sectorsDesc', 'From BPO & IT to Healthcare & Agriculture'),
      icon: Layers,
    },
    {
      value: 350,
      suffix: '+',
      label: t('stats.studiesCount', 'Research Studies & Data Inputs'),
      description: t('stats.studiesDesc', 'NASSCOM, PLFS, ILO, and Stanford HAI citations'),
      icon: BookOpen,
    },
    {
      value: 100,
      suffix: '%',
      label: t('stats.privateCount', 'Private & Local Processing'),
      description: t('stats.privateDesc', 'Zero cookies required, no user data collected'),
      icon: Lock,
    },
  ];

  return (
    <section aria-label="Index Statistics" className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
      <Reveal>
        <div className="relative overflow-hidden grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <AbstractCardAccent code="STATS // LABOUR-METRIC" />
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col space-y-1.5 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-default"
              >
                <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400">
                  <Icon className="w-4 h-4 opacity-80" />
                  <span className="font-serif-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-slate-50">
                    <CountUp to={stat.value} suffix={stat.suffix} duration={1.6} />
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {stat.label}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
};
