import React from 'react';
import { Post } from '../types/blog';
import { useBlog } from '../context/BlogContext';
import { Bookmark, Clock, MessageSquare, Heart } from 'lucide-react';

interface ArticleCardProps {
  post: Post;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const { language, setActivePost, toggleBookmark, bookmarkedIds, likePost } = useBlog();
  const isBookmarked = bookmarkedIds.includes(post.id);

  const title = language === 'bn' ? post.title : post.titleEn || post.title;
  const excerpt = language === 'bn' ? post.excerpt : post.excerptEn || post.excerpt;
  const category = language === 'bn' ? post.category : post.categoryEn || post.category;
  const readTime = language === 'bn' ? post.readTime : post.readTimeEn || post.readTime;

  return (
    <article className="group flex flex-col justify-between border border-stone-200/90 dark:border-stone-800 rounded-xl overflow-hidden bg-white dark:bg-stone-800/40 hover:border-stone-300 dark:hover:border-stone-700 transition-all shadow-xs">
      <div>
        {/* Visual Media Slot */}
        <div
          onClick={() => setActivePost(post)}
          className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-900 cursor-pointer"
        >
          <img
            src={post.coverImage}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-stone-950/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Text Content */}
        <div className="p-5">
          {/* Unboxed Metadata (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2 font-medium">
            <span className="text-amber-800 dark:text-amber-400">{category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{readTime}</span>
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setActivePost(post)}
            className="text-lg font-editorial-serif font-bold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2 hover:text-amber-900 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        </div>
      </div>

      {/* Footer Byline & Controls */}
      <div className="px-5 pb-4 pt-3 border-t border-stone-100 dark:border-stone-800/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            referrerPolicy="no-referrer"
            className="w-6 h-6 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700"
          />
          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
            {post.author.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs">
          {/* Comments count */}
          {post.comments && post.comments.length > 0 && (
            <span className="flex items-center gap-1 text-[11px] mr-1">
              <MessageSquare className="w-3 h-3" />
              <span className="font-mono tabular-nums">{post.comments.length}</span>
            </span>
          )}

          {/* Like */}
          <button
            onClick={() => likePost(post.id)}
            className="p-1.5 hover:text-rose-600 dark:hover:text-rose-400 rounded hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors flex items-center gap-1"
            title="Like"
          >
            <Heart className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums text-[11px]">{post.likes}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark(post.id)}
            className={`p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors ${
              isBookmarked
                ? 'text-amber-700 dark:text-amber-400'
                : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
};
