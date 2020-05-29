import User from "../models/User";
import WorkTimeRecord from "../models/WorkTimeRecord";
import Month from "../models/Month";
import moment from "moment";
import { UserInputError, AuthenticationError } from "apollo-server";

const stopWTR = async (userId) => {
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
  //Sprawdza czy ostatni wtr istnieje i czy jest zakończczony
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
};

export { stopWTR };
