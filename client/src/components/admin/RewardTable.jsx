import { Table, Tag } from "antd";
import RewardAction from "./RewardAction";

const RewardTable = ({ rewards }) => {
  const columns = [
    {
      title: "Reward",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="purple">{type}</Tag>,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => <RewardAction reward={record} />,
    },
  ];

  return (
    <Table
      dataSource={rewards}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default RewardTable;
