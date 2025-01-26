// Helper functions to fetch data from the API

import { Business } from "./types";

export const fetchBusinesses = async (): Promise<Business[]> => {
    const response = await fetch("https://goa-plan-backend.onrender.com/api/business/");
    if (!response.ok) {
      throw new Error("Failed to fetch businesses");
    }
    return response.json();
  };
  
  export const fetchBusinessById = async (id: string): Promise<Business> => {
    const response = await fetch(`https://goa-plan-backend.onrender.com/api/business/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch business with id: ${id}`);
    }
    return response.json();
  };