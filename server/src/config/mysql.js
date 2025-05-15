const { Sequelize } = require("sequelize");
const mysql = require("./config").mysql;
const { createConnection } = require("mysql2/promise");

const createDatabaseIfNotExists = async () => {
  try {
    const connection = await createConnection({
      host: mysql.host,
      user: mysql.username,
      password: mysql.password,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${mysql.database}\`;`
    );
    console.log(`Database '${mysql.database}' is ready!`);
    await connection.end();
  } catch (error) {
    console.error("Error creating database:", error);
    process.exit(1);
  }
};

const sequelize = new Sequelize(
  mysql.database,
  mysql.username,
  mysql.password,
  {
    host: mysql.host,
    dialect: mysql.dialect,
    logging: mysql.logging,
  }
);

const connectMySQL = async () => {
  try {
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    console.log("MySQL connected successfully!");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ force: false, alter: false });
      console.log("Models checked and synced (no force, no alter)!");
    }
  } catch (error) {
    console.error("MySQL connection error:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectMySQL };
