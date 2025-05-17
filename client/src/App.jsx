import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
 
import Home from './pages/Home'; 
import DefaultLayout from './layout/user/DefaultLayout';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/auth/ForgotPassword'; 
import ResetPassword from './pages/auth/ResetPassword';
import ProfilePage from './pages/ProfilePage';
import useAuthStore from './store/authStore';
import CourseListingPage from './pages/CourseListingPage';
import CourseManagementPage from './pages/teacher/cource/courseManagementPage';
import LessonManagementPage from './pages/teacher/lesson/LessonManagementPage';
import PaymentConfirmPage from './pages/PaymentConfirmPage';
import FramePage from './pages/FramePage';
import CourseTypeManagement from './pages/admin/courseTypeManagement';
import UserManagement from './pages/admin/userManagement';

const App = () => { 
    const { user ,isUserLoggedIn} = useAuthStore(); 
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                  
                    {user.role === 'admin' ? (
                        <>
                    <Route path="/admin/type-course" element={<CourseTypeManagement />} />
                    <Route path="/admin/users" element={<UserManagement />} />

                        </>
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
              {  (  user.role==='student'||!isUserLoggedIn) &&  <Route path="/garden" element={<FramePage />} />}
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
