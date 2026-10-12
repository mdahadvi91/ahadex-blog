import React, { useState, useEffect } from 'react';
import { Post } from '../types/blog';
import { useBlog } from '../context/BlogContext';
import {
  ArrowLeft,
  Clock,
  Heart,
  Bookmark,
  Share2,
  MessageSquare,
  Type,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';

interface ReadingViewProps {
  post: Post;
  onBack: () => void;
}

export const ReadingView: React.FC<ReadingViewProps> = ({ post, onBack }) => {
  const { language, toggleBookmark, bookmarkedIds, likePost, addComment, posts, setActivePost } =
    useBlog();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [copied, setCopied] = useState(false);

  // Comment form state
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const isBookmarked = bookmarkedIds.includes(post.id);
  const title = language === 'bn' ? post.title : post.titleEn || post.title;
  const excerpt = language === 'bn' ? post.excerpt : post.excerptEn || post.excerpt;
  const category = language === 'bn' ? post.category : post.categoryEn || post.category;
  const readTime = language === 'bn' ? post.readTime : post.readTimeEn || post.readTime;
  const content = language === 'bn' ? post.content : post.contentEn || post.content;

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle share
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Submit comment
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentSubmitting(true);
    const author = commentName.trim() || (language === 'bn' ? 'বেনামী পাঠক' : 'Anonymous Reader');
    const now = new Date();
    const dateFormatted =
      language === 'bn'
        ? `${now.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}`
        : `${now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;

    addComment(post.id, {
      authorName: author,
      content: commentText.trim(),
      date: dateFormatted,
    });

    setCommentText('');
    setCommentSubmitting(false);
  };

  // Related posts (excluding current post)
  const relatedPosts = posts.filter((p) => p.id !== post.id).slice(0, 3);

  // Determine text size styling
  const getTextSizeClass = () => {
    if (fontSize === 'xlarge') return 'text-xl leading-relaxed';
    if (fontSize === 'large') return 'text-lg leading-relaxed';
    return 'text-base sm:text-lg leading-relaxed';
  };

  return (
    <div className="relative min-h-screen pb-20">
      {/* Top Fixed Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200/50 dark:bg-stone-800 z-50">
        <div
          className="h-full bg-amber-700 dark:bg-amber-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Utility Subheader */}
      <div className="sticky top-16 z-30 bg-amber-50/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/70 dark:border-stone-800/80 py-2.5 transition-colors">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors py-1 px-2 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'প্রচ্ছদে ফিরে যান' : 'Back to Stories'}</span>
          </button>

          {/* Controls: Font Size, Font Style, Share, Bookmark */}
          <div className="flex items-center gap-2">
            {/* Font family toggle */}
            <button
              onClick={() => setFontFamily((prev) => (prev === 'serif' ? 'sans' : 'serif'))}
              className="px-2 py-1 text-xs font-medium rounded border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title={language === 'bn' ? 'হরফের ধরণ' : 'Toggle Typography'}
            >
              {fontFamily === 'serif' ? 'Serif' : 'Sans'}
            </button>

            {/* Font size toggle */}
            <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded overflow-hidden">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs font-medium ${
                  fontSize === 'normal'
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-xs font-semibold ${
                  fontSize === 'large'
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 text-xs font-bold ${
                  fontSize === 'xlarge'
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                A++
              </button>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs"
              title="Share"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied && (
                <span className="text-[11px] text-emerald-600">
                  {language === 'bn' ? 'কপি হয়েছে' : 'Copied'}
                </span>
              )}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(post.id)}
              className={`p-1.5 rounded border border-stone-200 dark:border-stone-700 transition-colors ${
                isBookmarked
                  ? 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400 mb-4">
          <span className="text-amber-800 dark:text-amber-400 font-semibold">{category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.date}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          {title}
        </h1>

        {/* Subdeck / Excerpt */}
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
          {excerpt}
        </p>

        {/* Author Byline Bar */}
        <div className="mt-8 py-5 border-y border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700"
            />
            <div>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {post.author.name}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                {post.author.role}
              </p>
            </div>
          </div>

          {/* Claps / Likes */}
          <button
            onClick={() => likePost(post.id)}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all shadow-2xs"
          >
            <Heart className="w-4 h-4 text-stone-400 group-hover:text-rose-600 transition-colors" />
            <span className="text-xs font-mono font-medium text-stone-700 dark:text-stone-200 tabular-nums">
              {post.likes}
            </span>
          </button>
        </div>

        {/* Feature Cover Image */}
        <div className="my-8 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800">
          <img
            src={post.coverImage}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[500px] object-cover"
          />
          <p className="px-4 py-2.5 text-xs text-stone-500 dark:text-stone-400 italic font-editorial-serif text-center border-t border-stone-100 dark:border-stone-800">
            {language === 'bn' ? `ছবি: কথাকাব্য আলোকচিত্র সংকলন — ${category}` : `Visual: Katha Archives Collection — ${category}`}
          </p>
        </div>

        {/* Article Body Content */}
        <div
          className={`prose-stone dark:prose-invert max-w-none ${
            fontFamily === 'serif' ? 'font-editorial-serif' : 'font-editorial-sans'
          } ${getTextSizeClass()}`}
        >
          {content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();

            // Pull Quote detection
            if (trimmed.startsWith('>')) {
              const quoteText = trimmed.replace(/^>\s*/, '').replace(/^"|"$/g, '');
              return (
                <figure
                  key={index}
                  className="my-8 py-5 border-y border-stone-300 dark:border-stone-700 text-center px-4"
                >
                  <blockquote className="text-xl sm:text-2xl font-editorial-serif italic text-stone-900 dark:text-stone-100 leading-snug">
                    "{quoteText}"
                  </blockquote>
                </figure>
              );
            }

            // Heading 3 detection
            if (trimmed.startsWith('###')) {
              return (
                <h3
                  key={index}
                  className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mt-8 mb-3 font-editorial-serif tracking-tight"
                >
                  {trimmed.replace(/^###\s*/, '')}
                </h3>
              );
            }

            // First paragraph gets drop cap
            if (index === 0) {
              return (
                <p
                  key={index}
                  className="drop-cap text-stone-800 dark:text-stone-200 leading-relaxed mb-6"
                >
                  {trimmed}
                </p>
              );
            }

            return (
              <p key={index} className="text-stone-800 dark:text-stone-200 leading-relaxed mb-6">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-stone-200 dark:border-stone-800">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3">
              {language === 'bn' ? 'ট্যাগ ও সম্পর্কিত বিষয়' : 'Keywords & Tags'}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 px-2.5 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Box */}
        <div className="mt-12 p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700 shrink-0"
          />
          <div className="text-center sm:text-left">
            <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              {post.author.name}
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-400 font-medium mb-2">
              {post.author.role}
            </p>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              {language === 'bn'
                ? 'কথাকাব্য জার্নালের নিয়মিত লেখক ও গবেষক। চিন্তা, শিল্প ও সমাজের বিবর্তন নিয়ে নিয়মিত লেখালেখি করেন।'
                : 'Contributing writer and essayist at Katha Journal. Focused on the intersections of cultural heritage, technology, and philosophy.'}
            </p>
          </div>
        </div>

        {/* Interactive Comments Section */}
        <section className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-editorial-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-800 dark:text-amber-400" />
              <span>{language === 'bn' ? 'পাঠকের মন্তব্য' : 'Reader Discussion'}</span>
              <span className="text-xs font-mono font-normal text-stone-500">
                ({post.comments?.length || 0})
              </span>
            </h3>
          </div>

          {/* Comment submission form */}
          <form
            onSubmit={handleCommentSubmit}
            className="p-5 rounded-xl border border-stone-200 dark:border-stone-700/80 bg-white dark:bg-stone-800/60 shadow-xs mb-8 space-y-3"
          >
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-1">
                {language === 'bn' ? 'আপনার নাম (ঐচ্ছিক)' : 'Your Name (Optional)'}
              </label>
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: আহমেদ শামীম' : 'e.g. Rachel Chen'}
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-300 mb-1">
                {language === 'bn' ? 'আপনার মতামত লিখুন' : 'Your Thought or Reflection'} *
              </label>
              <textarea
                rows={3}
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'এই প্রবন্ধটি সম্পর্কে আপনার চিন্তা বা মতামত লিখুন...'
                    : 'Share your perspective or critique on this essay...'
                }
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={commentSubmitting || !commentText.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-stone-900 text-stone-50 dark:bg-amber-100 dark:text-stone-950 rounded hover:bg-stone-800 dark:hover:bg-amber-200 transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'মন্তব্য প্রকাশ করুন' : 'Post Reflection'}</span>
              </button>
            </div>
          </form>

          {/* Comments list */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-lg border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 flex items-center justify-center text-xs font-bold font-editorial-serif">
                        {comment.authorName.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {comment.authorName}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">{comment.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed pl-9 font-sans">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-500 italic text-center py-4">
              {language === 'bn'
                ? 'এখনও কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনিই করুন।'
                : 'No reflections yet. Be the first to share your perspective.'}
            </p>
          )}
        </section>

        {/* Related Stories */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-stone-200 dark:border-stone-800">
            <h3 className="text-xl font-editorial-serif font-bold text-stone-900 dark:text-stone-100 mb-6">
              {language === 'bn' ? 'আরও পড়ুন' : 'Recommended Reading'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((rel) => {
                const relTitle = language === 'bn' ? rel.title : rel.titleEn || rel.title;
                const relCat = language === 'bn' ? rel.category : rel.categoryEn || rel.category;

                return (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setActivePost(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden bg-white dark:bg-stone-800/40 hover:border-stone-300 dark:hover:border-stone-700 transition-all p-3"
                  >
                    <div className="aspect-16/10 rounded overflow-hidden bg-stone-100 dark:bg-stone-900 mb-2.5">
                      <img
                        src={rel.coverImage}
                        alt={relTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-[11px] text-amber-800 dark:text-amber-400 font-medium mb-1">
                      {relCat}
                    </p>
                    <h4 className="text-xs sm:text-sm font-editorial-serif font-bold text-stone-900 dark:text-stone-100 line-clamp-2 group-hover:text-amber-900 dark:group-hover:text-amber-400 transition-colors">
                      {relTitle}
                    </h4>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
