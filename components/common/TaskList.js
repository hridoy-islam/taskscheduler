"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Star,
  Plus,
  MousePointer,
  UserRoundCheck,
  Calendar,
  CornerDownLeft,
} from "lucide-react";
import TaskDetails from "@/components/common/TaskDetails";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TaskList({ initialName }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openTaskDrawer = (task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };
  const closeTaskDrawer = () => {
    setSelectedTask(null);
    setIsDrawerOpen(false);
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Create project proposal",
      completed: false,
      list: "My Day",
    },
    { id: 2, text: "Review team assignments", completed: true, list: "My Day" },
    // Add more tasks as needed
  ]);

  const [newTask, setNewTask] = useState("");
  const [activeList, setActiveList] = useState("My Day");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, list: activeList },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => task.list === activeList);
  return (
    <div className="">
      <h1 className="text-xl font-semibold">{initialName}</h1>
      <main className="flex-1 p-4 overflow-auto">
        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.text}
                </span>
                <span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <UserRoundCheck className="h-3 w-3" />
                          Kishor Zadid
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Created By Kishor Zadid</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
                <span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Sep 24th 24
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Deadline</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="ghost" size="icon">
                        <Star className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mark As Important</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openTaskDrawer(task)}
                      >
                        <MousePointer className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
      <footer className="bg-white shadow p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          className="flex space-x-2"
        >
          <Input
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <CornerDownLeft className="h-4 w-4 mr-2" />
          </Button>
        </form>
      </footer>
      <TaskDetails
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={closeTaskDrawer}
      />
    </div>
  );
}
