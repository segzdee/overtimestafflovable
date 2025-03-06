
import { Link } from "react-router-dom";

const BlogCTA = () => {
  return (
    <div className="max-w-3xl mx-auto mt-16 p-6 md:p-8 bg-violet-50 rounded-lg text-center">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Ready to optimize your staffing?</h2>
      <p className="text-gray-600 mb-6 text-sm md:text-base">
        Join thousands of businesses and workers who are already using OVERTIMESTAFF to streamline hospitality staffing.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/register"
          className="px-6 py-3 bg-violet-700 text-white rounded-lg font-medium hover:bg-violet-800 transition-colors text-sm md:text-base"
        >
          Sign Up Free
        </Link>
        <Link
          to="/contact"
          className="px-6 py-3 bg-white text-violet-700 border border-violet-700 rounded-lg font-medium hover:bg-violet-50 transition-colors text-sm md:text-base"
        >
          Contact Sales
        </Link>
      </div>
    </div>
  );
};

export default BlogCTA;
