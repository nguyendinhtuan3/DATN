import React, { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore';
import { minigame } from '../../assets';
import AddCourseModal from './AddCourseModal';
import { fetchMyCourses, deleteCourse } from '../../api/courseService';
import { showNotification } from '../../components/showNotification';

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
                setCourses(courses.filter((course) => course.id !== id));
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
                    return prev.map((course) => (course.id === updatedCourse.id ? updatedCourse : course));
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
                <div className="flex flex-col items-center mt-4">
                    <div className="w-28 h-28 border-solid border-[2px] border-[#89CA9C] rounded-full flex items-center justify-center text-white text-2xl mb-2">
                        <img
                            src={user.avatar || minigame}
                            alt="User avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <p className="font-semibold mb-6">{user.username}</p>
                    <button className="text-left bg-white px-3 py-2 rounded-md text-sm font-medium text-black border border-gray-300 shadow-inner">
                        ● Course Management
                    </button>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white shadow-md rounded-md p-4 flex flex-col">
                            {course.image ? (
                                <img src={course.image} alt={course.title} className="h-24 object-cover rounded mb-4" />
                            ) : (
                                <div className="h-24 bg-gray-100 rounded mb-4" />
                            )}
                            <div className="text-lg font-semibold mb-1">📖 {course.title}</div>
                            <div className="text-sm mb-2">{course.description}</div>
                            <div className="text-xs text-gray-500 mb-4">Course Type: {course.courseTypeName}</div>
                            <div className="flex gap-2 mt-auto">
                                <button
                                    onClick={() => handleEdit(course)}
                                    className="bg-green-100 text-green-800 px-4 py-1 rounded-md text-sm hover:bg-green-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className="bg-red-100 text-red-800 px-4 py-1 rounded-md text-sm hover:bg-red-200"
                                >
                                    Delete
                                </button>
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
