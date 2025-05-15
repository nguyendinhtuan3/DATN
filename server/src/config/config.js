require("dotenv").config();

const env = process.env.NODE_ENV || "development";

module.exports = {
  env,
  port: process.env.PORT || 5000,

  mysql: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS || "",
    dialect: process.env.MYSQL_DIALECT || "mysql",
    logging: env !== "production", // bật log ở dev
  },

  mongo: {
    uri: process.env.MONGO_URI,
    database: process.env.MONGO_DB || "toeic_gamification",
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    url: process.env.CLOUDINARY_URL,
  },

  frontendUrl: process.env.FRONTEND_URL,
};
