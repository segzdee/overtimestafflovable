
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  coverImage?: string;
  authorImage?: string;
  category: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  slug: string;
}
