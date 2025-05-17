import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import { minigame } from '../../../assets';
import { NavLink } from 'react-router-dom';
import AddCourseModal from './AddCourseModal';
import { fetchMyCourses, deleteCourse } from '../../../api/courseService';
import { showNotification } from '../../../components/showNotification';
import parse from 'html-react-parser';
const CourseManagementPage = () => {
    const { user } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingCourse, setEditingCourse] = useState(null);

    const fetchApi = async () => {
        try {
            setLoading(true);
            const response = await fetchMyCourses();
            if (response.status && Array.isArray(response.data)) {
                setCourses(response.data);
            } else {
                setError('Không có dữ liệu khóa học');
            }
        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu');
            showNotification('Không thể tải dữ liệu khóa học.', false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa khóa học này không?')) return;
        try {
            setLoading(true);
            const res = await deleteCourse(id);
            showNotification(res.message, res.status);
            if (res.status) {
                setCourses((prev) => prev.filter((course) => course._id !== id));
            }
        } catch (error) {
            showNotification('Lỗi khi xóa khóa học: ' + error.message, false);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleModalClose = (updatedCourse) => {
        setIsModalOpen(false);
        setEditingCourse(null);
        if (updatedCourse) {
            setCourses((prev) => {
                if (editingCourse) {
                    // Update existing course
                    return prev.map((course) => (course._id === updatedCourse._id ? updatedCourse : course));
                } else {
                    // Add new course
                    return [updatedCourse, ...prev];
                }
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 p-6 gap-4">
            <div className="static w-64 bg-[#d0e7f9] shadow-lg rounded-tr-2xl rounded-br-2xl">
                <div className="flex flex-col items-center mt-6 mx-4">
                    <div className="relative w-32 h-32 border-4 border-blue-300 rounded-full overflow-hidden shadow-lg">
                        <img
                            src={user.avatar || minigame}
                            alt="User avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <p className="text-xl font-bold text-gray-800 mt-4 mb-6">{user.username}</p>
                    <div className="w-full space-y-2">
                        <NavLink
                            to="/course-management"
                            className={({ isActive }) =>
                                `block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 bg-white border border-gray-200 shadow-md transition-all duration-200 ${
                                    isActive ? 'bg-blue-50 border-blue-300 text-blue-700' : 'hover:bg-gray-50'
                                }`
                            }
                        >
                            Course Management
                        </NavLink>
                        <NavLink
                            to="/lesson-management"
                            className={({ isActive }) =>
                                `block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 bg-white border border-gray-200 shadow-md transition-all duration-200 ${
                                    isActive ? 'bg-blue-50 border-blue-300 text-blue-700' : 'hover:bg-gray-50'
                                }`
                            }
                        >
                            Lesson Management
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <div className="bg-[#cce6f6] p-4 rounded-md flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Course Management</h2>
                    <button
                        onClick={() => {
                            setEditingCourse(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-green-300 hover:bg-green-400 text-black font-semibold py-2 px-4 rounded-md shadow"
                    >
                        Add
                    </button>
                </div>

                {loading && <p>Đang tải dữ liệu...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white w-full shadow-md rounded-md flex flex-col">
                            {course.image ? (
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full object-contain rounded-t-md" // Use object-contain to show full image
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 rounded-t-md flex items-center justify-center">
                                    <span className="text-gray-500">No Image</span>
                                </div>
                            )}
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="text-lg font-semibold mb-1">📖 {course.title}</div>

                                <div className="text-xs text-gray-500 mb-4">Course Type: {course.courseTypeName}</div>
                                <div className="flex gap-2 mt-auto">
                                    <button
                                        onClick={() => handleEdit(course)}
                                        className="bg-green-100 text-green-800 px-4 py-1 rounded-md text-sm hover:bg-green-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        className="bg-red-100 text-red-800 px-4 py-1 rounded-md text-sm hover:bg-red-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddCourseModal isOpen={isModalOpen} onClose={handleModalClose} editingCourse={editingCourse} />
        </div>
    );
};

export default CourseManagementPage;
