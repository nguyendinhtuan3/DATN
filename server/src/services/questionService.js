const { Question } = require("../models");

class QuestionService {
  // Lấy tất cả questions của một bài học
  static async getAllQuestions(lessonId) {
    return await Question.findAll({ where: { lessonId } });
  }

  // Lấy Question theo ID
  static async getQuestionById(id) {
    return await Question.findByPk(id);
  }

  // Tạo Question mới
  static async createQuestion({
    question,
    answer,
    lessonId,
    type,
    options,
    explanation,
    score,
    timeLimit,
    level,
  }) {
    return await Question.create({
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
  }

  // Cập nhật Question
  static async updateQuestion({
    id,
    question,
    answer,
    type,
    options,
    explanation,
    score,
    timeLimit,
    level,
  }) {
    const questionToUpdate = await Question.findByPk(id);
    if (questionToUpdate) {
      questionToUpdate.question = question;
      questionToUpdate.answer = answer;
      questionToUpdate.type = type;
      questionToUpdate.options = options;
      questionToUpdate.explanation = explanation;
      questionToUpdate.score = score;
      questionToUpdate.timeLimit = timeLimit;
      questionToUpdate.level = level;
      await questionToUpdate.save();
      return questionToUpdate;
    }
    throw new Error("Question not found");
  }

  // Xóa Question
  static async deleteQuestion(id) {
    const question = await Question.findByPk(id);
    if (question) {
      await question.destroy();
      return true;
    }
    throw new Error("Question not found");
  }
}

module.exports = QuestionService;
