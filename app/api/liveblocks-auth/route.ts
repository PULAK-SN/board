import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret:
    "sk_dev_XJCcBSpkMUzXfRdL-h2qhWWHObHg1YRhSVwaojbfnQl8u-tL1sOzLRNQxyKgE-Dw",
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user)
    return new Response("Unauthorize", { status: 403 });

  const { room } = await request.json();

  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId)
    return new Response("Unauthorize", { status: 403 });

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.firstName || "Anonymous",
      picture: user.imageUrl,
    },
  });

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  // session.allow(`${user.organization}:*`, session.READ_ACCESS);
  if (room) session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
