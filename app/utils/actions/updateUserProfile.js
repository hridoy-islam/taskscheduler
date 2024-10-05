import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export const updateUserProfile = async (userId, updatedFields) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  const token = session.accessToken;

  console.log(userId, updatedFields);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?_id=${userId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFields),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  return response.json();
};
