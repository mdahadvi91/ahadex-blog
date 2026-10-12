export type Language = 'bn' | 'en';

export type ThemeMode = 'warm' | 'light' | 'dark';

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  content: string;
  likes: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  coverImage: string;
  category: string;
  categoryEn: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  readTimeEn: string;
  featured?: boolean;
  tags: string[];
  likes: number;
  views: number;
  comments: Comment[];
  isCustom?: boolean;
}

export interface CategoryItem {
  id: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  descriptionEn: string;
}
