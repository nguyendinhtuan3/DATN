import { Table, Tag } from "antd";
import UserActions from "./UserActions";

const mockData = [
  {
    key: "1",
    name: "Nguyen Van A",
    email: "a@gmail.com",
    status: "active",
    role: "student",
  },
  {
    key: "2",
    name: "Tran Thi B",
    email: "b@gmail.com",
    status: "locked",
    role: "admin",
  },
];

const UserTable = ({ searchTerm }) => {
  const filtered = mockData.filter((user) => {
    const term = searchTerm.trim().toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "red" : "blue"}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Tag>
      ),
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
      key: "actions",
      render: (_, record) => <UserActions user={record} />,
    },
  ];

  return (
    <Table
      dataSource={filtered}
      columns={columns}
      pagination={{ pageSize: 5 }}
      locale={{ emptyText: "No matching users found." }}
    />
  );
};

export default UserTable;
