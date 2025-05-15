const {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} = require("apollo-server-express");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AuthenticationError) {
    return res.status(401).json({
      status: "error",
      message: "Authentication failed: " + err.message,
    });
  } else if (err instanceof ForbiddenError) {
    return res.status(403).json({
      status: "error",
      message: "Access denied: " + err.message,
    });
  } else if (err instanceof UserInputError) {
    return res.status(400).json({
      status: "error",
      message: "User input error: " + err.message,
    });
  } else if (err instanceof ApolloError) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error: " + err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = errorHandler;
