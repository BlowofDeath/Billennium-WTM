import Sequelize from "sequelize";
import db from "../configs/database";
import Month from "./Month";
import WorkTimeRecord from "./WorkTimeRecord";

const User = db.define("users", {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  role: {
    type: Sequelize.ENUM("Pracownik", "Kierownik", "Admin"),
    defaultValue: "Pracownik",
  },
  isActive: Sequelize.BOOLEAN,
});

User.hasMany(Month);
Month.belongsTo(User);

export default User;
