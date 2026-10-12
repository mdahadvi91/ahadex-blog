import React from 'react';
import { useBlog } from '../context/BlogContext';
import { X, BookOpen, Feather, Globe, Shield } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { language } = useBlog();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-semibold mb-2">
            {language === 'bn' ? 'কথাকাব্য ইতিবৃত্ত' : 'Colophon & Manifesto'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-editorial-serif font-bold text-stone-900 dark:text-stone-100">
            {language === 'bn' ? 'গভীর চিন্তা ও স্বাধীন প্রকাশনার উন্মুক্ত অঙ্গন' : 'Slow Journalism for Contemplative Minds'}
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
          <p>
            {language === 'bn'
              ? 'কথাকাব্য হলো একটি আধুনিক ডিজিটাল সাময়িকী—যেখানে প্রযুক্তির দ্রুত কোলাহলের বিপরীতে ধীর, মননশীল পাঠ ও ভাবনার গভীরতাকে সম্মান জানানো হয়। আমাদের লক্ষ্য বাংলা ও বৈশ্বিক সাহিত্যের ঐতিহ্য, বৈজ্ঞানিক জিজ্ঞাসা এবং মুক্তচিন্তার মেলবন্ধন ঘটানো।'
              : 'Katha is an independent publishing journal dedicated to deliberate long-form essays, cultural documentation, and scientific inquiry in an age dominated by superficial alerts.'}
          </p>
          <p>
            {language === 'bn'
              ? 'এখানে প্রতিটি লেখা একটি নতুন ভাবনার দুয়ার উন্মোচন করে। যে কেউ নতুন প্রবন্ধ লিখে নিজের দৃষ্টিভঙ্গি ভাগ করে নিতে পারেন এবং পাঠকদের মন্তব্যের মাধ্যমে গঠনমূলক আলোচনা গড়ে তুলতে পারেন।'
              : 'Every contribution is curated to spark reflective discourse. Writers are invited to publish original narratives, accompanied by reader reflections and thoughtful community dialogue.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 pt-6 border-t border-stone-200 dark:border-stone-800">
          <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg text-center">
            <Feather className="w-5 h-5 text-amber-800 dark:text-amber-400 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
              {language === 'bn' ? 'মুক্ত লেখনী' : 'Independent'}
            </h4>
            <p className="text-[11px] text-stone-500">
              {language === 'bn' ? 'বিজ্ঞাপনমুক্ত শান্ত পাঠ' : 'Distraction-free reading'}
            </p>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg text-center">
            <Globe className="w-5 h-5 text-amber-800 dark:text-amber-400 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
              {language === 'bn' ? 'দ্বিভাষিক প্ল্যাটফর্ম' : 'Bilingual Voice'}
            </h4>
            <p className="text-[11px] text-stone-500">
              {language === 'bn' ? 'বাংলা ও ইংরেজি' : 'Bengali & English'}
            </p>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg text-center">
            <Shield className="w-5 h-5 text-amber-800 dark:text-amber-400 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
              {language === 'bn' ? 'স্থায়ী সংরক্ষণ' : 'Local Archive'}
            </h4>
            <p className="text-[11px] text-stone-500">
              {language === 'bn' ? 'বুকমার্ক ও মন্তব্য' : 'Persistent saves'}
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 text-xs font-semibold bg-stone-900 text-stone-50 dark:bg-amber-100 dark:text-stone-950 rounded hover:bg-stone-800 transition-colors"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
