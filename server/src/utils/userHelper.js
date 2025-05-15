const addExp = async (userInstance, amount, models) => {
  userInstance.exp += amount;

  const levels = await models.ExpLevel.findAll({
    order: [["level", "ASC"]],
  });

  for (const lvl of levels) {
    if (userInstance.exp >= lvl.requiredExp && lvl.level > userInstance.level) {
      userInstance.level = lvl.level;
    }
  }

  await userInstance.save();
  return userInstance;
};

const isAdmin = (userInstance) => {
  return (
    userInstance.role?.name === "admin" ||
    userInstance.roleId === "admin-role-id"
  );
};

const userToJSON = (userInstance) => {
  const values = { ...userInstance.get() };
  delete values.password;
  return values;
};

module.exports = {
  addExp,
  isAdmin,
  userToJSON,
};
