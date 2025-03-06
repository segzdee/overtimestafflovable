
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ArticleHeader from './ArticleHeader';
import ArticleTags from './ArticleTags';
import ArticleShare from './ArticleShare';

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
  const calculateReadTime = (content: string): string => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return `${minutes} min read`;
  };

  const readTime = estimatedReadTime || calculateReadTime(content);

  return (
    <article className="max-w-4xl mx-auto">
      <ArticleHeader
        title={title}
        author={author}
        authorImage={authorImage}
        date={date}
        readTime={readTime}
        category={category}
        coverImage={coverImage}
      />

      <div className="article-content">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-6 text-gray-900" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-5 text-gray-900" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold my-4 text-gray-900" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-lg font-bold my-4 text-gray-900" {...props} />,
            p: ({node, ...props}) => <p className="text-base text-gray-700 my-4 leading-relaxed" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 text-gray-700" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 text-gray-700" {...props} />,
            li: ({node, ...props}) => <li className="my-2" {...props} />,
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-violet-500 pl-4 py-1 my-6 text-gray-700 italic" {...props} />
            ),
            a: ({node, ...props}) => (
              <a className="text-violet-600 font-medium hover:text-violet-800 underline" {...props} />
            ),
            code: ({node, inline, ...props}) => 
              inline ? (
                <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono" {...props} />
              ) : (
                <code className="block bg-gray-100 p-4 rounded-lg my-4 text-sm font-mono overflow-x-auto" {...props} />
              ),
            img: ({node, ...props}) => (
              <img className="w-full my-6 rounded-lg" {...props} alt={props.alt || 'Blog image'} />
            ),
            hr: ({node, ...props}) => <hr className="my-8 border-t border-gray-200" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      <ArticleTags tags={tags} />
      <ArticleShare title={title} />
    </article>
  );
};

export default BlogArticle;
