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
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new Error("Unathorized");
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const board = await context.db.insert("boards", {
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
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    // TODO: letter check to delete favorite realation as well
    await context.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const title = args.title.trim();

    if (!title) throw new Error("Title is requered!");

    if (title.length > 60)
      throw new Error("Title length can not be more then 60 character");

    const board = await context.db.patch(args.id, {
      title: args.title,
    });
    return board;
  },
});
