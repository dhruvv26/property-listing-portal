"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { registerUser } from "../../services/auth.service";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await registerUser(data);

      toast.success(res.data.message);

      reset();

      router.push("/login");

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center mt-16">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg p-8 rounded-lg w-96 space-y-4"
        >
          <h2 className="text-3xl font-bold">
            Register
          </h2>

          <input
            {...register("name")}
            placeholder="Name"
            className="border p-3 w-full rounded"
          />

          <input
            {...register("email")}
            placeholder="Email"
            className="border p-3 w-full rounded"
          />

          <input
            {...register("phone")}
            placeholder="Phone"
            className="border p-3 w-full rounded"
          />

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="border p-3 w-full rounded"
          />

          <button
            className="bg-blue-600 text-white w-full py-3 rounded"
          >
            Register
          </button>

        </form>

      </div>
    </>
  );
}