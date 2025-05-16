// Lấy tất cả danh mục
import axios from 'axios';
export const apiGetPrompt = async (userId) => {
    try {
        const res = await axios.get('/v1/api/chatbot/prompt', {
            params: { userId },
        });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
