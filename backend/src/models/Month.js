import Sequelize from "sequelize";
import db from "../configs/database";
import WorkTimeRecord from "./WorkTimeRecord";

const Month = db.define("months", {
  month: Sequelize.INTEGER,
  year: Sequelize.INTEGER,
  status: {
    type: Sequelize.ENUM("CLOSED", "OPEN", "AWAITING"),
    defaultValue: "OPEN",
  },
});

Month.hasMany(WorkTimeRecord);
WorkTimeRecord.belongsTo(Month);

export default Month;
