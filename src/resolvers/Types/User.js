import { objectType } from "nexus";
import pkg from "graphql-iso-date";
const { GraphQLDateTime } = pkg;
export const DateTime = GraphQLDateTime;
export const User = objectType({
  name: "User",
  definition: (t) => {
    t.string("id");
    t.nullable.field("createAt", { type: DateTime });
    t.nullable.field("updateAt", { type: DateTime });
    t.string('fullName');
    t.string('username');
  },
});
