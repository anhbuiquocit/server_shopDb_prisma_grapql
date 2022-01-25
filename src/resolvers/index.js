import { Type } from "./Types/index.js";
import { Query } from "./Queries/index.js";
import { Mutation } from "./Mutations/index.js";
export const resolvers = [...Type, ...Query, ...Mutation];
