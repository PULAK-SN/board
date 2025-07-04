"use client";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";

export const EmptyBoards = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        // redirect to board/{id}
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Faild to create board");
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image alt="Empty search" src="/note.jpg" height={200} width={200} />

      <h2 className="text-2ex font-semibold mt-6">Create your first boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a boards for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create board
        </Button>
      </div>
    </div>
  );
};
