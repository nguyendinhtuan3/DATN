import React from "react";
import { Routes, Route } from "react-router-dom";
// import TeacherDashboard from "../pages/teacher/TeacherDashboard";
// import CreateQuiz from "../pages/teacher/CreateQuiz";
import PrivateRoute from "./PrivateRoute";

const TeacherRoutes = ({ role }) => {
  return (
    <Routes>
      <Route
        path="/teacher/dashboard"
        element={
          <PrivateRoute
            element={<TeacherDashboard />}
            role={role}
            requiredRole="teacher"
          />
        }
      />
      <Route
        path="/teacher/create-quiz"
        element={
          <PrivateRoute
            element={<CreateQuiz />}
            role={role}
            requiredRole="teacher"
          />
        }
      />
    </Routes>
  );
};

export default TeacherRoutes;
