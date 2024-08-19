import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "./button";

const AlertDialogComp = ({ children, onDelete }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
      <AlertDialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-lg focus:outline-none">
        <AlertDialog.Title className="m-0 text-[17px] font-medium text-gray-900">
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description className="mb-5 mt-4 text-[15px] leading-normal text-gray-700">
          This action cannot be undone. This will permanently delete your
          flashcard set.
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button onClick={onDelete} variant="destructive">
              Yes, delete this set
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogComp;
