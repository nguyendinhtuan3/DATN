import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../../api/userApi';
import { showNotification } from '../../components/showNotification';
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            setLoading(false);
            return;
        }
        try {
            // Assuming you get a token from the URL to verify the password reset
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');
            if (!token) {
                setMessage('Invalid reset token.');
                setLoading(false);
                return;
            }

            const response = await resetPassword(token, password);
            setMessage(response.data.message);
            showNotification(response.data.message, response.data.status);
            if (response.data.status) {
                navigate('/login');
            }
        } catch (error) {
            setMessage(error.message || 'Something went wrong!');
        }

        setLoading(false);
    };

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-[1000] flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mt-4"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
