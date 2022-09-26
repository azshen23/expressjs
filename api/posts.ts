import * as trpc from "@trpc/server";
import { z } from "zod";
import { Context } from "../context";
import { TRPCError } from "@trpc/server";
import * as userModel from "../models/users";
import * as postModel from "../models/posts";

require("dotenv").config();

export const postRouter = trpc
  .router<Context>()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .mutation("createPost", {
    input: z.object({
      authorid: z.number(),
      dateposted: z.string(),
      title: z.string(),
      content: z.string(),
      mood: z.number(),
      public: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      if (ctx.user?.id != input.authorid) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Author ID does not match authentication id",
        });
      } else {
        await postModel.createPost(input);
        return {
          status: "SUCCESS",
          message: "Post Created Successfully",
        };
      }
    },
  })
  .query("getPublicPosts", {
    input: z.number(),
    async resolve({ input }) {
      const posts = await postModel.getPublicPosts(input);
      return posts;
    },
  });

export type postRouter = typeof postRouter;
