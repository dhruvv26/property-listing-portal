"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { House, LayoutDashboard, LogOut, User, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <House size={28} />
          Property Portal
        </Link>

        <div className="flex items-center gap-6">

          <Link
            href="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          {user && (
  <>
    <Link
      href="/dashboard"
      className="flex items-center gap-2 hover:text-blue-600"
    >
      <LayoutDashboard size={18} />
      Dashboard
    </Link>

    {user.role === "ADMIN" && (
      <Link
        href="/admin"
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
      >
        <Shield size={18} />
        Admin Panel
      </Link>
    )}
  </>
)}

          {user ? (
            <>
              <div className="flex items-center gap-2 font-semibold">
                <User size={18} />
                {user.name}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}