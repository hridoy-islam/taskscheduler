"use client";
import CreateDirector from "@/components/CreateDirector";
import DirectorTableList from "@/components/DirectorTableList";

import { useState } from "react";

export default function Page() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserCreated = () => {
    setRefreshKey((prev) => prev + 1); // Update the key to trigger re-fetch
  };
  return (
    <div className="container mx-auto py-10">
      <CreateDirector onUserCreated={handleUserCreated} />
      <DirectorTableList refreshKey={refreshKey} />
    </div>
  );
}
