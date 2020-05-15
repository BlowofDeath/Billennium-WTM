import Sequelize from "sequelize";
import db from "../configs/database";

const WorkTimeRecord = db.define("worktimerecords", {
  date: Sequelize.DATE,
  from: Sequelize.DATE,
  to: Sequelize.DATE
});

export default WorkTimeRecord;
