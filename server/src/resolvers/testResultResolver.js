const testResultService = require("../services/testResultService");

const testResultResolver = {
  Query: {
    getTestResult: async (_, { id }) => {
      return await testResultService.getTestResultById(id);
    },
    getAllTestResults: async (_, { userId }) => {
      return await testResultService.getTestResultsByUser(userId);
    },
  },
  Mutation: {
    createTestResult: async (_, { userId, miniTestId, score, passed }) => {
      const testResultData = { userId, miniTestId, score, passed };
      return await testResultService.createTestResult(testResultData);
    },
    updateTestResult: async (_, { id, score, passed }) => {
      const testResultData = { score, passed };
      return await testResultService.updateTestResult(id, testResultData);
    },
    deleteTestResult: async (_, { id }) => {
      return await testResultService.deleteTestResult(id);
    },
  },
};

module.exports = testResultResolver;
