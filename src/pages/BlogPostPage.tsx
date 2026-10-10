import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, ArrowLeft, BookOpen, Share2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShareButtons } from '../components/ShareButtons';
import { SEOHelmet } from '../components/SEOHelmet';
import { AdSlot } from '../components/AdSlot';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';
import blogData from '../data/blog.json';
import { BlogPost } from '../types';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const posts = blogData as BlogPost[];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
          Article Not Found
        </h1>
        <Link to="/blog" className="mt-4 inline-block text-sm underline">
          Return to all articles
        </Link>
      </div>
    );
  }

  // Schema.org Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AIJobWatch India',
    },
    mainEntityOfPage: `https://aijobwatch.in/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-3xl mx-auto">
      <SEOHelmet
        title={`${post.title} – AIJobWatch India`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        schemaData={articleSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'Research & Articles', path: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="relative my-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xs overflow-hidden">
        <AbstractCardAccent code={`DISPATCH // ${post.slug.substring(0, 14).toUpperCase()}`} />
        {/* Header */}
        <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed italic">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {post.author}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {post.authorRole}
              </div>
            </div>

            <ShareButtons title={post.title} />
          </div>
        </header>

        <AdSlot position="header" />

        {/* Essay Content Render */}
        <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-5 my-8">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100 pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
              return (
                <div key={idx} className="pl-4 border-l-2 border-slate-300 dark:border-slate-700 py-1 text-sm sm:text-base">
                  {paragraph}
                </div>
              );
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1">
                  {paragraph.split('\n').map((line, lIdx) => (
                    <li key={lIdx}>{line.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        <AdSlot position="in-content" />

        {/* Tags & Footer Navigation */}
        <footer className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-xs text-slate-400 font-medium">Keywords:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Articles</span>
            </Link>

            <Link
              to="/"
              className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            >
              Explore Job Profiles →
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
};
