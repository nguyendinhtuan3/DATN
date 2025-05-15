import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getCourses = async () => {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
};

export const getCourseById = async (id) => {
    const response = await axios.get(`${API_URL}/courses/${id}`);
    return response.data;
};

export const getAllCourses = async () => {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
};

export const deleteCourse = async (courseId) => {
    const response = await axios.delete(`${API_URL}/courses/${courseId}`);
    return response.data;
};