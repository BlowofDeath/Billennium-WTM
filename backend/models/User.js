import Sequelize from "sequelize";
import db from "../configs/database";

const User = db.define("users", {
  role: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
});

export default User;
