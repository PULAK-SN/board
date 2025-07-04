"use-client";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Hint } from "@/components/hint";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="create organigation"
            side="right"
            align="start"
            sideOffset={18}
          >
            <button
              className="bg-white/25 h-full w-full
          rounded-md flex items-center justify-center 
          opacity-60 hover:opacity-100 transition"
            >
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 border-none bg-transparent">
        <DialogTitle />
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
