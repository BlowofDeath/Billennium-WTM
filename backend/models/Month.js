import Sequelize from "sequelize";
import db from "../configs/database";
import WorkTimeRecord from "./WorkTimeRecord";

const Month = db.define("months", {
  month: Sequelize.INTEGER,
  year: Sequelize.INTEGER,
  isClosed: Sequelize.BOOLEAN,
});

Month.hasMany(WorkTimeRecord);
WorkTimeRecord.belongsTo(Month);

export default Month;
