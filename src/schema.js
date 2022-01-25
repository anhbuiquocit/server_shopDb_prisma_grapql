import { makeSchema } from "nexus";
import { resolvers } from "./resolvers/index.js";
export const schema = makeSchema({
  types: resolvers,
});
