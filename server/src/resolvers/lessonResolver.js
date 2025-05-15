const LessonService = require("../services/lessonService");

const lessonResolvers = {
  Query: {
    // Lấy tất cả lessons của một course
    getAllLessons: async (_, { courseId }) => {
      try {
        return await LessonService.getAllLessons(courseId);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Lấy Lesson theo ID
    getLesson: async (_, { id }) => {
      try {
        return await LessonService.getLessonById(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    // Tạo Lesson mới
    createLesson: async (_, { name, description, courseId }) => {
      try {
        return await LessonService.createLesson({
          name,
          description,
          courseId,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Cập nhật Lesson
    updateLesson: async (_, { id, name, description }) => {
      try {
        return await LessonService.updateLesson({ id, name, description });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Xóa Lesson
    deleteLesson: async (_, { id }) => {
      try {
        return await LessonService.deleteLesson(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = lessonResolvers;
