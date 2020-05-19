import Sequelize from "sequelize";
import db from "../configs/database";
import WorkTimeRecord from "./WorkTimeRecord";

const Month = db.define("months", {
  month: Sequelize.INTEGER,
  year: Sequelize.INTEGER,
  isClosed: Sequelize.BOOLEAN,
});

Month.hasMany(WorkTimeRecord);

export default Month;
