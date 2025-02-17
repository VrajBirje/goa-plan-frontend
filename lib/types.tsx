// src/lib/types.ts

export interface Business {
  id: string;
  business_name: string;
  owner: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  services: string;
  image: string[];
  type: string; // Ensure the 'type' field is here
  created_at: string;
  created_by: string;
  updated_by: string;
}
