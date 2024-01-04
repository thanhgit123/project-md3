const myql2 = require("mysql2");
const conection = myql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "project_shopping",
  port: 3306,
});

const database = conection.promise();

module.exports = database;
