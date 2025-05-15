import { Table, Tag } from "antd";
import ItemAction from "./ItemAction";

const ItemTable = ({ items }) => {
  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const color =
          {
            coin: "gold",
            exp: "blue",
            badge: "purple",
            other: "gray",
          }[type] || "default";

        return <Tag color={color}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
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
      render: (_, record) => <ItemAction item={record} />,
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={items}
      columns={columns}
      pagination={{ pageSize: 8 }}
    />
  );
};

export default ItemTable;
