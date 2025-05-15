const MockService = require("../services/mockTestService");

const mockResolvers = {
  Query: {
    getMockTests: () => MockService.getAllMockTests(),
    getMockTest: (_, { id }) => MockService.getMockTestById(id),
    getMockResultsByUser: (_, { userId }) =>
      MockService.getMockResultsByUser(userId),
  },
  Mutation: {
    createMockTest: (_, args) => MockService.createMockTest(args),
    submitMockResult: (_, args) => MockService.submitMockResult(args),
  },
};

module.exports = mockResolvers;
