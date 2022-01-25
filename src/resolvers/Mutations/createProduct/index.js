import { mutationField, stringArg } from "nexus";
import { v4 as uuidv4 } from "uuid";
export const createProductResolver = async (
  parent,
  { categoryId, title },
  context
) => {
  console.log("categoryId: ", categoryId);
  console.log("title: ", title);
  if (!categoryId || !title) throw new Error("Invalid input params");
  const categoryFind = await context.prisma.category.findMany({
    where: {
      categoryId,
    },
  });
  console.log("categoryFind: ", categoryFind);
  if (!categoryFind) return "Invalid category";
  return await context.prisma.product
    .create({
      data: {
        id: uuidv4(),
        categoryId,
        title,
      },
    })
    .then((res) => {
      console.log("res: ", res);
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
