import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserManagement from './components/UserManagement';
import Home from './pages/Home';
import ChatBoxAI from './components/chatboxAI';
import DefaultLayout from './layout/user/DefaultLayout';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import ToastComponent from './components/toastComponent';
import ResetPassword from './pages/auth/ResetPassword';
import ProfilePage from './pages/ProfilePage';
import useAuthStore from './store/authStore';
import CourseListingPage from './pages/CourseListingPage';
import CourseManagementPage from './pages/teacher/cource/courseManagementPage';
import LessonManagementPage from './pages/teacher/lesson/LessonManagementPage';
import PaymentConfirmPage from './pages/PaymentConfirmPage';

const App = () => {
    // const [user, setUser] = useState(null);

    const { user } = useAuthStore();

    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     setUser({
    //       full_name: "Lê Nguyên",
    //       email: "lenhatnguyen@gmail.com",
    //       role: "Admin",
    //     });
    //   }
    // }, []);

    // const handleLogin = async () => {
    //   const { email, password } = {
    //     email: "Lc12345@gmail.com",
    //     password: "password123",
    //   };
    //   try {
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ email, password }),
    //     });
    //     const data = await response.json();
    //     if (data.token) {
    //       localStorage.setItem("token", data.token);
    //       setUser(data.user);
    //     }
    //   } catch (error) {
    //     console.error("Login error:", error);
    //   }
    // };

    // if (!user) {
    //   return (
    //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //       <button
    //         onClick={handleLogin}
    //         className="bg-green-500 text-white px-4 py-2 rounded"
    //       >
    //         Login to Test
    //       </button>
    //     </div>
    //   );
    // }

    return (
        // <div className="min-h-screen bg-gray-100">
        //   <nav className="bg-green-500 text-white p-4 flex justify-between items-center">
        //     <div className="flex items-center gap-4">
        //       <span className="font-bold text-xl">TOEIC</span>
        //       <a href="#" className="hover:underline">
        //         Home
        //       </a>
        //       <a href="#" className="hover:underline">
        //         Courses
        //       </a>
        //       <a href="#" className="hover:underline">
        //         Tower
        //       </a>
        //       <a href="#" className="hover:underline">
        //         Garden
        //       </a>
        //       <a href="#" className="hover:underline">
        //         Testing
        //       </a>
        //       <a href="#" className="hover:underline">
        //         Language
        //       </a>
        //     </div>
        //     <div className="flex items-center gap-2">
        //       <span className="text-lg">👤 {user.full_name}</span>
        //     </div>
        //   </nav>
        //   <div className="flex">
        //     <aside className="w-64 bg-blue-50 p-4">
        //       <div className="flex items-center gap-2 mb-4">
        //         <span className="text-2xl">👤</span>
        //         <span className="font-semibold">{user.full_name}</span>
        //       </div>
        //       <ul className="space-y-2">
        //         <li className="hover:bg-blue-100 p-2 rounded">
        //           Quản lý người dùng
        //         </li>
        //         <li className="bg-blue-100 p-2 rounded font-semibold">
        //           Quản lý phân quyền
        //         </li>
        //         <li className="hover:bg-blue-100 p-2 rounded">
        //           Thống kê & Báo cáo
        //         </li>
        //       </ul>
        //     </aside>
        //     <main className="flex-1 p-4">
        //       <UserManagement />
        //     </main>
        //   </div>
        // </div>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* {user.role === 'student' ? (
                   
                    ) : (
                        <Route path="/khoa-hoc" element={<CourseManagement />} />
                    )} */}
                    {user.role === 'admin' ? (
                        <></>
                    ) : user.role === 'teacher' ? (
                        <>
                            <Route path="/course-management" element={<CourseManagementPage />} />
                            <Route path="/lesson-management" element={<LessonManagementPage />} />
                        </>
                    ) : (
                        <>
                            <Route path="/payment-confirmation" element={<PaymentConfirmPage />} />
                        </>
                    )}
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/courses" element={<CourseListingPage />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
