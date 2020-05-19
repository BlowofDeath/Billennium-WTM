import User from "../models/User";
import Month from "../models/Month";
import WorkTimeRecord from "../models/WorkTimeRecord";
import bcrypt from "bcrypt";
import { UserInputError, AuthenticationError } from "apollo-server";
import validator from "validator";
import { signJWT, verifyJWT } from "../middleware/jwtTool";
import moment from "moment";

const userResolver = {
  Query: {
    users: async () => {
      const user = await User.findAll();
      console.log(user);
      return user;
    },
    user: async (_, { email }) => {
      if (!validator.isEmail(email))
        throw new UserInputError("Wrong email adress");
      const user = await User.findOne({ where: { email } });
      return user;
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
      console.log(month.id);

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

      const user = User.create({
        role,
        email,
        password,
        first_name,
        last_name,
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

      //Starting count time
      const month = moment().format("M");
      const year = moment().format("Y");
      const day = moment().format("D");
      const now = moment().valueOf();
      let monthExist = await Month.findOne({
        where: { month, userId: user.id },
      });
      if (!monthExist) {
        monthExist = await Month.create({
          month,
          year,
          isClosed: false,
          userId: user.id,
        });
      }

      const workTimeRecord = await WorkTimeRecord.findOne({
        where: { day, monthId: monthExist.id },
      });
      if (!workTimeRecord) {
        WorkTimeRecord.create({
          day,
          from: now,
          to: null,
          monthId: monthExist.id,
        });
      }

      return { token, user };
    },
  },
};

export default userResolver;
