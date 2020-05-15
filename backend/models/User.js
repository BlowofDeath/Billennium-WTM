import Sequelize from "sequelize";
import db from "../configs/database";

const User = db.define("users", {
  name: Sequelize.TEXT,
  password: Sequelize.STRING,
});

export default User;
