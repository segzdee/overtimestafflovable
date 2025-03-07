
import React from "react";

const NewsletterSignup = () => {
  return (
    <div className="bg-gradient-to-br from-violet-50 to-indigo-50 py-6 md:py-8 px-4 md:px-5 rounded-lg mt-8 shadow-sm border border-violet-100">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Stay Updated with OVERTIMESTAFF</h2>
        <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm md:text-base">
          Subscribe to our newsletter for the latest industry insights, platform updates, and staffing tips.
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 py-2 px-4 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button className="bg-violet-700 text-white px-5 py-2 rounded-lg sm:rounded-l-none font-medium hover:bg-violet-800 transition-colors text-sm md:text-base">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewsletterSignup);
