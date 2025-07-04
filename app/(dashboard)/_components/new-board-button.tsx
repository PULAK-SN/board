"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}
export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter();

  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        //   redirected to /board/{id}
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Faild to created board");
      });
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        `col-span-1 aspect-[100/117] bg-blue-600
        rounded-lg flex flex-col 
        justify-center items-center hover:bg-blue-800`,
        (disabled || pending) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};
