require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  console.error("ERROR: JWT_SECRET is not defined! Check your .env file.");
  process.exit(1);
}

/**
 * Giải mã và xác thực token JWT
 * @param {string} token
 * @returns {object|null}
 */
const getUserFromToken = (token) => {
  if (!token) {
    console.warn("No token provided");
    return null;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      console.warn("Invalid token:", err.message);
    } else if (err.name === "TokenExpiredError") {
      console.warn("Token has expired:", err.message);
    } else {
      console.warn("Error verifying token:", err.message);
    }
    return null;
  }
};

module.exports = { getUserFromToken };
