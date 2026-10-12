import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { CATEGORIES } from '../data/initialPosts';
import { X, Eye, PenLine, Sparkles, Image as ImageIcon, Check } from 'lucide-react';

import imgLeadWorkspace from '../assets/images/blog_lead_workspace_1791776971897.jpg';
import imgCulturePottery from '../assets/images/blog_culture_pottery_1791776985233.jpg';
import imgTeaHillsMist from '../assets/images/blog_tea_hills_mist_1791776995829.jpg';
import imgNightStarlight from '../assets/images/blog_night_starlight_1791777006503.jpg';

const PRESET_IMAGES = [
  { id: 'workspace', url: imgLeadWorkspace, labelBn: 'লেখকের টেবিল', labelEn: 'Workspace Desk' },
  { id: 'pottery', url: imgCulturePottery, labelBn: 'মৃৎশিল্প ও মাটি', labelEn: 'Pottery Studio' },
  { id: 'teahills', url: imgTeaHillsMist, labelBn: 'চা বাগান ও পাহাড়', labelEn: 'Misty Tea Hills' },
  { id: 'starlight', url: imgNightStarlight, labelBn: 'নক্ষত্র ও রাত', labelEn: 'Night Starlight' },
];

export const WritePostModal: React.FC = () => {
  const { isWritingModalOpen, setIsWritingModalOpen, createPost, language } = useBlog();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1].nameBn);
  const [categoryEn, setCategoryEn] = useState(CATEGORIES[1].nameEn);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [selectedImage, setSelectedImage] = useState(imgLeadWorkspace);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  if (!isWritingModalOpen) return null;

  const handleCategoryChange = (catId: string) => {
    const found = CATEGORIES.find((c) => c.id === catId);
    if (found) {
      setCategory(found.nameBn);
      setCategoryEn(found.nameEn);
    }
  };

  const calculateReadTime = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 150));
    return {
      bn: `${minutes} মিনিট পাঠ`,
      en: `${minutes} min read`,
    };
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const readTimes = calculateReadTime(content);
    const now = new Date();
    const formattedDate =
      language === 'bn'
        ? `${now.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}`
        : `${now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const coverUrl = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;

    createPost({
      title: title.trim(),
      titleEn: title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      excerptEn: excerpt.trim() || title.trim(),
      content: content.trim(),
      contentEn: content.trim(),
      coverImage: coverUrl,
      category,
      categoryEn,
      author: {
        name: authorName.trim() || (language === 'bn' ? 'লেখক' : 'Essayist'),
        role: authorRole.trim() || (language === 'bn' ? 'স্বতন্ত্র প্রাবন্ধিক' : 'Independent Author'),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      date: formattedDate,
      readTime: readTimes.bn,
      readTimeEn: readTimes.en,
      tags: tags.length > 0 ? tags : ['প্রবন্ধ', 'চিন্তা'],
    });
  };

  const insertQuoteTemplate = () => {
    setContent((prev) => prev + '\n\n> "এখানে আপনার বিশেষ উদ্ধৃতিটি লিখুন"\n\n');
  };

  const insertHeadingTemplate = () => {
    setContent((prev) => prev + '\n\n### নতুন অনুচ্ছেদের শিরোনাম\n\n');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 my-8 overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-amber-800 dark:text-amber-400" />
            <h3 className="text-lg font-editorial-serif font-bold text-stone-900 dark:text-stone-100">
              {language === 'bn' ? 'নতুন প্রবন্ধ প্রকাশনা' : 'Draft New Essay'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>
                {previewMode
                  ? language === 'bn'
                    ? 'এডিটরে ফিরুন'
                    : 'Edit'
                  : language === 'bn'
                  ? 'প্রিভিউ'
                  : 'Preview'}
              </span>
            </button>

            <button
              onClick={() => setIsWritingModalOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content area */}
        {previewMode ? (
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-400">
                {category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-editorial-serif font-bold text-stone-900 dark:text-stone-100">
                {title || (language === 'bn' ? 'শিরোনামহীন প্রবন্ধ' : 'Untitled Essay')}
              </h1>
              {excerpt && (
                <p className="text-base text-stone-600 dark:text-stone-300 italic">
                  {excerpt}
                </p>
              )}
              <div className="aspect-16/9 rounded-lg overflow-hidden bg-stone-100 my-4">
                <img
                  src={customImageUrl.trim() || selectedImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="prose prose-stone dark:prose-invert max-w-none font-editorial-serif text-base leading-relaxed whitespace-pre-line">
                {content || (language === 'bn' ? 'কোনো মূল বক্তব্য দেওয়া হয়নি।' : 'No content written yet.')}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePublish} className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {language === 'bn' ? 'প্রবন্ধের শিরোনাম' : 'Essay Title'} *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'যেমন: মানুষের ভাবনার রূপান্তর ও শব্দশিল্পের শক্তি'
                    : 'e.g. The Architecture of Silence in Modern Prose'
                }
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
              />
            </div>

            {/* Category and Author in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'bn' ? 'বিষয় / ক্যাটাগরি' : 'Category'}
                </label>
                <select
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {language === 'bn' ? cat.nameBn : cat.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'bn' ? 'লেখকের নাম' : 'Author Name'}
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: আপনার নাম' : 'e.g. Your Name'}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
                />
              </div>
            </div>

            {/* Summary / Excerpt */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {language === 'bn' ? 'সংক্ষিপ্ত সারমর্ম / ভূমিকা' : 'Summary / Deck'}
              </label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? '১-২ লাইনে প্রবন্ধের মূল সুর তুলে ধরুন...'
                    : '1-2 sentences capturing the thesis of the piece...'
                }
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
              />
            </div>

            {/* Cover Image Selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                {language === 'bn' ? 'প্রচ্ছদ ছবি নির্বাচন করুন' : 'Select Cover Photo'}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {PRESET_IMAGES.map((img) => {
                  const isSelected = selectedImage === img.url && !customImageUrl.trim();
                  return (
                    <div
                      key={img.id}
                      onClick={() => {
                        setSelectedImage(img.url);
                        setCustomImageUrl('');
                      }}
                      className={`relative aspect-16/10 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        isSelected
                          ? 'border-amber-700 ring-2 ring-amber-500/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.labelEn} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-stone-950/30 flex items-end p-1.5">
                        <span className="text-[10px] text-white font-medium truncate">
                          {language === 'bn' ? img.labelBn : img.labelEn}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-700 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'অথবা কাস্টম ছবির লিংক দিন (URL)...'
                    : 'Or enter custom image URL...'
                }
                className="w-full px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
              />
            </div>

            {/* Content Textarea with Helper Buttons */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  {language === 'bn' ? 'মূল প্রবন্ধের বক্তব্য' : 'Essay Narrative'} *
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={insertHeadingTemplate}
                    className="text-[11px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                  >
                    + {language === 'bn' ? 'সাবহেডিং' : 'Subheading'}
                  </button>
                  <button
                    type="button"
                    onClick={insertQuoteTemplate}
                    className="text-[11px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                  >
                    + {language === 'bn' ? 'উদ্ধৃতি' : 'Pull Quote'}
                  </button>
                </div>
              </div>

              <textarea
                required
                rows={9}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'এখানে আপনার প্রবন্ধ লিখুন... অনুচ্ছেদ আলাদা করতে দুইবার এন্টার চাপুন।'
                    : 'Compose your essay here... Separate paragraphs with double newlines.'
                }
                className="w-full px-3.5 py-2.5 text-sm font-editorial-serif leading-relaxed bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                {language === 'bn' ? 'ট্যাগ (কমা দিয়ে আলাদা করুন)' : 'Tags (comma separated)'}
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'প্রযুক্তি, সাহিত্য, চিন্তা, সমাজ'
                    : 'philosophy, technology, writing, culture'
                }
                className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-800"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsWritingModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-stone-900 text-stone-50 dark:bg-amber-100 dark:text-stone-950 rounded-lg hover:bg-stone-800 dark:hover:bg-amber-200 transition-colors shadow-xs"
              >
                {language === 'bn' ? 'প্রকাশ করুন' : 'Publish Story'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
