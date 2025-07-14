import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "./footer";
import { Actions } from "@/components/actions";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { MoreHorizontal } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  autherName: string;
  authorId: string;
  orgId: string;
  createdAt: number;
  isfavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  orgId,
  authorId,
  autherName,
  createdAt,
  isfavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLebel = userId === authorId ? "You" : autherName;
  const createdAtLebel = formatDistanceToNow(createdAt, { addSuffix: true });
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );

  const toggleFavorite = () => {
    if (isfavorite)
      onUnfavorite({ id })
        .then(() => toast.success("Remove from favorite"))
        .catch(() => toast.error("Faild to unfavorite"));
    else
      onFavorite({ id, orgId })
        .then(() => toast.success("Favorited"))
        .catch(() => toast.error("Faild to favorite"));
  };
  return (
    <Link href={`./board/${id}`}>
      <div
        className="group aspect-[100/117] border rounded-lg flex flex-col
      justify-between overflow-hidden"
      >
        <div className="relative flex-1 bg-amber-50">
          <Image
            alt={title}
            src={imageUrl}
            fill
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100
              transition-opacity px-3 py-2 outline-none"
            >
              <MoreHorizontal
                className="text-white opacity-75
              hover:opacity-100 transition-opacity"
              />
            </button>
          </Actions>
        </div>

        <Footer
          isFavorite={isfavorite}
          title={title}
          authorLebel={authorLebel}
          createdAtLebel={createdAtLebel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/117] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
