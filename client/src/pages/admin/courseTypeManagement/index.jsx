import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import { fetchCourseTypes, createCourseType, updateCourseType, deleteCourseType } from '../../../api/courseTypeService';
import { showNotification } from '../../../components/showNotification';
import Sidebar from '../../../components/Sidebar';

const CourseTypeManagement = () => {
    const { user, isUserLoggedIn } = useAuthStore();
    const [courseTypes, setCourseTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingCourseType, setEditingCourseType] = useState(null);
    const [newCourseType, setNewCourseType] = useState({ name: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchApi = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await fetchCourseTypes();
            console.log('Course Types Data:', response); // Debug dữ liệu nhận được
            if (Array.isArray(response)) {
                const filteredTypes = response.filter((type) =>
                    type.name?.toLowerCase().includes(searchQuery.toLowerCase()),
                );
                setCourseTypes(filteredTypes);
                if (filteredTypes.length === 0 && response.length > 0) {
                    setError('Không tìm thấy loại khóa học nào khớp với tìm kiếm.');
                }
            } else {
                console.error('Expected array but got:', response);
                setError('Dữ liệu trả về không phải danh sách loại khóa học.');
                showNotification('Dữ liệu trả về không đúng định dạng.', false);
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu');
            showNotification(err.message || 'Không thể tải dữ liệu loại khóa học.', false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [searchQuery]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newCourseType.name) {
            showNotification('Tên loại khóa học là bắt buộc.', false);
            return;
        }
        try {
            setLoading(true);
            const response = await createCourseType(newCourseType);
            console.log('Add Response:', response);
            showNotification('Thêm loại khóa học thành công.', true);
            fetchApi(); // Tải lại danh sách
            setNewCourseType({ name: '' });
            setShowAddForm(false);
        } catch (error) {
            console.error('Add Error:', error);
            showNotification('Lỗi khi thêm loại khóa học: ' + error.message, false);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (courseType) => {
        setEditingCourseType(courseType);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingCourseType) return;
        try {
            setLoading(true);
            const formData = { name: e.target.name.value };
            const response = await updateCourseType(editingCourseType.id, formData);
            console.log('Update Response:', response);
            showNotification(response.message || 'Cập nhật loại khóa học thành công.', true);
            fetchApi();
            setEditingCourseType(null);
        } catch (error) {
            showNotification(error.message, false);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa loại khóa học này không?')) return;
        try {
            setLoading(true);
            const response = await deleteCourseType(id);
            console.log('Delete Response:', response);
            showNotification(response.message || 'Xóa loại khóa học thành công.', true);
            fetchApi();
        } catch (error) {
            console.error('Delete Error:', error);
            showNotification('Lỗi khi xóa loại khóa học: ' + error.message, false);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseEdit = () => {
        setEditingCourseType(null);
    };

    const handleCloseAdd = () => {
        setShowAddForm(false);
        setNewCourseType({ name: '' });
    };

    return (
        <div className="flex min-h-screen bg-gray-100 p-6 gap-4">
            <Sidebar />
            <div className="flex-1">
                <div className="bg-[#cce6f6] p-4 rounded-md flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Course Type Management</h2>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border rounded w-1/4"
                        />
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Add New
                        </button>
                    </div>
                </div>

                {loading && <p>Đang tải dữ liệu...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="p-2 border border-gray-300 text-center">STT</th>
                            <th className="p-2 border border-gray-300">Name</th>
                            <th className="p-2 border border-gray-300">ID</th>
                            <th className="p-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseTypes.length > 0 ? (
                            courseTypes?.map((type, index) => (
                                <tr key={type.id} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                                    <td className="p-2 border border-gray-300 text-center">{index + 1}</td>
                                    <td className="p-2 border border-gray-300">{type.name || 'N/A'}</td>
                                    <td className="p-2 border border-gray-300">{type.id || 'N/A'}</td>
                                    <td className="p-2 border border-gray-300 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(type)}
                                            className="bg-green-100 text-green-800 px-4 py-1 rounded-md text-sm hover:bg-green-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(type.id)}
                                            className="bg-red-100 text-red-800 px-4 py-1 rounded-md text-sm hover:bg-red-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-2 border border-gray-300 text-center">
                                    Không có dữ liệu để hiển thị.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                            <h3 className="text-lg font-semibold mb-4">Add Course Type</h3>
                            <form onSubmit={handleAdd} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCourseType.name}
                                        onChange={(e) => setNewCourseType({ ...newCourseType, name: e.target.value })}
                                        className="p-2 border w-full rounded-md"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseAdd}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {editingCourseType && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                            <h3 className="text-lg font-semibold mb-4">Edit Course Type</h3>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={editingCourseType.name}
                                        className="p-2 border w-full rounded-md"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCloseEdit}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Cancel
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

export default CourseTypeManagement;
