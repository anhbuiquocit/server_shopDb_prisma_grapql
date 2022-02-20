import { mutationField, stringArg } from "nexus";
import { v4 as uuidv4 } from "uuid";
import { ApolloError } from "apollo-server-errors";
import * as bcryptUtil from "../../../util/Bcrypt.js";
export const createUserResolver = async (
  parent,
  { username, password, fullName },
  context
) => {
  if (!username || !password || !fullName)
    throw new ApolloError("INVALID INPUT PARAMS", 400);
  const userFind = await context.prisma.db_user.findFirst({
    where: {
      username,
    },
  });
  if (userFind) throw new ApolloError("USERNAME EXISTED", 400);
  let message;
  await context.prisma.db_user
    .create({
      data: {
        id: uuidv4(),
        username,
        password: bcryptUtil.hashPassword(password.toString()),
        fullName,
      },
    })
    .then((res) => {
      if(res) message = 'register successfully';
    })
    .catch((err) => {
      console.log("err: ", err);
      message = err;
    });
    return message;
};
export const createUserDefinition = mutationField("createUser", {
  type: "String",
  args: { username: stringArg(), password: stringArg(), fullName: stringArg() },
  resolve: createUserResolver,
});
