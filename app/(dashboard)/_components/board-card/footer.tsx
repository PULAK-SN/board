import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  authorLebel: string;
  createdAtLebel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  title,
  authorLebel,
  createdAtLebel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const handelClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  };
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-width-[calc(100%-20px)]">
        {title}
      </p>
      <p
        className="opacity-0 group-hover:opacity-100 transition-opacity 
      text-[11px] text-muted-foreground truncate"
      >
        {authorLebel}, {createdAtLebel}
      </p>
      <button
        disabled={disabled}
        onClick={handelClick}
        className={cn(
          `opacity-0 group-hover:opacity-100 transition
             absolute top-3 right-3 text-muted-foreground hover:text-blue-600`,
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn("h-4 w-4", isFavorite && "fill-blue-600 text-bule-600")}
        />
      </button>
    </div>
  );
};
