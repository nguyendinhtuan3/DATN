import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const StudentPage = () => {
  return (
    <div className="student-page-container" style={{ padding: "20px" }}>
      <h1>Welcome to Your Dashboard</h1>

      <div style={{ margin: "20px 0" }}>
        <h2>My Courses</h2>
        <Link to="/student/my-courses">
          <Button variant="primary">View My Courses</Button>
        </Link>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h2>Upcoming Assignments</h2>
        <Link to="/student/assignments">
          <Button variant="secondary">View Assignments</Button>
        </Link>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Recent Activities</h2>
        <Card style={{ marginBottom: "20px" }}>
          <CardContent>
            <h3>Course Completed</h3>
            <p>You've successfully completed your "English Grammar" course!</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>New Assignment</h3>
            <p>
              Your new assignment for "Vocabulary Building" has been posted.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPage;
