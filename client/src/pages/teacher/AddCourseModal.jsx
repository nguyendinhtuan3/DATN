import { useEffect, useState } from 'react';
import { fetchCourseTypes } from '../../api/courseTypeService';

function AddCourseModal({ isOpen, onClose, onAddCourse }) {
    const [courseTypes, setCourseTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [errorTypes, setErrorTypes] = useState(null);
    const [formError, setFormError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        target: '',
        price: '',
        description: '',
        link: '',
    });

    useEffect(() => {
        if (!isOpen) return;

        const fetchTypes = async () => {
            setLoadingTypes(true);
            setErrorTypes(null);
            try {
                const response = await fetchCourseTypes();
                setCourseTypes(response?.data || []);
            } catch (error) {
                setErrorTypes(error.message || 'Lỗi tải danh sách loại khóa học');
            } finally {
                setLoadingTypes(false);
            }
        };

        fetchTypes();
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, target, price, description, link } = formData;

        if (!name || !target || !price || !description || !link) {
            setFormError('Vui lòng điền đầy đủ tất cả các trường.');
            return;
        }

        setFormError('');
        setLoadingSubmit(true);

        try {
            // Gọi hàm thêm khóa học (ví dụ từ prop onAddCourse)
            if (onAddCourse) {
                await onAddCourse(formData);
            }
            onClose(); // Đóng modal sau khi thành công
            setFormData({ name: '', target: '', price: '', description: '', link: '' });
        } catch (err) {
            setFormError(err.message || 'Đã xảy ra lỗi khi thêm khóa học.');
        } finally {
            setLoadingSubmit(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold">➕ Add Course</h3>
                    <button
                        className="text-gray-500 hover:text-red-500 text-xl"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {formError && <p className="text-red-500 text-sm">{formError}</p>}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Course Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={loadingSubmit}
                        />
                    </div>

                    <div>
                        <label htmlFor="target" className="block text-sm font-medium">
                            Target
                        </label>
                        <select
                            id="target"
                            name="target"
                            value={formData.target}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={loadingSubmit || loadingTypes}
                        >
                            <option value="">-- Select --</option>
                            {loadingTypes && <option>Loading...</option>}
                            {errorTypes && <option disabled>Error: {errorTypes}</option>}
                            {!loadingTypes &&
                                !errorTypes &&
                                courseTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium">
                            Course Price
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={loadingSubmit}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            rows="4"
                            required
                            disabled={loadingSubmit}
                        />
                    </div>

                    <div>
                        <label htmlFor="link" className="block text-sm font-medium">
                            Course Link
                        </label>
                        <textarea
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            rows="2"
                            required
                            disabled={loadingSubmit}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#e1effa] text-black font-semibold py-2 rounded-md hover:bg-[#cbe0f0] disabled:opacity-50"
                        disabled={loadingSubmit}
                    >
                        {loadingSubmit ? 'Adding...' : 'Add'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCourseModal;
