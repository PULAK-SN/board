export const Info = () => {
  return (
    <div
      className="absolute top-2 left-2 rounded-md bg-white h-12 px-1.5 
    flex items-center shadow-md"
    >
      TODO: information about the board
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div
      className="absolute top-2 left-2 rounded-md bg-white h-12 
    flex items-center shadow-md w-[300px]"
    />
  );
};
