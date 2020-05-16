import User from "../models/User";
import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server";
import jwt from "jsonwebtoken";

const userResolver = {
  Query: {
    users: async () => {
      const user = await User.findAll();
      console.log(user);
      return user;
    },
    user: async (_, { email }) => {
      const user = await User.findOne({ where: { email } });
      return user;
    },
  },
  Mutation: {
    signup: async (_, { role, email, password, first_name, last_name }) => {
      password = bcrypt.hashSync(password, 10);
      const exist = await User.findOne({ where: { email } });
      console.log(exist);
      if (exist) throw new Error("User exist");

      const user = User.create({
        role,
        email,
        password,
        first_name,
        last_name,
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_HASH);

      return { token, user };
    },
    login: async (_, { email, password }) => {
      //https://www.howtographql.com/graphql-js/6-authentication/
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");
      const resoult = bcrypt.compareSync(password, user.password);
      if (!resoult) throw new UserInputError("Password incorrect");

      const token = jwt.sign({ userId: user.id }, process.env.JWT_HASH);

      return { token, user };
    },
  },
};

export default userResolver;
