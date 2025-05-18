import { useEffect, useState } from 'react';
import { getAllFrames } from '../api/frameService';
import { getFrameVocabularyById } from '../api/frameVocabularyService';
import { Audio, Flower, Seed, Sprout } from '../assets';
import { Howl } from 'howler';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const FramePage = () => {
    const [frames, setFrames] = useState([]);
    const [selectedFrameId, setSelectedFrameId] = useState(null);
    const [currentVocabs, setCurrentVocabs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { user, isUserLoggedIn } = useAuthStore();
    const navigate = useNavigate();

    // Chỉ lưu tiến độ tạm thời trong state (không lưu server)
    const [localProgress, setLocalProgress] = useState({}); // { frame_id: completed_count }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const framesRes = await getAllFrames();
                setFrames(framesRes.data || []);
                if (framesRes.data?.length > 0) {
                    setSelectedFrameId(framesRes.data[0].id);
                }
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchVocabularies = async () => {
            if (!selectedFrameId) return;

            try {
                const res = await getFrameVocabularyById(selectedFrameId);
                const relatedVocabs = res.data || [];
                const count = localProgress[selectedFrameId] || 0;

                const vocabList = relatedVocabs?.map((vocab) => ({
                    ...vocab,
                    completed_count: count,
                }));

                setCurrentVocabs(vocabList);
                setCurrentIndex(0);
            } catch (err) {
                console.error('Lỗi khi tải từ vựng của ô:', err);
            }
        };

        fetchVocabularies();
    }, [selectedFrameId]);

    const getFrameStatus = (frameId) => {
        const count = localProgress[frameId] || 0;
        if (count >= 10) return 'flower';
        if (count >= 5) return 'sprout';
        return 'seed';
    };

    const getStatusImage = (frameId) => {
        const status = getFrameStatus(frameId);
        if (status === 'flower') return Flower;
        if (status === 'sprout') return Sprout;
        return Seed;
    };

    const handleNext = () => {
        if (!isUserLoggedIn) {
            navigate('/login');
            return;
        }

        if (currentVocabs.length === 0 || !selectedFrameId) return;

        if (currentSound) {
            currentSound.stop();
        }

        const currentCount = localProgress[selectedFrameId] || 0;
        const newCount = currentCount + 1;

        setLocalProgress((prev) => ({
            ...prev,
            [selectedFrameId]: newCount,
        }));

        setCurrentVocabs((prev) =>
            prev?.map((vocab, index) => (index === currentIndex ? { ...vocab, completed_count: newCount } : vocab)),
        );

        setCurrentIndex((prev) => (prev + 1) % currentVocabs.length);
    };

    const handleFrameSelect = (id) => {
        setSelectedFrameId(id);
        setCurrentIndex(0);
    };

    let currentSound = null;

    const playAudio = () => {
        if (currentSound) {
            currentSound.stop();
        }
        currentSound = new Howl({
            src: ['https://s4-media1.study4.com/media/tez_media3/sound/ets_toeic_2022_test_8_6.mp3'],
            html5: true,
        });
        currentSound.play();
    };

    if (frames.length === 0) {
        return <div className="text-center p-6">Đang tải danh sách ô...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-blue-50 p-6">
            <h1 className="text-2xl font-bold mb-6">Học Từ Vựng Theo Ô</h1>
            <div className="flex gap-20 justify-between mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 w-[280px] flex flex-col justify-between">
                    <div className="flex justify-end mb-2 text-blue-600 hover:text-blue-800" title="Phát âm">
                        <button onClick={playAudio}>
                            <img src={Audio} className="w-6" />
                        </button>
                    </div>
                    {currentVocabs.length > 0 ? (
                        <>
                            <div className="space-y-4 text-center">
                                <div className="text-xl font-semibold bg-yellow-100 rounded py-2">
                                    {currentVocabs[currentIndex].english_word}
                                </div>
                                <div className="text-lg font-semibold bg-green-100 rounded py-2">
                                    {currentVocabs[currentIndex].vietnamese_word}
                                </div>
                                <div className="text-sm font-bold bg-pink-100 rounded py-1 text-red-600">
                                    ({currentVocabs[currentIndex].part_of_speech})
                                </div>
                            </div>
                            <button
                                onClick={handleNext}
                                className="bg-blue-500 text-white py-2 rounded mt-6 hover:bg-blue-600"
                            >
                                Học tiếp →
                            </button>
                        </>
                    ) : (
                        <div className="text-center text-gray-500">Ô này chưa có từ vựng</div>
                    )}
                </div>

                <div className="grid grid-cols-5 gap-2 mb-12">
                    {frames?.map((frame) => (
                        <div
                            key={frame.id}
                            onClick={() => handleFrameSelect(frame.id)}
                            className={`flex justify-center align-center w-20 h-20 cursor-pointer rounded-md overflow-hidden bg-[#8D5523] border-2 ${
                                selectedFrameId === frame.id ? 'border-blue-500' : 'border-transparent'
                            } hover:scale-105 transition-transform`}
                        >
                            <img className="w-12 m-auto" src={getStatusImage(frame.id)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FramePage;
