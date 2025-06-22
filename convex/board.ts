import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placeholders/1.jpg",
  "/placeholders/2.jpg",
  "/placeholders/3.jpg",
  "/placeholders/4.jpg",
  "/placeholders/5.jpg",
  "/placeholders/6.jpg",
  "/placeholders/7.jpg",
  "/placeholders/8.jpg",
  "/placeholders/9.jpg",
  "/placeholders/10.jpg",
  "/placeholders/11.jpg",
];
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unathorized");
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const board = await ctx.db.insert("boards", {
      orgId: args.orgId,
      title: args.title,
      autherId: identity.subject,
      autherName: identity.name!,
      imageUrl: randomImage,
    });
    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    // TODO: letter check to delete favorite realation as well
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const title = args.title.trim();

    if (!title) throw new Error("Title is requered!");

    if (title.length > 60)
      throw new Error("Title length can not be more then 60 character");

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });
    return board;
  },
});

export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorize");

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error("Board does not exits");
    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .first();

    if (existingFavorite) throw new Error("Board alredy favorited");

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });
    return board;
  },
});

export const unfavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorize");

    const board = await ctx.db.get(args.id);
    if (!board) throw new Error("Board does not exits");
    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex(
        "by_user_board",
        (q) => q.eq("userId", userId).eq("boardId", board._id)
        // TODO: Check if orgId needed
      )
      .unique();

    if (!existingFavorite) throw new Error("Favorited board not found");

    await ctx.db.delete(existingFavorite._id);
    return board;
  },
});
