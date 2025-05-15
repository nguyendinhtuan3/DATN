import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  BarChartOutlined,
  SettingOutlined,
  TrophyOutlined,
  GiftOutlined,
  RocketOutlined,
  AppstoreAddOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Overview",
      path: "/admin",
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Users",
      path: "/admin/users",
    },
    {
      key: "courses",
      icon: <BookOutlined />,
      label: "Courses",
      path: "/admin/courses",
    },
    {
      key: "leaderboard",
      icon: <TrophyOutlined />,
      label: "Leaderboard",
      path: "/admin/leaderboard",
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Reports",
      path: "/admin/reports",
    },
    {
      key: "gamification",
      icon: <RocketOutlined />,
      label: "Gamification",
      children: [
        {
          key: "items",
          icon: <AppstoreAddOutlined />,
          label: "Items",
          path: "/admin/gamification/items",
        },
        {
          key: "games",
          icon: <DeploymentUnitOutlined />,
          label: "Games",
          path: "/admin/gamification/games",
        },
        {
          key: "missions",
          icon: <RocketOutlined />,
          label: "Missions",
          path: "/admin/gamification/missions",
        },
        {
          key: "rewards",
          icon: <GiftOutlined />,
          label: "Rewards",
          path: "/admin/gamification/rewards",
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      path: "/admin/settings",
    },
  ];

  // Lấy key đang active
  const findCurrentKey = (items) => {
    for (let item of items) {
      if (item.children) {
        const child = findCurrentKey(item.children);
        if (child) return child;
      }
      if (location.pathname.startsWith(item.path)) {
        return item.key;
      }
    }
    return null;
  };

  const currentKey = findCurrentKey(menuItems);

  const handleMenuClick = ({ key }) => {
    const findPath = (items) => {
      for (let item of items) {
        if (item.key === key) return item.path;
        if (item.children) {
          const childPath = findPath(item.children);
          if (childPath) return childPath;
        }
      }
      return null;
    };
    const path = findPath(menuItems);
    if (path) navigate(path);
  };

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        className="logo"
        style={{
          color: "white",
          padding: 16,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 18,
        }}
      >
        TOEIC ADMIN
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentKey]}
        onClick={handleMenuClick}
      >
        {menuItems.map((item) =>
          item.children ? (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((subItem) => (
                <Menu.Item key={subItem.key} icon={subItem.icon}>
                  {subItem.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
