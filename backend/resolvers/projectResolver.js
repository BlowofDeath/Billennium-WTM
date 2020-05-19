import Month from "../models/Month";
import WorkTimeRecord from "../models/WorkTimeRecord";
import Project from "../models/Project";
import { UserInputError, AuthenticationError } from "apollo-server";
import validator from "validator";
import moment from "moment";
import { verifyJWT } from "../middleware/jwtTool";
import User from "../models/User";
import { Op } from "sequelize";

const projectResolver = {
  Query: {
    project: async (_, { id }) => {
      return await Project.findOne({ where: { id } });
    },
  },
  Mutation: {
    addProject: async (_, { name, description }) => {
      const project = await Project.create({
        name,
        description,
        isClosed: 0,
      });

      return project;
    },
    updateProject: async (_, { id, name, description, isClosed }) => {
      const project = Project.findOne({ where: { id } });
      project.name = name;
      project.description = description;
      project.isClosed = isClosed;
      await project.save();
      return project;
    },
    removeProject: async (_, { id }) => {
      const project = Project.destroy({ where: { id } });
      return project;
    },
  },
  Project: {
    workTimeRecords: async ({ id }, args) => {
      return await WorkTimeRecord.findAll({ where: { projectId: id } });
    },
    users: async ({ id }, args) => {
      const wtr = await WorkTimeRecord.findAll({ where: { projectId: id } });
      let monthsQuery = [];
      wtr.forEach((value) => {
        monthsQuery.push({ id: value.monthId });
      });

      const months = await Month.findAll({ where: { [Op.or]: monthsQuery } });
      let users = [];

      months.forEach((value) => {
        users.push({ id: value.userId });
      });
      return await User.findAll({ where: { [Op.or]: users } });
    },
  },
};

export default projectResolver;
