import { Table, Tag } from "antd";
import CourseAction from "./CourseAction";

const CourseTable = ({ courses }) => {
  const columns = [
    {
      title: "Course Title",
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
          {status === "active" ? "Active" : "Locked"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => <CourseAction course={record} />,
    },
  ];

  return (
    <Table
      dataSource={courses}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default CourseTable;
