import jwt from "jsonwebtoken";
export const genarateToken = (clainms, option) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      clainms,
      "anhbuiquoc2000",
      option || { noTimestamp: true },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, "anhbuiquoc2000", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
