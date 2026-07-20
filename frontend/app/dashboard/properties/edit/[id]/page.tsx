"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "../../../../../components/Navbar";
import Sidebar from "../../../../../components/Sidebar";
import Loader from "../../../../../components/Loader";
import useProtected from "../../../../../hooks/useProtected";

import {
  getPropertyById,
  updateProperty,
} from "../../../../../services/property.service";

export default function EditPropertyPage() {
  const { loading } = useProtected();

  const params = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await getPropertyById(params.id as string);

      const property = res.data.property;

      reset({
        ...property,
        amenities: property.amenities?.join(", "),
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load property");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (data.amenities) {
        data.amenities = data.amenities
          .split(",")
          .map((item: string) => item.trim());
      }

      await updateProperty(params.id as string, data);

      toast.success("Property updated successfully");

      router.push("/dashboard/properties");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-8">
            Edit Property
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6"
          >
            <input
              {...register("title")}
              placeholder="Title"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              type="number"
              {...register("price")}
              placeholder="Price"
              className="border p-3 rounded bg-white text-black"
            />

            <textarea
              {...register("description")}
              placeholder="Description"
              className="border p-3 rounded col-span-2 bg-white text-black"
            />

            <select
              {...register("propertyType")}
              className="border p-3 rounded bg-white text-black"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>

            <select
              {...register("listingPurpose")}
              className="border p-3 rounded bg-white text-black"
            >
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select>

            <input
              {...register("category")}
              placeholder="Category"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              type="number"
              {...register("area")}
              placeholder="Area"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              {...register("areaUnit")}
              placeholder="Area Unit"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              {...register("address")}
              placeholder="Address"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              {...register("locality")}
              placeholder="Locality"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              {...register("city")}
              placeholder="City"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              {...register("state")}
              placeholder="State"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              {...register("pinCode")}
              placeholder="Pin Code"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              type="number"
              {...register("bedrooms")}
              placeholder="Bedrooms"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              type="number"
              {...register("bathrooms")}
              placeholder="Bathrooms"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              {...register("furnishing")}
              placeholder="Furnishing"
              className="border p-3 rounded bg-white text-black"
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register("parking")}
              />
              Parking Available
            </label>

            <input
              type="number"
              {...register("propertyAge")}
              placeholder="Property Age"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              {...register("possessionStatus")}
              placeholder="Possession Status"
              className="border p-3 rounded bg-white text-black"
            />

            <input
              type="date"
              {...register("availableFrom")}
              className="border p-3 rounded bg-white text-black"
            />

            <input
              {...register("amenities")}
              placeholder="Amenities"
              className="border p-3 rounded col-span-2 bg-white text-black"
            />

            <button
              className="bg-blue-600 text-white py-4 rounded col-span-2"
            >
              Update Property
            </button>
          </form>
        </main>
      </div>
    </>
  );
}