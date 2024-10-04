"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export const fetchCompanies = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
  }

  const token = session.accessToken;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?role=company`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch creator");
  }

  return await response.json();
};
