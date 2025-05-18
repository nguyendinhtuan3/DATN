import React, { memo, useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generateGeminiResponse } from '../../services/gemini.service';
import ReactLoading from 'react-loading';
import parse from 'html-react-parser';

const ChatBoxAIModal = ({ isOpenBox, setIsOpenBox }) => {
    const [prompt, setPrompt] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: crypto.randomUUID(),
            role: 'bot',
            content: `📚 Bạn muốn học từ vựng, ngữ pháp, hay luyện giao tiếp? Cứ hỏi thoải mái, mình sẽ giúp nhé! 😄`,
        },
    ]);
    const scrollRef = useRef(null);

    // Scroll to bottom when new messages are added
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Control chat box visibility
    useEffect(() => {
        if (isOpenBox) setIsVisible(true);
        else setTimeout(() => setIsVisible(false), 299); // Sync with animation
    }, [isOpenBox]);

    const sendMessage = async () => {
        if (!prompt.trim() || isLoading) return;

        const userMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: prompt.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setPrompt('');
        setIsLoading(true);

        try {
            const context = `
Bạn là một trợ lý AI thông minh, thân thiện và kiên nhẫn. Nhiệm vụ của bạn là giúp người dùng học tiếng Anh hiệu quả và dễ hiểu nhất có thể. Bằng cách trả lời các câu hỏi một cách:
            👉 Ngắn gọn  
            👉 Chính xác  
            👉 Dễ thương, hài hước  
            👉 Gần gũi và thân thiện 🥰 
             🎨 <strong>Yêu cầu định dạng câu trả lời:</strong>  
            - Mỗi câu trả lời phải được trình bày bằng <strong>HTML</strong>, sử dụng các thẻ như <code><div></code>, <code><p></code>, <code><ul></code>, <code><strong></code>, <code><img></code>, v.v.  
            - Hãy style nhẹ nhàng cho màu sắc, kích thước chữ nếu cần, giúp hiển thị đẹp mắt và rõ ràng.
            - Ưu tiên chia đoạn hoặc danh sách để dễ đọc và dễ theo dõi.
            - KHÔNG bao giờ chèn phần trả lời trong \`\`\`html hoặc bất kỳ code block nào. Chỉ trả về HTML trực tiếp thôi nhen! ✨
Mục tiêu chính:
- Giải nghĩa từ vựng, ngữ pháp, cấu trúc câu tiếng Anh.
- Dịch câu hoặc đoạn văn từ tiếng Việt sang tiếng Anh và ngược lại.
- Giúp luyện tập hội thoại tiếng Anh qua các đoạn chat.
- Giải thích lỗi sai và đưa ra cách sửa đúng.
- Gợi ý từ vựng hoặc mẫu câu phù hợp theo chủ đề (giao tiếp, du lịch, công việc,...).

Cách trả lời:
- Ngắn gọn, dễ hiểu, sử dụng từ ngữ đơn giản.
- Có thể kèm ví dụ minh họa khi cần thiết.
- Trả lời bằng cả tiếng Việt và tiếng Anh nếu phù hợp.
- Nếu người dùng gõ sai chính tả tiếng Anh, hãy tự động đoán và sửa giúp họ.

Ví dụ:
1. Người dùng: "Dịch giúp mình câu: Tôi đang học tiếng Anh mỗi ngày."
   → Trả lời: "I am learning English every day. 📘"

2. Người dùng: "Giải thích thì hiện tại hoàn thành"
   → Trả lời:
     "Thì hiện tại hoàn thành (Present Perfect) dùng để nói về hành động đã xảy ra trong quá khứ nhưng còn liên quan đến hiện tại.
     Cấu trúc: [S + have/has + V3/ed]
     Ví dụ: I have eaten breakfast. (Tôi đã ăn sáng rồi.)"

3. Người dùng: "Gợi ý mẫu câu khi đi sân bay"
   → Trả lời: 
     "Here are some useful sentences:
     - Where is the check-in counter? (Quầy làm thủ tục ở đâu?)
     - Can I see your passport? (Tôi có thể xem hộ chiếu của bạn không?)
     - My flight is delayed. (Chuyến bay của tôi bị hoãn.)"

Hãy luôn giữ giọng điệu thân thiện, hỗ trợ người dùng một cách nhiệt tình như một người bạn đồng hành học tiếng Anh!
- Trả lời một cách hợp lý và dễ thương, mang tính vui vẻ, động viên khách, giúp họ cảm thấy được quan tâm 💖.
            <strong>Ghi nhớ quan trọng:</strong>  
            - Nếu bạn trả lời có hình ảnh thì phải lấy url hình ảnh cho chính xác nha
            - Luôn giữ phong cách nhẹ nhàng, hỗ trợ nhiệt tình và tạo cảm giác thân thiện.  
            - Ưu tiên sự rõ ràng, mạch lạc trong câu trả lời, nhưng vẫn giữ chất "cute" và dễ gần của bạn nhé! 😘
            
            `;
            const promptWithContext = `${context}\n\nCâu hỏi: ${prompt.trim()}`;
            const reply = await generateGeminiResponse(promptWithContext);
            const botMessage = {
                id: crypto.randomUUID(),
                role: 'bot',
                content: reply,
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: 'bot',
                    content: 'Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu. Vui lòng thử lại sau.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '400px',
                height: '500px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                transition: 'all 1s ease',
                transformOrigin: 'bottom right',
                zIndex: 1000,
                animation: isOpenBox ? 'openChat 0.3s ease forwards' : 'closeChat 0.3s ease forwards',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #e5e7eb',
                        padding: '16px 20px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ position: 'relative', width: '48px', height: '48px' }}>
                            <img
                                src="https://photo.salekit.com/uploads/fchat_5b4872d13803896dd77125af/logo1.png"
                                alt="AI"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: '2px solid #ffffff',
                                    backgroundColor: '#22c55e',
                                }}
                            ></span>
                        </div>
                        <h5
                            style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#6b7280',
                            }}
                        >
                            Trợ lý AI
                        </h5>
                    </div>
                    <button onClick={() => setIsOpenBox?.(false)} style={{ color: '#6b7280' }}>
                        <ExpandMoreIcon style={{ fontSize: '32px' }} />
                    </button>
                </div>

                {/* Messages */}
                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        position: 'relative',
                    }}
                >
                    {messages?.map((msg, idx) => (
                        <div
                            key={msg.id}
                            ref={idx === messages.length - 1 ? scrollRef : null}
                            style={{
                                display: 'flex',
                                maxWidth: '400px',
                                gap: '12px',
                                marginBottom: '16px',
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                            }}
                        >
                            {msg.role === 'bot' && (
                                <img
                                    src="https://photo.salekit.com/uploads/fchat_5b4872d13803896dd77125af/logo1.png"
                                    alt="Bot"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }}
                                />
                            )}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxWidth: '300px',
                                    alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <div
                                    style={{
                                        borderRadius: '16px',
                                        padding: '8px 16px',
                                        fontSize: '14px',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                        background:
                                            msg.role === 'user'
                                                ? 'linear-gradient(to bottom right, #3b82f6, #2563eb)'
                                                : '#f3lavender: true',
                                        color: msg.role === 'user' ? '#ffffff' : '#1f2937',
                                        borderTopLeftRadius: msg.role === 'user' ? '16px' : '0',
                                        borderTopRightRadius: msg.role === 'bot' ? '16px' : '0',
                                    }}
                                >
                                    {msg.role === 'user' ? <p>{msg.content}</p> : parse(msg.content)}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                fontSize: '14px',
                                color: '#4b5563',
                            }}
                        >
                            <img
                                src="https://photo.salekit.com/uploads/fchat_5b4872d13803896dd77125af/logo1.png"
                                alt="Bot"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    backgroundColor: '#f3f4f6',
                                    padding: '12px',
                                    borderRadius: '9999px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <p style={{ fontSize: '12px', color: '#6b7280' }}>Đang nhập</p>
                                <ReactLoading type="bubbles" color="#4CAF50" height={20} width={20} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div
                    style={{
                        padding: '12px',
                        borderTop: '1px solid #e5e7eb',
                    }}
                >
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            placeholder="Nhập tin nhắn"
                            disabled={isLoading}
                            style={{
                                height: '36px',
                                width: '100%',
                                padding: '8px 40px 8px 40px',
                                fontSize: '14px',
                                border: '1px solid #d1d5db',
                                borderRadius: '9999px',
                                outline: 'none',
                            }}
                        />
                        <span
                            style={{
                                position: 'absolute',
                                left: '12px',
                                color: '#9ca3af',
                            }}
                        >
                            <svg style={{ fill: 'currentColor' }} width="20" height="20" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.75 7.98A1.25 1.25 0 1 0 10 9.23a1.25 1.25 0 0 0-1.25-1.25zm6.5 0a1.25 1.25 0 1 1-1.25 1.25c0-.69.56-1.25 1.25-1.25zM8.18 13.59a.75.75 0 0 1 1.05.14 3.79 3.79 0 0 0 6.54 0 .75.75 0 0 1 1.2.91 5.29 5.29 0 0 1-8.94 0 .75.75 0 0 1 .14-1.05z"
                                />
                            </svg>
                        </span>
                        <button
                            type="submit"
                            style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#2563eb',
                            }}
                            disabled={isLoading}
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(ChatBoxAIModal);
