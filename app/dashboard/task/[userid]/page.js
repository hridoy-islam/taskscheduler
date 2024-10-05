"use client";
import TaskList from "@/components/common/TaskList";
import { useSession } from "next-auth/react";
export default function Page() {
  const { data: session, status } = useSession();
  return (
    <>
      <TaskList />
    </>
  );
}
