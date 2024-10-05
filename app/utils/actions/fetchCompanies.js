"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export const fetchCompanies = async (page, limit, searchTerm = "") => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
  }

  const token = session.accessToken;

  // Construct the API URL
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/users?role=company`);
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);
  if (searchTerm.trim()) {
    url.searchParams.append("searchTerm", searchTerm);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/users?role=company`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );

  if (!response.ok) {
    throw new Error("Failed to fetch creator");
  }

  return await response.json();
};
