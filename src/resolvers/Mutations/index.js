import { createProductDefinition } from "./createProduct/index.js"
import { createUserDefinition } from "./createUser/index.js"
import { userLoginDefinition } from "./userLogin/index.js"
export const Mutation = [
    createProductDefinition,
    createUserDefinition,
    userLoginDefinition,
]