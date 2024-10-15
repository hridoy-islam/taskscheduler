"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export const fetchUsersByCompany = async (companyId) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
  }

  const token = session.accessToken;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?role=user&company=${companyId}`,
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
};
