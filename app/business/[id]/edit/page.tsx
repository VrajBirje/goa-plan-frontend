"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import next/navigation hooks
import { CldUploadWidget } from "next-cloudinary";
import { ClipLoader } from "react-spinners";
import Navbar from "@/components/common/navbar";

const EditBusinessPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const businessId = pathname?.split("/")[2]; // Extract business ID from URL

  const [formData, setFormData] = useState({
    type: "",
    business_name: "",
    owner: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    services: "",
    image: [] as string[], // Array for image URLs
    created_by: null as string | null,
    updated_by: null as string | null,
  });
  const [loading, setLoading] = useState(true); // State for spinner while fetching data
  const [isSubmitting, setIsSubmitting] = useState(false); // State for spinner while submitting

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!businessId) return;
      try {
        const response = await fetch(`https://goa-plan-backend.onrender.com/api/business/${businessId}`); // Adjusted to call your custom API
        if (!response.ok) {
          throw new Error("Failed to fetch business details for edit");
        }
        const data = await response.json();
        setFormData(data); // Populate the form with the current business data
      } catch (error) {
        console.error("Error fetching business details:", error);
      } finally {
        setLoading(false); // Stop loading spinner after data is fetched
      }
    };

    fetchBusinessData();
  }, [businessId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true); // Show spinner while submitting
      const response = await fetch(`https://goa-plan-backend.onrender.com/api/business/${businessId}`, {
        method: "PUT", // PUT request for updating
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Business updated successfully!");
        router.push(`/business/${businessId}`); // Redirect to the business details page
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData?.error || "Failed to update business."}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop spinner after submission is complete
    }
  };

  if (loading || isSubmitting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4A90E2" loading={loading || isSubmitting} size={50} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Edit Business</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Business Name</label>
              <input
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Business Category</label>
              <select
                name="type"
                value={formData.type || ""} // Set the value of select based on the formData
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="" disabled>Select a business type</option>
                <option value="villa-stay">Villa Stay</option>
                <option value="home-stay">Home Stay</option>
                <option value="service-apartments">Service Apartments</option>
                <option value="luxury-stay">Luxury Stay</option>
                <option value="hotel-restaurant">Hotel/Restaurant</option>
                <option value="restro-pub">Restro Pub</option>
                <option value="cafes">Cafes</option>
                <option value="adventure-activities">Adventure Activities</option>
                <option value="trekking">Trekking</option>
                <option value="bike-car-rentals">Bike / Car Rentals</option>
                <option value="workshops">Workshops</option>
                <option value="taxi">Taxi</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Owner</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Phone Number</label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Services</label>
              <textarea
                name="services"
                value={formData.services}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block mb-2 font-medium">Upload Images</label>
            <CldUploadWidget
              options={{ sources: ["camera"], multiple: true }}
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
              onSuccess={(results) => {
                if (Array.isArray(results.event) && results.event.length > 0) {
                  const uploadedFiles = results.event.map((file: any) => file.secure_url);
                  setFormData((prevData) => ({
                    ...prevData,
                    image: [...prevData.image, ...uploadedFiles], // Append new image URLs to the image array
                  }));
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Upload Images
                </button>
              )}
            </CldUploadWidget>
          </div>

          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded"
          >
            Update Business
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBusinessPage;
