import * as trpc from "@trpc/server";
import { z } from "zod";
import { Context } from "../context";
import { TRPCError } from "@trpc/server";
import * as userModel from "../models/users";
import * as postModel from "../models/posts";

require("dotenv").config();

export const userRouter = trpc
  .router<Context>()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getUser", {
    input: String,
    async resolve({ input }) {
      const userData = await userModel.getUserData(parseInt(input));
      if (!userData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User Data could not be found",
        });
      } else {
        return userData;
      }
    },
  })
  .query("getUserPosts", {
    input: String,
    async resolve({ input }) {
      const userPosts = await postModel.getUserPosts(parseInt(input));
      return userPosts;
    },
  });

export type userRouter = typeof userRouter;
