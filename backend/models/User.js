import Sequelize from "sequelize";
import db from "../configs/database";

const User = db.define("user", {
  name: Sequelize.TEXT,
  email: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  password: Sequelize.STRING,
});

export default User;
