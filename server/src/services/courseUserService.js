const { CourseUser, User, Course } = require("../models");

class CourseUserService {
  static async enrollUserInCourse(courseId, userId) {
    return await CourseUser.create({ courseId, userId });
  }

  static async removeUserFromCourse(courseId, userId) {
    const deleted = await CourseUser.destroy({ where: { courseId, userId } });
    return deleted > 0;
  }

  static async getUsersInCourse(courseId) {
    return await User.findAll({
      include: {
        model: Course,
        where: { id: courseId },
        through: { attributes: [] },
      },
    });
  }

  static async getCoursesOfUser(userId) {
    return await Course.findAll({
      include: {
        model: User,
        where: { id: userId },
        through: { attributes: [] },
      },
    });
  }
}

module.exports = CourseUserService;
