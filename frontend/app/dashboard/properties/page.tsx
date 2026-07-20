"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Loader from "../../../components/Loader";
import useProtected from "../../../hooks/useProtected";

import {
  getMyProperties,
  deleteProperty,
} from "../../../services/property.service";

export default function MyPropertiesPage() {
  const { loading } = useProtected();

  const [properties, setProperties] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await getMyProperties();
      setProperties(res.data.properties);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load properties");
    } finally {
      setPageLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property?")) return;

    try {
      await deleteProperty(id);

      toast.success("Property deleted");

      fetchProperties();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading || pageLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              My Properties
            </h1>

            <Link
              href="/dashboard/properties/add"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Property
            </Link>
          </div>

          {properties.length === 0 ? (
            <h2>No Properties Found</h2>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-white rounded-lg shadow p-5"
                >
                  <img
                    src={
                      property.coverImage?.url ||
                      "https://via.placeholder.com/400x250"
                    }
                    alt={property.title}
                    className="w-full h-52 object-cover rounded"
                  />

                  <h2 className="text-2xl font-bold mt-4 text-black">
                    {property.title}
                  </h2>

                  <p className="text-gray-600">
                    {property.city}, {property.state}
                  </p>

                  <p className="font-bold text-blue-600 mt-2">
                    ₹ {property.price}
                  </p>

                  <p className="mt-2 text-black">
                    Status :
                    <span className="font-semibold">
                      {" "}
                      {property.status}
                    </span>
                  </p>

                  <div className="flex gap-3 mt-5">
                    <Link
                      href={`/dashboard/properties/edit/${property._id}`}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(property._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                    <Link
                      href={`/properties/${property._id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}