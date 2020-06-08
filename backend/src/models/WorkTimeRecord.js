import Sequelize from "sequelize";
import db from "../configs/database";

const WorkTimeRecord = db.define("worktimerecords", {
  day: Sequelize.INTEGER,
  from: Sequelize.DATE,
  to: Sequelize.DATE,
});

export default WorkTimeRecord;
