import Month from "../models/Month";
import User from "../models/User";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import validator from "validator";
import WorkTimeRecord from "../models/WorkTimeRecord";
import { verifyJWT } from "../middleware/jwtTool";
import { Op } from "sequelize";
import moment from "moment";

const monthResolver = {
  Query: {
    month: async (_, { month, year }, { auth }) => {
      if (!auth) throw new AuthenticationError("Incorrect token");
      const { userId } = auth;
      return await Month.findOne({ where: { year, month, userId } });
    },
    monthForAllUsers: async (_, { month, year, status }, { auth }) => {
      //zwraca work time z każdego miesiąca dla wszystkich userów
      if (status)
        return await Month.findAll({ where: { month, year, status } });
      return await Month.findAll({ where: { month, year } });
    },
    monthsForAllUsersByYear: async (_, { year, status }) => {
      if (status) return await Month.findAll({ where: { year, status } });
      return await Month.findAll({ where: { year } });
    },
    monthsForUserByYear: async (_, { userId, year }) => {
      return await Month.findAll({ where: { year, userId } });
    },
    monthsForAllUsersBetween: async (
      _,
      { fromYear, fromMonth, toMonth, toYear, status }
    ) => {
      if (fromYear < toYear || fromMonth < toMonth)
        throw new UserInputError(
          "'To' values can't be greater then 'From' values."
        );
      if (status) {
        if (!(toMonth && toYear) && fromYear && fromMonth)
          return await Month.findAll({
            where: {
              [Op.and]: [
                {
                  year: { [Op.lte]: fromYear },
                  month: { [Op.lte]: fromMonth },
                },
              ],
              status,
            },
          });
        else if (toMonth && toYear && !(fromYear && fromMonth)) {
          return await Month.findAll({
            where: {
              [Op.and]: [
                { year: { [Op.gte]: toYear }, month: { [Op.gte]: toMonth } },
              ],
            },
          });
        } else {
          return await Month.findAll({
            where: {
              [Op.and]: [
                {
                  year: { [Op.between]: [fromYear, toYear] },
                  month: { [Op.between]: [fromMonth, toMonth] },
                },
              ],
              status,
            },
          });
        }
      } else {
        if (!(toMonth && toYear) && fromYear && fromMonth) {
          return await Month.findAll({
            where: {
              [Op.and]: [
                {
                  year: { [Op.lte]: fromYear },
                  month: { [Op.lte]: fromMonth },
                },
              ],
            },
          });
        } else if (toMonth && toYear && !(fromYear && fromMonth)) {
          return await Month.findAll({
            where: {
              [Op.and]: [
                { year: { [Op.gte]: toYear }, month: { [Op.gte]: toMonth } },
              ],
            },
          });
        } else {
          return await Month.findAll({
            where: {
              [Op.and]: [
                {
                  year: { [Op.between]: [fromYear, toYear] },
                  month: { [Op.between]: [fromMonth, toMonth] },
                },
              ],
            },
          });
        }
      }
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
  Mutation: {
    updateMonthStatus: async (_, { id, status }) => {
      const month = await Month.findOne({ where: { id } });
      if (!month) throw new Error("Month is not exist");
      const date = moment();
      const activeMonth = date.format("M");
      const activeYear = date.format("Y");
      if (month.year == activeYear && month.month >= activeMonth)
        throw new Error("Can't change active month status");
      month.status = status;
      await month.save();
      return month;
    },
  },
};

export default monthResolver;
