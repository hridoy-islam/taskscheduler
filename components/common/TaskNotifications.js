"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Bell, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";
import TaskList from "./TaskList";
import TaskDetails from "./TaskDetails";

export default function TaskNotifications() {
  const { data: session, status } = useSession();
  const [dueTasks, setDueTasks] = useState();
  const [upcommingTasks, setUpcommingTasks] = useState();
  const [error, setError] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);

  // Fetch tasks function
  const fetchDueTasks = async () => {
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/duetasks/${session.user.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      setDueTasks(data.data);
    } else {
      console.error("Failed to fetch tasks", response.statusText);
    }
  };

  const fetchUpcommingTasks = async () => {
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/upcommingtasks/${session.user.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      setUpcommingTasks(data.data);
    } else {
      console.error("Failed to fetch tasks", response.statusText);
    }
  };

  useEffect(() => {
    if (session) {
      fetchDueTasks();
      fetchUpcommingTasks();
    }
  }, [session]);

  const handleMarkAsImportant = async (taskId) => {
    const token = session?.accessToken;
    const task = upcommingTasks.find((t) => t._id === taskId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ important: !task?.important }), // Toggle important status
      }
    );

    if (response.ok) {
      fetchUpcommingTasks(); // Refetch tasks to reflect changes
    } else {
      console.error("Failed to mark task as important", response.statusText);
    }
  };

  const handleToggleTaskCompletion = async (taskId) => {
    const token = session?.accessToken;
    const task = upcommingTasks.find((t) => t._id === taskId);

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
      fetchUpcommingTasks(); // Refetch tasks to reflect changes
    } else {
      console.error("Failed to update task status", response.statusText);
    }
  };

  const handleNewTaskSubmit = async (data) => {};

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const handleTaskUpdate = async (updatedTask) => {
    // Update the task in the local state

    await fetchUpcommingTasks();
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="">
      <Card className="w-full mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Due Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <h2>Due Tasks</h2>
          <TaskList
            tasks={dueTasks}
            onMarkAsImportant={handleMarkAsImportant}
            onToggleTaskCompletion={handleToggleTaskCompletion}
            onNewTaskSubmit={handleNewTaskSubmit}
            showAddTaskForm={false}
            onTaskClick={handleTaskClick}
          />
          <TaskDetails
            task={selectedTask}
            isOpen={isTaskDetailsOpen}
            onClose={() => setIsTaskDetailsOpen(false)}
            onUpdate={handleTaskUpdate}
          />
        </CardContent>
      </Card>
      <Card className="w-full  mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Upcomming Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList
            tasks={upcommingTasks}
            onMarkAsImportant={handleMarkAsImportant}
            onToggleTaskCompletion={handleToggleTaskCompletion}
            onNewTaskSubmit={handleNewTaskSubmit}
            showAddTaskForm={false}
            onTaskClick={handleTaskClick}
          />
          <TaskDetails
            task={selectedTask}
            isOpen={isTaskDetailsOpen}
            onClose={() => setIsTaskDetailsOpen(false)}
            onUpdate={handleTaskUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
}
