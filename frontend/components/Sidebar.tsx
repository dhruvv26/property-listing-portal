"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Shield,
  Users,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      pathname === href
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
    }`;

  return (
    <aside className="w-72 min-h-screen bg-white shadow-lg border-r p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        Dashboard
      </h2>

      <div className="space-y-2">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/dashboard/properties"
          className={linkClass("/dashboard/properties")}
        >
          <Building2 size={20} />
          My Properties
        </Link>

        <Link
          href="/dashboard/properties/add"
          className={linkClass("/dashboard/properties/add")}
        >
          <PlusCircle size={20} />
          Add Property
        </Link>

        {user?.role === "ADMIN" && (
          <>
            <div className="border-t my-6"></div>

            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Admin
            </h3>

            <Link href="/admin" className={linkClass("/admin")}>
              <Shield size={20} />
              Dashboard
            </Link>

            <Link
              href="/admin/users"
              className={linkClass("/admin/users")}
            >
              <Users size={20} />
              Users
            </Link>

            <Link
              href="/admin/properties"
              className={linkClass("/admin/properties")}
            >
              <ClipboardList size={20} />
              Properties
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}