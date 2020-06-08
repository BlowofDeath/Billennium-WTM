import jwt from "jsonwebtoken";

const signJWT = (id) =>
  jwt.sign({ userId: id }, process.env.JWT_HASH, {
    expiresIn: "2d",
  });

const verifyJWT = (token) => jwt.verify(token, process.env.JWT_HASH);

export { signJWT, verifyJWT };
