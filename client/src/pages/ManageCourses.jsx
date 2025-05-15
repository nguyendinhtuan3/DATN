import React, { useEffect, useState } from "react";
import { getAllCourses } from "@/api/courseApi";
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
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Xử lý xóa khóa học
  const handleDeleteCourse = (courseId) => {
    // Gọi API hoặc xử lý xóa khóa học
    console.log(`Xóa khóa học với ID: ${courseId}`);
    toast.success("Khóa học đã được xóa!");
  };

  return (
    <div className="manage-courses-container">
      <h1>Quản lý Khóa học</h1>
      <Link to="/admin/add-course">
        <Button variant="primary">Thêm Khóa học Mới</Button>
      </Link>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="courses-list">
          {courses.map((course) => (
            <Card key={course.id} className="course-card">
              <CardContent>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="card-actions">
                  <Link to={`/admin/edit-course/${course.id}`}>
                    <Button variant="secondary">Chỉnh sửa</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Xóa
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
