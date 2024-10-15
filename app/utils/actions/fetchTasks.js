import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export const fetchTasks = async (filters = {}) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Not authenticated");
    }

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        params.append(key, value);
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Call the function with an object of filters
// fetchTasks({
//     author: 10,  // Specify the author ID
//     assigned: 20,  // Use "assigned" as per your requirement
//     important: true,  // Boolean value
//     company: 2  // Specify the company ID
//   });
