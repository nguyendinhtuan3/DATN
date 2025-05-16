import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import { minigame } from '../../../assets';
import { NavLink } from 'react-router-dom';
import AddLessonModal from './AddLessonModal';
import { getMyCreatedLessons, deleteLesson } from '../../../api/lessonService';
import { showNotification } from '../../../components/showNotification';

const LessonManagementPage = () => {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingLesson, setEditingLesson] = useState(null);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const response = await getMyCreatedLessons();
      if (response.status && Array.isArray(response.data)) {
        setLessons(response.data);
      } else {
        setError('Không có dữ liệu bài học');
      }
    } catch (err) {
      setError(err.message || 'Lỗi khi tải dữ liệu');
      showNotification('Không thể tải danh sách bài học.', false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa bài học này?')) return;
    try {
      setLoading(true);
      const res = await deleteLesson(id);
      showNotification(res.message, res.status);
      if (res.status) {
        setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
      }
    } catch (error) {
      showNotification('Lỗi khi xóa bài học: ' + error.message, false);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setIsModalOpen(true);
  };

  const handleModalClose = (updatedLesson) => {
    setIsModalOpen(false);
    setEditingLesson(null);
    if (updatedLesson) {

      setLessons((prev) => {
        if (editingLesson) {
          // Update existing lesson
          return prev.map((lesson) =>
            lesson.id === updatedLesson.id ? { ...updatedLesson } : lesson
          );
        } else {
          // Add new lesson to the top
          return [ updatedLesson, ...prev];
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
           <h2 className="text-xl font-semibold">Lesson Management</h2>
          <button
            onClick={() => {
              setEditingLesson(null);
              setIsModalOpen(true);
            }}
            className="bg-green-300 hover:bg-green-400 text-black font-semibold py-2 px-4 rounded-md shadow"
          >
            Add Lesson
          </button>
        </div>

        {loading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white w-full shadow-md rounded-md flex flex-col">
              <div className="p-4 flex flex-col flex-grow">
                <div className="text-lg font-semibold mb-1">📖 {lesson.title}</div>
                <div
                  className="text-sm mb-2 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: lesson.content || 'Không có nội dung' }}
                ></div>
                <div className="text-xs text-gray-500 mb-4">Course ID: {lesson.course_id}</div>
                {lesson.link && (
                  <a
                    href={lesson.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-xs mb-4 hover:underline"
                  >
                    Xem liên kết
                  </a>
                )}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(lesson)}
                    className="bg-green-100 text-green-800 px-4 py-1 rounded-md text-sm hover:bg-green-200"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(lesson.id)}
                    className="bg-red-100 text-red-800 px-4 py-1 rounded-md text-sm hover:bg-red-200"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddLessonModal isOpen={isModalOpen} onClose={handleModalClose} editingLesson={editingLesson} />
    </div>
  );
};

export default LessonManagementPage;