import React from 'react';
import { Layout, Row, Col, Button } from 'antd';

const HeaderBar = () => {
  return (
    <Layout.Header style={{ background: '#fff', padding: '0 16px' }}>
      <Row justify="space-between" align="middle">
        <Col><h2>Admin Dashboard</h2></Col>
        <Col>
          <Button type="primary">Logout</Button>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default HeaderBar;