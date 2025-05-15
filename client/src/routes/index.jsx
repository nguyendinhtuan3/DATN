import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminRoutes from "./AdminRoutes";
// import TeacherRoutes from "./TeacherRoutes";
// import StudentRoutes from "./StudentRoutes";
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";

import { useSelector } from "react-redux";
// import Navbar from "./Navbar";

const AppRoutes = () => {
  const { role } = useSelector((state) => state.user);

  // if (!role) {
  //   return <LoginPage />;
  // }

  return (
    <Router>
      {/* {role && <Navbar />} */}
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            role === "admin" ? (
              <AdminRoutes />
            ) : role === "teacher" ? (
              <TeacherRoutes />
            ) : (
              <StudentRoutes />
            )
          }
        /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
