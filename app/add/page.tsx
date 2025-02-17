"use client";

import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import Navbar from "@/components/common/navbar";
import { useUser } from "@clerk/nextjs";

// Define the CloudinaryUploadWidgetInfo type
interface CloudinaryUploadWidgetInfo {
  secure_url: string;
  [key: string]: any; // To account for any additional properties
}

const Page = () => {
  const { user } = useUser(); // Get the current user from Clerk

  const [formData, setFormData] = useState({
    business_type:"",
    business_name: "",
    owner: "",
    phone_number: "",
    email: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    services: "",
    image: [] as string[], // Handle image as an array
    created_by: user?.id || "", // Use Clerk's user ID for created_by
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info;
    if (info && typeof info === "object" && "secure_url" in info) {
      const image_url = info.secure_url;
      setUploadedImages((prevImages) => {
        const updatedImages = [...prevImages, image_url];
        setFormData((prevData) => ({
          ...prevData,
          image: updatedImages, // Update the form data with the array of images
        }));
        return updatedImages;
      });
    } else {
      console.error("Invalid upload result:", result);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare request body with updated data format
    const requestBody = {
      type:formData.business_type,
      business_name: formData.business_name,
      owner: formData.owner,
      phone: formData.phone_number,
      email: formData.email,
      website: formData.website,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
      services: formData.services,
      image: formData.image, // Send the images array
      created_by: formData.created_by,
    };

    try {
      const response = await fetch("http://localhost:5000/api/business/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Business added successfully!");
        setFormData({
          business_type:"",
          business_name: "",
          owner: "",
          phone_number: "",
          email: "",
          website: "",
          address: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          services: "",
          image: [],
          created_by: user?.id || "", // Retain created_by as Clerk's user ID
        });
        setUploadedImages([]); // Clear uploaded images
      } else {
        const errorData = await response.json(); // Parse error response
        console.error("Error response:", errorData);
        const errorMessage = errorData?.error || "Failed to add business. Try again!";
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
        <h1 className="text-2xl font-bold mt-14">Add Business</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Business Category</label>
              <select
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="1" disabled>Select a business type</option>
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
          
            {/* Image Upload */}
            <div className="mt-4">
              <label className="block mb-2 font-medium">Upload Images</label>
              <CldUploadWidget
                options={{ sources: ["camera"], multiple: true }}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
                onSuccess={handleUploadSuccess}
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

              <div className="mt-4 grid grid-cols-2 gap-4">
                {uploadedImages.map((url, index) => (
                  <div key={index} style={{ aspectRatio: "2/2" }} className="relative w-full h-auto rounded border">
                    <Image
                      fill={true}
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="absolute"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded"
          >
            Add Business
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;

