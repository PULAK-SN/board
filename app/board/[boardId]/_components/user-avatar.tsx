import { Hint } from "@/components/hint";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface userAvatarProps {
  name?: string;
  src?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar = ({
  name,
  src,
  fallback,
  borderColor,
}: userAvatarProps) => {
  return (
    <Hint label={name || "Teammeate"} side="bottom" sideOffset={18}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor: borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
