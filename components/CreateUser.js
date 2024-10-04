"use client";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { RegisterUser } from "@/app/utils/actions/RegisterUser";
import { useForm } from "react-hook-form";

export default function CreateUser({ onUserCreated }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    data.role = "user";
    setIsLoading(true);
    try {
      await RegisterUser(data);
      setIsSuccess(true);
      reset();
      onUserCreated();
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
      fetchCompaniesList(); // Refresh the company list
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };
  const handleClose = () => {
    setIsDialogOpen(false);
    reset();
    setError(null);
  };
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">User List</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create User
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new User to your list. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {!isSuccess ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="col-span-3"
                  />
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save User"
                  )}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-green-600">
                User created successfully!
              </p>
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
