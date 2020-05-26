import Month from "../models/Month";
import WorkTimeRecord from "../models/WorkTimeRecord";
import Project from "../models/Project";
import { UserInputError, AuthenticationError } from "apollo-server";
import validator from "validator";
import moment from "moment";
import { verifyJWT } from "../middleware/jwtTool";
import User from "../models/User";
import { Op } from "sequelize";
import { QueryTypes } from "sequelize";
import db from "../configs/database";

const projectResolver = {
  Query: {
    project: async (_, { id }) => {
      return await Project.findOne({ where: { id } });
    },
    projects: async (_, { isClosed }) => {
      if (typeof isClosed !== "undefined")
        return await Project.findAll({ where: { isClosed } });
      return await Project.findAll();
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
      const wtr = await Project.findAll({ where: { projectId: id } });
      if (wtr)
        throw new Error("Can't delete project with related WorkTimeRecord");
      const project = Project.destroy({ where: { id } });
      return project;
    },
  },
  Project: {
    workTimeRecords: async ({ id }, args) => {
      return await WorkTimeRecord.findAll({ where: { projectId: id } });
    },
    users: async ({ id }, args) => {
      // return await db.query(
      //   `SELECT DISTINCT * FROM users AS u LEFT JOIN months AS m ON u.id = m.userid LEFT JOIN worktimerecords AS w on m.id = w.monthid WHERE w.projectid = ${id}`,
      //   { type: QueryTypes.SELECT }
      // );
      return await User.findAll({
        include: [
          {
            model: Month,
            required: true,
            include: [
              {
                model: WorkTimeRecord,
                where: { projectId: id },
              },
            ],
          },
        ],
      });
    },
    wtrsPerMonth: async ({ id }, { month, year }) => {
      return await WorkTimeRecord.findAll({
        include: [
          {
            model: Month,
            where: { month, year },
          },
          { model: Project, where: { id } },
        ],
      });
    },
  },
};

export default projectResolver;
