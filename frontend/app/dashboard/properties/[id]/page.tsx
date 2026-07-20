"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "../../../../components/Navbar";
import Loader from "../../../../components/Loader";
import PageContainer from "../../../../components/PageContainer";

import { getPropertyById } from "../../../../services/property.service";

export default function PropertyDetailsPage() {
  const params = useParams();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await getPropertyById(params.id as string);
      setProperty(res.data.property);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load property");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!property) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <h2 className="text-2xl font-bold">Property not found</h2>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div>
            <img
              src={
                property.coverImage?.url ||
                "https://via.placeholder.com/700x450"
              }
              alt={property.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />

            {property.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {property.images.map((image: any, index: number) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Property ${index + 1}`}
                    className="h-24 w-full object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {property.title}
            </h1>

            <h2 className="text-2xl text-blue-600 mt-3">
              ₹ {property.price}
            </h2>

            <p className="mt-4">
              {property.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <Info label="Type" value={property.propertyType} />
              <Info label="Purpose" value={property.listingPurpose} />
              <Info label="Category" value={property.category} />
              <Info label="Area" value={`${property.area} ${property.areaUnit}`} />
              <Info label="Bedrooms" value={property.bedrooms} />
              <Info label="Bathrooms" value={property.bathrooms} />
              <Info label="Furnishing" value={property.furnishing} />
              <Info
                label="Parking"
                value={property.parking ? "Available" : "No"}
              />

              <Info
                label="Property Age"
                value={`${property.propertyAge} Years`}
              />

              <Info
                label="Status"
                value={property.status}
              />

            </div>

            <div className="mt-8">

              <h2 className="text-2xl font-semibold mb-3">
                Address
              </h2>

              <p>
                {property.address}
              </p>

              <p>
                {property.locality}
              </p>

              <p>
                {property.city}, {property.state}
              </p>

              <p>
                {property.pinCode}
              </p>

            </div>

            <div className="mt-8">

              <h2 className="text-2xl font-semibold mb-3">
                Amenities
              </h2>

              <div className="flex flex-wrap gap-3">
                {property.amenities?.map(
                  (amenity: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                    >
                      {amenity}
                    </span>
                  )
                )}
              </div>

            </div>

            <div className="mt-8">

              <h2 className="text-2xl font-semibold mb-3">
                Owner Details
              </h2>

              <p>
                <strong>Name:</strong> {property.owner?.name}
              </p>

              <p>
                <strong>Email:</strong> {property.owner?.email}
              </p>

              <p>
                <strong>Phone:</strong> {property.owner?.phone}
              </p>

            </div>

          </div>

        </div>
      </PageContainer>
    </>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-gray-500">
        {label}
      </h3>

      <p className="text-lg font-bold text-black">
        {value}
      </p>
    </div>
  );
}