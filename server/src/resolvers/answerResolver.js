const Answer = require("../models/mysql/Answer");

const answerResolvers = {
  Query: {
    // Lấy câu trả lời theo ID
    getAnswerById: async (_, { id }) => {
      try {
        const answer = await Answer.findByPk(id); // Tìm câu trả lời theo ID
        if (!answer) {
          throw new Error("Answer not found!");
        }
        return answer;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    // Lấy tất cả câu trả lời theo questionId
    getAnswersByQuestion: async (_, { questionId }) => {
      try {
        const answers = await Answer.findAll({
          where: { questionId },
        }); // Lấy tất cả câu trả lời liên quan đến câu hỏi
        return answers;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    // Tạo mới câu trả lời
    createAnswer: async (_, { input }) => {
      try {
        const newAnswer = await Answer.create({
          label: input.label,
          answer: input.answer,
          questionId: input.questionId,
          isCorrect: input.isCorrect,
          explanation: input.explanation,
          order: input.order,
        });
        return {
          success: true,
          message: "Answer created successfully",
          data: newAnswer,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          data: null,
        };
      }
    },

    // Cập nhật câu trả lời
    updateAnswer: async (_, { id, input }) => {
      try {
        const answer = await Answer.findByPk(id);
        if (!answer) {
          throw new Error("Answer not found!");
        }

        const updatedAnswer = await answer.update({
          label: input.label,
          answer: input.answer,
          isCorrect: input.isCorrect,
          explanation: input.explanation,
          order: input.order,
        });

        return {
          success: true,
          message: "Answer updated successfully",
          data: updatedAnswer,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
          data: null,
        };
      }
    },

    // Xóa câu trả lời
    deleteAnswer: async (_, { id }) => {
      try {
        const answer = await Answer.findByPk(id);
        if (!answer) {
          throw new Error("Answer not found!");
        }

        await answer.destroy(); // Xóa câu trả lời
        return {
          success: true,
          message: "Answer deleted successfully",
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
  },
};

module.exports = answerResolvers;
