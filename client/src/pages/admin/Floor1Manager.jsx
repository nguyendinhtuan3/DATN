import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../../components/Sidebar';
import Overlay from '../../components/common/Overlay';
import {
    getAllFloor1Questions,
    getFloor1QuestionById,
    createFloor1Question,
    updateFloor1Question,
    deleteFloor1Question,
} from '../../api/floorApi';
import { showNotification } from '../../components/showNotification';
import parseOptions from '../../utils/parseOptions';

const Floor1PictureMatchPage = () => {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({
        image_url: '',
        audio_url: '', // Added audio_url
        options: ['', '', ''],
        correct_answer: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingAudio, setUploadingAudio] = useState(false); // Added uploadingAudio
    const [imagePreview, setImagePreview] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null); // Added audioPreview

    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getAllFloor1Questions();
            setQuestions(res.data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Lỗi khi tải dữ liệu');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index, value) => {
        setFormData((prev) => {
            const newOptions = [...prev.options];
            newOptions[index] = value;
            return { ...prev, options: newOptions };
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredQuestions = questions.filter(
        (q) =>
            q.image_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.correct_answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.audio_url?.toLowerCase().includes(searchTerm.toLowerCase()), // Added audio_url to search
    );

    const resetForm = () => {
        setFormData({
            image_url: '',
            audio_url: '', // Reset audio_url
            options: ['', '', ''],
            correct_answer: '',
        });
        setEditingId(null);
        setIsFormVisible(false);
        setError(null);
        setValidationError(null);
        setImagePreview(null);
        setAudioPreview(null); // Reset audioPreview
    };

    const handleAddNewClick = () => {
        resetForm();
        setIsFormVisible(true);
    };

    const validateForm = () => {
        const { image_url, audio_url, options, correct_answer } = formData;

        if (!image_url) {
            setValidationError('Vui lòng cung cấp URL hình ảnh hoặc tải lên hình ảnh.');
            return false;
        }

        // Make audio_url required (optional: comment out if audio is not mandatory)
        if (!audio_url) {
            setValidationError('Vui lòng cung cấp URL âm thanh hoặc tải lên file âm thanh.');
            return false;
        }

        if (options.length !== 3 || options.some((opt) => opt.trim() === '')) {
            setValidationError('Phải nhập đủ 3 tùy chọn và không được để trống.');
            return false;
        }

        const matchCount = options.filter(
            (opt) => opt.trim().toLowerCase() === correct_answer.trim().toLowerCase(),
        ).length;

        if (matchCount !== 1) {
            setValidationError('Đáp án đúng phải trùng đúng 1 trong 3 tùy chọn.');
            return false;
        }

        setValidationError(null);
        return true;
    };

    const handleImageUpload = async (file) => {
        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                },
            );
            const data = await response.json();
            if (data.secure_url) {
                setFormData((prev) => ({ ...prev, image_url: data.secure_url }));
                setImagePreview(data.secure_url);
                setError(null);
            } else {
                throw new Error('Không thể tải ảnh lên');
            }
        } catch (error) {
            setError('Không thể tải ảnh lên. Vui lòng thử lại.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleAudioUpload = async (file) => {
        setUploadingAudio(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME}/video/upload`, // Use video/upload for audio
                {
                    method: 'POST',
                    body: formData,
                },
            );
            const data = await response.json();
            if (data.secure_url) {
                setFormData((prev) => ({ ...prev, audio_url: data.secure_url }));
                setAudioPreview(data.secure_url);
                showNotification('Audio uploaded successfully', 'success');
                setError(null);
            } else {
                throw new Error('Không thể tải âm thanh lên');
            }
        } catch (error) {
            setError('Không thể tải âm thanh lên. Vui lòng thử lại.');
        } finally {
            setUploadingAudio(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleAudioFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleAudioUpload(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validationError) {
            showNotification(validationError);
        }
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const payload = {
                ...formData,
                options: JSON.stringify(formData.options),
            };

            if (editingId) {
                await updateFloor1Question(editingId, payload);
            } else {
                await createFloor1Question(payload);
            }
            resetForm();
            await loadData();
        } catch (err) {
            setError(err.message || 'Lỗi khi xử lý dữ liệu');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setIsLoading(true);
        try {
            const res = await getFloor1QuestionById(id);
            const question = res.data;
            let optionsArray = ['', '', ''];
            try {
                let parsedOptions = JSON.parse(question.options);
                if (typeof parsedOptions === 'string') {
                    parsedOptions = JSON.parse(parsedOptions);
                }
                if (Array.isArray(parsedOptions) && parsedOptions.length === 3) {
                    optionsArray = parsedOptions;
                }
            } catch (e) {
                console.error(`Error parsing options for question ${id}:`, e);
            }
            setFormData({
                image_url: question.image_url,
                audio_url: question.audio_url || '', // Added audio_url
                options: optionsArray,
                correct_answer: question.correct_answer,
            });
            setImagePreview(question.image_url);
            setAudioPreview(question.audio_url || null); // Added audioPreview
            setEditingId(id);
            setIsFormVisible(true);
            setValidationError(null);
        } catch (err) {
            setError(err.message || 'Lỗi khi lấy dữ liệu');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) return;
        setIsLoading(true);
        try {
            await deleteFloor1Question(id);
            if (editingId === id) resetForm();
            await loadData();
        } catch (err) {
            setError(err.message || 'Lỗi khi xóa dữ liệu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 p-6 gap-4">
            <Sidebar />
            <main className="flex-grow p-4">
                <div className="flex justify-between items-center mb-4 bg-blue-50 p-3 rounded">
                    <h1 className="text-xl font-bold text-gray-800">Quản lý câu hỏi Picture Matching</h1>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddNewClick}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Thêm mới
                        </button>
                    </div>
                </div>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

                {isFormVisible && (
                    <Overlay className="z-[1000]">
                        <div className="bg-white w-1/2 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
                            <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow max-w-xl mx-auto">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tải lên hình ảnh
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={uploadingImage}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                                        />
                                        {uploadingImage && (
                                            <p className="text-sm text-gray-500 mt-1">Đang tải ảnh...</p>
                                        )}
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="mt-2 w-32 h-32 object-cover rounded"
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tải lên âm thanh
                                        </label>
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={handleAudioFileChange}
                                            disabled={uploadingAudio}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                                        />
                                        {uploadingAudio && (
                                            <p className="text-sm text-gray-500 mt-1">Đang tải âm thanh...</p>
                                        )}
                                        {audioPreview && <audio src={audioPreview} controls className="mt-2 w-full" />}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            URL Hình ảnh (hoặc để trống nếu đã tải lên)
                                        </label>
                                        <input
                                            type="text"
                                            name="image_url"
                                            required
                                            value={formData.image_url}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            URL Âm thanh (hoặc để trống nếu đã tải lên)
                                        </label>
                                        <input
                                            type="text"
                                            name="audio_url"
                                            value={formData.audio_url}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tùy chọn (3 lựa chọn)
                                        </label>
                                        {formData.options.map((opt, idx) => (
                                            <input
                                                key={idx}
                                                type="text"
                                                value={opt}
                                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                                required
                                                className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder={['A', 'B', 'C'][idx]}
                                            />
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Đáp án đúng
                                        </label>
                                        <input
                                            type="text"
                                            name="correct_answer"
                                            value={formData.correct_answer}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                        disabled={isLoading || uploadingImage || uploadingAudio}
                                    >
                                        {isLoading ? 'Đang xử lý...' : editingId ? 'Cập nhật' : 'Tạo mới'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Overlay>
                )}

                <section>
                    {isLoading ? (
                        <p className="text-center text-gray-600">Đang tải dữ liệu...</p>
                    ) : filteredQuestions.length === 0 ? (
                        <p className="text-center text-gray-600">Không tìm thấy câu hỏi nào.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded">
                                <thead className="bg-green-500 text-white">
                                    <tr>
                                        <th className="py-2 px-4 border">STT</th>
                                        <th className="py-2 px-4 border">Hình ảnh</th>
                                        <th className="py-2 px-4 border">Âm thanh</th>
                                        <th className="py-2 px-4 border">Tùy chọn</th>
                                        <th className="py-2 px-4 border">Đáp án đúng</th>
                                        <th className="py-2 px-4 border">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredQuestions.map((q, idx) => (
                                        <tr key={q.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border text-center">{idx + 1}</td>
                                            <td className="py-2 px-4 border text-center">
                                                <img
                                                    src={q.image_url}
                                                    alt="img"
                                                    className="w-20 h-20 object-cover mx-auto"
                                                />
                                            </td>
                                            <td className="py-2 px-4 border text-center">
                                                {q.audio_url ? (
                                                    <audio src={q.audio_url} controls className="w-48 mx-auto" />
                                                ) : (
                                                    'Không có âm thanh'
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border">{parseOptions(q.options)}</td>
                                            <td className="py-2 px-4 border text-center">{q.correct_answer}</td>
                                            <td className="py-2 px-4 border text-center">
                                                <button
                                                    onClick={() => handleEdit(q.id)}
                                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(q.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Xóa
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

export default Floor1PictureMatchPage;
