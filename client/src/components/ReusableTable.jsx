import React from 'react';
import { Table } from 'antd';

const ReusableTable = ({ columns, dataSource, onDelete, onEdit, searchText, setSearchText }) => {
  const filteredData = dataSource.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      rowKey="key"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ReusableTable;