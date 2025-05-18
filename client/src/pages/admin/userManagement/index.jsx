import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import { getAllUsers, updateUserByAdmin, deleteUser, addUser } from '../../../api/userApi';
import { showNotification } from '../../../components/showNotification';
import Sidebar from '../../../components/Sidebar';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchApi = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers({ search: searchQuery, page: 1, limit: 10 });
            if (response.status && Array.isArray(response.users)) {
                // Chuẩn hóa id
                const normalizedUsers = response.users?.map((u) => ({
                    ...u,
                    id: u.id || u._id,
                }));
                setUsers(normalizedUsers);
            } else {
                setError('Không có dữ liệu người dùng');
            }
        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu');
            showNotification('Không thể tải dữ liệu người dùng.', false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [searchQuery]);

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsCreateMode(false);
    };

    const handleAdd = () => {
        setEditingUser({ username: '', email: '', role: 'student' });
        setIsCreateMode(true);
    };

    const handleCloseModal = () => {
        setEditingUser(null);
        setIsCreateMode(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editingUser) return;

        const formData = {
            username: e.target.username.value,
            email: e.target.email.value,
            role: e.target.role.value,
            ...(isCreateMode && { password: e.target.password.value }),
        };

        try {
            setLoading(true);
            let response;
            if (isCreateMode) {
                response = await addUser(formData);
                if (response.status) {
                    const newUser = {
                        ...response.user,
                        id: response.user._id || response.user.id,
                    };
                    setUsers((prev) => [newUser, ...prev]);
                }
            } else {
                response = await updateUserByAdmin(editingUser.id, formData);
                if (response.status) {
                    setUsers((prev) => prev?.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)));
                }
            }
            showNotification(response.message, response.status);
            if (response.status) {
                handleCloseModal(); // Giữ trang, chỉ đóng modal
            }
        } catch (error) {
            showNotification('Lỗi xử lý: ' + error.message, false);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa người dùng này không?')) return;
        try {
            setLoading(true);
            const response = await deleteUser(id);
            showNotification(response.message, response.status);
            if (response.status) {
                setUsers((prev) => prev.filter((user) => user.id !== id));
            }
        } catch (error) {
            showNotification('Lỗi khi xóa người dùng: ' + error.message, false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 p-6 gap-4">
            <Sidebar />
            <div className="flex-1">
                <div className="bg-[#cce6f6] p-4 rounded-md flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">User Management</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <button
                            onClick={handleAdd}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Thêm người dùng
                        </button>
                    </div>
                </div>

                {loading && <p>Đang tải dữ liệu...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="mb-2 text-gray-700">User List</div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="p-2 border border-gray-300 text-center">STT</th>
                            <th className="p-2 border border-gray-300">Username</th>
                            <th className="p-2 border border-gray-300">ID</th>
                            <th className="p-2 border border-gray-300">Email</th>
                            <th className="p-2 border border-gray-300">Role</th>
                            <th className="p-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user.id} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                                <td className="p-2 border border-gray-300 text-center">{index + 1}</td>
                                <td className="p-2 border border-gray-300">{user.username}</td>
                                <td className="p-2 border border-gray-300">{user.id}</td>
                                <td className="p-2 border border-gray-300">{user.email}</td>
                                <td className="p-2 border border-gray-300">{user.role}</td>
                                <td className="p-2 border border-gray-300 flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="bg-green-100 text-green-800 px-4 py-1 rounded-md text-sm hover:bg-green-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-100 text-red-800 px-4 py-1 rounded-md text-sm hover:bg-red-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal thêm/sửa user */}
                {editingUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                            <h3 className="text-lg font-semibold mb-4">
                                {isCreateMode ? 'Thêm người dùng' : 'Chỉnh sửa người dùng'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        defaultValue={editingUser.username}
                                        required
                                        className="p-2 border w-full rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={editingUser.email}
                                        required
                                        className="p-2 border w-full rounded-md"
                                    />
                                </div>
                                {isCreateMode && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            className="p-2 border w-full rounded-md"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <select
                                        name="role"
                                        defaultValue={editingUser.role}
                                        className="p-2 border w-full rounded-md"
                                    >
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
