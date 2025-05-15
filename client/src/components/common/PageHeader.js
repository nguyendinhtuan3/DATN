import { Typography } from "antd";

const { Title } = Typography;

const PageHeader = ({ title }) => (
  <Title level={2} className="mb-4">
    {title}
  </Title>
);

export default PageHeader;
