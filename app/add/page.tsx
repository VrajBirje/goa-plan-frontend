"use client";

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';

// Define the CloudinaryUploadWidgetInfo type
// interface CloudinaryUploadWidgetInfo {
//   secure_url: string;
//   [key: string]: any; // To account for any additional properties
// }

const Page = () => {
  const [formData, setFormData] = useState({
    business_type: "",
    business_name: "",
    owner: "",
    address: "parel",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // const handleUploadSuccess = (result: any) => {
  //   const info = result.info;
  //   if (info && typeof info === "object" && "secure_url" in info) {
  //     const image_url = info.secure_url;
  //     setUploadedImages((prevImages) => {
  //       const updatedImages = [...prevImages, image_url];
  //       // Set the first uploaded image to imageUrl in formData
  //       if (updatedImages.length === 1) {
  //         setFormData((prevData) => ({
  //           ...prevData,
  //           image_url: image_url,
  //         }));
  //       }
  //       return updatedImages;
  //     });
  //   } else {
  //     console.error("Invalid upload result:", result);
  //   }
  // };

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info;
    if (info && typeof info === "object" && "secure_url" in info) {
      const image_url = info.secure_url;
      setUploadedImages((prevImages) => {
        const updatedImages = [...prevImages, image_url];
        // Set the first uploaded image to imageUrl in formData
        if (updatedImages.length === 1) {
          setFormData((prevData) => ({
            ...prevData,
            image_url: image_url,
          }));
        }
        return updatedImages;
      });
    } else {
      console.error("Invalid upload result:", result);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/business/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Business added successfully!");
        setFormData({
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
          opening_hours: "9",
          ratings: 0,
          reviews_count: 0,
          services: "",
          latitude: 1,
          longitude: 1,
          image_url: "",
          created_by: 1,
        });
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
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Add Business</h1>
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
        {/* <div className="mt-4">
          <label className="block mb-2 font-medium">Upload Image</label>
          <CldUploadWidget
            options={{ sources: ["camera"], multiple: false }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
            onSuccess={(result) => {
              const info = result.info;
              if (info && typeof info === "object" && "secure_url" in info) {
                setFormData((prevData) => ({
                  ...prevData,
                  imageUrl: info.secure_url,
                }));
              } else {
                console.error("Invalid upload result:", result);
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>

        </div> */}
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
              <div key={index} className="relative w-full h-auto rounded border">
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
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded"
        >
          Add Business
        </button>
      </form>
    </div>
  );
};

export default Page;
