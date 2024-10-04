"use client";
import CreateCreator from "@/components/CreateCreator";
import CreatorTableList from "@/components/CreatorTableList";
import { useState } from "react";

export default function UserList() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserCreated = () => {
    setRefreshKey((prev) => prev + 1); // Update the key to trigger re-fetch
  };
  return (
    <div className="container mx-auto py-10">
      <CreateCreator onUserCreated={handleUserCreated} />
      <CreatorTableList refreshKey={refreshKey} />
    </div>
  );
}
