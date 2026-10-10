import React from 'react';
import { ExternalLink, Award, BookOpen } from 'lucide-react';

interface CourseRecommendation {
  title: string;
  provider: string;
  url?: string;
  badge?: string;
}

interface AffiliateBoxProps {
  jobTitle: string;
  skills: string[];
  recommendedCourses?: CourseRecommendation[];
  className?: string;
}

export const AffiliateBox: React.FC<AffiliateBoxProps> = ({
  jobTitle,
  skills,
  recommendedCourses,
  className = '',
}) => {
  // Default fallback recommendations tailored to Indian upskilling ecosystem
  const defaultCourses: CourseRecommendation[] = recommendedCourses || [
    {
      title: `Advanced AI Workflows & Systems for ${jobTitle}`,
      provider: 'SWAYAM / NPTEL (IIT Madras & Kharagpur)',
      url: '#',
      badge: 'Govt. Accredited',
    },
    {
      title: 'Prompt Engineering & Autonomous Systems Specialization',
      provider: 'Coursera / DeepLearning.AI',
      url: '#',
      badge: 'Industry Standard',
    },
    {
      title: 'Enterprise AI Governance, Cloud & Practical Prompting',
      provider: 'UpGrad / Great Learning Professional Certificate',
      url: '#',
      badge: 'Placement Assisted',
    },
  ];

  return (
    <div
      className={`border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg p-5 shadow-xs my-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-medium">
            <Award className="w-4 h-4" />
            <span>Recommended Career Transition Pathways</span>
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mt-1 font-serif-heading">
            Upskilling & Certifications for {jobTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Hand-curated programs designed to help Indian professionals advance beyond automatable tasks.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {defaultCourses.map((course, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {course.title}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>{course.provider}</span>
                  {course.badge && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{course.badge}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <a
              href={course.url || '#'}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-900 dark:text-slate-100 hover:underline px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shrink-0 ml-3"
            >
              <span>Explore Course</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        ))}
      </div>

      {skills.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200 font-medium">Core Target Competencies: </strong>
          {skills.slice(0, 4).join(', ')}
        </div>
      )}

      <div className="mt-3 text-[10px] text-slate-400 dark:text-slate-500">
        * Disclosure: Educational links may generate affiliate commissions at zero additional cost to you, supporting AIJobWatch research.
      </div>
    </div>
  );
};
