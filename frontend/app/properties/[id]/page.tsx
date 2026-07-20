"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import PageContainer from "../../../components/PageContainer";

import { getPropertyById } from "../../../services/property.service";

export default function PublicPropertyDetailsPage() {
  const params = useParams();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Enquiry submitted successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
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
        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">

            <img
              src={
                property.coverImage?.url ||
                "https://via.placeholder.com/900x500"
              }
              className="rounded-xl h-[450px] w-full object-cover"
              alt={property.title}
            />

            {property.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {property.images.map((img: any, index: number) => (
                  <img
                    key={index}
                    src={img.url}
                    className="rounded h-24 w-full object-cover"
                    alt=""
                  />
                ))}
              </div>
            )}

            <h1 className="text-4xl font-bold mt-8">
              {property.title}
            </h1>

            <h2 className="text-blue-600 text-3xl mt-3 font-bold">
              ₹ {property.price}
            </h2>

            <p className="mt-6 text-gray-700 leading-7">
              {property.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

              <Info label="Type" value={property.propertyType} />
              <Info label="Purpose" value={property.listingPurpose} />
              <Info label="Category" value={property.category} />
              <Info label="Bedrooms" value={property.bedrooms} />
              <Info label="Bathrooms" value={property.bathrooms} />
              <Info label="Area" value={`${property.area} ${property.areaUnit}`} />
              <Info label="Parking" value={property.parking ? "Available" : "No"} />
              <Info label="Age" value={`${property.propertyAge} Years`} />
              <Info label="Furnishing" value={property.furnishing} />

            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">
                Location
              </h2>

              <p>{property.address}</p>
              <p>{property.locality}</p>
              <p>{property.city}, {property.state}</p>
              <p>{property.pinCode}</p>
            </div>

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-4">
                Amenities
              </h2>

              <div className="flex flex-wrap gap-3">
                {property.amenities?.map((item: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 rounded-full px-4 py-2"
                  >
                    {item}
                  </span>
                ))}
              </div>

            </div>

          </div>

          <div>

            <div className="bg-white shadow rounded-xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Owner Details
              </h2>

              <p><strong>Name:</strong> {property.owner?.name}</p>
              <p><strong>Email:</strong> {property.owner?.email}</p>
              <p><strong>Phone:</strong> {property.owner?.phone}</p>

            </div>

            <form
              onSubmit={submitEnquiry}
              className="bg-white shadow rounded-xl p-6 mt-6 space-y-4"
            >

              <h2 className="text-2xl font-bold">
                Enquiry Form
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="input"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <textarea
                rows={5}
                name="message"
                placeholder="Message"
                className="input"
                value={form.message}
                onChange={handleChange}
                required
              />

              <button className="btn-primary w-full">
                Send Enquiry
              </button>

            </form>

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
      <h3 className="text-gray-500 font-medium">{label}</h3>
      <p className="font-bold text-lg">{value || "-"}</p>
    </div>
  );
}