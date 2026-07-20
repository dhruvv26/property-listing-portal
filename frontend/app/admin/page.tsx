"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import useProtected from "../../hooks/useProtected";

import { getDashboard } from "../../services/admin.service";

export default function AdminDashboard() {
  const { user, loading } = useProtected();

  const [dashboard, setDashboard] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to load dashboard"
      );
    } finally {
      setPageLoading(false);
    }
  };

  if (loading || pageLoading) {
    return <Loader />;
  }

  if (user?.role !== "ADMIN") {
    return (
      <>
        <Navbar />
        <div className="p-10">
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

          <h1 className="text-4xl font-bold mb-8">
            Admin Dashboard
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            <Card
              title="Total Users"
              value={dashboard?.totalUsers || 0}
            />

            <Card
              title="Total Properties"
              value={dashboard?.totalProperties || 0}
            />

            <Card
              title="Pending Approval"
              value={dashboard?.pendingProperties || 0}
            />

          </div>

        </main>
      </div>
    </>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-gray-500">{title}</h2>

      <h1 className="text-4xl font-bold text-blue-600 mt-3">
        {value}
      </h1>
    </div>
  );
}