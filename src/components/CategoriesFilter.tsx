import React from 'react';
import { useBlog } from '../context/BlogContext';
import { CATEGORIES } from '../data/initialPosts';
import { Search, X } from 'lucide-react';

export const CategoriesFilter: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    language,
    posts,
    filterSavedOnly,
    setFilterSavedOnly,
    bookmarkedIds,
  } = useBlog();

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return posts.length;
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (!cat) return 0;
    return posts.filter((p) => p.category === cat.nameBn || p.categoryEn === cat.nameEn).length;
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Input Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            language === 'bn'
              ? 'প্রবন্ধের শিরোনাম, বিষয় বা লেখকের নাম খুঁজুন...'
              : 'Search essays by title, topic, or author...'
          }
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-800 dark:focus:ring-amber-500 transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Categories Filter Tabs (Segmented Control) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id && !filterSavedOnly;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => {
                setFilterSavedOnly(false);
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-stone-900 text-stone-50 border-stone-900 dark:bg-amber-100 dark:text-stone-950 dark:border-amber-100 shadow-xs'
                  : 'bg-white/80 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700/80 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              <span>{language === 'bn' ? cat.nameBn : cat.nameEn}</span>
              <span
                className={`text-[11px] font-mono tabular-nums ${
                  isSelected ? 'opacity-80' : 'text-stone-400 dark:text-stone-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        {/* Saved filter tab */}
        {bookmarkedIds.length > 0 && (
          <button
            onClick={() => setFilterSavedOnly(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 border ${
              filterSavedOnly
                ? 'bg-amber-900 text-amber-50 border-amber-900 dark:bg-amber-400 dark:text-stone-950 dark:border-amber-400 shadow-xs'
                : 'bg-white/80 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700/80 hover:bg-stone-100 dark:hover:bg-stone-700'
            }`}
          >
            <span>{language === 'bn' ? 'সংরক্ষিত' : 'Saved'}</span>
            <span className="text-[11px] font-mono tabular-nums opacity-80">
              {bookmarkedIds.length}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
