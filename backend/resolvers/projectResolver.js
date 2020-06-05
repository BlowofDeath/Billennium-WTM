import Month from "../models/Month";
import WorkTimeRecord from "../models/WorkTimeRecord";
import Project from "../models/Project";
import { UserInputError, AuthenticationError } from "apollo-server";
import validator from "validator";
import User from "../models/User";

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
    addProject: async (_, { name, description, isPinned }) => {
      const project = await Project.create({
        name,
        description,
        isClosed: false,
        isPinned: isPinned != undefined ? isPinned : false,
      });

      return project;
    },
    updateProject: async (_, { id, name, description, isClosed, isPinned }) => {
      const project = await Project.findOne({ where: { id } });
      if (!project) throw new Error("Project is not exist");
      if (name) project.name = name;
      if (description) project.description = description;
      if (isPinned != undefined) project.isPinned = isPinned;
      if (isClosed != undefined) {
        if (project.isPinned)
          throw new Error("Pinned projects can't be closed");
        project.isClosed = isClosed;
      }
      await project.save();
      return project;
    },
    removeProject: async (_, { id }) => {
      const wtr = await WorkTimeRecord.findOne({ where: { projectId: id } });
      if (wtr)
        throw new Error("Can't delete project with related WorkTimeRecord");
      const project = Project.findOne({ where: { id } });
      if (!project) throw new Error("Project is not exist");
      if (project.isPinned) throw new Error("Pinned project can't be deleted");
      await Project.destroy({ where: { id } });
      return project;
    },
  },
  Project: {
    workTimeRecords: async ({ id }, args) => {
      return await WorkTimeRecord.findAll({ where: { projectId: id } });
    },
    users: async ({ id }, args) => {
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
