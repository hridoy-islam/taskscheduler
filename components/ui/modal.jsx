import React from "react";
import { Dialog } from "./dialog";

export const Modal = ({ open, onOpenChange, children }) => {
  return (
    <Dialog open={open} onClose={onOpenChange}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
