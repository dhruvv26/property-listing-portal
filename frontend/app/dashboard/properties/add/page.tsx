"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "../../../../components/Navbar";
import Sidebar from "../../../../components/Sidebar";
import useProtected from "../../../../hooks/useProtected";
import Loader from "../../../../components/Loader";

import {
  createProperty,
  uploadImages,
} from "../../../../services/property.service";

export default function AddPropertyPage() {
  const { user, loading } = useProtected();

  const router = useRouter();

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  if (loading) return <Loader />;

  const onSubmit = async (data: any) => {
  try {
    // Convert amenities string into array
    if (data.amenities) {
      data.amenities = data.amenities
        .split(",")
        .map((item: string) => item.trim());
    }

    // Create property (text fields only)
    const createRes = await createProperty(data);

    const propertyId = createRes.data.property._id;

    // Upload images if selected
    if (coverImage || images.length > 0) {
      const formData = new FormData();

      if (coverImage) {
        formData.append("images", coverImage);
      }

      images.forEach((img) => {
        formData.append("images", img);
      });

      await uploadImages(propertyId, formData);
    }

    toast.success("Property created successfully");

    reset();

    router.push("/dashboard/properties");
  } catch (err: any) {
    toast.error(
      err.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-8">
            Add Property
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
              <option value="">Property Type</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>

            <select
              {...register("listingPurpose")}
              className="border p-3 rounded bg-white text-black"
            >
              <option value="">Listing Purpose</option>
              <option>Sale</option>
              <option>Rent</option>
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
              placeholder="Amenities (comma separated)"
              className="border p-3 rounded col-span-2 bg-white text-black"
            />

            <div>
              <label className="font-semibold">
                Cover Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setCoverImage(e.target.files?.[0] || null)
                }
                className="mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                Property Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setImages(Array.from(e.target.files || []))
                }
                className="mt-2"
              />
            </div>

            <button
              className="bg-blue-600 text-white py-4 rounded col-span-2"
            >
              Create Property
            </button>

          </form>

        </main>
      </div>
    </>
  );
}