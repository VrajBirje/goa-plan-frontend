"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import next/navigation hooks
import { CldUploadWidget } from "next-cloudinary";
import { ClipLoader } from "react-spinners";
import Navbar from "@/components/common/navbar";

// Define the CloudinaryUploadWidgetInfo type
interface CloudinaryUploadWidgetInfo {
  secure_url: string;
  [key: string]: any;
}

const EditBusinessPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const businessId = pathname?.split('/')[2]; // Extract business ID from URL

  const [formData, setFormData] = useState({
    business_type: "",
    business_name: "",
    owner: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone_number: "",
    email: "",
    website: "",
    opening_hours: "",
    ratings: 0,
    reviews_count: 0,
    services: "",
    latitude: 1,
    longitude: 1,
    image_url: "",
    created_by: 1,
  });
  const [loading, setLoading] = useState(true); // State for spinner while fetching data
  const [isSubmitting, setIsSubmitting] = useState(false); // State for spinner while submitting

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!businessId) return;
      try {
        const response = await fetch(`http://localhost:5000/api/business/${businessId}`);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true); // Show spinner while submitting
      const response = await fetch(`http://localhost:5000/api/business/${businessId}`, {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4A90E2" loading={loading} size={50} />
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
              <label className="block mb-2 font-medium">Business Type</label>
              <input
                type="text"
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
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
                name="phone_number"
                value={formData.phone_number}
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
            {/* <CldUploadWidget
              options={{ sources: ["camera"], multiple: true }}
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
              onSuccess={(result: CloudinaryUploadWidgetInfo) => {
                const info = result.info;
                if (info?.secure_url) {
                  setFormData((prevData) => ({
                    ...prevData,
                    image_url: info.secure_url, // Save uploaded image URL to form data
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
            </CldUploadWidget> */}
            <CldUploadWidget
              options={{ sources: ["camera"], multiple: true }}
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
              onSuccess={(results) => {
                if (Array.isArray(results.event) && results.event.length > 0) {
                  const uploadedFile = results.event[0];
                  if (uploadedFile.secure_url) {
                    setFormData((prevData) => ({
                      ...prevData,
                      image_url: uploadedFile.secure_url, // Save the secure URL
                    }));
                  }
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
