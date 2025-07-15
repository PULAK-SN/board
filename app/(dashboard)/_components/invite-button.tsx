import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h4 w4 mr-2" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 m-0 bg-transparent border-none sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:xl:max-w-4xl">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  );
};
