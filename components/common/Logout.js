"use client";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Logout() {
  const router = useRouter(); // Call useRouter here
  const handleLogout = async () => {
    await signOut({ redirect: false }); // Prevent redirect after logout
    router.push("/"); // Redirect to login page after logging out
  };
  return <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>;
}
