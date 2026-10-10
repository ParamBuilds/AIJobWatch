import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { StaggerList, StaggerItem } from '../animations/StaggerList';
import { TaskItem } from '../../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface AnimatedTaskBreakdownProps {
  tasks: TaskItem[];
}

export const AnimatedTaskBreakdown: React.FC<AnimatedTaskBreakdownProps> = ({ tasks }) => {
  const shouldReduceMotion = useReducedMotion();

  const getStatusConfig = (status: TaskItem['status']) => {
    switch (status) {
      case 'now':
        return {
          label: 'Automatable now',
          barPercent: 95,
          color: 'text-rose-700 dark:text-rose-400',
          badge: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300',
          barColor: 'bg-rose-500',
          icon: AlertCircle,
        };
      case '5years':
        return {
          label: 'Within 5 years',
          barPercent: 60,
          color: 'text-amber-700 dark:text-amber-400',
          badge: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300',
          barColor: 'bg-amber-500',
          icon: Clock,
        };
      case 'unlikely':
      default:
        return {
          label: 'Unlikely / Resilient',
          barPercent: 15,
          color: 'text-teal-700 dark:text-teal-400',
          badge: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-900/60 text-teal-800 dark:text-teal-300',
          barColor: 'bg-teal-500',
          icon: CheckCircle2,
        };
    }
  };

  return (
    <div className="space-y-3">
      <StaggerList staggerDelay={0.07} className="space-y-3">
        {tasks.map((task, idx) => {
          const cfg = getStatusConfig(task.status);
          const Icon = cfg.icon;

          return (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.01, x: 3 }}
                transition={{ duration: 0.18 }}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xs hover:border-teal-400 dark:hover:border-teal-700/60 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Icon className={`w-4 h-4 shrink-0 ${cfg.color}`} />
                    <span>{task.name}</span>
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shrink-0 ${cfg.badge}`}
                  >
                    <span>{cfg.label}</span>
                  </span>
                </div>

                {/* Technical Note */}
                {task.note && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 pl-6 leading-relaxed">
                    {task.note}
                  </p>
                )}

                {/* Animated Task Automation Progress Bar */}
                <div className="pl-6 flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    {shouldReduceMotion ? (
                      <div
                        style={{ width: `${cfg.barPercent}%` }}
                        className={`h-full ${cfg.barColor}`}
                      />
                    ) : (
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cfg.barPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className={`h-full ${cfg.barColor}`}
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                    {cfg.barPercent}% automation exposure
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerList>
    </div>
  );
};
