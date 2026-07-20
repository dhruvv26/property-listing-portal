"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

import Navbar from "../../../components/Navbar";
import { verifyEmail } from "../../../services/auth.service";

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();

  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail(token);

        setSuccess(true);
        setMessage(
          res.data.message || "Email verified successfully."
        );
      } catch (err: any) {
        setSuccess(false);
        setMessage(
          err.response?.data?.message || "Verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <>
      <Navbar />

      <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">

          {loading ? (
            <>
              <h2 className="text-2xl font-bold">
                Verifying your email...
              </h2>
            </>
          ) : success ? (
            <>
              <CheckCircle
                className="mx-auto text-green-600 mb-5"
                size={70}
              />

              <h1 className="text-3xl font-bold text-green-700">
                Email Verified!
              </h1>

              <p className="mt-4 text-gray-600">
                {message}
              </p>

              <button
                onClick={() => router.push("/login")}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Go to Login
              </button>
            </>
          ) : (
            <>
              <XCircle
                className="mx-auto text-red-600 mb-5"
                size={70}
              />

              <h1 className="text-3xl font-bold text-red-600">
                Verification Failed
              </h1>

              <p className="mt-4 text-gray-600">
                {message}
              </p>

              <Link
                href="/register"
                className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Register Again
              </Link>
            </>
          )}

        </div>
      </div>
    </>
  );
}