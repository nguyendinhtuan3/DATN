import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TeacherPage = () => {
  return (
    <div className="teacher-page-container" style={{ padding: "20px" }}>
      <h1>Welcome to Teacher's Dashboard</h1>

      <div style={{ margin: "20px 0" }}>
        <h2>Manage Your Courses</h2>
        <Link to="/teacher/manage-courses">
          <Button variant="primary">Manage Courses</Button>
        </Link>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h2>View Students</h2>
        <Link to="/teacher/students">
          <Button variant="secondary">View Students</Button>
        </Link>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Recent Activities</h2>
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <h3>New Course Created</h3>
            <p>
              Check out the new course that you just created. It's available for
              students now!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Student Enrolled</h3>
            <p>
              A new student just enrolled in your course. Welcome them to the
              class!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherPage;
