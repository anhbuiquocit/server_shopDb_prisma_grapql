import { ApolloServer, gql } from 'apollo-server';
import Prisma from "@prisma/client";
import { schema } from './schema.js';
const { PrismaClient } = Prisma;
const prisma = new PrismaClient();
const server = new ApolloServer({ 
    schema,
    context: ({req}) => ({
        prisma,
    })
 });
 server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });