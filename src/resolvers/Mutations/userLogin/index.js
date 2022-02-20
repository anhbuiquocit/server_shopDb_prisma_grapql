import { mutationField, stringArg } from "nexus";
import { ApolloError } from "apollo-server-errors";
import * as bcryptUtil from "./../../../util/Bcrypt.js";
import * as jwtUtil from "./../../../util/Jwt.js";
export const userLoginResolver = async (
  parent,
  { username, password },
  context
) => {
  if (!username || !password)
    throw new ApolloError("ENTER USERNAME AND PASSWORD", 400);
  const userFind = await context.prisma.db_user.findFirst({
    where: {
      username,
    },
  });
  if (!userFind) throw new ApolloError("USERNAME IS NOT CORRECT", 400);
  const isPasswordCorrect = await bcryptUtil.comparePassword(
    password,
    userFind.password
  );
  if (isPasswordCorrect) {
    let dataUser = {
      id: userFind.id,
      username: userFind.username,
    };
    const token = await jwtUtil.genarateToken(dataUser, { expiresIn: 86400 });

    return {
      token,
      expiresIn: "86400",
    };
  } else {
    throw new ApolloError("Password in not correct");
  }
};
export const userLoginDefinition = mutationField("userLogin", {
  type: "tokenObject",
  args: { username: stringArg(), password: stringArg() },
  resolve: userLoginResolver,
});
