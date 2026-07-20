"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import { resetPassword } from "../../../services/auth.service";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();

  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword(token, password);

      toast.success(
        res.data.message || "Password reset successful"
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Failed to reset password"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-2">
            Reset Password
          </h1>

          <p className="text-gray-500 text-center mb-8">
            Enter your new password below.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Reset Password
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}