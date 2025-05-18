import React, { useState, useEffect, useCallback } from 'react';
import { createFrame, deleteFrame, getAllFrames, getFrameById, updateFrame } from '../../api/frameService';
import Sidebar from '../../components/Sidebar';
import Overlay from '../../components/common/Overlay';

const FramesPage = () => {
    const [frames, setFrames] = useState([]);
    const [formData, setFormData] = useState({ frame_number: '', title: '', content: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Fetch frames
    const fetchFrames = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getAllFrames();
            setFrames(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch frames');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFrames();
    }, [fetchFrames]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter frames based on search term
    const filteredFrames = frames.filter(
        (frame) =>
            frame.frame_number.toString().includes(searchTerm.toLowerCase()) ||
            frame.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            frame.content.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editingId) {
                await updateFrame(editingId, formData);
            } else {
                await createFrame(formData);
            }
            resetForm();
            await fetchFrames();
        } catch (err) {
            setError(err.message || 'Failed to save frame');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle edit action
    const handleEdit = async (id) => {
        setIsLoading(true);
        try {
            const response = await getFrameById(id);
            setFormData(response.data);
            setEditingId(id);
            setIsFormVisible(true);
            setError(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setError(err.message || 'Failed to load frame details');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this frame?')) return;
        setIsLoading(true);
        try {
            await deleteFrame(id);
            if (editingId === id) resetForm();
            await fetchFrames();
        } catch (err) {
            setError(err.message || 'Failed to delete frame');
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData({ frame_number: '', title: '', content: '' });
        setEditingId(null);
        setIsFormVisible(false);
        setError(null);
    };

    // Handle "Add New" click to show form
    const handleAddNewClick = () => {
        resetForm();
        setIsFormVisible(true);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 p-6 gap-4">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-grow p-4">
                {/* Header with Title, Search, and Add New Button */}
                <div className="flex justify-between items-center mb-4 bg-blue-50 p-3 rounded">
                    <h1 className="text-xl font-bold text-gray-800">Manage Frames</h1>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddNewClick}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Add New
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

                {/* Frame Form (Visible only when isFormVisible is true) */}
                {isFormVisible && (
                    <Overlay className="z-[1000]">
                        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="frame_number" className="text-sm font-medium text-gray-700 mb-1">
                                        Frame Number
                                    </label>
                                    <input
                                        id="frame_number"
                                        type="number"
                                        name="frame_number"
                                        value={formData.frame_number}
                                        onChange={handleInputChange}
                                        required
                                        min={1}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex flex-col md:col-span-2">
                                    <label htmlFor="content" className="text-sm font-medium text-gray-700 mb-1">
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : editingId ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </Overlay>
                )}

                {/* Frame Table */}
                <section>
                    {isLoading ? (
                        <p className="text-center text-gray-600">Loading frames...</p>
                    ) : filteredFrames.length === 0 ? (
                        <p className="text-center text-gray-600">No frames available.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-green-500 text-white">
                                        <th className="py-2 px-4 border-b">STT</th>
                                        <th className="py-2 px-4 border-b">Frame Number</th>
                                        <th className="py-2 px-4 border-b">Title</th>
                                        <th className="py-2 px-4 border-b">Content</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFrames.map((frame, index) => (
                                        <tr key={frame.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                            <td className="py-2 px-4 border-b text-center">{frame.frame_number}</td>
                                            <td className="py-2 px-4 border-b">{frame.title}</td>
                                            <td className="py-2 px-4 border-b">{frame.content}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                <button
                                                    onClick={() => handleEdit(frame.id)}
                                                    className="bg-green-200 text-green-800 px-3 py-1 rounded mr-2 hover:bg-green-300 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(frame.id)}
                                                    className="bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default FramesPage;
