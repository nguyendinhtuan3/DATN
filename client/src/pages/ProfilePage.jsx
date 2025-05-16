import React, { useState, useEffect } from 'react';
import { minigame } from '../assets';
import { updateUser } from '../api/userApi';
import useAuthStore from '../store/authStore';
import { showNotification } from '../components/showNotification';
import ImageCropper from '../components/ImageCropper';

function ProfilePage() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        avatarUrl: '', // Link to the current avatar
    });
    const [avatarFile, setAvatarFile] = useState(null); // New avatar file to upload
    const [avatarPreview, setAvatarPreview] = useState(null); // Preview of the new avatar
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false); // Separate loading state for image upload
    const { user, setUser } = useAuthStore();

    // Initialize user data from the auth store
    useEffect(() => {
        if (user) {
            setUserData({
                username: user.username || '',
                email: user.email || '',
                avatarUrl: user.avatar || minigame,
            });
            setAvatarPreview(user.avatar || minigame); // Set initial avatar preview
        }
    }, [user]);

    // Handle avatar file selection
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle cropped image from ImageCropper
    const handleImageUpload = async (croppedImage) => {
        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append('file', croppedImage);
            formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
            // Assuming you're using Cloudinary for image upload
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                },
            );
            const data = await response.json();
            if (data.secure_url) {
                setUserData((prev) => ({ ...prev, avatarUrl: data.secure_url }));
                setAvatarPreview(data.secure_url);
                showNotification('Ảnh đã được tải lên thành công!', true);
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Lỗi khi tải ảnh:', error);
            showNotification('Không thể tải ảnh lên. Vui lòng thử lại.', false);
        } finally {
            setUploadingImage(false);
        }
    };

    // Handle input changes for username and email
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            const updatedData = {
                username: userData.username,
                email: userData.email,
                avatar: userData.avatarUrl, // Include the updated avatar URL
            };
            const res = await updateUser(user?.id, updatedData);
            setLoading(false);
            showNotification(res.message, res.status);
            if (res.status) {
                setUser(res.user);
                setAvatarFile(null); // Reset avatar file after successful update
            }
        } catch (error) {
            setLoading(false);
            showNotification('Cập nhật thất bại. Vui lòng thử lại.', false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-md space-y-6">
            <div className="space-y-5">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-400 relative">
                        <img
                            src={avatarPreview || minigame}
                            alt="avatar preview"
                            className="object-cover w-full h-full"
                        />
                        {uploadingImage && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <span className="text-white text-sm">Đang tải...</span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                        <ImageCropper
                            width={460}
                            height={460}
                            label=" Chọn ảnh mới"
                            idName="avatar-crop"
                            onCropComplete={handleImageUpload}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ tên
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={userData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        placeholder="Nhập họ tên"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        placeholder="Nhập email"
                    />
                </div>

                {message && (
                    <p className={`text-center ${message.includes('Lỗi') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading || uploadingImage}
                    className={`w-full py-2 rounded-md text-white font-semibold ${
                        loading || uploadingImage
                            ? 'bg-indigo-300 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                    } transition`}
                >
                    {loading || uploadingImage ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
