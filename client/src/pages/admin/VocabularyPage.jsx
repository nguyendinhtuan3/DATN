import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    getAllVocabularies,
    createVocabulary,
    deleteVocabulary,
    getVocabularyById,
    updateVocabulary,
} from '../../api/vocabularyService';
import Sidebar from '../../components/Sidebar';
import { showNotification } from '../../components/showNotification';
import Overlay from '../../components/common/Overlay';
import { apiUploadAudio } from '../../services/uploadPicture.service';
import useActionStore from '../../store/actionStore';

// Hàm upload audio lên Cloudinary

const VocabularyPage = () => {
    const [vocabularies, setVocabularies] = useState([]);
    const [formData, setFormData] = useState({
        english_word: '',
        vietnamese_word: '',
        part_of_speech: '',
        audio_url: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { setIsLoading } = useActionStore();
    const fetchVocabularies = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getAllVocabularies();
            setVocabularies(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to load vocabularies');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVocabularies();
    }, [fetchVocabularies]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredVocabularies = vocabularies.filter(
        (vocab) =>
            vocab.english_word.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vocab.vietnamese_word.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editingId) {
                await updateVocabulary(editingId, formData);
                showNotification('Vocabulary updated successfully', 'success');
            } else {
                await createVocabulary(formData);
                showNotification('Vocabulary created successfully', 'success');
            }
            resetForm();
            await fetchVocabularies();
        } catch (err) {
            setError(err.message || 'Operation failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setIsLoading(true);
        try {
            const response = await getVocabularyById(id);
            setFormData(response.data);
            setEditingId(id);
            setIsFormVisible(true);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to load vocabulary');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vocabulary?')) return;
        setIsLoading(true);
        try {
            const res = await deleteVocabulary(id);
            showNotification(res.message, res.status);
            if (editingId === id) resetForm();
            await fetchVocabularies();
        } catch (err) {
            setError(err.message || 'Delete failed');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            english_word: '',
            vietnamese_word: '',
            part_of_speech: '',
            audio_url: '',
        });
        setEditingId(null);
        setIsFormVisible(false);
        setError(null);
    };

    const handleAddNewClick = () => {
        resetForm();
        setIsFormVisible(true);
    };

    // Xử lý upload file audio từ máy tính
    const handleAudioUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setError(null);
        setIsLoading(true);
        const result = await apiUploadAudio(file);
        setIsLoading(false);
        if (result.success) {
            setFormData((prev) => ({ ...prev, audio_url: result.url }));
            showNotification('Audio uploaded successfully', 'success');
        } else {
            setError(result.message || 'Audio upload failed');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 p-6 gap-4">
            <Sidebar />

            <main className="flex-grow p-4">
                <div className="flex justify-between items-center mb-4 bg-blue-50 p-3 rounded">
                    <h1 className="text-xl font-bold text-gray-800">Vocabulary Management</h1>
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

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

                {isFormVisible && (
                    <Overlay className="z-[1000]">
                        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow max-w-3xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'English Word', name: 'english_word', required: true },
                                    { label: 'Vietnamese Word', name: 'vietnamese_word', required: true },
                                    { label: 'Part of Speech', name: 'part_of_speech' },
                                ].map(({ label, name, required }) => (
                                    <div key={name} className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
                                        <input
                                            type="text"
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleInputChange}
                                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required={true}
                                        />
                                    </div>
                                ))}

                                {/* Input upload audio */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">Audio Upload</label>
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        onChange={handleAudioUpload}
                                        className="p-2 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {formData.audio_url && <audio controls src={formData.audio_url} className="mt-2" />}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                                >
                                    {editingId ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </Overlay>
                )}

                <section>
                    {filteredVocabularies.length === 0 ? (
                        <p className="text-center text-gray-600">No vocabularies found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-green-500 text-white">
                                        <th className="py-2 px-4 border-b">STT</th>
                                        <th className="py-2 px-4 border-b">English Word</th>
                                        <th className="py-2 px-4 border-b">Vietnamese Word</th>
                                        <th className="py-2 px-4 border-b">Part of Speech</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredVocabularies.map((vocab, index) => (
                                        <tr key={vocab.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                            <td className="py-2 px-4 border-b">{vocab.english_word}</td>
                                            <td className="py-2 px-4 border-b">{vocab.vietnamese_word}</td>
                                            <td className="py-2 px-4 border-b">{vocab.part_of_speech || '-'}</td>
                                            <td className="py-2 px-4 border-b text-center">
                                                <button
                                                    onClick={() => handleEdit(vocab.id)}
                                                    className="bg-green-200 text-green-800 px-3 py-1 rounded mr-2 hover:bg-green
-300"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(vocab.id)}
                                                    className="bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300"
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

export default VocabularyPage;
