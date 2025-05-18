import React, { useEffect, useState, useRef } from 'react';
import { bee, beehive, bush, chau, ong } from '../assets';
import { getAllFloor2Questions } from '../api/floorApi';
import { FaVolumeUp } from 'react-icons/fa';
import { showNotification } from '../components/showNotification';
import { Howl } from 'howler';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'; // Import confetti

const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 0, 3, 1, 1, 1, 1, 0, 3, 0, 1],
    [1, 1, 3, 1, 1, 3, 3, 0, 1, 1, 1],
    [1, 1, 3, 0, 3, 0, 1, 1, 3, 0, 1],
    [1, 3, 3, 1, 1, 3, 3, 0, 3, 1, 1],
    [1, 0, 3, 0, 3, 3, 1, 0, 3, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const Floor2 = () => {
    const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
    const [goalPos] = useState({ x: 9, y: 0 });
    const [targetPos, setTargetPos] = useState(null);
    const [isQuestionOpen, setIsQuestionOpen] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answeredCells, setAnsweredCells] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();

    // Ref lưu âm thanh clap để không tạo lại mỗi lần render
    const clapSoundRef = useRef(null);

    const countWalkableCells = () => {
        return maze.flat().filter((cell) => cell === 0 || cell === 3).length;
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await getAllFloor2Questions();
                if (res.status) {
                    setQuestions(res.data);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();

        // Khởi tạo âm thanh vỗ tay
        clapSoundRef.current = new Howl({
            src: ['/sounds/clap.mp3'], // Đường dẫn file vỗ tay trong public folder
            html5: true,
        });
    }, []);

    useEffect(() => {
        // Nếu hoàn thành hết các ô
        if (answeredCells.length === countWalkableCells() && answeredCells.length > 0) {
            // Hiển thị pháo hoa
            setShowConfetti(true);
            // Phát âm thanh vỗ tay
            if (clapSoundRef.current) clapSoundRef.current.play();
        }
    }, [answeredCells]);

    const handleCellClick = (x, y) => {
        if ((maze[y][x] === 0 || maze[y][x] === 3) && (x !== playerPos.x || y !== playerPos.y)) {
            setTargetPos({ x, y });
            if (questions.length > 0) {
                const randomIndex = Math.floor(Math.random() * questions.length);
                setCurrentQuestion(questions[randomIndex]);
            } else {
                setCurrentQuestion(null);
            }
            setIsQuestionOpen(true);
        }
    };

    const handleAnswer = (answer) => {
        if (currentQuestion && answer === currentQuestion.correct_answer && targetPos) {
            setPlayerPos(targetPos);
            setAnsweredCells((prev) => [...prev, `${targetPos.x}-${targetPos.y}`]);
            showNotification('Bạn giỏi quá à😜', true);
        } else {
            showNotification('Tiếc quá đi! bạn trả lời sai mất rồi🐝', false);
        }
        setIsQuestionOpen(false);
        setTargetPos(null);
        setCurrentQuestion(null);
    };

    const drawMaze = () => {
        return maze?.map((row, y) =>
            row?.map((cell, x) => {
                const isPlayer = x === playerPos.x && y === playerPos.y;
                const isGoal = x === goalPos.x && y === goalPos.y;
                const isAnswered = answeredCells.includes(`${x}-${y}`);

                return (
                    <div
                        key={`${x}-${y}`}
                        className="w-8 h-8 flex items-center justify-center"
                        onClick={() => {
                            if ((cell === 0 || cell === 3) && !isPlayer) handleCellClick(x, y);
                        }}
                        style={{
                            backgroundColor: '#fff',
                            cursor: cell === 1 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {cell === 1 && <img src={bush} alt="Wall" className="w-6 h-6 object-cover" />}
                        {(cell === 0 || cell === 3) && !isPlayer && !isGoal && !isAnswered && (
                            <img src={chau} alt="Path" className="w-4 h-4" />
                        )}
                        {isPlayer && <img src={bee} alt="Bee" className="w-6 h-6" />}
                        {cell === 2 && <img src={beehive} alt="Goal" className="w-10 h-10" />}
                    </div>
                );
            }),
        );
    };

    let currentSound = null;

    const playAudio = (audio) => {
        if (currentSound) {
            currentSound.stop();
        }
        currentSound = new Howl({
            src: [audio],
            html5: true,
        });
        currentSound.play();
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold mb-4">FLOOR 2: MAZE LOST</h2>
            <div
                className="grid p-9 bg-white rounded-sm shadow-lg"
                style={{
                    gridTemplateColumns: `repeat(${maze[0].length}, 2rem)`,
                }}
            >
                {drawMaze()}
            </div>
            {answeredCells.length === countWalkableCells() && (
                <>
                    <button
                        onClick={() => navigate('/floor3')}
                        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Sang tầng tiếp theo
                    </button>
                    {showConfetti && <Confetti numberOfPieces={300} recycle={false} />}
                </>
            )}
            {isQuestionOpen && currentQuestion && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-[400px] max-w-full flex flex-col items-center space-y-5 transition-transform duration-300 scale-100">
                        <button
                            onClick={() => {
                                setIsQuestionOpen(false);
                                setTargetPos(null);
                                setCurrentQuestion(null);
                            }}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
                            title="Close"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold text-center text-yellow-600 mt-2">
                            🐝 Listen & Choose the Correct Answer
                        </h3>
                        {currentQuestion.audio_url && (
                            <button
                                onClick={() => playAudio(currentQuestion.audio_url)}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full text-sm shadow"
                            >
                                <FaVolumeUp />
                                <span>Play Audio</span>
                            </button>
                        )}
                        <div className="flex justify-center flex-wrap gap-4">
                            {JSON.parse(currentQuestion.options)?.map((opt, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center cursor-pointer group"
                                    onClick={() => handleAnswer(opt)}
                                >
                                    <img
                                        src={ong}
                                        alt={`Option ${opt}`}
                                        className="w-16 h-16 mb-1 transition-transform duration-200 group-hover:scale-110"
                                    />
                                    <div className="bg-yellow-300 rounded-full px-3 py-1 font-semibold text-black text-sm shadow">
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Floor2;
