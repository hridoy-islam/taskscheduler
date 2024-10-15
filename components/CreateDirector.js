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

export default function CreateDirector({ onUserCreated }) {
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onCompanySubmit = async (data) => {
    data.role = "director";
    setIsLoading(true);
    try {
      await RegisterUser(data);
      setIsSuccess(true);
      reset();
      onUserCreated();
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
      // Refresh company list if needed
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setIsCompanyDialogOpen(false);
    }
  };

  const handleCompanyClose = () => {
    setIsCompanyDialogOpen(false);
    reset();
    setError(null);
    setIsSuccess(false);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Director List</h1>

      {/* Create Company Dialog */}
      <Dialog open={isCompanyDialogOpen} onOpenChange={setIsCompanyDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Director
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Director</DialogTitle>
            <DialogDescription>
              Add a new Director to your list. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {!isSuccess ? (
            <form onSubmit={handleSubmit(onCompanySubmit)}>
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
                    "Save Director"
                  )}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-green-600">
                Director created successfully!
              </p>
              <Button onClick={handleCompanyClose} className="w-full">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
