import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
    emailVerificationTime: v.optional(v.number()),
    modelId: v.optional(v.string()),
  }).index("email", ["email"]),

  chats: defineTable({
    title: v.string(),
    visibility: v.union(v.literal("public"), v.literal("private")),
    createdAt: v.number(),
    userId: v.id("users"),
  })
    .index("by_user", ["userId"])
    .index("by_visibility", ["visibility"]),

  messages: defineTable({
    content: v.string(),
    createdAt: v.number(),
    chatId: v.id("chats"),
  }).index("by_chat", ["chatId"]),
});

export default schema;
