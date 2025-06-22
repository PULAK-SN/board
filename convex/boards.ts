import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (context, args) => {
    const identity = context.auth.getUserIdentity();
    if (!identity) throw Error("Unathorized");

    const boards = context.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();
    return boards;
  },
});
