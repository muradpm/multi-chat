import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createChat = mutation({
  args: {
    title: v.string(),
    visibility: v.union(v.literal("public"), v.literal("private")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");

    return await ctx.db.insert("chats", {
      title: args.title,
      visibility: args.visibility,
      createdAt: Date.now(),
      userId,
    });
  },
});

export const getChatsByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");

    return await ctx.db
      .query("chats")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const deleteChatById = mutation({
  args: { id: v.id("chats") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");

    await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.id))
      .collect()
      .then((messages) => {
        messages.forEach((message) => ctx.db.delete(message._id));
      });

    await ctx.db.delete(args.id);
  },
});
