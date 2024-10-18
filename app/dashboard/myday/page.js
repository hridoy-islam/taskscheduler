"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TaskList from "@/components/common/TaskList";
import moment from "moment";

export default function Page() {
  const today = moment().format("MMMM Do YYYY");
  const [tasks, setTasks] = useState([]);
  const { data: session } = useSession();

  // Fetch tasks function
  const fetchTasks = async () => {
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task?assigned=${session.user.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTasks(data.data.result);
    } else {
      console.error("Failed to fetch tasks", response.statusText);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

  const handleMarkAsImportant = async (taskId) => {
    const token = session?.accessToken;
    const task = tasks.find((t) => t._id === taskId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ important: !task.important }), // Toggle important status
      }
    );

    if (response.ok) {
      fetchTasks(); // Refetch tasks to reflect changes
    } else {
      console.error("Failed to mark task as important", response.statusText);
    }
  };

  const handleToggleTaskCompletion = async (taskId) => {
    const token = session?.accessToken;
    const task = tasks.find((t) => t._id === taskId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: task.status === "completed" ? "pending" : "completed",
        }),
      }
    );

    if (response.ok) {
      fetchTasks(); // Refetch tasks to reflect changes
    } else {
      console.error("Failed to update task status", response.statusText);
    }
  };

  const handleNewTaskSubmit = async (data) => {
    const token = session?.accessToken;
    data.author = session?.user?.id;
    data.assigned = session?.user?.id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      fetchTasks(); // Refetch tasks to include the new one
    } else {
      console.error("Failed to add task", response.statusText);
    }
  };
  return (
    <>
      <h1 className="text-xl font-semibold">Today</h1>
      <TaskList
        tasks={tasks}
        onMarkAsImportant={handleMarkAsImportant}
        onToggleTaskCompletion={handleToggleTaskCompletion}
        onNewTaskSubmit={handleNewTaskSubmit}
        showAddTaskForm={false} // Set to true to show the add task form
      />
    </>
  );
}
