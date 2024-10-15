import { X } from "lucide-react";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";

export const ConfirmDeleteDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black/30" />
      <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
        <div className="mx-auto max-w-sm rounded bg-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4">
            <p>Are you sure you want to delete this note?</p>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
