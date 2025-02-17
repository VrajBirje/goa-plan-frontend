"use client"; // Ensure this file is treated as a client component

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import from next/navigation
import { useRouter } from "next/navigation"; // For navigation
import { Business } from "@/lib/types"; // Adjust the import based on your file structure
import { ClipLoader } from "react-spinners";
import Navbar from "@/components/common/navbar";
import Image from "next/image";

const BusinessDetailsPage = () => {
  const [business, setBusiness] = useState<Business | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  // Extract the dynamic id from the pathname (e.g., '/business/1')
  const businessId = pathname?.split('/')[2]; // Assuming /business/[id] route structure

  useEffect(() => {
    if (!businessId) return; // Don't run the fetch if the id is not available

    const fetchBusiness = async () => {
      try {
        console.log(businessId);
        // Use the local API endpoint for fetching business by ID
        const response = await fetch(`https://goa-plan-backend.onrender.com/api/business/${businessId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch business details");
        }
        const data: Business = await response.json();
        setBusiness(data);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    fetchBusiness();
  }, [businessId]);

  const handleEditClick = () => {
    router.push(`/business/${businessId}/edit`); // Navigate to the edit page
  };

  if (!business) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4A90E2" loading={true} size={50} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{business.business_name}</h1>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3 h-64 object-cover mb-4 sm:mb-0 sm:mr-4 relative">
            <Image
              fill={true}
              src={business.image[0] || "/default.jpg"}
              alt={business.business_name || "Business Image"}
              className="absolute"
            />
          </div>
          <div className="flex flex-col sm:w-2/3">
            <div className="mb-4">
              <p className="font-medium text-lg">Business Type:</p>
              <p>{business.type}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium text-lg">Owner:</p>
              <p>{business.owner}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium text-lg">Address:</p>
              <p>{business.address}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium text-lg">Location:</p>
              <p>
                {business.city}, {business.state} - {business.pincode}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium text-lg">Services:</p>
              <p>{business.services}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium text-lg">Website:</p>
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {business.website}
              </a>
            </div>
            <button
              onClick={handleEditClick}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded"
            >
              Edit Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsPage;
