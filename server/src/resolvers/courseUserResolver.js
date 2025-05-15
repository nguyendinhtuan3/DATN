const CourseUserService = require("../services/courseUserService");

const courseUserResolvers = {
  Query: {
    getUsersInCourse: async (_, { courseId }) => {
      return await CourseUserService.getUsersInCourse(courseId);
    },
    getCoursesOfUser: async (_, { userId }) => {
      return await CourseUserService.getCoursesOfUser(userId);
    },
  },

  Mutation: {
    enrollUserInCourse: async (_, { courseId, userId }) => {
      return await CourseUserService.enrollUserInCourse(courseId, userId);
    },
    removeUserFromCourse: async (_, { courseId, userId }) => {
      return await CourseUserService.removeUserFromCourse(courseId, userId);
    },
  },
};

module.exports = courseUserResolvers;
