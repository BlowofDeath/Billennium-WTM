import Sequelize from "sequelize";
import db from "../configs/database";

const Role = db.define("roles", {
  name: Sequelize.TEXT,
});

export default Role;
