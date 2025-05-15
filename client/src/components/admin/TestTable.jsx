import { Table } from "antd";
import TestAction from "./TestAction";

const TestTable = ({ tests }) => {
  const columns = [
    {
      title: "Test Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
    },
    {
      title: "Question Count",
      dataIndex: "questionCount",
      key: "questionCount",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => <TestAction test={record} />,
    },
  ];

  return (
    <Table
      dataSource={tests}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default TestTable;
