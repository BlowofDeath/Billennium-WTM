import User from "../models/User";
import Month from "../models/Month";
import WorkTimeRecord from "../models/WorkTimeRecord";
import Project from "../models/Project";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import validator from "validator";
import { signJWT, verifyJWT } from "../middleware/jwtTool";
import moment from "moment";
import { QueryTypes, Op } from "sequelize";
import db from "../configs/database";

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
      return await Project.findAll({
        include: [
          {
            required: true,
            model: WorkTimeRecord,
            include: {
              model: Month,
              where: { userId: id },
            },
          },
        ],
      });
    },
    activeWorkTimeRecord: async ({ id }, args) => {
      const workTimeRecord = await WorkTimeRecord.findOne({
        where: { to: null },
        include: [
          {
            model: Month,
            where: { userId: id },
          },
        ],
      });
      return workTimeRecord;
    },
  },
  Mutation: {
    signup: async (
      _,
      { role, email, password, first_name, last_name, isActive }
    ) => {
      const exist = await User.findOne({ where: { email } });
      if (exist) throw new Error("User exist");
      if (!validator.isEmail(email))
        throw new UserInputError("Wrong email adress");
      if (!validator.isLength(password, { min: 8, max: undefined }))
        throw new UserInputError("Password must have from 8 to 16 chars");
      if (!validator.isLength(first_name, { min: 3, max: undefined }))
        throw new UserInputError("First name must have at least 3 characters");
      if (!validator.isLength(last_name, { min: 3, max: undefined }))
        throw new UserInputError("Last name must have at least 3 characters");

      password = bcrypt.hashSync(password, 10);

      const user = await User.create({
        role,
        email,
        password,
        first_name,
        last_name,
        isActive: isActive || true,
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
      if (!user.isActive) throw new Error("User isn't active");
      const resoult = bcrypt.compareSync(password, user.password);
      if (!resoult) throw new UserInputError("Password incorrect");

      const token = signJWT(user.id);

      return { token, user };
    },
    updateUser: async (
      _,
      { id, email, first_name, last_name, isActive, role },
      { auth }
    ) => {
      if (!auth) throw new AuthenticationError("Incorrect token");
      const { userId } = auth;

      const user = await User.findOne({ where: { id: userId } });
      if (!user) throw new Error("User not found");
      const userUpdate = await User.findOne({ where: { id } });
      if (!user) throw new Error("User not found");

      if (email) {
        if (!validator.isEmail(email))
          throw new UserInputError("Wrong email adress");
        const emailUsed = await User.findOne({
          where: { email, id: { [Op.ne]: id } },
        });
        if (emailUsed) throw new Error("Email already used");
        userUpdate.email = email;
      }
      if (first_name) {
        if (!validator.isLength(first_name, { min: 3, max: undefined }))
          throw new UserInputError(
            "First name must have at least 3 characters"
          );
        userUpdate.first_name = first_name;
      }
      if (last_name) {
        if (!validator.isLength(last_name, { min: 3, max: undefined }))
          throw new UserInputError("Last name must have at least 3 characters");
        userUpdate.last_name = last_name;
      }
      if (isActive != undefined) userUpdate.isActive = isActive;
      if (role) userUpdate.role = role;
      await userUpdate.save();
      return userUpdate;
    },
  },
};

export default userResolver;
