"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import Loader from "../components/Loader";
import PageContainer from "../components/PageContainer";

import { getPublicProperties } from "../services/property.service";

export default function HomePage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    title: "",
    city: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (params: any = {}) => {
    try {
      setLoading(true);

      const res = await getPublicProperties(params);

      setProperties(res.data.properties);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProperties(filters);
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <PageContainer>
        <h1 className="text-4xl font-bold mb-8">
          Property Listing Portal
        </h1>

        <div className="grid md:grid-cols-6 gap-4 mb-8">

          <input
            placeholder="Search"
            className="border p-3 rounded bg-white text-black"
            value={filters.title}
            onChange={(e) =>
              setFilters({
                ...filters,
                title: e.target.value,
              })
            }
          />

          <input
            placeholder="City"
            className="border p-3 rounded bg-white text-black"
            value={filters.city}
            onChange={(e) =>
              setFilters({
                ...filters,
                city: e.target.value,
              })
            }
          />

          <select
            className="border p-3 rounded bg-white text-black"
            value={filters.propertyType}
            onChange={(e) =>
              setFilters({
                ...filters,
                propertyType: e.target.value,
              })
            }
          >
            <option value="">Type</option>
            <option value="Residential">
              Residential
            </option>
            <option value="Commercial">
              Commercial
            </option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            className="border p-3 rounded bg-white text-black"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({
                ...filters,
                minPrice: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Max Price"
            className="border p-3 rounded bg-white text-black"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({
                ...filters,
                maxPrice: e.target.value,
              })
            }
          />

          <select
            className="border p-3 rounded bg-white text-black"
            value={filters.sort}
            onChange={(e) =>
              setFilters({
                ...filters,
                sort: e.target.value,
              })
            }
          >
            <option value="">Sort</option>
            <option value="price">
              Price ↑
            </option>
            <option value="-price">
              Price ↓
            </option>
            <option value="newest">
              Newest
            </option>
            <option value="oldest">
              Oldest
            </option>
          </select>

        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded mb-8"
        >
          Search
        </button>

        {properties.length === 0 ? (
          <h2>No Properties Found</h2>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        )}
      </PageContainer>
    </>
  );
}