import React, { useState, useEffect, useRef } from 'react';
import { getFloor1Question } from '../api/floorApi';
import { FaVolumeUp } from 'react-icons/fa';
import { minigame, votayAudio } from '../assets';
import confetti from 'canvas-confetti';
import { showNotification } from '../components/showNotification';
import { useNavigate } from 'react-router-dom';

const Floor1 = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctStreak, setCorrectStreak] = useState(0);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getFloor1Question();
            if (response.status && response.data?.length > 0) {
                setQuestions(response.data);
                setCurrentQuestionIndex(0);
                resetAnswerState();
            } else {
                throw new Error(response.message || 'Không có câu hỏi nào.');
            }
        } catch (err) {
            setError(err.message || 'Lỗi tải câu hỏi.');
        } finally {
            setLoading(false);
        }
    };

    const resetAnswerState = () => {
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
        });
    };

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handleAnswer = (option) => {
        if (selectedAnswer !== null) return;

        const currentQuestion = questions[currentQuestionIndex];
        const correct = option === currentQuestion.correct_answer;

        setSelectedAnswer(option);
        setIsCorrect(correct);

        if (correct) {
            const newStreak = correctStreak + 1;

            new Audio(votayAudio).play();
            if (newStreak === 5) {
                triggerConfetti();
                return;
            }

            setTimeout(() => {
                nextQuestion();
            }, 1500); // Đợi 1.5 giây rồi chuyển câu hỏi tiếp
        } else {
            // Nếu sai thì vẫn đợi 1.5 giây rồi chuyển tiếp
            setTimeout(() => {
                nextQuestion();
            }, 2000);
        }
    };

    const nextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            resetAnswerState();
        } else {
            showNotification('Bạn đã hoàn thành tất cả câu hỏi!', true);
            triggerConfetti();
            setCorrectStreak(5);
        }
    };

    if (loading) return <div className="text-center mt-6 italic text-gray-500">Đang tải câu hỏi...</div>;
    if (error) return <div className="text-center mt-6 text-red-500">{error}</div>;
    if (questions.length === 0)
        return <div className="text-center mt-6 text-red-500">Không có câu hỏi để hiển thị.</div>;

    const currentQuestion = questions[currentQuestionIndex];
    let options = [];

    try {
        options = currentQuestion.options ? JSON.parse(currentQuestion.options) : [];
    } catch (e) {
        console.error('Lỗi parse options:', e);
        return <div className="text-center mt-6 text-red-500">Dữ liệu không hợp lệ.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center bg-[#f0faff] py-10 px-4">
            <div className="bg-green-500 text-white px-6 py-3 rounded-full mb-8 font-bold text-xl shadow">
                FLOOR 1: PICTURE MATCHING
            </div>

            <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden w-full max-w-3xl">
                <div className="bg-white w-full md:w-1/2 h-80 flex items-center justify-center p-6 border-r">
                    <img
                        src={currentQuestion.image_url || minigame}
                        alt="question"
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="relative w-full md:w-1/2 h-80 bg-green-100 p-6 flex flex-col justify-center">
                    <button
                        className="absolute top-4 right-4 text-xl text-black hover:text-green-700"
                        onClick={handlePlayAudio}
                    >
                        <FaVolumeUp />
                    </button>
                    <audio ref={audioRef} src={currentQuestion.audio_url} />

                    <div className="flex flex-col gap-4">
                        {options?.map((option, index) => {
                            let bgColor = 'bg-white';

                            if (selectedAnswer !== null) {
                                if (option === selectedAnswer) {
                                    // Nền đỏ nếu chọn sai, nền xanh nếu đúng
                                    bgColor = isCorrect ? 'bg-green-300' : 'bg-red-300';
                                } else if (!isCorrect && option === currentQuestion.correct_answer) {
                                    // Nếu chọn sai, tô xanh nền đáp án đúng
                                    bgColor = 'bg-green-300';
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    disabled={selectedAnswer !== null}
                                    className={`rounded-full py-3 px-5 text-left text-base ${bgColor} hover:bg-gray-200 border transition duration-300`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {correctStreak >= 5 && (
                <button
                    onClick={() => {
                        triggerConfetti();
                        navigate('/floor2');
                    }}
                    className="mt-8 bg-green-500 text-white text-lg px-8 py-3 rounded-full hover:bg-green-600 transition duration-300 shadow-lg animate-bounce"
                >
                    🎉 TẦNG TIẾP THEO 🎉
                </button>
            )}
        </div>
    );
};

export default Floor1;
