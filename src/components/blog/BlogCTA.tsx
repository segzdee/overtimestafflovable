
import { Link } from "react-router-dom";

const BlogCTA = () => {
  return (
    <section className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg text-white p-6 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to optimize your staffing?</h2>
          <p className="text-violet-100 text-sm md:text-base">
            Join thousands of businesses and workers who are already using OVERTIMESTAFF to streamline hospitality staffing.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
          <Link
            to="/register"
            className="px-4 py-2 bg-white text-violet-700 font-semibold rounded-md hover:bg-violet-50 transition-colors text-center whitespace-nowrap text-sm"
          >
            Sign Up Free
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 bg-transparent text-white border border-white rounded-md font-medium hover:bg-white/10 transition-colors text-center whitespace-nowrap text-sm"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCTA;
