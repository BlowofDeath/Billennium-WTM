import Sequelize from "sequelize";
import db from "../configs/database";
import Month from "./Month";

const User = db.define("users", {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  role: Sequelize.STRING,
});

User.hasMany(Month);

export default User;
