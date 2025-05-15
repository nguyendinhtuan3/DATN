import { Table, Button, Input, Space } from "antd";
import { useMemo } from "react";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const ReusableTable = ({
  dataSource,
  columns,
  searchText,
  setSearchText,
  onEdit,
  onDelete,
  onView,
  rowKey = "key",
  pagination = { pageSize: 10 },
}) => {
  const filteredData = useMemo(() => {
    if (!searchText) return dataSource;
    const lower = searchText.toLowerCase();
    return dataSource.filter((item) =>
      Object.values(item).some(
        (val) => typeof val === "string" && val.toLowerCase().includes(lower)
      )
    );
  }, [searchText, dataSource]);

  const enhancedColumns = useMemo(() => {
    if (!onEdit && !onDelete && !onView) return columns;

    return [
      ...columns,
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            {onView && (
              <Button icon={<EyeOutlined />} onClick={() => onView(record)} />
            )}
            {onEdit && (
              <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
            )}
            {onDelete && (
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => onDelete(record)}
              />
            )}
          </Space>
        ),
      },
    ];
  }, [columns, onEdit, onDelete, onView]);

  return (
    <>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        prefix={<SearchOutlined />}
        allowClear
        style={{ marginBottom: 16, maxWidth: 300 }}
      />

      <Table
        dataSource={filteredData}
        columns={enhancedColumns}
        rowKey={rowKey}
        pagination={pagination}
      />
    </>
  );
};

export default ReusableTable;
