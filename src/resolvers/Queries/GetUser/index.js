import { extendType, idArg } from "nexus";
export const GetUserResolver = async (parent, { id }, context) => {
  console.log('user token: ', context.userToken);
  return await context.prisma.db_user.findMany({
    where: {
      id,
    },
  });
};
export const GetUserDefinition = extendType({
  type: "Query",
  definition: (t) => {
    t.list.field("User", {
      type: "User",
      args: { id: idArg() },
      resolve: GetUserResolver,
    });
  },
});
