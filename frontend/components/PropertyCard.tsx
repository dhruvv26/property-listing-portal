"use client";

import Link from "next/link";
import { BedDouble, Bath, MapPin, IndianRupee } from "lucide-react";

export default function PropertyCard({ property }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={
          property.coverImage?.url ||
          "https://via.placeholder.com/600x400"
        }
        alt={property.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {property.title}
        </h2>

        <p className="flex items-center gap-2 text-gray-500 mb-3">
          <MapPin size={16} />
          {property.city}, {property.state}
        </p>

        <p className="flex items-center gap-2 text-blue-600 text-xl font-bold mb-4">
          <IndianRupee size={18} />
          {Number(property.price).toLocaleString("en-IN")}
        </p>

        <div className="flex justify-between text-gray-600 text-sm mb-5">
          <span className="flex items-center gap-1">
            <BedDouble size={16} />
            {property.bedrooms} Beds
          </span>

          <span className="flex items-center gap-1">
            <Bath size={16} />
            {property.bathrooms} Baths
          </span>

          <span>{property.area} sq.ft.</span>
        </div>

        <Link
          href={`/dashboard/properties/${property._id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}