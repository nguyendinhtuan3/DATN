import { useEffect, useState } from 'react';
import Overlay from '../../../components/common/Overlay';
import { showNotification } from '../../../components/showNotification';
import { addLesson, updateLesson } from '../../../api/lessonService';
import { fetchMyCourses } from '../../../api/courseService';

function AddLessonModal({ isOpen, onClose, editingLesson }) {
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [formError, setFormError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        course_id: '',
        content: '',
    });

    useEffect(() => {
        if (!isOpen) return;

        // Initialize formData
        if (editingLesson) {
            setFormData({
                title: editingLesson.title || '',
                course_id: editingLesson.course_id || '',
                content: editingLesson.content || '',
            });
        } else {
            setFormData({
                title: '',
                course_id: '',
                content: '',
            });
        }

        let isMounted = true;
        const fetchCourseList = async () => {
            setLoadingCourses(true);
            try {
                const response = await fetchMyCourses();
                if (isMounted) {
                    setCourses(response?.data || []);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Lỗi khi lấy danh sách khóa học:', error);
                    showNotification('Không thể tải danh sách khóa học.', false);
                }
            } finally {
                if (isMounted) {
                    setLoadingCourses(false);
                }
            }
        };

        fetchCourseList();

        return () => {
            isMounted = false;
        };
    }, [isOpen, editingLesson]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, course_id } = formData;

        // Validate required fields
        if (!title || !course_id) {
            showNotification('Vui lòng điền tiêu đề và chọn khóa học.', false);
            setFormError('Tiêu đề và khóa học là bắt buộc.');
            return;
        }

        // Validate title length (STRING(255))
        if (title.length > 255) {
            showNotification('Tiêu đề không được vượt quá 255 ký tự.', false);
            setFormError('Tiêu đề quá dài.');
            return;
        }

        setFormError('');
        setLoadingSubmit(true);

        try {
            let res;
            if (editingLesson) {
                res = await updateLesson(editingLesson.id, formData);
                showNotification('Cập nhật bài học thành công', true);
            } else {
                res = await addLesson(formData);

                showNotification('Thêm bài học thành công', true);
            }
            console.log('dsds', res);
            if (res.status) {
                onClose(res.data);
                setFormData({
                    title: '',
                    course_id: '',
                    content: '',
                });
            }
        } catch (err) {
            const errorMessage = err.message || 'Đã xảy ra lỗi khi lưu bài học.';
            setFormError(errorMessage);
            showNotification('Không thể lưu bài học. Vui lòng thử lại.', false);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(null);
        }
    };

    if (!isOpen) return null;

    return (
        <Overlay onClick={handleOverlayClick} className="z-[1000]">
            <div className="bg-white w-1/2 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold">{editingLesson ? '✏️ Sửa Bài Học' : '➕ Thêm Bài Học'}</h3>
                    <button
                        className="text-gray-500 hover:text-red-500 text-xl"
                        onClick={() => onClose(null)}
                        aria-label="Đóng modal"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    {formError && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{formError}</p>}

                    <div>
                        <label className="block text-sm font-medium mb-1">Tiêu đề bài học</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            maxLength={255}
                            placeholder="Nhập tiêu đề bài học"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Khóa học</label>
                        <select
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={loadingCourses}
                        >
                            <option value="">-- Chọn khóa học --</option>
                            {courses?.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                        {loadingCourses && (
                            <div className="mt-2 flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500 mr-2"></div>
                                <span className="text-sm text-gray-500">Đang tải khóa học...</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Nội dung</label>
                        <textarea
                            name="content"
                            rows="5"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập nội dung bài học"
                        />
                    </div>

                    <button
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={loadingSubmit}
                        onClick={handleSubmit}
                    >
                        {loadingSubmit ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                                Đang lưu...
                            </>
                        ) : editingLesson ? (
                            'Cập nhật bài học'
                        ) : (
                            'Thêm bài học'
                        )}
                    </button>
                </div>
            </div>
        </Overlay>
    );
}

export default AddLessonModal;
