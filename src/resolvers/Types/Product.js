import { objectType } from "nexus";
import pkg from "graphql-iso-date";
const { GraphQLDateTime } = pkg;
export const DateTime = GraphQLDateTime;
export const Product = objectType({
  name: "Product",
  definition: (t) => {
    t.string("id");
    t.nullable.field("createAt", { type: DateTime });
    t.nullable.field("updateAt", { type: DateTime });
    t.string("categoryId");
    t.string("title");
  },
});
