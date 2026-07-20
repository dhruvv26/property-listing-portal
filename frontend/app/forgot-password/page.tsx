"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar";
import { forgotPassword } from "../../services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await forgotPassword(email);

      toast.success(
        res.data.message || "Password reset email sent!"
      );

      setEmail("");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-gray-800">
            Forgot Password
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Enter your email address and we'll send you a password reset link.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Send Reset Link
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-blue-600 hover:underline"
            >
              ← Back to Login
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}