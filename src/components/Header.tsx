import React from 'react';
import { useBlog } from '../context/BlogContext';
import { PenSquare, Bookmark, Moon, Sun, BookOpen, Search } from 'lucide-react';

interface HeaderProps {
  onOpenAbout: () => void;
  onOpenTopics: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout, onOpenTopics }) => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    bookmarkedIds,
    filterSavedOnly,
    setFilterSavedOnly,
    setSelectedCategory,
    setIsWritingModalOpen,
    setActivePost,
  } = useBlog();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePost(null);
    setFilterSavedOnly(false);
    setSelectedCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePost(null);
    setFilterSavedOnly(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    if (theme === 'warm') setTheme('dark');
    else if (theme === 'dark') setTheme('light');
    else setTheme('warm');
  };

  const getThemeLabel = () => {
    if (theme === 'warm') return language === 'bn' ? 'কাগজ' : 'Warm';
    if (theme === 'dark') return language === 'bn' ? 'অন্ধকার' : 'Dark';
    return language === 'bn' ? 'সাদা' : 'Clean';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors bg-amber-50/90 border-stone-200/80 dark:bg-stone-900/90 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="/"
          onClick={handleHomeClick}
          className="text-2xl font-editorial-serif font-bold tracking-tight text-stone-900 dark:text-stone-100 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>{language === 'bn' ? 'কথাকাব্য' : 'KATHA'}</span>
          <span className="text-xs font-sans uppercase tracking-widest text-amber-800/70 dark:text-amber-400/80 font-normal">
            {language === 'bn' ? 'সাময়িকী' : 'Journal'}
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={handleHomeClick}
            className={`hover:text-stone-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              !filterSavedOnly ? 'text-stone-950 dark:text-white font-semibold' : ''
            }`}
          >
            {language === 'bn' ? 'প্রচ্ছদ' : 'Front Page'}
          </button>

          <button
            onClick={onOpenTopics}
            className="hover:text-stone-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {language === 'bn' ? 'বিষয়সমূহ' : 'Topics'}
          </button>

          <button
            onClick={handleSavedClick}
            className={`hover:text-stone-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              filterSavedOnly ? 'text-amber-900 dark:text-amber-400 font-semibold' : ''
            }`}
          >
            <span>{language === 'bn' ? 'সংরক্ষিত' : 'Saved'}</span>
            {bookmarkedIds.length > 0 && (
              <span className="text-xs font-mono font-medium text-amber-800 dark:text-amber-400">
                ({bookmarkedIds.length})
              </span>
            )}
          </button>

          <button
            onClick={onOpenAbout}
            className="hover:text-stone-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {language === 'bn' ? 'আমাদের কথা' : 'About'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action & minimal utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            title={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
            className="px-2.5 py-1 text-xs font-medium rounded border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
          >
            {language === 'bn' ? 'EN' : 'বাং'}
          </button>

          {/* Theme Selector */}
          <button
            onClick={toggleTheme}
            title={language === 'bn' ? 'থিম পরিবর্তন' : 'Toggle Theme'}
            className="p-1.5 rounded border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0 flex items-center gap-1 text-xs"
          >
            {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] font-sans">{getThemeLabel()}</span>
          </button>

          {/* Primary Action Button: Write Post */}
          <button
            onClick={() => setIsWritingModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-amber-200/80 hover:bg-amber-300 dark:bg-amber-900/60 dark:hover:bg-amber-800/80 rounded transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'নতুন লেখা' : 'Write Essay'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
