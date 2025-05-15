const CourseService = require("../services/courseService");

const courseResolvers = {
  Query: {
    getAllCourses: async () => {
      return await CourseService.getAllCourses();
    },
    getCourse: async (_, { id }) => {
      return await CourseService.getCourseById(id);
    },
  },
  Mutation: {
    createCourse: async (_, args) => {
      return await CourseService.createCourse(args);
    },
    updateCourse: async (_, { id, ...data }) => {
      return await CourseService.updateCourse(id, data);
    },
    deleteCourse: async (_, { id }) => {
      return await CourseService.deleteCourse(id);
    },
  },
};

module.exports = courseResolvers;
