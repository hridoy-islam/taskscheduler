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

export default function TaskDetails({ task, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-6 dialog-content-custom">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            Add or edit task details and tags
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 pb-0">
          <Label>Days Required</Label>
          <Input type="number" placeholder="" />
        </div>
        <div className="p-4 pb-0">
          <span>Description</span>
          <RichTextEditor />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
