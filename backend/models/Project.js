import Sequelize from "sequelize";
import db from "../configs/database";
import WorkTimeRecord from "./WorkTimeRecord";

const Project = db.define("projects", {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  isClosed: Sequelize.BOOLEAN,
});

Project.hasMany(WorkTimeRecord);
WorkTimeRecord.belongsTo(Project);

export default Project;
