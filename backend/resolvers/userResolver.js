import User from "../models/User";
import Month from "../models/Month";
import WorkTimeRecord from "../models/WorkTimeRecord";
import Project from "../models/Project";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server";
import validator from "validator";
import { signJWT, verifyJWT } from "../middleware/jwtTool";
import moment from "moment";
import { QueryTypes } from "sequelize";
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
      return await db.query(
        `SELECT DISTINCT u.id FROM projects AS p LEFT JOIN worktimerecords AS w ON p.id = w.projectid LEFT JOIN months AS m ON w.monthid = m.id LEFT JOIN users AS u ON m.userid = u.id WHERE u.id = ${id}`,
        { type: QueryTypes.SELECT }
      );
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
    signup: async (
      _,
      { role, email, password, first_name, last_name, salary, isActive }
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
        salary: salary || null,
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
      const resoult = bcrypt.compareSync(password, user.password);
      if (!resoult) throw new UserInputError("Password incorrect");

      const token = signJWT(user.id);

      return { token, user };
    },
    updateUser: async (
      _,
      { token, id, email, first_name, last_name, salary, isActive, role }
    ) => {
      const { userId } = verifyJWT(token);
      if (!userId) throw new AuthenticationError("Incorrect token");
      const user = await User.findOne({ where: { id: userId } });
      if (!user) throw new Error("User not found");
      const userUpdate = await User.findOne({ where: { id } });
      if (!user) throw new Error("User not found");

      if (email) {
        if (!validator.isEmail(email))
          throw new UserInputError("Wrong email adress");
        const emailUsed = User.findOne({ where: { email } });
        if (emailUsed && emailUsed.id != id)
          throw new Error("Email already used");
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
      if (salary) userUpdate.salary = salary;
      if (isActive) userUpdate.isActive = isActive;
      if (role) userUpdate.role = role;
      await userUpdate.save();
      return userUpdate;
    },
    removeUser: async (_, { id }) => {
      const user = await User.findOne({ where: { id } });
      if (!user) return null;
      await User.destroy({ where: { id } });
      return user;
    },
  },
};

export default userResolver;
