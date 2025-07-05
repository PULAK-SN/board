"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: ReactNode;
}
export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_77X0E7XR3jXU4o3V59omjej0jz0Y1rJnkhW--irI5ZaUikKygKKp9aULireXAvGM"
      }
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
