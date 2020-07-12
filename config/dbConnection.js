const mysql = require("mysql");

const connection = () => {
  return mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "ZAMcry189",
    database: "aluno_dev_db"
  });
};

module.exports = () => {
  return connection;
};
