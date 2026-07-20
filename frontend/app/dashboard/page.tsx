"use client";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import useProtected from "../../hooks/useProtected";
import Loader from "../../components/Loader";

export default function DashboardPage() {
  const { user, loading } = useProtected();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold">
            Welcome, {user?.name}
          </h1>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg shadow-md p-6 bg-white">
              <h2 className="text-xl font-semibold text-black">
                My Dashboard
              </h2>

              <p className="mt-2 text-gray-600">
                Manage your property listings from here.
              </p>
            </div>

            <div className="rounded-lg shadow-md p-6 bg-white">
              <h2 className="text-xl font-semibold text-black">
                Add Property
              </h2>

              <p className="mt-2 text-gray-600">
                Create a new property listing.
              </p>
            </div>

            <div className="rounded-lg shadow-md p-6 bg-white">
              <h2 className="text-xl font-semibold text-black">
                View Properties
              </h2>

              <p className="mt-2 text-gray-600">
                See all your submitted properties.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}