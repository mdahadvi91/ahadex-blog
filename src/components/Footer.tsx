import React from 'react';
import { useBlog } from '../context/BlogContext';
import { CATEGORIES } from '../data/initialPosts';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenTopics: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenTopics }) => {
  const { language, setSelectedCategory, setActivePost, setFilterSavedOnly } = useBlog();

  const handleCategoryClick = (catId: string) => {
    setActivePost(null);
    setFilterSavedOnly(false);
    setSelectedCategory(catId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-amber-50/50 dark:bg-stone-900/50 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-2xl font-editorial-serif font-bold text-stone-900 dark:text-stone-100">
              {language === 'bn' ? 'কথাকাব্য' : 'KATHA'}
            </span>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'একটি উন্মুক্ত ও চিন্তাশীল সাহিত্য, বিজ্ঞান ও প্রযুক্তির ডিজিটাল সাময়িকী। জীবন ও দর্শনের মুক্ত প্রকাশনা।'
                : 'An independent digital journal celebrating thoughtful inquiry, culture, literature, and enduring human craft.'}
            </p>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              {language === 'bn' ? 'বিষয়ভিত্তিক প্রবন্ধ' : 'Featured Disciplines'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-400">
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="text-left hover:text-stone-950 dark:hover:text-stone-200 transition-colors"
                >
                  {language === 'bn' ? cat.nameBn : cat.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* Institutional Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              {language === 'bn' ? 'প্রকাশনা সংযোগ' : 'Publication'}
            </h4>
            <div className="flex flex-col gap-1.5 text-xs text-stone-600 dark:text-stone-400">
              <button
                onClick={onOpenAbout}
                className="text-left hover:text-stone-950 dark:hover:text-stone-200 transition-colors"
              >
                {language === 'bn' ? 'আমাদের নীতি ও লক্ষ্য' : 'Manifesto & Editorial Guidelines'}
              </button>
              <button
                onClick={onOpenTopics}
                className="text-left hover:text-stone-950 dark:hover:text-stone-200 transition-colors"
              >
                {language === 'bn' ? 'বিষয়সূচী' : 'All Topics Directory'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom hairline & copyright */}
        <div className="pt-6 border-t border-stone-200/60 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-3">
          <p>
            © 2026 {language === 'bn' ? 'কথাকাব্য ডিজিটাল সাময়িকী। সর্বস্বত্ব সংরক্ষিত।' : 'Katha Editorial Journal. All rights reserved.'}
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span>{language === 'bn' ? 'ঢাকা · কলকাতা · বৈশ্বিক' : 'Dhaka · Kolkata · Global'}</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'bn' ? 'মুক্ত মননশীল পাঠক সমাজ' : 'Open Contemplative Society'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
