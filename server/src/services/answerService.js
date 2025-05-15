const { Answer } = require("../models");

class AnswerService {
  // Lấy Answer theo ID
  static async getAnswerById(id) {
    return await Answer.findByPk(id);
  }

  // Lấy tất cả Answer theo QuestionId
  static async getAnswersByQuestionId(questionId) {
    return await Answer.findAll({
      where: { questionId },
      order: [["order", "ASC"]],
    });
  }

  // Tạo một Answer mới
  static async createAnswer({
    label,
    answer,
    questionId,
    isCorrect,
    explanation,
    order,
  }) {
    return await Answer.create({
      label,
      answer,
      questionId,
      isCorrect,
      explanation,
      order,
    });
  }

  // Cập nhật Answer
  static async updateAnswer(id, data) {
    const answer = await Answer.findByPk(id);
    if (!answer) throw new Error("Answer not found");
    await answer.update(data);
    return answer;
  }

  // Xóa Answer
  static async deleteAnswer(id) {
    const answer = await Answer.findByPk(id);
    if (!answer) throw new Error("Answer not found");
    await answer.destroy();
    return true;
  }
}

module.exports = AnswerService;
