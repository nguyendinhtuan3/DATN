/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const apiUploadImage = async (data) => {
    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME}/image/upload`,
            data,
        );
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export const apiUploadAudio = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
        formData.append('resource_type', 'video'); // hoặc 'auto' nếu muốn tự động
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME}/video/upload`,
            formData,
        );
        return { success: true, url: res.data.secure_url };
    } catch (error) {
        return { success: false, message: error.message || 'Upload failed' };
    }
};
