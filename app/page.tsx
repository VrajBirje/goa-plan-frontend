"use client";
import Navbar from "@/components/common/navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

// Define the TypeScript interface for a business object
interface Business {
    id: number;
    business_type: string;
    business_name: string;
    owner: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    phone_number: string;
    email: string;
    website: string;
    opening_hours: string;
    ratings: number;
    reviews_count: number;
    services: string;
    latitude: number;
    longitude: number;
    image_url: string;
    created_by: number;
    createdAt: string;
    updatedAt: string;
}

const Page = () => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch businesses data from the API
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://goa-plan-backend.onrender.com/api/business/");
                if (!response.ok) {
                    throw new Error("Failed to fetch businesses");
                }
                const data: Business[] = await response.json();
                setBusinesses(data);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto flex flex-col items-center justify-start">
            <Navbar />
            <h1 className="text-3xl font-bold mb-6 mt-[10vh]">Businesses</h1>
            {loading ? (
                // Show spinner while loading
                <div className="flex justify-center items-center h-96">
                    <ClipLoader
                        color="#4A90E2" // Customize spinner color
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {businesses.map((business) => (
                        <Link key={business.id} href={`/business/${business.id}`} passHref>
                            <div
                                className="business_card rounded-lg shadow bg-white overflow-hidden flex flex-col">
                                <div className="w-full h-48 object-cover relative">
                                    <Image
                                        fill={true}
                                        src={business.image_url || "/default.jpg"}
                                        alt={business.business_name || "Business Image"}
                                        className="absolute"
                                    />
                                </div>
                                <div className="p-4 flex flex-col justify-between flex-grow">
                                    <h2 className="text-xl font-bold mb-2">{business.business_name}</h2>
                                    <p className="text-gray-600 mb-1">{business.business_type}</p>
                                    <p className="text-gray-600 mb-1">Owner: {business.owner}</p>
                                    <p className="text-gray-600 mb-1">{business.address}</p>
                                    {/* <Link
                                    href={business.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline mt-auto"
                                >
                                    Visit Website
                                </Link> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Page;
