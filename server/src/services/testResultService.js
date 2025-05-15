const { TestResult } = require("../models");

const createTestResult = async (data) => {
  return await TestResult.create(data);
};

const getTestResultById = async (id) => {
  return await TestResult.findByPk(id);
};

const getTestResultsByUser = async (userId) => {
  return await TestResult.findAll({
    where: { userId },
  });
};

const updateTestResult = async (id, data) => {
  const testResult = await TestResult.findByPk(id);
  if (testResult) {
    return await testResult.update(data);
  }
  return null;
};

const deleteTestResult = async (id) => {
  const testResult = await TestResult.findByPk(id);
  if (testResult) {
    await testResult.destroy();
    return true;
  }
  return false;
};

module.exports = {
  createTestResult,
  getTestResultById,
  getTestResultsByUser,
  updateTestResult,
  deleteTestResult,
};
