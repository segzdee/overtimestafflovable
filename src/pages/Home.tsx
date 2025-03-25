
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { BaseRole } from "@/lib/types";

export default function Home() {
  const { user } = useAuth();

  const getDashboardLink = (role: BaseRole) => {
    return `/dashboard/${role.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              OVERTIMESTAFF
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect businesses with staffing agencies and shift workers efficiently
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {user ? (
                <Button asChild size="lg">
                  <Link to={getDashboardLink(user.role)}>Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link to="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/auth/register">Create Account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Efficient Staffing</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your staff
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OVERTIMESTAFF provides a complete platform for businesses, agencies, and shift workers to connect and collaborate.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    {/* Icon placeholder */}
                  </div>
                  For Businesses
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Post shifts, find qualified staff, and manage scheduling all in one place.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    {/* Icon placeholder */}
                  </div>
                  For Agencies
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Manage your worker roster, connect with businesses, and fill shifts efficiently.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    {/* Icon placeholder */}
                  </div>
                  For Shift Workers
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Find shifts, clock in, and get paid quickly and transparently.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    {/* Icon placeholder */}
                  </div>
                  Integrated Platform
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  All your staffing needs in one centralized, secure, and easy-to-use platform.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
