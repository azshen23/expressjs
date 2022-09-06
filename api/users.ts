const userModel = require("../models/user");
const verificationModel = require("../models/userVerification");
const tokenModel = require("../models/token");
import * as trpc from "@trpc/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { decodeAndVerifyRefreshToken } from "../utils/verifyJwt";
import { Context } from "../context";
import { User } from "../utils/verifyJwt";

const prisma = new PrismaClient();

import { TRPCError } from "@trpc/server";
require("dotenv").config();

export const userRouter = trpc.router<Context>().query("getUser", {
  async resolve({ ctx }) {
    if (ctx != null) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return "hello";
  },
});

export type userRouter = typeof userRouter;
