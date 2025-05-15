import { Table, Tag } from "antd";
import QuestAction from "./QuestAction";

const QuestTable = ({ quests }) => {
  const columns = [
    {
      title: "Quest Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Reward (XP)",
      dataIndex: "exp",
      key: "exp",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "default"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => <QuestAction quest={record} />,
    },
  ];

  return (
    <Table
      dataSource={quests}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default QuestTable;
