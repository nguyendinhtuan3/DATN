const mockResultService = require("../services/mockResultService");

const resolvers = {
  Query: {
    getMockResultsByUser: (_, { userId }) => {
      return mockResultService.getMockResultsByUser(userId);
    },
    getMockResultsByMockTest: (_, { mockTestId }) => {
      return mockResultService.getMockResultsByMockTest(mockTestId);
    },
  },

  Mutation: {
    createMockResult: (_, { input }) => {
      return mockResultService.createMockResult(input);
    },
  },
};

module.exports = resolvers;
