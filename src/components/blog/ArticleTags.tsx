
import React from 'react';
import { Link } from 'react-router-dom';

interface ArticleTagsProps {
  tags: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  
  return (
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
  );
};

export default ArticleTags;
