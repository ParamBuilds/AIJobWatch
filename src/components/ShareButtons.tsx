import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  title,
  url,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://aijobwatch.in');

  const shareText = `Will AI replace ${title} in India? See the estimated timeline, exposure score, and future-proof skills on AIJobWatch:`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className={`relative flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 no-print ${className}`}>
      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium mr-1">
        <Share2 className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
        <span>Share:</span>
      </span>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy page link"
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-teal-700 dark:text-teal-400 font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* WhatsApp Share */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors"
      >
        <span>WhatsApp</span>
      </a>

      {/* Twitter / X Share */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors"
      >
        <span>X</span>
      </a>

      {/* Animated Copied-to-Clipboard Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-10 left-12 px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-mono rounded shadow-lg z-50 pointer-events-none flex items-center gap-1.5"
          >
            <Check className="w-3 h-3 text-teal-400 dark:text-teal-600" />
            <span>Copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
