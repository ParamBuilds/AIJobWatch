import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';
import { AdSlot } from '../components/AdSlot';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';
import blogData from '../data/blog.json';
import { BlogPost } from '../types';

export const BlogListPage: React.FC = () => {
  const posts = blogData as BlogPost[];

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-4xl mx-auto">
      <SEOHelmet
        title="Research & Labor Essays – AIJobWatch India"
        description="In-depth analyses, economic reports, and labor policy insights exploring how artificial intelligence is transforming the Indian workforce."
        canonicalPath="/blog"
      />

      <Breadcrumbs items={[{ label: 'Research & Articles' }]} />

      <div className="text-center max-w-2xl mx-auto my-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full mb-3">
          <span>AIJobWatch Dispatch</span>
          <span aria-hidden="true">·</span>
          <span>In-Depth Essays</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
          Labor Intelligence & Analysis
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Rigorous, non-sensational essays on tech diffusion, wage changes, and occupational transition in India.
        </p>
      </div>

      <AdSlot position="header" />

      <div className="space-y-6 my-8">
        {posts.map((post, pIdx) => (
          <article
            key={post.slug}
            className="relative overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-7 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
          >
            <AbstractCardAccent code={`ESSAY // 0${pIdx + 1}`} />
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>By {post.author}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif-heading font-bold text-slate-900 dark:text-slate-100 hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
              <Link to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-900 dark:text-slate-100 hover:underline shrink-0"
              >
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AdSlot position="in-content" />
    </div>
  );
};
