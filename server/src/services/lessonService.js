const { Lesson } = require("../models");

class LessonService {
  // Lấy tất cả lessons của một khóa học
  static async getAllLessons(courseId) {
    return await Lesson.findAll({ where: { courseId } });
  }

  // Lấy Lesson theo ID
  static async getLessonById(id) {
    return await Lesson.findByPk(id);
  }

  // Tạo Lesson mới
  static async createLesson({ name, description, courseId }) {
    return await Lesson.create({ name, description, courseId });
  }

  // Cập nhật Lesson
  static async updateLesson({ id, name, description }) {
    const lesson = await Lesson.findByPk(id);
    if (lesson) {
      lesson.name = name;
      lesson.description = description;
      await lesson.save();
      return lesson;
    }
    throw new Error("Lesson not found");
  }

  // Xóa Lesson
  static async deleteLesson(id) {
    const lesson = await Lesson.findByPk(id);
    if (lesson) {
      await lesson.destroy();
      return true;
    }
    throw new Error("Lesson not found");
  }
}

module.exports = LessonService;
