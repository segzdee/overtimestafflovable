
import { Link } from "react-router-dom";

const BlogCTA = () => {
  return (
    <section className="max-w-3xl mx-auto mt-16 bg-gradient-to-r from-violet-600 to-purple-700 rounded-xl text-white p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to optimize your staffing?</h2>
          <p className="text-violet-100 mb-0 md:text-lg">
            Join thousands of businesses and workers who are already using OVERTIMESTAFF to streamline hospitality staffing.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-violet-700 font-semibold rounded-lg hover:bg-violet-50 transition-colors text-center whitespace-nowrap"
          >
            Sign Up Free
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-transparent text-white border border-white rounded-lg font-medium hover:bg-white/10 transition-colors text-center whitespace-nowrap"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCTA;
