// import React from "react";
// import { Routes, Route } from "react-router-dom";
// // import StudentDashboard from "../pages/student/StudentDashboard";
// // import MyCourses from "../pages/student/MyCourses";
// import PrivateRoute from "./PrivateRoute";

// const StudentRoutes = ({ role }) => {
//   return (
//     <Routes>
//       <Route
//         path="/student/dashboard"
//         element={
//           <PrivateRoute
//             element={<StudentDashboard />}
//             role={role}
//             requiredRole={["student"]} // Dễ mở rộng nhiều vai trò
//           />
//         }
//       />
//       <Route
//         path="/student/my-courses"
//         element={
//           <PrivateRoute
//             element={<MyCourses />}
//             role={role}
//             requiredRole={["student"]}
//           />
//         }
//       />
//     </Routes>
//   );
// };

// export default StudentRoutes;
