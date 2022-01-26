import { mutationField, stringArg } from "nexus";
import { v4 as uuidv4 } from "uuid";
import { ApolloError } from "apollo-server-errors";
export const createProductResolver = async (
  parent,
  { categoryId, title },
  context
) => {
  if (!categoryId || !title)
    throw new ApolloError('INVALID INPUT PARAMS', '400');
  await context.prisma.category.findMany({
    where: {
      categoryId,
    },
  }).then(res => {
    console.log('res: ', res);
  });
  
  if (!categoryFind) throw new ApolloError('CATEGORY DOES NOT EXIST', '400');
  return await context.prisma.product
    .create({
      data: {
        id: uuidv4(),
        categoryId,
        title,
      },
    })
    .then((res) => {
      if (res) return "create product succressfully!";
    })
    .catch((err) => {
      return "Error: " + err;
    });
};
export const createProductDefinition = mutationField("createNewProduct", {
  type: "String",
  args: {
    categoryId: stringArg(),
    title: stringArg(),
  },
  resolve: createProductResolver,
});
