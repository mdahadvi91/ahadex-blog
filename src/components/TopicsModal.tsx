import React from 'react';
import { useBlog } from '../context/BlogContext';
import { CATEGORIES } from '../data/initialPosts';
import { X, ArrowRight, FolderKanban } from 'lucide-react';

interface TopicsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TopicsModal: React.FC<TopicsModalProps> = ({ isOpen, onClose }) => {
  const { language, setSelectedCategory, setActivePost, setFilterSavedOnly, posts } = useBlog();

  if (!isOpen) return null;

  const handleSelect = (catId: string) => {
    setActivePost(null);
    setFilterSavedOnly(false);
    setSelectedCategory(catId);
    onClose();
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold mb-1">
            {language === 'bn' ? 'সূচিপত্র' : 'Discipline Catalog'}
          </p>
          <h2 className="text-2xl font-editorial-serif font-bold text-stone-900 dark:text-stone-100">
            {language === 'bn' ? 'কথাকাব্যের বিষয়সমূহ' : 'Explore All Story Categories'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? posts.length
                : posts.filter((p) => p.category === cat.nameBn || p.categoryEn === cat.nameEn)
                    .length;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className="group cursor-pointer p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/40 hover:border-amber-700/50 dark:hover:border-amber-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                      {language === 'bn' ? cat.nameBn : cat.nameEn}
                    </h3>
                    <span className="text-xs font-mono font-medium text-stone-400 tabular-nums">
                      {count} {language === 'bn' ? 'টি' : ''}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-sans leading-relaxed">
                    {language === 'bn' ? cat.descriptionBn : cat.descriptionEn}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-amber-800 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{language === 'bn' ? 'প্রবন্ধ দেখুন' : 'Explore essays'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
