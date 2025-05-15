import { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Đang gọi API /api/users...');
        axios.get('http://localhost:3000/api/users')
            .then((response) => {
                console.log('Dữ liệu người dùng:', response.data);
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Lỗi lấy danh sách người dùng:', error.message);
                setError('Không thể tải danh sách người dùng');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div>
            <h1>Quản lý người dùng</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.full_name} ({user.email}) - Vai trò: {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;