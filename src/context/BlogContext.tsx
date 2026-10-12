import React, { createContext, useContext, useEffect, useState } from 'react';
import { Post, ThemeMode, Language, Comment } from '../types/blog';
import { INITIAL_POSTS } from '../data/initialPosts';

interface BlogContextType {
  posts: Post[];
  activePost: Post | null;
  setActivePost: (post: Post | null) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkedIds: string[];
  toggleBookmark: (postId: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'likes'>) => void;
  createPost: (newPost: Omit<Post, 'id' | 'slug' | 'likes' | 'views' | 'comments'>) => void;
  filterSavedOnly: boolean;
  setFilterSavedOnly: (val: boolean) => void;
  isWritingModalOpen: boolean;
  setIsWritingModalOpen: (val: boolean) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_POSTS_KEY = 'kathakabbo_posts_v1';
const STORAGE_BOOKMARKS_KEY = 'kathakabbo_bookmarks_v1';
const STORAGE_THEME_KEY = 'kathakabbo_theme_v1';
const STORAGE_LANG_KEY = 'kathakabbo_lang_v1';

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_POSTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge to ensure freshly generated local images remain intact
          return parsed.map((p: Post) => {
            const initialMatch = INITIAL_POSTS.find((ip) => ip.id === p.id);
            if (initialMatch && !p.isCustom) {
              return { ...p, coverImage: initialMatch.coverImage };
            }
            return p;
          });
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_POSTS;
  });

  const [activePost, setActivePost] = useState<Post | null>(null);
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY) as Language;
      return saved === 'en' ? 'en' : 'bn';
    } catch {
      return 'bn';
    }
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY) as ThemeMode;
      return saved || 'warm';
    } catch {
      return 'warm';
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSavedOnly, setFilterSavedOnly] = useState<boolean>(false);
  const [isWritingModalOpen, setIsWritingModalOpen] = useState<boolean>(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
    } catch {
      // ignore
    }
  }, [posts]);

  // Sync bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  // Sync theme
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_THEME_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [theme]);

  // Sync language
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const toggleBookmark = (postId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
    if (activePost && activePost.id === postId) {
      setActivePost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  const addComment = (postId: string, commentData: Omit<Comment, 'id' | 'likes'>) => {
    const newComment: Comment = {
      ...commentData,
      id: `comment_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updatedComments = [newComment, ...(p.comments || [])];
          return { ...p, comments: updatedComments };
        }
        return p;
      })
    );

    if (activePost && activePost.id === postId) {
      setActivePost((prev) =>
        prev ? { ...prev, comments: [newComment, ...(prev.comments || [])] } : null
      );
    }
  };

  const createPost = (newPostData: Omit<Post, 'id' | 'slug' | 'likes' | 'views' | 'comments'>) => {
    const id = `post_${Date.now()}`;
    const slug = newPostData.title
      .toLowerCase()
      .replace(/[^a-z0-9\u0980-\u09FF]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost: Post = {
      ...newPostData,
      id,
      slug: slug || id,
      likes: 1,
      views: 1,
      comments: [],
      isCustom: true,
    };

    setPosts((prev) => [newPost, ...prev]);
    setIsWritingModalOpen(false);
    setActivePost(newPost);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        activePost,
        setActivePost,
        language,
        setLanguage,
        theme,
        setTheme,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        bookmarkedIds,
        toggleBookmark,
        likePost,
        addComment,
        createPost,
        filterSavedOnly,
        setFilterSavedOnly,
        isWritingModalOpen,
        setIsWritingModalOpen,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
