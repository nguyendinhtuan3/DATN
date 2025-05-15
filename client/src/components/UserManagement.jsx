import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: '', role: 'User' });
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddRole = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/assign-role`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      setShowModal(false);
      setForm({ id: '', role: 'User' });
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  const handleRemoveRole = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/remove-role`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id },
      });
      fetchUsers();
      setShowConfirm(false);
    } catch (error) {
      console.error('Error removing role:', error);
    }
  };

  const openConfirmModal = (user) => {
    setUserToDelete(user);
    setShowConfirm(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý phân quyền</h2>

      {/* Nút thêm quyền */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm
      </button>

      {/* Modal thêm quyền */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Quản lý phân quyền</h3>
            <input
              type="text"
              placeholder="Họ và tên"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              disabled
            />
            <input
              type="text"
              placeholder="ID"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              disabled
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Giảng viên">Giảng viên</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddRole}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Thêm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Bạn có chắc muốn xóa không?</h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleRemoveRole(userToDelete.id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bảng danh sách phân quyền */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2 text-left">Họ và tên</th>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Quyền</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.full_name}</td>
                <td className="p-2">{user.user_id}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  {user.role !== 'User' && (
                    <button
                      onClick={() => openConfirmModal(user)}
                      className="text-red-500 hover:underline"
                    >
                      Xóa
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;