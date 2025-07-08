"use client";
import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

const MAX_SHOWN_USERS = 1;

export const Participents = () => {
  const users = useOthers();
  const currentUser = useSelf();

  const hasMoreUser = users.length > MAX_SHOWN_USERS;

  return (
    <div
      className="absolute top-2 right-2 bg-white p-3 rounded-md
        h-12 flex items-center shadow-md"
    >
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}

        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {hasMoreUser && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+ ${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipentsSkeleton = () => {
  return (
    <div
      className="absolute top-2 right-2 bg-white p-3 rounded-md
        h-12 flex items-center shadow-md w-[100px]"
    />
  );
};
