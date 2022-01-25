import { arg, booleanArg, extendType, idArg, intArg, stringArg } from "nexus";
export const GetProductResolver = async (parent, { id }, context) => {
  let Product;
  if (!id) {
    await context.prisma.product.findMany().then((res) => {
      Product = res;
    });
  } else {
      Product = []
    await context.prisma.product
      .findUnique({
        where: {
          id,
        },
      })
      .then((res) => {
        Product.push(res);
      });
  }
  console.log("Product: ", Product);
  return Product;
};
export const GetProductDefinition = extendType({
  type: "Query",
  definition: (t) => {
    t.list.field("Product", {
      type: "Product",
      args: { id: idArg("id of product")},
      resolve: GetProductResolver,
    });
  },
});
