"use server";

export const RegisterUser = async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  console.log(res);
  const userInfo = await res.json();
  return userInfo;
};
