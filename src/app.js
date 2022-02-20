import { ApolloServer, gql } from "apollo-server";
import Prisma from "@prisma/client";
import { schema } from "./schema.js";
import { genarateToken } from "./util/Jwt.js";
const { PrismaClient } = Prisma;
const prisma = new PrismaClient();
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const userToken = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    // console.log("req: ", req.headers);
    return {
      prisma,
      userToken,
    };
  },
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
