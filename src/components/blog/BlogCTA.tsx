
import { Link } from "react-router-dom";

const BlogCTA = () => {
  return (
    <section className="max-w-3xl mx-auto mt-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl text-white p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:mr-8 flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to optimize your staffing?</h2>
          <p className="text-violet-100 mb-0 text-sm md:text-base">
            Join thousands of businesses and workers who are already using OVERTIMESTAFF to streamline hospitality staffing.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-violet-700 font-medium rounded-lg hover:bg-violet-50 transition-colors text-center text-sm md:text-base"
          >
            Sign Up Free
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-transparent text-white border border-white rounded-lg font-medium hover:bg-white/10 transition-colors text-center text-sm md:text-base"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCTA;
