"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await loginUser(data);

      login(res.data.token, res.data.user);

      toast.success("Login Successful");

      if (res.data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Login to your Property Portal account
          </p>

          <div className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Login
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}