import { Table } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { FaMedal } from "react-icons/fa";
import "../../styles/leaderboardtable.css";  // Đã sửa đường dẫn

const renderRank = (rank) => {
  if (rank === 1)
    return (
      <span style={{ color: "#FFD700", fontWeight: "bold" }}>🥇 {rank}</span>
    );
  if (rank === 2)
    return (
      <span style={{ color: "#C0C0C0", fontWeight: "bold" }}>🥈 {rank}</span>
    );
  if (rank === 3)
    return (
      <span style={{ color: "#CD7F32", fontWeight: "bold" }}>🥉 {rank}</span>
    );
  return <span>{rank}</span>;
};

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    width: 80,
    sorter: (a, b) => a.rank - b.rank,
    render: renderRank,
  },
  {
    title: "Student Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    sorter: (a, b) => a.score - b.score,
  },
];

const LeaderboardTable = ({ data }) => {
  return (
    <Table
      className="leaderboard-table"
      dataSource={data}
      columns={columns}
      pagination={false}
      rowClassName={(record, index) =>
        index === 0
          ? "gold-row"
          : index === 1
          ? "silver-row"
          : index === 2
          ? "bronze-row"
          : ""
      }
    />
  );
};

export default LeaderboardTable;
