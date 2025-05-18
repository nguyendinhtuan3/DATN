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
import Floor3 from './pages/Floor3';
import Floor2 from './pages/Floor2';
import Floor1 from './pages/Floor1';
import FramesPage from './pages/admin/FramesPage';
import VocabularyPage from './pages/admin/VocabularyPage';
import FrameVocabularyPage from './pages/admin/FrameVocabularyPage';
import Floor1Manager from './pages/admin/Floor1Manager';
import Floor2MazePopupPage from './pages/admin/Floor2MazePopupPage';
import Floor3ListenChoosePage from './pages/admin/Floor3ListenChoosePage';

const App = () => {
    const { user, isUserLoggedIn } = useAuthStore();
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
                            <Route path="/admin/frames" element={<FramesPage />} />
                            <Route path="/admin/vocabulary" element={<VocabularyPage />} />
                            <Route path="/admin/frame-vocabulary" element={<FrameVocabularyPage />} />
                            <Route path="/admin/floor1" element={<Floor1Manager />} />
                            <Route path="/admin/floor2" element={<Floor2MazePopupPage />} />
                            <Route path="/admin/floor3" element={<Floor3ListenChoosePage />} />
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
                    <Route path="/garden" element={<FramePage />} />
                    <Route path="/level3" element={<Floor3 />} />
                    <Route path="/level2" element={<Floor2 />} />
                    <Route path="/level1" element={<Floor1 />} />
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
