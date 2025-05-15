const { MockResult } = require("../models");

const createMockResult = async (input) => {
  return await MockResult.create(input);
};

const getMockResultsByUser = async (userId) => {
  return await MockResult.findAll({ where: { userId } });
};

const getMockResultsByFloor = async (floorId) => {
  return await MockResult.findAll({ where: { floorId } });
};

module.exports = {
  createMockResult,
  getMockResultsByUser,
  getMockResultsByFloor,
};
