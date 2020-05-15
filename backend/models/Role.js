import Sequelize from "sequelize";
import db from "../configs/database";
import User from "./User";

const Role = db.define("roles", {
  name: Sequelize.TEXT
});

Role.hasOne(User);

export default Role;
