import Sequelize from "sequelize";
import db from "../configs/database";
import Month from "./Month";
import Role from "./Role";

const User = db.define("users", {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
});

User.hasMany(Month);
User.hasOne(Role);

export default User;
