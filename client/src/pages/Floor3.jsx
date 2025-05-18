import React, { useState, useEffect, useRef } from 'react';
import { getFloor3Question } from '../api/floorApi';
import { showNotification } from '../components/showNotification';
import confetti from 'canvas-confetti';
import { votayAudio } from '../assets';

const Floor3 = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [correctStreak, setCorrectStreak] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [wrongIndices, setWrongIndices] = useState([]);
    const [retrying, setRetrying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        setAnswered(false);
        setSelectedAnswer(null);
        setCurrentIndex(0);
        setWrongIndices([]);
        setRetrying(false);
        setCorrectStreak(0);
        try {
            const data = await getFloor3Question();
            setQuestions(data.data || []);
        } catch (error) {
            alert(error.message || 'Không thể tải câu hỏi');
        } finally {
            setLoading(false);
        }
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
        });
    };

    const checkAnswer = (selected) => {
        if (answered) return;
        const question = questions[currentIndex];
        setSelectedAnswer(selected);
        setAnswered(true);

        if (selected === question.correct_answer) {
            showNotification('Bạn giỏi quá à😜', true);
            triggerConfetti();
            if (audioRef.current) audioRef.current.play();
            setCorrectStreak((prev) => prev + 1);

            // Nếu đang retry thì loại bỏ câu hỏi này khỏi danh sách sai
            if (retrying) {
                setWrongIndices((prev) => prev.filter((i) => i !== currentIndex));
            }

            setTimeout(() => {
                const nextIndex = currentIndex + 1;
                const newStreak = correctStreak + 1;

                if (!retrying) {
                    if (newStreak >= 5) {
                        // Đạt đủ streak, không cần tiếp tục nữa
                        // Có thể hiển thị nút next tầng ở UI
                        setAnswered(true);
                    } else if (nextIndex < questions.length) {
                        setCurrentIndex(nextIndex);
                        setAnswered(false);
                        setSelectedAnswer(null);
                    } else if (wrongIndices.length > 0) {
                        setRetrying(true);
                        setCurrentIndex(wrongIndices[0]);
                        setAnswered(false);
                        setSelectedAnswer(null);
                    } else {
                        // Hết câu hỏi, chưa đủ streak, không có câu sai
                        setAnswered(true);
                    }
                } else {
                    // Đang retry
                    if (wrongIndices.length > 0 && newStreak < 5) {
                        const nextWrongIndex = wrongIndices.find((i) => i !== currentIndex);
                        if (nextWrongIndex !== undefined) {
                            setCurrentIndex(nextWrongIndex);
                            setAnswered(false);
                            setSelectedAnswer(null);
                        } else {
                            // Hết câu sai
                            setRetrying(false);
                            setAnswered(true);
                        }
                    } else {
                        setRetrying(false);
                        setAnswered(true);
                    }
                }
            }, 2000);
        } else {
            showNotification('Tiếc quá đi! bạn trả lời sai mất rồi🐝', false);
            setCorrectStreak(0);

            setTimeout(() => {
                if (retrying) {
                    // Đang retry -> giữ câu sai hiện tại trong danh sách, chuyển sang câu sai khác
                    const nextWrongIndex = wrongIndices.find((i) => i !== currentIndex);
                    if (nextWrongIndex !== undefined) {
                        setCurrentIndex(nextWrongIndex);
                        setAnswered(false);
                        setSelectedAnswer(null);
                    } else {
                        setRetrying(false);
                        setAnswered(true);
                    }
                } else {
                    // Chưa retry
                    if (currentIndex < questions.length - 1) {
                        setWrongIndices((prev) => [...prev, currentIndex]);
                        setCurrentIndex(currentIndex + 1);
                        setAnswered(false);
                        setSelectedAnswer(null);
                    } else if (wrongIndices.length > 0) {
                        setRetrying(true);
                        setCurrentIndex(wrongIndices[0]);
                        setAnswered(false);
                        setSelectedAnswer(null);
                    } else {
                        // Trường hợp chỉ có 1 câu hoặc câu cuối mà sai, không còn câu sai nào khác
                        setAnswered(true);
                    }
                }
            }, 2000);
        }
    };

    if (loading) return <div className="text-center text-gray-500 italic mt-6">Đang tải...</div>;
    if (questions.length === 0) return <div className="text-center text-gray-500 mt-6">Không có câu hỏi</div>;

    const question = questions[currentIndex];

    let options = [];
    try {
        options = typeof question.options === 'string' ? JSON.parse(question.options) : question.options || [];
    } catch {
        options = [];
    }

    return (
        <div className="flex flex-col items-center justify-center py-4 bg-blue-50 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <div className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
                    FLOOR 3: LISTEN & CHOOSE
                </div>

                <div className="text-black font-semibold mb-4">{question.question}</div>
                <audio controls className="mb-4 mx-auto">
                    <source src={question.audio_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

                <audio ref={audioRef} src={votayAudio} />

                <div className="flex flex-col gap-3 mb-6">
                    {options.map((option, index) => {
                        let className = 'bg-white border border-gray-300 shadow py-2 px-4 rounded hover:bg-gray-100';

                        if (answered) {
                            if (option === question.correct_answer) {
                                className =
                                    'bg-green-200 border border-green-600 text-green-900 font-semibold py-2 px-4 rounded';
                            } else if (option === selectedAnswer) {
                                className =
                                    'bg-red-200 border border-red-600 text-red-900 font-semibold py-2 px-4 rounded';
                            } else {
                                className = 'bg-white border border-gray-300 shadow py-2 px-4 rounded';
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => checkAnswer(option)}
                                className={className}
                                disabled={answered}
                            >
                                {String.fromCharCode(65 + index)}. {option}
                            </button>
                        );
                    })}
                </div>

                <div className="mb-4 text-gray-700">
                    Câu hỏi {currentIndex + 1} / {questions.length}
                </div>

                <div className="mb-4 text-gray-700">
                    Số câu trả lời đúng liên tiếp: <strong>{correctStreak}</strong> / 5
                </div>

                {/* Hiện nút NEXT khi đúng đủ streak */}
                {correctStreak >= 5 && (
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => (window.location.href = '/floor1')}
                    >
                        NEXT FLOOR 1
                    </button>
                )}

                {/* Hiện nút NEXT khi sai câu cuối cùng hoặc chỉ có 1 câu và đã trả lời */}
                {answered &&
                    selectedAnswer !== question.correct_answer &&
                    (questions.length === 1 || currentIndex === questions.length - 1) && (
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => (window.location.href = '/floor1')}
                        >
                            NEXT FLOOR 1
                        </button>
                    )}
            </div>
        </div>
    );
};

export default Floor3;
