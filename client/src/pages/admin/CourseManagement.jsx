import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Đang gọi API /api/courses...');
        axios
            .get('http://localhost:3000/api/courses')
            .then((response) => {
                console.log('Dữ liệu khóa học:', response.data);
                setCourses(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Lỗi lấy danh sách khóa học:', error.message);
                setError('Không thể tải danh sách khóa học');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div>
            <h1>Quản lý khóa học</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        {course.title} - {course.description || 'Không có mô tả'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseManagement;
