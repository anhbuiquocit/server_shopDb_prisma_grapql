import bcrypt from "bcrypt";
export const hashPassword = (text) => bcrypt.hashSync(text, bcrypt.genSaltSync(12));
export const comparePassword = (password, passwordEncrypted) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordEncrypted, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
