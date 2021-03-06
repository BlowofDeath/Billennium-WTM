import Month from "../models/Month";
import WorkTimeRecord from "../models/WorkTimeRecord";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import validator from "validator";
import moment from "moment";
import User from "../models/User";
import Project from "../models/Project";

const workTimeRecordResolver = {
  Query: {
    workTimeRecord: async () => {
      const workTimeRecord = await WorkTimeRecord.findOne({ where: { id: 1 } });
      return workTimeRecord;
    },
    workTimeRecords: async () => {
      const workTimeRecord = await WorkTimeRecord.findAll();
      return workTimeRecord;
    },
  },
  Mutation: {
    //Resolver powinien zacząć odliczanie jeśli:
    //WTR jest zakończone lub odliczanie zostało właczone dla innego projektu
    startWorkTimeRecord: async (_, { projectId }, { auth }) => {
      if (!auth) throw new AuthenticationError("Incorrect token");
      const { userId } = auth;
      const user = await User.findOne({ where: { id: userId } });
      if (!user) throw new Error("User is not exist");

      const month = moment().format("M");
      const year = moment().format("Y");
      const newDay = moment().format("D");
      const now = moment().valueOf();
      //Jeśli miesiąc istnieje to go znajdź w przeciwnym wypadku stwórz
      let monthExist = await Month.findOne({
        where: { userId: user.id },
        order: [["createdAt", "DESC"]],
      });
      //kiedy miesiąc jest różny nic nie rób
      if (monthExist && month != monthExist.month) return null;
      //kiedy miesiąc nie istnieje, swtórz miesiąc
      if (!monthExist) {
        monthExist = await Month.create({
          month,
          year,
          userId: user.id,
        });
      }
      //Wyszukaj ostatni WTR w miesiącu
      const wtr = await WorkTimeRecord.findOne({
        where: {
          monthId: monthExist.id,
        },
        order: [["createdAt", "DESC"]],
      });
      //Jesli ostatni WTR istnieje i projectId różni się -> zakończ rekord
      if (wtr && wtr.projectId != projectId && wtr.to == null) {
        wtr.to = now;
        await wtr.save();
      }
      //Jeśli ostatni WTR w danym miesiącu istnieje i jest zakończony, lub nie istnieje -> stwórz rekord
      if ((wtr && wtr.to != null) || !wtr) {
        if (!projectId) throw new UserInputError("Project is not exist");
        return await WorkTimeRecord.create({
          day: newDay,
          from: now,
          to: null,
          monthId: monthExist.id,
          projectId,
        });
      }

      return null;
    },
    stopWorkTimeRecord: async (_, args, { auth }) => {
      if (!auth) throw new AuthenticationError("Incorrect token");
      const { userId } = auth;
      const user = await User.findOne({ where: { id: userId } });
      if (!user) throw new Error("User is not exist");
      const month = await Month.findOne({
        where: {
          userId: userId,
        },
        order: [["createdAt", "DESC"]],
      });
      if (!month) return null;
      //Szuka ostatni wtr
      const wtr = await WorkTimeRecord.findOne({
        where: {
          monthId: month.id,
        },
        order: [["createdAt", "DESC"]],
      });
      //Sprawdza czy ostatni wtr istnieje i czy jest zakończczony//
      if (!wtr) return null;
      if (wtr.to != null) return null;
      const now = moment();
      wtr.to = now;
      const minimalWTRTime = process.env.MINIMAL_WTR_TIME || 5;
      if (now.valueOf() - wtr.from.valueOf() >= 1000 * 60 * minimalWTRTime) {
        await wtr.save();
        return wtr;
      } else {
        WorkTimeRecord.destroy({ where: { id: wtr.id } });
        return null;
      }
    },
    updateWorkTimeRecord: async (_, { id, day, from, to }) => {
      const wtr = await WorkTimeRecord.findOne({ where: { id } });
      if (!wtr) throw new UserInputError("Work Time Record is not exist");
      (wtr.day = day), (wtr.from = from), (wtr.to = to);
      await wtr.save();
      return wtr;
    },
    removeWorkTimeRecord: async (_, { id }) => {
      const wtr = await WorkTimeRecord.findOne({ where: { id } });
      if (!wtr) return null;
      const destroyed = await WorkTimeRecord.destroy({ where: { id } });
      return wtr;
    },
  },
  WorkTimeRecord: {
    user: async ({ monthId }, args) => {
      const month = await Month.findOne({ where: { id: monthId } });
      return await User.findOne({ where: { id: month.userId } });
    },
    month: async ({ monthId }, args) => {
      return await Month.findOne({ where: { id: monthId } });
    },
    project: async ({ projectId }, args) => {
      return await Project.findOne({ where: { id: projectId } });
    },
  },
};

export default workTimeRecordResolver;
