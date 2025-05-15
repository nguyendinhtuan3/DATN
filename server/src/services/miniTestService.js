const { MiniTest } = require("../models");

const createMiniTest = async (data) => {
  return await MiniTest.create(data);
};

const getMiniTestById = async (id) => {
  return await MiniTest.findByPk(id);
};

const getMiniTestsByTower = async (towerId) => {
  return await MiniTest.findAll({
    where: { towerId },
  });
};

const updateMiniTest = async (id, data) => {
  const miniTest = await MiniTest.findByPk(id);
  if (miniTest) {
    return await miniTest.update(data);
  }
  return null;
};

const deleteMiniTest = async (id) => {
  const miniTest = await MiniTest.findByPk(id);
  if (miniTest) {
    await miniTest.destroy();
    return true;
  }
  return false;
};

module.exports = {
  createMiniTest,
  getMiniTestById,
  getMiniTestsByTower,
  updateMiniTest,
  deleteMiniTest,
};
