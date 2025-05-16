import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Avatar } from 'antd';
import { SearchOutlined, TrophyOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import { AvatarLinhvat, garden, minigame, tower } from '../assets';
import useAuthStore from '../store/authStore';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                if (res.status && Array.isArray(res.data)) {
                    setCourses(res.data);
                } else {
                    setError('Không có dữ liệu khóa học');
                }
            } catch (err) {
                setError('Lỗi khi tải khóa học');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="w-full overflow-x-hidden bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen">
            <main className="max-w-6xl mx-auto px-10 py-10">
                {/* Search Bar */}
                <div className="mb-12">
                    <Input.Search
                        placeholder="Search for something..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        style={{ maxWidth: 500 }}
                        className="mx-auto block"
                        onSearch={(value) => console.log('Searching:', value)}
                    />
                </div>

                {/* Intro Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-16">
                    <div className="h-full bg-[#89CA9C] text-white p-8 shadow-lg">
                        <h3 className="text-3xl font-bold mb-4">Conquer TOEIC with an Engaging Learning Experience!</h3>
                        <p className="text-lg">
                            Explore the "Vocabulary Garden" – where you can plant and grow your vocabulary, making
                            memorization easier and more enjoyable than ever.
                        </p>
                    </div>
                    <img src={AvatarLinhvat} alt="Mascot" className="w-full h-auto shadow-xl" />
                </div>

                {/* Start Button */}
                <div className="text-center mb-16">
                    <Link to={user?.role ? '/courses' : '/login'}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ArrowRightOutlined />}
                            className="!bg-teal-600 !border-teal-600 hover:scale-105 hover:shadow-lg transition-transform"
                        >
                            START HERE
                        </Button>
                    </Link>
                </div>

                {/* Features */}
                <h2 className="text-2xl font-bold text-center mb-8 text-teal-700">Highlight Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
                    {[
                        {
                            title: 'Vocabulary Garden',
                            image: garden,
                            bg: 'bg-green-100',
                        },
                        {
                            title: '7-Level Tower',
                            image: tower,
                            bg: 'bg-yellow-100',
                        },
                        {
                            title: 'TOEIC Mini-Game',
                            image: minigame,
                            bg: 'bg-blue-100',
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`${item.bg} rounded-2xl shadow hover:shadow-lg transition duration-300`}
                        >
                            <div className="text-center py-4">
                                <h1 className="text-2xl font-bold text-[#8D5523]">{item.title}</h1>
                            </div>
                            <img src={item.image} alt={item.title} className="h-48 w-full object-contain p-6" />
                        </div>
                    ))}
                </div>

                {/* Leaderboard */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 mb-6">
                        <div className="text-center">
                            <Avatar size={96} src="/trophy.png" icon={<TrophyOutlined />} className="bg-yellow-400" />
                        </div>
                        <div className="md:col-span-3">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">
                                Do you have what it takes to rise to the top?
                            </h4>
                            <p className="text-gray-600">
                                Track your progress and challenge your friends to reach the top of the leaderboard!
                            </p>
                            <hr className="my-4" />
                            <h5 className="text-teal-700 font-semibold mb-4">Top Players This Week</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {['ABC', 'DEF', 'IKM'].map((name, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Avatar icon={<UserOutlined />} />
                                            <div>
                                                <span className="font-semibold">{name}</span>
                                                <br />
                                                <small className="text-gray-500">{idx + 1}st place</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
