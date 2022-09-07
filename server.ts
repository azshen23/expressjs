import bodyParser from "body-parser";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { userRouter } from "./api/users";
import * as trpc from "@trpc/server";
import { createContext, Context } from "./context";
const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const appRouter = trpc.router<Context>().merge(userRouter);

app.use(
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
