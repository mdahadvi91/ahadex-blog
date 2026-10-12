import React, { useState } from 'react';
import { BlogProvider, useBlog } from './context/BlogContext';
import { Header } from './components/Header';
import { LeadHero } from './components/LeadHero';
import { ArticleCard } from './components/ArticleCard';
import { ReadingView } from './components/ReadingView';
import { CategoriesFilter } from './components/CategoriesFilter';
import { WritePostModal } from './components/WritePostModal';
import { AboutModal } from './components/AboutModal';
import { TopicsModal } from './components/TopicsModal';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CATEGORIES } from './data/initialPosts';
import { Bookmark, Sparkles, Feather, AlertCircle } from 'lucide-react';

const BlogApp: React.FC = () => {
  const {
    posts,
    activePost,
    setActivePost,
    language,
    theme,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    filterSavedOnly,
    bookmarkedIds,
    setFilterSavedOnly,
    setSelectedCategory,
  } = useBlog();

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);

  // Filter posts based on category, search, and bookmarks
  const filteredPosts = posts.filter((post) => {
    // Bookmarks filter
    if (filterSavedOnly && !bookmarkedIds.includes(post.id)) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      const cat = CATEGORIES.find((c) => c.id === selectedCategory);
      if (cat && post.category !== cat.nameBn && post.categoryEn !== cat.nameEn) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q) || (post.titleEn && post.titleEn.toLowerCase().includes(q));
      const matchExcerpt = post.excerpt.toLowerCase().includes(q) || (post.excerptEn && post.excerptEn.toLowerCase().includes(q));
      const matchAuthor = post.author.name.toLowerCase().includes(q);
      const matchTags = post.tags.some((t) => t.toLowerCase().includes(q));
      const matchCategory = post.category.toLowerCase().includes(q) || post.categoryEn.toLowerCase().includes(q);
      return matchTitle || matchExcerpt || matchAuthor || matchTags || matchCategory;
    }

    return true;
  });

  // Get lead featured post (only on default view without search or saved filter)
  const isDefaultView = selectedCategory === 'all' && !searchQuery.trim() && !filterSavedOnly;
  const leadPost = isDefaultView ? posts.find((p) => p.featured) || posts[0] : null;
  const secondaryPosts = isDefaultView
    ? filteredPosts.filter((p) => p.id !== leadPost?.id)
    : filteredPosts;

  const getActiveFilterLabel = () => {
    if (filterSavedOnly) return language === 'bn' ? 'আপনার সংরক্ষিত প্রবন্ধসমূহ' : 'Your Bookmarked Essays';
    if (selectedCategory !== 'all') {
      const cat = CATEGORIES.find((c) => c.id === selectedCategory);
      return cat ? (language === 'bn' ? cat.nameBn : cat.nameEn) : '';
    }
    return '';
  };

  const getThemeClass = () => {
    if (theme === 'warm') return 'bg-[#FAF7F2] text-stone-900';
    if (theme === 'dark') return 'bg-[#141312] text-stone-100';
    return 'bg-white text-stone-900';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${getThemeClass()}`}>
      {/* Top Bar Navigation */}
      <Header
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenTopics={() => setIsTopicsOpen(true)}
      />

      {/* Main Content Area */}
      {activePost ? (
        <ReadingView
          post={activePost}
          onBack={() => {
            setActivePost(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full py-6 sm:py-8">
          {/* Masthead Curatorial Strip */}
          <div className="border-b border-stone-200 dark:border-stone-800 pb-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-3">
              <span className="font-editorial-serif tracking-widest uppercase font-semibold text-stone-800 dark:text-stone-200">
                {language === 'bn' ? 'বর্ষ ৪ · সংখ্যা ১২' : 'Vol. IV · Issue 12'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{language === 'bn' ? '১২ অক্টোবর ২০২৬' : 'October 12, 2026'}</span>
            </div>
            <div className="flex items-center gap-4 text-stone-600 dark:text-stone-400">
              <span>
                {language === 'bn'
                  ? 'একটি উন্মুক্ত সাহিত্য ও মননশীল সাময়িকী'
                  : 'An Open Literary & Intellectual Journal'}
              </span>
            </div>
          </div>

          {/* Lead Hero Feature Story */}
          {leadPost && (
            <div className="mb-12">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-wider uppercase text-amber-800 dark:text-amber-400">
                  {language === 'bn' ? 'প্রধান সম্পাদকীয় রচনা' : 'Lead Feature Essay'}
                </p>
                <span className="text-xs text-stone-400">
                  {language === 'bn' ? 'নির্বাচিত প্রবন্ধ' : 'Curator’s Choice'}
                </span>
              </div>
              <LeadHero post={leadPost} />
            </div>
          )}

          {/* Categories & Search Filter Bar */}
          <div className="mb-8 pt-4">
            <CategoriesFilter />
          </div>

          {/* Filter Status Banner if filtering */}
          {(selectedCategory !== 'all' || filterSavedOnly || searchQuery.trim()) && (
            <div className="mb-6 p-4 rounded-lg bg-stone-100/70 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  {searchQuery.trim()
                    ? language === 'bn'
                      ? `"${searchQuery}" অনুসন্ধানের ফলাফল (${filteredPosts.length})`
                      : `Search results for "${searchQuery}" (${filteredPosts.length})`
                    : `${getActiveFilterLabel()} (${filteredPosts.length})`}
                </p>
              </div>
              <button
                onClick={() => {
                  setFilterSavedOnly(false);
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs text-amber-800 dark:text-amber-400 hover:underline font-medium"
              >
                {language === 'bn' ? 'ফিল্টার মুছুন' : 'Reset Filters'}
              </button>
            </div>
          )}

          {/* Article Grid / Empty State */}
          {secondaryPosts.length > 0 ? (
            <section className="mb-14">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-16 px-4 border border-dashed border-stone-300 dark:border-stone-800 rounded-xl my-8">
              <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1">
                {language === 'bn' ? 'কোনো প্রবন্ধ পাওয়া যায়নি' : 'No essays found'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-4">
                {language === 'bn'
                  ? 'আপনার অনুসন্ধানের শর্তাবলীর সাথে মিলে এমন কোনো লেখা পাওয়া যায়নি। অন্য কোনো বিষয় বা শব্দ অনুসন্ধান করুন।'
                  : 'No pieces match your current criteria. Try adjusting your search query or reset your filters.'}
              </p>
              <button
                onClick={() => {
                  setFilterSavedOnly(false);
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 rounded hover:bg-stone-800 transition-colors"
              >
                {language === 'bn' ? 'সকল প্রবন্ধ দেখুন' : 'Show All Stories'}
              </button>
            </div>
          )}

          {/* Weekly Newsletter Dispatch */}
          <NewsletterSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenTopics={() => setIsTopicsOpen(true)}
      />

      {/* Modals */}
      <WritePostModal />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <TopicsModal isOpen={isTopicsOpen} onClose={() => setIsTopicsOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <BlogProvider>
      <BlogApp />
    </BlogProvider>
  );
}
