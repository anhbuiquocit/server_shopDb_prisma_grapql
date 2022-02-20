import { objectType } from "nexus";
export const tokenObject = objectType({
    name: 'tokenObject',
    definition: t=> {
        t.string('token');
        t.string('expiresIn');
    }
})