import React from 'react';
import { Post } from '../types/blog';
import { useBlog } from '../context/BlogContext';
import { Bookmark, Clock, ArrowRight, Heart } from 'lucide-react';

interface LeadHeroProps {
  post: Post;
}

export const LeadHero: React.FC<LeadHeroProps> = ({ post }) => {
  const { language, setActivePost, toggleBookmark, bookmarkedIds, likePost } = useBlog();
  const isBookmarked = bookmarkedIds.includes(post.id);

  const title = language === 'bn' ? post.title : post.titleEn || post.title;
  const excerpt = language === 'bn' ? post.excerpt : post.excerptEn || post.excerpt;
  const category = language === 'bn' ? post.category : post.categoryEn || post.category;
  const readTime = language === 'bn' ? post.readTime : post.readTimeEn || post.readTime;

  return (
    <article className="group relative border border-stone-200/90 dark:border-stone-800 rounded-xl overflow-hidden bg-white dark:bg-stone-800/50 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:items-stretch">
        {/* Left Column: Editorial Image */}
        <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-stone-100 dark:bg-stone-900">
          <img
            src={post.coverImage}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            onError={(e) => {
              // Resilient fallback container
              const target = e.target as HTMLElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none lg:hidden" />
        </div>

        {/* Right Column: Editorial Narrative & Controls */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Unboxed Metadata (Zero-Pill Rule) */}
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-3 font-medium">
              <span className="text-amber-800 dark:text-amber-400">{category}</span>
              <span aria-hidden="true">·</span>
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>{readTime}</span>
              </span>
            </div>

            {/* Dominant Headline */}
            <h2
              onClick={() => setActivePost(post)}
              className="text-2xl sm:text-3xl lg:text-[2rem] font-editorial-serif font-bold text-stone-900 dark:text-stone-100 leading-snug tracking-tight hover:text-amber-900 dark:hover:text-amber-400 transition-colors cursor-pointer"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {title}
            </h2>

            {/* Deck / Excerpt */}
            <p className="mt-3.5 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              {excerpt}
            </p>
          </div>

          {/* Bottom Bar: Author Byline & Actions */}
          <div className="mt-8 pt-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700"
              />
              <div>
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {post.author.name}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">
                  {post.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Like / Clap button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  likePost(post.id);
                }}
                className="p-2 text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400 rounded hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors flex items-center gap-1 text-xs"
                title={language === 'bn' ? 'পছন্দ করুন' : 'Like'}
              >
                <Heart className="w-4 h-4" />
                <span className="font-mono tabular-nums text-xs">{post.likes}</span>
              </button>

              {/* Bookmark */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(post.id);
                }}
                className={`p-2 rounded hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors ${
                  isBookmarked
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
                title={isBookmarked ? 'সংরক্ষণ মুছে ফেলুন' : 'সংরক্ষণ করুন'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              {/* Read button */}
              <button
                onClick={() => setActivePost(post)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 rounded hover:bg-stone-800 dark:hover:bg-white transition-colors ml-1"
              >
                <span>{language === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
