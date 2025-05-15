const { MockTest, MockResult } = require("../models");

const MockService = {
  getAllMockTests: () => MockTest.findAll(),

  getMockTestById: (id) => MockTest.findByPk(id),

  createMockTest: ({ name, description, courseId }) =>
    MockTest.create({ name, description, courseId }),

  getMockResultsByUser: (userId) => MockResult.findAll({ where: { userId } }),

  submitMockResult: ({ userId, questionId, answer, isCorrect }) =>
    MockResult.create({ userId, questionId, answer, isCorrect }),
};

module.exports = MockService;
