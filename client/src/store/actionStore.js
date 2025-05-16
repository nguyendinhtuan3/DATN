import { create } from 'zustand';

const useActionStore = create((set) => {
    // Lấy giá trị courseId từ localStorage khi khởi tạo
    const savedCourseId = localStorage.getItem('courseId') || '';
    return {
        courseId: savedCourseId,
        isLoading: false,
        setCourseId: (courseId) => {
            localStorage.setItem('courseId', courseId);
            set({ courseId });
        },
        setIsLoading: (value) => set({ isLoading: value }),
        clearCourseId: () => {
            localStorage.removeItem('courseId');
            set({ courseId: '', isLoading: false });
        },
    };
});

export default useActionStore;
