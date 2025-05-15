import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../api/courseApi";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const SkeletonCard = () => (
    <div className="border rounded-xl p-4 shadow-lg animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Course Lists</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : (
        <>
          <h2 className="text-gray-600 mb-6">
            {courses.length} course{courses.length !== 1 && "s"} available
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                No courses available at the moment.
              </p>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Course;
