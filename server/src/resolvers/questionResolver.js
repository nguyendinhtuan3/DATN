const QuestionService = require("../services/questionService");

const questionResolvers = {
  Query: {
    // Lấy tất cả questions của một lesson
    getAllQuestions: async (_, { lessonId }) => {
      try {
        return await QuestionService.getAllQuestions(lessonId);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Lấy Question theo ID
    getQuestion: async (_, { id }) => {
      try {
        return await QuestionService.getQuestionById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Tạo Question mới
    createQuestion: async (
      _,
      {
        question,
        answer,
        lessonId,
        type,
        options,
        explanation,
        score,
        timeLimit,
        level,
      }
    ) => {
      try {
        return await QuestionService.createQuestion({
          question,
          answer,
          lessonId,
          type,
          options,
          explanation,
          score,
          timeLimit,
          level,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Cập nhật Question
    updateQuestion: async (
      _,
      {
        id,
        question,
        answer,
        type,
        options,
        explanation,
        score,
        timeLimit,
        level,
      }
    ) => {
      try {
        return await QuestionService.updateQuestion({
          id,
          question,
          answer,
          type,
          options,
          explanation,
          score,
          timeLimit,
          level,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Xóa Question
    deleteQuestion: async (_, { id }) => {
      try {
        return await QuestionService.deleteQuestion(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = questionResolvers;
