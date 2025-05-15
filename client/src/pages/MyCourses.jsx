import React, { useEffect, useState } from "react";
import { getAllCourses, deleteCourse } from "@/api/courseApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await getAllCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error loading course list!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course deletion
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const { data } = await deleteCourse(courseId);
      if (data.deleteCourse.success) {
        toast.success("Course has been deleted!");
        setCourses(courses.filter((course) => course.id !== courseId)); // Update UI
      } else {
        toast.error("Delete failed: " + data.deleteCourse.message);
      }
    } catch (error) {
      console.error("Error deleting course", error);
    }
  };

  return (
    <div className="manage-courses-container">
      <h1>Manage Courses</h1>
      <Link to="/admin/add-course">
        <Button variant="primary">Add New Course</Button>
      </Link>

      {loading ? (
        <p>Loading data...</p>
      ) : courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="courses-list">
          {courses.map((course) => (
            <Card key={course.id} className="course-card">
              <CardContent>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="card-actions">
                  <Link to={`/admin/edit-course/${course.id}`}>
                    <Button variant="secondary">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
