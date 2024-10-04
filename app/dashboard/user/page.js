"use client";
import CreateUser from "@/components/CreateUser";
import UserTableList from "@/components/UserTableList";
import { useState } from "react";

export default function UserList() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserCreated = () => {
    setRefreshKey((prev) => prev + 1); // Update the key to trigger re-fetch
  };
  return (
    <div className="container mx-auto py-10">
      <CreateUser onUserCreated={handleUserCreated} />
      <UserTableList refreshKey={refreshKey} />
    </div>
  );
}
