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
    }),
    async resolve({ input }) {
      await postModel.createPost(input);
      return {
        status: "SUCCESS",
        message: "Post Created Successfully",
      };
    },
  });

export type postRouter = typeof postRouter;
