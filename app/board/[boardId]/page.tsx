"use client";

import { useParams } from "next/navigation";

import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";

// interface BoardIdPageProps {
//   params: {
//     boardId: string;
//   };
// }

// interface BoardIdPageProps {
//   // The type definition should reflect that params is a Promise
//   params: Promise<{
//     boardId: string;
//   }>;
// }
// const BoardIdPage = async ({ params }: BoardIdPageProps) => {
const BoardIdPage = () => {
  // const { boardId } = params;
  const params = useParams();
  const boardId = params.boardId as string;
  return (
    <Room roomId={boardId} fallback={<Loading />}>
      <Canvas boardId={boardId} />
    </Room>
  );
};

export default BoardIdPage;
