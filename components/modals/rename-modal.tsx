"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { useRenameModal } from "@/store/use-rename-model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const RenameModal = () => {
  const { mutate, pending } = useApiMutation(api.board.update);
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success("Board renamed");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to rename borad");
      });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new titile for this board</DialogDescription>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
