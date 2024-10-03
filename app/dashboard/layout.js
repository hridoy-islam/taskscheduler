import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../utils/authOptions";
import Sidebar from "@/components/common/Sidebar";
import DashboardHeader from "@/components/common/DashboardHeader";

export default async function DashboardLayout({ children }) {
  // Get the session on the server side
  const session = await getServerSession(authOptions);

  // If no session, redirect to login
  if (!session) {
    redirect("/");
  }

  // Render the dashboard layout
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
