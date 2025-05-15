import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const CustomCard = ({ title, description, icon }) => {
  return (
    <Card hoverable style={{ width: 240, margin: 10 }}>
      {icon}
      <Title level={4}>{title}</Title>
      <Text>{description}</Text>
    </Card>
  );
};

export default CustomCard;