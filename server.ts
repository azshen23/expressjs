import bodyParser from "body-parser";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { userRouter } from "./api/users";
import { createContext } from "./context";
const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/getUser",
  trpcExpress.createExpressMiddleware({
    router: userRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
