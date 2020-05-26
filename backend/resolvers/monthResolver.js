import Month from "../models/Month";
import User from "../models/User";
import { UserInputError } from "apollo-server";
import validator from "validator";
import WorkTimeRecord from "../models/WorkTimeRecord";
import { verifyJWT } from "../middleware/jwtTool";

const monthResolver = {
  Query: {
    month: async (_, { token, month, year }) => {
      const { userId } = verifyJWT(token);
      return await Month.findOne({ where: { year, month, userId } });
    },
    monthForAllUsers: async (_, { token, month, year }) => {
      //zwraca work time z każdego miesiąca dla wszystkich userów
      return await Month.findAll({ where: { month, year } });
    },
    monthsForAllUsersByYear: async (_, { year }) => {
      return await Month.findAll({ where: { year } });
    },
    monthsForUserByYear: async (_, { userId, year }) => {
      return await Month.findAll({ where: { year, userId } });
    },
  },
  Month: {
    user: async ({ userId }, args) => {
      return await User.findOne({ where: { id: userId } });
    },
    workTimeRecords: async ({ id }, args) => {
      return await WorkTimeRecord.findAll({ where: { monthId: id } });
    },
  },
};

export default monthResolver;
