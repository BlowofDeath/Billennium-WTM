import Month from "../models/Month";
import WorkTimeRecord from "../models/WorkTimeRecord";
import { UserInputError, AuthenticationError } from "apollo-server";
import validator from "validator";
import moment from "moment";
import { verifyJWT } from "../middleware/jwtTool";

const workTimeRecordResolver = {
  Query: {
    workTimeRecord: async () => {
      const workTimeRecord = await WorkTimeRecord.findOne({ where: { id: 1 } });
      console.log(workTimeRecord);
      return workTimeRecord;
    },
    workTimeRecords: async () => {
      const workTimeRecord = await WorkTimeRecord.findAll();
      return workTimeRecord;
    },
  },
  Mutation: {
    //updateWorkTimeRecord(jwt, day, from, to)
    //removeWorkTimeRecord(jwt, day) nie na zamkniętym miesiącu i jesli user jest właścicielem
  },
};

export default workTimeRecordResolver;
