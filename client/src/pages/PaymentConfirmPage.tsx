/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { sortObject } from '../utils/sortObject';
import { calculateVnpSecureHash } from '../utils/calculateVnpSecureHash';
import { ENV } from '../config/ENV';
import { showNotification } from '../components/showNotification';
import useActionStore from '../store/actionStore';
import { confirmPayment } from '../api/courseService';

const PaymentConfirmPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queries = queryString.parse(location.search);
    const vnp_HashSecret = ENV.vnp_HashSecret || '';
    const { courseId, setIsLoading, clearCourseId } = useActionStore();
    useEffect(() => {
        const verifyPayment = async () => {
            const { vnp_SecureHash, ...vnp_Params } = queries;

            const sortedParams = sortObject(vnp_Params)
                .map((key: string) => `${key}=${encodeURIComponent(vnp_Params[key] as string)}`)
                .join('&');

            const signed = calculateVnpSecureHash(sortedParams, vnp_HashSecret);

            // Xác thực thất bại
            if (vnp_SecureHash !== signed) {
                showNotification('Xác thực thanh toán thất bại', false);
                navigate('/courses');
                clearCourseId();
                return;
            }

            // Thanh toán không thành công từ VNPAY
            if (vnp_Params.vnp_TransactionStatus !== '00') {
                showNotification('Thanh toán không thành công', false);
                navigate('/courses');
                clearCourseId();
                return;
            }
            // Gửi xác nhận thanh toán về server
            try {
                setIsLoading(true);
                const res = await confirmPayment(courseId);
                showNotification(res.message, res.status);
                navigate(res.status ? '/' : '/courses');
            } catch (error) {
                showNotification('Thanh toán không thành công', false);
                navigate('/courses');
            } finally {
                setIsLoading(false);
                clearCourseId();
            }
        };
        if (queries.vnp_SecureHash) {
            verifyPayment();
        }
    }, []);

    return (
        <div className="flex mobile:flex-col w-full h-screen bg-white p-5">
            <div className="flex mobile:w-full w-6/12 mx-auto justify-center items-center">
                <div className="w-[400px]">
                    <video
                        className="object-cover"
                        src="https://cdnl.iconscout.com/lottie/premium/thumb/payment-received-8453779-6725893.mp4"
                        autoPlay
                        loop
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmPage;
