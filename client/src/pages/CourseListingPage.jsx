import { useEffect, useState } from 'react';
import CourseTypeSidebar from '../components/CourseTypeSidebar';
import { fetchCourseTypes } from '../api/courseTypeService';
import { fetchAllCourses } from '../api/courseService';
import { showNotification } from '../components/showNotification';
import parse from 'html-react-parser';
import { formatMoney } from '../utils/formatMoney';
import { ENV } from '../config/ENV';
import { sortObject } from '../utils/sortObject';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { calculateVnpSecureHash } from '../utils/calculateVnpSecureHash';
import useActionStore from '../store/actionStore';

const CourseListingPage = () => {
    const [courseTypes, setCourseTypes] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedType, setSelectedType] = useState('ALL');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { user, isUserLoggedIn } = useAuthStore();
    const { setCourseId } = useActionStore();
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const typeResponse = await fetchCourseTypes();
                setCourseTypes(typeResponse.data);
                const courseResponse = await fetchAllCourses();
                setFilteredCourses(courseResponse.data);
                setCourses(courseResponse.data);
            } catch (err) {
                setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu');
                showNotification(err.message || 'Đã xảy ra lỗi khi tải dữ liệu', false);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleTypeChange = async (typeName) => {
        setSelectedType(typeName);
        const selectedTypeId = typeName === 'ALL' ? null : courseTypes.find((t) => t.name === typeName)?.id;
        setLoading(true);
        try {
            const courseResponse = await fetchAllCourses(selectedTypeId);
            setFilteredCourses(courseResponse.data);
        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi lọc khóa học');
            showNotification(err.message || 'Đã xảy ra lỗi khi lọc khóa học', false);
        } finally {
            setLoading(false);
        }
    };

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseDetail = () => {
        setSelectedCourse(null);
    };

    const handleVNPayPayment = () => {
        const { vnp_TmnCode, vnp_HashSecret, vnp_Url, BASE_URL } = ENV;
        const returnUrl = `${BASE_URL}/payment-confirmation`;
        if (!vnp_HashSecret || !vnp_Url || !vnp_TmnCode || !returnUrl) {
            alert('Không thể thực hiện thanh toán, thiếu thông tin cấu hình.');
            return;
        }
        setCourseId(selectedCourse.id);
        const createDate = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '');
        const orderId =
            new Date().getHours().toString().padStart(2, '0') +
            new Date().getMinutes().toString().padStart(2, '0') +
            Math.floor(Math.random() * 10000);
        const paymentData = {
            vnp_Amount: selectedCourse.price * 100,
            vnp_Command: 'pay',
            vnp_CreateDate: createDate,
            vnp_CurrCode: 'VND',
            vnp_IpAddr: '127.0.0.1',
            vnp_Locale: 'vn',
            vnp_OrderInfo: 'p',
            vnp_OrderType: '250000',
            vnp_ReturnUrl: returnUrl,
            vnp_TxnRef: orderId,
            vnp_Version: '2.1.0',
            vnp_TmnCode: vnp_TmnCode,
        };

        const sortedParams = sortObject(paymentData)
            .map((key) => `${key}=${encodeURIComponent(paymentData[key])}`)
            .join('&');

        const vnp_SecureHash = calculateVnpSecureHash(sortedParams, vnp_HashSecret);
        const paymentUrl = `${vnp_Url}?${sortedParams}&vnp_SecureHash=${vnp_SecureHash}`;
        alert(`Thanh toán qua VNPay với số tiền: ${selectedCourse.price} VND`);
        window.location.href = paymentUrl;
    };

    return (
        <div className="flex min-h-screen bg-gray-100 p-6 gap-4">
            <CourseTypeSidebar courseTypes={courseTypes} selectedType={selectedType} onTypeChange={handleTypeChange} />
            <div className="flex-1">
                {loading && <p className="text-center">Đang tải dữ liệu...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {!selectedCourse && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                {course.image ? (
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}

                                <div className="p-4">
                                    <div className="text-lg font-semibold mb-2 text-gray-800">📖 {course.title}</div>
                                    <div className="text-sm mb-3 text-gray-600 line-clamp-2">
                                        {parse(course.description)}
                                    </div>
                                    <div className="text-sm mb-4 text-gray-700 flex items-center gap-2">
                                        🎯 <span>Course: {course.courseTypeName}</span>
                                    </div>

                                    <button
                                        onClick={() => handleCourseClick(course)}
                                        className="bg-[#C5EDD5] hover:bg-[#a7dbc0] text-black px-4 py-2 rounded-md text-sm font-medium w-full transition-colors duration-200"
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {selectedCourse && (
                    <div className="bg-white rounded-lg shadow-md p-6 h-screen flex flex-col">
                        <button
                            onClick={handleCloseDetail}
                            className="bg-green-200 text-green-800 px-4 py-2 rounded-md mb-4 self-end"
                        >
                            BACK
                        </button>
                        <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-auto">
                            <div className="w-full md:w-1/2 flex-shrink-0">
                                <img
                                    src={selectedCourse.image || '/default-image.png'}
                                    alt={selectedCourse.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">
                                    Description
                                </h2>
                                <p className="text-gray-700 flex-1 overflow-auto">
                                    {parse(selectedCourse.description)}
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col">
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 flex-1">
                                    <p className="flex items-center mb-2">
                                        <span className="mr-2">📖</span> {selectedCourse.title}
                                    </p>
                                    <p className="flex items-center mb-2">
                                        <span className="mr-2">🎯 Course:</span> {selectedCourse.courseTypeName}
                                    </p>

                                    <p className="flex items-center mb-2">
                                        <span className="mr-2">👩‍🏫 Instructor:</span>
                                        {selectedCourse.creatorName || 'N/A'}
                                    </p>
                                    <p className="flex items-center mb-2">
                                        <span className="mr-2">💰Course price:</span>
                                        {formatMoney(selectedCourse.price) || 'N/A'} VND
                                    </p>
                                </div>
                                {(!isUserLoggedIn || user.role === 'student') && (
                                    <button
                                        onClick={() => {
                                            if (isUserLoggedIn) {
                                                handleVNPayPayment();
                                            } else {
                                                navigate('/');
                                            }
                                        }}
                                        className="w-full bg-green-200 text-green-800 px-4 py-2 rounded-md hover:bg-green-300 transition-colors mb-4"
                                    >
                                        Payment
                                    </button>
                                )}
                                <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">
                                    Course Link
                                </h2>
                                <a
                                    href={selectedCourse.link}
                                    className="text-blue-500 break-all block flex-1 overflow-auto"
                                >
                                    {selectedCourse.link || 'No link available'}
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseListingPage;
