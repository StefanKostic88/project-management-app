import express from "express";

import { PORT, NODE_ENV } from "./config/env";

import { graphqlHTTP } from "express-graphql";

require("dotenv").config();

import graphQLSchema from "./schema/schema";
import { connectDb } from "./config/db";
import cors from "cors";

const port = PORT;
const app = express();

connectDb();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    graphiql: NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
