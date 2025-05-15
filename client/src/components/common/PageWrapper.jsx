import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const PageWrapper = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default PageWrapper;