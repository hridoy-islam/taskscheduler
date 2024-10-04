"use client";
import CompanyTableList from "@/components/CompanyTableList";
import CreateCompany from "@/components/CreateCompany";
import { useState } from "react";

export default function UserList() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserCreated = () => {
    setRefreshKey((prev) => prev + 1); // Update the key to trigger re-fetch
  };
  return (
    <div className="container mx-auto py-10">
      <CreateCompany onUserCreated={handleUserCreated} />
      <CompanyTableList refreshKey={refreshKey} />
    </div>
  );
}
