"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RichTextEditor from "./RichTextEditor";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TaskDetails({ task, isOpen, onClose, onUpdate }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { data: session } = useSession();
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if (task) {
      reset({
        description: task?.description,
        // Set initial due date if it exists
      });
      setDueDate(task?.dueDate ? new Date(task.dueDate) : null);
    }
  }, [task, reset]);

  const handleFormSubmit = async (data) => {
    console.log(data);
    if (!task) return; // Do nothing if there's no task

    // Prepare the PATCH request
    const token = session?.accessToken;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${task._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, dueDate }),
      }
    );

    if (response.ok) {
      const updatedTask = await response.json();
      onUpdate(updatedTask); // Pass the updated task to the parent for refetching
      onClose(); // Close the modal after submission
    } else {
      console.error("Failed to update task", response.statusText);
    }
  };

  if (!task) return null; // Render nothing if there's no task

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-6 dialog-content-custom">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            Add or edit task details and tags
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="p-4 pb-0">
            <Label className="mr-5">Due Date</Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="border rounded p-2"
            />
          </div>
          <div className="p-4 pb-0">
            <span>Description</span>
            <RichTextEditor
              {...register("description")}
              setValue={setValue}
              name="description"
            />
          </div>

          <DialogFooter className={"mt-2"}>
            <Button type="submit">Update</Button>
            <DialogClose asChild>
              <Button onClick={onClose}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
