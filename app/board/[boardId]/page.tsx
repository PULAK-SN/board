import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";
// interface BoardIdPageProps {
//   params: {
//     boardId: string;
//   };
// }

interface BoardIdPageProps {
  // The type definition should reflect that params is a Promise
  params: Promise<{
    boardId: string;
  }>;
}
const BoardIdPgae = async ({ params }: BoardIdPageProps) => {
  const { boardId } = await params;
  return (
    <Room roomId={boardId} fallback={<Loading />}>
      <Canvas boardId={boardId} />
    </Room>
  );
};

export default BoardIdPgae;
