import { Layout, Avatar, Dropdown, Menu, Badge } from "antd";
import { UserOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";

const { Header } = Layout;

const notificationMenu = (
  <Menu>
    <Menu.Item key="1">New student registered</Menu.Item>
    <Menu.Item key="2">System maintenance at 10 PM</Menu.Item>
    <Menu.Item key="3">Leaderboard updated</Menu.Item>
  </Menu>
);

const userMenu = (
  <Menu>
    <Menu.Item key="logout" icon={<LogoutOutlined />}>
      Log out
    </Menu.Item>
  </Menu>
);

const HeaderBar = () => {
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 16px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Dropdown overlay={notificationMenu} trigger={["click"]}>
        <Badge count={3} overflowCount={9} offset={[0, 4]}>
          <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
        </Badge>
      </Dropdown>

      <Dropdown overlay={userMenu}>
        <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
      </Dropdown>
    </Header>
  );
};

export default HeaderBar;
