import { useEffect, useState } from 'react';
import { fetchCourseTypes } from '../../api/courseTypeService';
import ImageCropper from '../../components/ImageCropper';
import { apiUploadImage } from '../../services/uploadPicture.service';
import { showNotification } from '../../components/showNotification';
import InputEditor from '../../components/InputEditor';
import { createCourse, updateCourse } from '../../api/courseService';
import Overlay from '../../components/common/Overlay';

function AddCourseModal({ isOpen, onClose, editingCourse }) {
    const [courseTypes, setCourseTypes] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [formError, setFormError] = useState('');
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        courseTypeId: '',
        description: '',
        image: '',
        price: '',
        link: '',
    });

    useEffect(() => {
        if (!isOpen) return;

        // Initialize formData with editingCourse data if provided
        if (editingCourse) {
            setFormData({
                title: editingCourse.title || '',
                courseTypeId: editingCourse.courseTypeId || '',
                description: editingCourse.description || '',
                image: editingCourse.image || '',
                price: editingCourse.price || '',
                link: editingCourse.link || '',
            });
        } else {
            setFormData({
                title: '',
                courseTypeId: '',
                description: '',
                image: '',
                price: '',
                link: '',
            });
        }

        const fetchTypes = async () => {
            setLoadingTypes(true);
            try {
                const response = await fetchCourseTypes();
                setCourseTypes(response?.data || []);
            } catch (error) {
                console.error('Lỗi khi lấy loại khóa học:', error);
                showNotification('Không thể tải danh sách loại khóa học.', false);
            } finally {
                setLoadingTypes(false);
            }
        };

        fetchTypes();
    }, [isOpen, editingCourse]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, courseTypeId, price, description, link } = formData;

        // Validate required fields
        if (!title || !courseTypeId || !price || !description || !link) {
            showNotification('Vui lòng điền đầy đủ tất cả các trường bắt buộc.', false);
            return;
        }

        // Validate price
        if (parseFloat(price) < 0) {
            showNotification('Giá phải là số không âm.', false);
            return;
        }

        // Validate link (basic URL check)
        try {
            new URL(link);
        } catch {
            showNotification('Liên kết phải là một URL hợp lệ.', false);
            return;
        }

        setFormError('');
        setLoadingSubmit(true);

        try {
            let res;
            if (editingCourse) {
                // Update existing course
                res = await updateCourse(editingCourse.id, formData);
                showNotification('Cập nhật thành công', true);
            } else {
                // Create new course
                res = await createCourse(formData);
                showNotification('Thêm khóa học thành công', true);
            }

            if (res.status) {
                // Pass the new/updated course back to parent
                onClose(res.data);
                setFormData({
                    title: '',
                    courseTypeId: '',
                    price: '',
                    description: '',
                    link: '',
                    image: '',
                });
            }
        } catch (err) {
            setFormError(err.message || 'Đã xảy ra lỗi khi lưu khóa học.');
            showNotification('Không thể lưu khóa học. Vui lòng thử lại.', false);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleImageUpload = async (image) => {
        setIsLoadingImage(true);
        try {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
            const response = await apiUploadImage(formData);
            setFormData((prev) => ({
                ...prev,
                image: response.url,
            }));
        } catch (error) {
            console.error('Lỗi khi tải ảnh:', error);
            showNotification('Không thể tải ảnh lên. Vui lòng thử lại.', false);
        } finally {
            setIsLoadingImage(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Overlay onClick={() => onClose(null)} className={'z-[1000]'}>
            <div className="bg-white  w-1/2 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold">{editingCourse ? '✏️ Sửa Khóa Học' : '➕ Thêm Khóa Học'}</h3>
                    <button
                        className="text-gray-500 hover:text-red-500 text-xl"
                        onClick={() => onClose(null)}
                        aria-label="Đóng modal"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    {formError && <p className="text-red-500 text-sm">{formError}</p>}
                    <div>
                        <label className="block text-sm font-medium mb-2">Hình ảnh khóa học</label>
                        <ImageCropper
                            width={460}
                            height={260}
                            label="Thêm hình ảnh"
                            idName="image"
                            onCropComplete={handleImageUpload}
                        />
                        {formData.image && (
                            <img src={formData.image} alt="Banner" className="mt-2 w-full rounded shadow" />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Tên khóa học</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Loại khóa học</label>
                        <select
                            name="courseTypeId"
                            value={formData.courseTypeId}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                            disabled={loadingTypes}
                        >
                            <option value="">-- Chọn loại khóa học --</option>
                            {courseTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Giá</label>
                        <input
                            name="price"
                            type="number"
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <InputEditor label="Mô Tả" value={formData.description} setValue={setFormData} />

                    {/* <div>
                        <label className="block text-sm font-medium">Mô tả</label>
                        <textarea
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div> */}

                    <div>
                        <label className="block text-sm font-medium">Liên kết</label>
                        <textarea
                            name="link"
                            rows="2"
                            value={formData.link}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                        disabled={loadingSubmit || isLoadingImage}
                        onClick={handleSubmit}
                    >
                        {loadingSubmit ? 'Đang lưu...' : editingCourse ? 'Cập nhật khóa học' : 'Thêm khóa học'}
                    </button>
                </div>
            </div>
        </Overlay>
    );
}

export default AddCourseModal;
