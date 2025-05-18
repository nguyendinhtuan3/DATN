import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../../components/Sidebar';
import {
    createFrameVocabulary,
    deleteFrameVocabulary,
    getAllFrameVocabularies,
    getFrameVocabularyById,
    updateFrameVocabulary,
} from '../../api/frameVocabularyService';
import { getAllFrames } from '../../api/frameService';
import { getAllVocabularies } from '../../api/vocabularyService';
import Overlay from '../../components/common/Overlay';

const FrameVocabularyPage = () => {
    const [frameVocabs, setFrameVocabs] = useState([]);
    const [frames, setFrames] = useState([]);
    const [vocabularies, setVocabularies] = useState([]);
    const [formData, setFormData] = useState({ frame_id: '', vocab_id: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Fetch data
    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [frameVocabRes, framesRes, vocabRes] = await Promise.all([
                getAllFrameVocabularies(),
                getAllFrames(),
                getAllVocabularies(),
            ]);
            setFrameVocabs(frameVocabRes.data);
            setFrames(framesRes.data);
            setVocabularies(vocabRes.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to load data');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter frame-vocab relations based on search term
    const filteredFrameVocabs = frameVocabs.filter(
        (vocab) =>
            vocab.frame_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vocab.english_word.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editingId) {
                await updateFrameVocabulary(editingId, formData);
            } else {
                await createFrameVocabulary(formData);
            }
            resetForm();
            await loadData();
        } catch (err) {
            setError(err.message || 'Operation failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle edit action
    const handleEdit = async (id) => {
        setIsLoading(true);
        try {
            const res = await getFrameVocabularyById(id);
            setFormData({
                frame_id: res.data.frame_id,
                vocab_id: res.data.vocab_id,
            });
            setEditingId(id);
            setIsFormVisible(true);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this frame-vocabulary relation?')) return;
        setIsLoading(true);
        try {
            await deleteFrameVocabulary(id);
            if (editingId === id) resetForm();
            await loadData();
        } catch (err) {
            setError(err.message || 'Delete failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData({ frame_id: '', vocab_id: '' });
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
                    <h1 className="text-xl font-bold text-gray-800">Manage Frame-Vocabulary Relations</h1>
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

                {/* Frame-Vocabulary Form (Visible only when isFormVisible is true) */}
                {isFormVisible && (
                    <Overlay className="z-[1000]">
                        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="frame_id" className="text-sm font-medium text-gray-700 mb-1">
                                        Frame
                                    </label>
                                    <select
                                        id="frame_id"
                                        name="frame_id"
                                        value={formData.frame_id}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>
                                            Select Frame
                                        </option>
                                        {frames.map((frame) => (
                                            <option key={frame.id} value={frame.id}>
                                                {frame.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="vocab_id" className="text-sm font-medium text-gray-700 mb-1">
                                        Vocabulary
                                    </label>
                                    <select
                                        id="vocab_id"
                                        name="vocab_id"
                                        value={formData.vocab_id}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>
                                            Select Vocabulary
                                        </option>
                                        {vocabularies.map((vocab) => (
                                            <option key={vocab.id} value={vocab.id}>
                                                {vocab.english_word}
                                            </option>
                                        ))}
                                    </select>
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

                {/* Frame-Vocabulary Table */}
                <section>
                    {isLoading ? (
                        <p className="text-center text-gray-600">Loading data...</p>
                    ) : filteredFrameVocabs.length === 0 ? (
                        <p className="text-center text-gray-600">No frame-vocabulary relations found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-green-500 text-white">
                                        <th className="py-2 px-4 border-b">STT</th>
                                        <th className="py-2 px-4 border-b">Frame</th>
                                        <th className="py-2 px-4 border-b">Vocabulary</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFrameVocabs.map((vocab, index) => (
                                        <tr key={vocab.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                            <td className="py-2 px-4 border-b">{vocab.frame_title}</td>
                                            <td className="py-2 px-4 border-b">{vocab.english_word}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                <button
                                                    onClick={() => handleEdit(vocab.id)}
                                                    className="bg-green-200 text-green-800 px-3 py-1 rounded mr-2 hover:bg-green-300 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(vocab.id)}
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

export default FrameVocabularyPage;
