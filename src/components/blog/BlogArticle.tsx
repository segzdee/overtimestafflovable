
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

interface BlogArticleProps {
  title: string;
  content: string;
  author: string;
  authorImage?: string;
  date: string;
  category: string;
  tags: string[];
  estimatedReadTime?: string;
  coverImage: string;
}

// Define a prop type for the code component that includes the inline property
interface CodeProps {
  node: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const BlogArticle: React.FC<BlogArticleProps> = ({
  title,
  content,
  author,
  authorImage,
  date,
  category,
  tags,
  estimatedReadTime,
  coverImage
}) => {
  // This calculates estimated read time if not provided (based on average reading speed of 225 words per minute)
  const calculateReadTime = (content: string): string => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return `${minutes} min read`;
  };

  const readTime = estimatedReadTime || calculateReadTime(content);

  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
          {title}
        </h1>
        
        <div className="flex items-center justify-between flex-wrap mb-8">
          <div className="flex items-center">
            {authorImage && (
              <img 
                src={authorImage} 
                alt={author} 
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{author}</p>
              <div className="text-sm text-gray-500 flex items-center">
                <time dateTime={new Date(date).toISOString()}>{date}</time>
                <span className="mx-2">•</span>
                <span>{readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 sm:mt-0">
            <span className="inline-block px-3 py-1 bg-violet-100 text-violet-800 font-medium text-sm rounded-full">
              {category}
            </span>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="relative aspect-video w-full mb-10 rounded-xl overflow-hidden">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Article Content with Custom Styling */}
      <div className="article-content">
        <ReactMarkdown
          components={{
            // Style headers
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-6 text-gray-900" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-5 text-gray-900" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold my-4 text-gray-900" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-lg font-bold my-4 text-gray-900" {...props} />,
            
            // Style paragraphs
            p: ({node, ...props}) => <p className="text-base text-gray-700 my-4 leading-relaxed" {...props} />,
            
            // Style lists
            ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 text-gray-700" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 text-gray-700" {...props} />,
            li: ({node, ...props}) => <li className="my-2" {...props} />,
            
            // Style blockquotes
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-violet-500 pl-4 py-1 my-6 text-gray-700 italic" {...props} />
            ),
            
            // Style links
            a: ({node, ...props}) => (
              <a className="text-violet-600 font-medium hover:text-violet-800 underline" {...props} />
            ),
            
            // Style code - now using proper typing
            code: ({node, inline, className, children, ...props}: CodeProps) => 
              inline ? (
                <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono" {...props}>{children}</code>
              ) : (
                <code className="block bg-gray-100 p-4 rounded-lg my-4 text-sm font-mono overflow-x-auto" {...props}>{children}</code>
              ),
              
            // Style images
            img: ({node, ...props}) => (
              <img className="w-full my-6 rounded-lg" {...props} alt={props.alt || 'Blog image'} />
            ),
            
            // Style horizontal rule
            hr: ({node, ...props}) => <hr className="my-8 border-t border-gray-200" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Article Footer */}
      <footer className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Share this article</h3>
            <div className="flex space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={`mailto:?subject=${encodeURIComponent(title)}&body=Check out this article: ${encodeURIComponent(window.location.href)}`}
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Share by Email"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <Link
              to="/blog"
              className="inline-flex items-center text-violet-600 hover:text-violet-800"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogArticle;
