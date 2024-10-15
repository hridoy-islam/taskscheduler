import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export const createNote = async (data) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  const token = session.accessToken;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  return response.json();
};
