import { Canvas } from "./_components/canvas";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPgae = ({ params }: BoardIdPageProps) => {
  return <Canvas boardId={params.boardId} />;
};

export default BoardIdPgae;
