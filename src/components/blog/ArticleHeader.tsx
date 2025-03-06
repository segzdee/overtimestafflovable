
import React from 'react';

interface ArticleHeaderProps {
  title: string;
  author: string;
  authorImage?: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  author,
  authorImage,
  date,
  readTime,
  category,
  coverImage
}) => (
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
    
    <div className="relative aspect-video w-full mb-10 rounded-xl overflow-hidden">
      <img 
        src={coverImage} 
        alt={title} 
        className="w-full h-full object-cover"
      />
    </div>
  </header>
);

export default ArticleHeader;
