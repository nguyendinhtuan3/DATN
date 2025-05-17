import React, { useState, useEffect } from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import OverLay from '../components/common/Overlay';
import { useLocation } from 'react-router-dom';
import '../styles/global.css';

const LoginPage = () => {
    const location = useLocation();
    const [isRegisterActive, setIsRegisterActive] = useState(false);

    useEffect(() => {
        // Determine active form based on current path
        setIsRegisterActive(location.pathname === '/register');
    }, [location]);

    return (
        <OverLay className="z-[1000]">
            <div className="w-full h-full">
                <div className={`container ${isRegisterActive ? 'active' : ''} z-[1000] w-2/3 mx-auto`} id="container">
                    <Register setIsRegisterActive={setIsRegisterActive} />
                    <Login setIsRegisterActive={setIsRegisterActive} />
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button onClick={() => setIsRegisterActive(false)}>Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button onClick={() => setIsRegisterActive(true)}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OverLay>
    );
};

export default LoginPage;
