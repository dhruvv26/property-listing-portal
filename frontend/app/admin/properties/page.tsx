"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Loader from "../../../components/Loader";
import useProtected from "../../../hooks/useProtected";

import {
  getProperties,
  approveProperty,
  rejectProperty,
} from "../../../services/admin.service";

export default function AdminPropertiesPage() {
  const { user, loading } = useProtected();

  const [properties, setProperties] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchProperties();
  }, [statusFilter]);

  const fetchProperties = async () => {
    setPageLoading(true);

    try {
      const res = await getProperties(statusFilter);
      setProperties(res.data.properties);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to load properties"
      );
    } finally {
      setPageLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveProperty(id);

      toast.success("Property Approved");
      fetchProperties();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Approval failed"
      );
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Enter rejection reason");

    if (!reason) return;

    try {
      await rejectProperty(id, reason);

      toast.success("Property Rejected");
      fetchProperties();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Reject failed"
      );
    }
  };

  if (loading || pageLoading) {
    return <Loader />;
  }

  if (user?.role !== "ADMIN") {
    return (
      <>
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold">
            Access Denied
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-6">
            Property Approval
          </h1>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["ALL", "PENDING", "APPROVED", "REJECTED"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-5 py-2 rounded-lg font-semibold transition ${
                    statusFilter === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          {properties.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-600">
                No Properties Found
              </h2>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property: any) => (
                <div
                  key={property._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={
                      property.coverImage?.url ||
                      "https://via.placeholder.com/500x300"
                    }
                    alt={property.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">
                    <h2 className="text-2xl font-bold text-black">
                      {property.title}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      Owner: {property.owner?.name}
                    </p>

                    <p className="text-blue-600 font-bold text-xl mt-2">
                      ₹ {property.price}
                    </p>

                    <div className="mt-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          property.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : property.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>

                    {property.rejectionReason && (
                      <div className="mt-3 text-red-600 text-sm">
                        <strong>Reason:</strong>{" "}
                        {property.rejectionReason}
                      </div>
                    )}

                    <div className="flex gap-2 mt-6 flex-wrap">

                      <button
                        onClick={() =>
                          handleApprove(property._id)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(property._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Reject
                      </button>

                      <Link
                        href={`/dashboard/properties/${property._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        View
                      </Link>

                    </div>
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