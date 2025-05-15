import { Table, Tag } from "antd";
import GameAction from "./GameAction";

const GameTable = ({ games }) => {
  const columns = [
    {
      title: "Game Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "volcano"}>
          {status === "active" ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => <GameAction game={record} />,
    },
  ];

  return (
    <Table
      dataSource={games}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default GameTable;
