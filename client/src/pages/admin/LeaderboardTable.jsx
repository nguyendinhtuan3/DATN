import { useEffect, useState } from 'react';
import axios from 'axios';

const LeaderboardTable = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Đang gọi API /api/leaderboard...');
        axios.get('http://localhost:3000/api/leaderboard')
            .then((response) => {
                console.log('Dữ liệu bảng xếp hạng:', response.data);
                setLeaderboard(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Lỗi lấy bảng xếp hạng:', error.message);
                setError('Không thể tải bảng xếp hạng');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div>
            <h1>Bảng xếp hạng</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Xếp hạng</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Tên</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Khóa học</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry) => (
                        <tr key={entry.id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{entry.rank || 'N/A'}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{entry.full_name}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{entry.course_title || 'N/A'}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardTable;