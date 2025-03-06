
import { Link } from "react-router-dom";

interface BlogBreadcrumbsProps {
  title: string;
}

const BlogBreadcrumbs = ({ title }: BlogBreadcrumbsProps) => {
  return (
    <div className="max-w-3xl mx-auto text-xs md:text-sm text-gray-500 mb-6 md:mb-8">
      <Link to="/" className="hover:text-violet-700 transition-colors">Home</Link>
      <span className="mx-2">›</span>
      <Link to="/blog" className="hover:text-violet-700 transition-colors">Blog</Link>
      <span className="mx-2">›</span>
      <span className="text-gray-700">{title}</span>
    </div>
  );
};

export default BlogBreadcrumbs;
