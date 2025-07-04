"use client";

import { Info } from "./info";
import { Toolbar } from "./toolbar";
import { Participents } from "./participents";

interface CanvasProps {
  boardId: string;
}
export const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participents />
      <Toolbar />
    </main>
  );
};
