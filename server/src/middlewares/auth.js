const jwt = require("jsonwebtoken");

const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      if (requiredRole && decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }
      req.user = decoded;
      next();
    });
  };
};

module.exports = { verifyRole };
