//Kiểm tra quyền truy cập admin, user (teacher, student)
module.exports = (requiredRoles = []) => {
  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    const user = req.user;

    if (!user || !requiredRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
  };
};
