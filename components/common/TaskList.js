// components/common/TaskList.js
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Star,
  CircleCheckBig,
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
import moment from "moment";
import { useForm } from "react-hook-form";

const TaskList = ({
  tasks,
  onMarkAsImportant,
  onToggleTaskCompletion,
  showAddTaskForm,
  onNewTaskSubmit,
}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const openTaskDrawer = (task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const closeTaskDrawer = () => {
    setSelectedTask(null);
    setIsDrawerOpen(false);
  };

  const handleTaskUpdate = async () => {
    await fetchTasks();
  };

  const sortedTasks = tasks.sort((a, b) => {
    if (a.status === "completed" && b.status === "pending") return 1; // b goes up
    if (a.status === "pending" && b.status === "completed") return -1; // a goes up
    return 0; // maintain original order
  });

  const onSubmit = async (data) => {
    await onNewTaskSubmit(data); // Call the provided submit function
    reset(); // Reset the form after submission
  };

  return (
    <div>
      <main className="flex-1 p-4 overflow-auto">
        <ScrollArea className="h-[calc(85vh-8rem)]">
          <div className="space-y-2">
            {sortedTasks.map((task) => (
              <div
                key={task._id}
                className={`flex items-center space-x-2 bg-white p-3 rounded-lg shadow ${
                  task.important ? "bg-yellow-100" : ""
                }`} // Highlight important tasks
              >
                <Checkbox
                  checked={task.status === "completed"}
                  onCheckedChange={() => onToggleTaskCompletion(task._id)} // Toggle task completion
                />
                <span
                  className={`flex-1 ${
                    task.status === "completed"
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {task.taskName}
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
                          {task.author.name}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Created By {task.author.name}</p>
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
                          {moment(task.dueDate).format("MMM Do YY")}
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
                      <Button
                        variant={task.important ? "outline" : "ghost"}
                        size="icon"
                        onClick={() => onMarkAsImportant(task._id)} // Toggle important status
                      >
                        <Star
                          className={`h-4 w-4 ${
                            task.important ? "text-yellow-500" : ""
                          }`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {task.important
                          ? "Unmark as Important"
                          : "Mark As Important"}
                      </p>
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
                        <CircleCheckBig className="h-4 w-4" />
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

      {showAddTaskForm && (
        <footer className="bg-white shadow p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
            <Input
              {...register("taskName", { required: true })}
              type="text"
              placeholder="Add a task"
              className="flex-1"
            />
            <Button type="submit">
              <CornerDownLeft className="h-4 w-4 mr-2" />
            </Button>
          </form>
        </footer>
      )}

      <TaskDetails
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={closeTaskDrawer}
        onUpdate={handleTaskUpdate}
      />
    </div>
  );
};

export default TaskList;
