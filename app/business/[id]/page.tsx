// app/business/[id]/page.tsx
"use client"; // Ensure this file is treated as a client component

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import from next/navigation
import { useRouter } from "next/navigation"; // For navigation
import { Business } from "@/lib/types"; // Adjust the import based on your file structure
import { ClipLoader } from "react-spinners";
import Navbar from "@/components/common/navbar";

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
                console.log(businessId)
                const response = await fetch(`http://localhost:5000/api/business/${businessId}`);
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
        <div className="p-6 max-w-6xl mx-auto">
            <Navbar/>
            <h1 className="text-3xl font-bold mb-6">{business.business_name}</h1>
            <div className="flex flex-col sm:flex-row">
                <img
                    src={business.image_url || "/default.jpg"}
                    alt={business.business_name || "Business Image"}
                    className="w-full sm:w-1/3 h-64 object-cover mb-4 sm:mb-0 sm:mr-4"
                />
                <div className="flex flex-col sm:w-2/3">
                    <p className="text-lg font-bold">{business.business_type}</p>
                    <p>{business.owner}</p>
                    <p>{business.address}</p>
                    <p>{business.city}, {business.state} - {business.pincode}</p>
                    <p className="mt-2">{business.services}</p>
                    <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline mt-4"
                    >
                        Visit Website
                    </a>
                    <button
                        onClick={handleEditClick}
                        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded"
                    >
                        Edit Business
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetailsPage;
