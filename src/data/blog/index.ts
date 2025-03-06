
import { BlogPost } from "@/types/blog";
import { featuredPosts } from "./featured-posts";
import { careerPosts } from "./career-posts";
import { industryPosts } from "./industry-posts";
import { managementPosts } from "./management-posts";
import { technologyPosts } from "./technology-posts";

// Combine all blog posts into a single array
export const blogPosts: BlogPost[] = [
  ...featuredPosts,
  ...careerPosts,
  ...industryPosts,
  ...managementPosts,
  ...technologyPosts
];

// Export helper functions for accessing blog posts
export const getFeaturedPosts = () => featuredPosts;
export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);
export const getPostById = (id: number) => blogPosts.find(post => post.id === id);
export const getPostsByCategory = (category: string) => blogPosts.filter(post => post.category === category);
export const getPostsByTag = (tag: string) => blogPosts.filter(post => post.tags.includes(tag));
export const getRecentPosts = (count: number = 5) => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);
export const getRelatedPosts = (currentPostId: number, count: number = 3) => {
  const currentPost = getPostById(currentPostId);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.id !== currentPostId && post.category === currentPost.category)
    .slice(0, count);
};
