import User from "../models/User";
import Month from "../models/Month";
import WorkTimeRecord from "../models/WorkTimeRecord";
import Project from "../models/Project";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server";
import validator from "validator";
import { signJWT, verifyJWT } from "../middleware/jwtTool";
import moment from "moment";
import { Op } from "sequelize";

const userResolver = {
  Query: {
    users: async () => {
      const user = await User.findAll();
      return user;
    },
    user: async (_, { email }) => {
      if (!validator.isEmail(email))
        throw new UserInputError("Wrong email adress");
      const user = await User.findOne({ where: { email } });
      return user;
    },
  },
  User: {
    projects: async ({ id }, args) => {
      const months = await Month.findAll({ where: { userId: id } });
      const monthQuery = [];
      months.forEach((value) => {
        monthQuery.push({ monthId: value.id });
      });
      const wtr = await WorkTimeRecord.findAll({
        where: { [Op.or]: monthQuery },
      });
      const wtrQuery = [];
      wtr.forEach((value) => {
        wtrQuery.push({ id: value.projectId });
      });
      return await Project.findAll({ where: { [Op.or]: wtrQuery } });
    },
  },
  Mutation: {
    logout: async (_, { token }) => {
      const { userId } = verifyJWT(token);
      if (!userId) throw new AuthenticationError("Incorrect token");
      const month = await Month.findOne({
        where: {
          userId,
        },
        order: [["createdAt", "DESC"]],
      });

      const wtr = await WorkTimeRecord.findOne({
        where: {
          monthId: month.id,
        },
        order: [["createdAt", "DESC"]],
      });

      const now = moment().valueOf();
      wtr.to = now;
      await wtr.save();

      return "Succes";
    },
    signup: async (_, { role, email, password, first_name, last_name }) => {
      const exist = await User.findOne({ where: { email } });
      if (exist) throw new Error("User exist");
      if (!validator.isEmail(email))
        throw new UserInputError("Wrong email adress");
      if (!validator.isLength(password, { min: 8, max: undefined }))
        throw new UserInputError("Password must have from 8 to 16 chars");

      password = bcrypt.hashSync(password, 10);

      const user = await User.create({
        role,
        email,
        password,
        first_name,
        last_name,
        salary: null,
        isActive: true,
      });

      const token = signJWT(user.id);

      return { token, user };
    },
    login: async (_, { email, password }) => {
      //https://www.howtographql.com/graphql-js/6-authentication/
      if (!validator.isEmail(email))
        throw new UserInputError("Wrong email adress");
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");
      const resoult = bcrypt.compareSync(password, user.password);
      if (!resoult) throw new UserInputError("Password incorrect");

      const token = signJWT(user.id);

      return { token, user };
    },
    updateUser: async (
      _,
      { token, id, email, first_name, last_name, salary, isActive }
    ) => {
      const { userId } = verifyJWT(token);
      if (!userId) throw new AuthenticationError("Incorrect token");
      const user = await User.findOne({ where: { id: userId } });
      if (!user) throw new Error("User not found");
      const userUpdate = await User.findOne({ where: { id } });
      if (!user) throw new Error("User not found");
      if (!validator.isEmail(email))
        throw new UserInputError("Wrong email adress");

      userUpdate.email = email;
      userUpdate.first_name = first_name;
      userUpdate.last_name = last_name;
      userUpdate.salary = salary;
      userUpdate.isActive = isActive;
      await userUpdate.save();
      return userUpdate;
    },
  },
};

export default userResolver;
