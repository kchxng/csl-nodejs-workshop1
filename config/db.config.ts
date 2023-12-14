import { Sequelize } from "sequelize-typescript";

import { Player } from "../models/player";

const conn = new Sequelize({
  dialect: "mysql",
  host: process.env.HOSTNAME || "localhost",
  username: process.env.USERNAME || "root",
  password: process.env.PASSWORD || "root",
  database: process.env.DATABASE || "csl_db1",
  logging: false,
  models: [Player],
});

export default conn;
