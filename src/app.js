import { ApolloServer, gql } from "apollo-server";
import Prisma from "@prisma/client";
import { schema } from "./schema.js";

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    prisma,
  }),
  formatError: (err) => {
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }
    return { message: err.message, statusCode: err.extensions.code };
  },
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
