import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw Error("Unathorized");

    const boards = ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    const boardsWithFavoriteRelations = (await boards).map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => {
          return {
            ...board,
            // convert any value into a strict boolean (true or false).
            // favorite is either:null if the favorite doesn't exist
            // or an object if it does exist
            // !!null → false
            // !!{...} → true
            isFavorite: !!favorite,
          };
        });
    });

    const boardsWithFavoriteboolean = Promise.all(boardsWithFavoriteRelations);
    return boardsWithFavoriteboolean;
  },
});
