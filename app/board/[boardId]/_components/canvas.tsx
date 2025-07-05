"use client";

import { Info } from "./info";
import { Toolbar } from "./toolbar";
import { Participents } from "./participents";
import { useSelf } from "@liveblocks/react/suspense";
interface CanvasProps {
  boardId: string;
}
export const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);
  console.log(info);
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participents />
      <Toolbar />
    </main>
  );
};
