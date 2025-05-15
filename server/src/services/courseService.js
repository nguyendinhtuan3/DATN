const { Course } = require("../models");

class CourseService {
  static async getAllCourses() {
    return await Course.findAll();
  }

  static async getCourseById(id) {
    return await Course.findByPk(id);
  }

  static async createCourse(data) {
    return await Course.create(data);
  }

  static async updateCourse(id, data) {
    const course = await Course.findByPk(id);
    if (!course) throw new Error("Course not found");
    await course.update(data);
    return course;
  }

  static async deleteCourse(id) {
    const course = await Course.findByPk(id);
    if (!course) throw new Error("Course not found");
    await course.destroy();
    return true;
  }
}

module.exports = CourseService;
