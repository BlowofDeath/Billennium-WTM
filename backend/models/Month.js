import Sequelize from "sequelize";
import db from "../configs/database";

const Month = db.define("months", {
  name: Sequelize.TEXT,
  isClosed: Sequelize.BOOLEAN
});

export default Month;
