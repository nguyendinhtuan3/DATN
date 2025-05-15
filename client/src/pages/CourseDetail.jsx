import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../api/courseApi";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getCourseById(id);
        setCourse(res.data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p>Course Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-600 mt-4">{course.description}</p>

      {/* Nếu có bài học */}
      {course.lessons?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Lesson List</h2>
          <ul className="list-disc pl-5 mt-2">
            {course.lessons.map((lesson) => (
              <li key={lesson.id}>{lesson.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
