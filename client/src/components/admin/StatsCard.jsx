import { Card, Typography } from "antd";

const StatsCard = ({ title, value, color = "#1890ff" }) => (
  <Card
    title={<Typography.Title level={5}>{title}</Typography.Title>}
    bordered
    style={{
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    }}
  >
    <Typography.Title level={3} style={{ color, margin: 0 }}>
      {value}
    </Typography.Title>
  </Card>
);

export default StatsCard;
