import { useEffect, useState } from 'react';
import { getAllFrames } from '../api/frameService';
import { getFrameVocabularyById } from '../api/frameVocabularyService';
import { getAllUserFrameItems, updateUserFrameItem } from '../api/userFrameItemService';
import { Audio, Flower, Seed, Sprout } from '../assets';
import { Howl } from 'howler';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const FramePage = () => {
    const [frames, setFrames] = useState([]);
    const [userFrameItems, setUserFrameItems] = useState([]);
    const [selectedFrameId, setSelectedFrameId] = useState(null);
    const [currentVocabs, setCurrentVocabs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { user, isUserLoggedIn } = useAuthStore();
    const navigate = useNavigate();

    // Load danh sách frames và userFrameItems ban đầu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [framesRes, userItemsRes] = await Promise.all([
                    getAllFrames(),
                    isUserLoggedIn && user.role === 'student' && getAllUserFrameItems(),
                ]);
                setFrames(framesRes.data || []);
                if (isUserLoggedIn && user.role === 'student') {
                    setUserFrameItems(userItemsRes.data || []);
                }

                if (framesRes.data?.length) {
                    setSelectedFrameId(framesRes.data[0].id);
                }
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err);
            }
        };
        fetchData();
    }, []);

    // Khi selectedFrameId hoặc userFrameItems thay đổi, load vocab cho frame đó
    useEffect(() => {
        const fetchCurrentVocabularies = async () => {
            if (!selectedFrameId) return;

            try {
                const res = await getFrameVocabularyById(selectedFrameId);
                const relatedFrameVocabs = res.data || [];
                const userItem = userFrameItems.find((u) => u.frame_id === selectedFrameId);

                const vocabList = relatedFrameVocabs.map((fv) => ({
                    ...fv,
                    completed_count: userItem?.completed_count || 0,
                    userFrameItemId: userItem?.id || null,
                    frame_vocab_id: fv.id,
                }));

                setCurrentVocabs(vocabList);
                setCurrentIndex(0);
            } catch (err) {
                console.error('Lỗi khi tải từ vựng của ô:', err);
            }
        };

        fetchCurrentVocabularies();
    }, [selectedFrameId]);

    // Hàm lấy trạng thái hình ảnh của frame dựa vào completed_count
    const getFrameStatus = (frameId) => {
        const item = userFrameItems.find((u) => u.frame_id === frameId);
        const count = item?.completed_count || 0;
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
    // Xử lý nhấn nút "Học tiếp →"
    const handleNext = async () => {
        if (isUserLoggedIn) {
            navigate('/login');
            return;
        }

        if (currentVocabs.length === 0 || !selectedFrameId) return;
        const userItem = userFrameItems.find((u) => u.frame_id === selectedFrameId);
        const newCount = (userItem?.completed_count || 0) + 1;
        if (currentSound) {
            currentSound.stop(); // Dừng âm thanh đang phát
        }
        try {
            let updatedUserItem;
            if (userItem) {
                // Cập nhật userFrameItem trên server
                const res = await updateUserFrameItem(userItem.id, {
                    frame_id: selectedFrameId,
                    completed_count: newCount,
                });
                updatedUserItem = res.data || { ...userItem, completed_count: newCount };
            } else {
                // Nếu chưa có userFrameItem, giả lập tạo mới (hoặc gọi API tạo nếu có)
                updatedUserItem = {
                    id: Math.random().toString(36).slice(2),
                    frame_id: selectedFrameId,
                    completed_count: newCount,
                };
            }

            // Cập nhật state userFrameItems
            setUserFrameItems((prev) => {
                const exist = prev.find((u) => u.frame_id === selectedFrameId);
                if (exist) {
                    return prev.map((u) => (u.frame_id === selectedFrameId ? updatedUserItem : u));
                } else {
                    return [...prev, updatedUserItem];
                }
            });

            // Cập nhật completed_count trong currentVocabs cho từ hiện tại
            setCurrentVocabs((prev) =>
                prev.map((vocab, index) => (index === currentIndex ? { ...vocab, completed_count: newCount } : vocab)),
            );

            // Chuyển sang từ tiếp theo (vòng lặp)
            setCurrentIndex((prev) => (prev + 1) % currentVocabs.length);
        } catch (err) {
            console.error('Lỗi khi cập nhật tiến độ:', err);
        }
    };

    const handleFrameSelect = (id) => {
        setSelectedFrameId(id);
        setCurrentIndex(0);
    };
    if (frames.length === 0) {
        return <div className="text-center p-6">Đang tải danh sách ô...</div>;
    }

    let currentSound = null;
    const playAudio = () => {
        if (currentSound) {
            currentSound.stop(); // Dừng âm thanh đang phát
        }
        currentSound = new Howl({
            src: ['https://s4-media1.study4.com/media/tez_media3/sound/ets_toeic_2022_test_8_6.mp3'],
            html5: true,
        });
        currentSound.play();
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-blue-50 p-6">
            <h1 className="text-2xl font-bold mb-6">Học Từ Vựng Theo Ô</h1>
            <div className="flex gap-20 justify-between mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 w-[280px]   flex flex-col justify-between">
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
                    {frames.map((frame) => (
                        <div
                            onClick={() => handleFrameSelect(frame.id)}
                            className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                                selectedFrameId === frame.id ? 'border-blue-500' : 'border-transparent'
                            } hover:scale-105 transition-transform`}
                        >
                            <img className="w-16 " src={getStatusImage(frame.id)} />
                        </div>

                        // <div
                        //     key={frame.id}
                        //     className={`w-16 h-16 rounded-lg shadow `}
                        //     style={{
                        //         backgroundImage: `url(${getStatusImage(frame.id)})`,
                        //         backgroundSize: 'cover',
                        //         backgroundPosition: 'center',
                        //     }}
                        //     title={`Ô: ${frame.title}`}
                        //
                        // />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FramePage;
