"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export const fetchColleges = async (companyid) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
  }

  const token = session.accessToken;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?role=user&company=${companyid}`,
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
