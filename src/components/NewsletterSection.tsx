import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { Mail, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { language } = useBlog();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <section className="my-16 border border-stone-200 dark:border-stone-800 rounded-2xl bg-amber-100/40 dark:bg-stone-800/40 p-8 sm:p-12 text-center relative overflow-hidden">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="w-10 h-10 rounded-full bg-amber-200/80 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 mx-auto flex items-center justify-center">
          <Mail className="w-5 h-5" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-editorial-serif font-bold text-stone-900 dark:text-stone-100">
          {language === 'bn' ? 'সাপ্তাহিক কথাকাব্য সংকলন' : 'Weekly Curated Dispatch'}
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
          {language === 'bn'
            ? 'প্রতি রবিবার সকালে নতুন প্রকাশিত শ্রেষ্ঠ প্রবন্ধ, বৈজ্ঞানিক ভাবনা এবং সাহিত্যালোচনার নির্যাস সরাসরি আপনার ইনবক্সে।'
            : 'Every Sunday dawn, receive curated dispatches on digital philosophy, regional crafts, and literary reflection in your inbox.'}
        </p>

        {isSubscribed ? (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'bn'
                ? 'ধন্যবাদ! আপনার সাবস্ক্রিপশন সম্পন্ন হয়েছে।'
                : 'Thank you! You are subscribed to the weekly dispatch.'}
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                language === 'bn' ? 'আপনার ইমেইল ঠিকানা দিন...' : 'Enter your email address...'
              }
              className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold bg-stone-900 text-stone-50 dark:bg-amber-100 dark:text-stone-950 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              {language === 'bn' ? 'যুক্ত হোন' : 'Subscribe'}
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-400">
          {language === 'bn'
            ? 'কোনো স্প্যাম নয় · যেকোনো সময় আনসাবস্ক্রাইব করা যাবে।'
            : 'Zero spam · Quiet weekly edition · One-click unsubscribe.'}
        </p>
      </div>
    </section>
  );
};
