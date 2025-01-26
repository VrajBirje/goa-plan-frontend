// types.ts
export interface Business {
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
  