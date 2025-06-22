import Image from "next/image";

import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        alt="empty state"
        src="/empty-state.jpg"
        height={200}
        width={200}
      />

      <h2 className="text-2xl font-semibold mt-6">Wellcome to Board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get stated
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 border-none max-w-[480px]">
            <DialogTitle />
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
