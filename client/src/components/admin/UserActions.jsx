import { Button, Popconfirm, Space, message } from "antd";

const UserActions = ({ user }) => {
  const handleLock = () => {
    message.success(`${user.name} has been locked.`);
  };

  const handleUnlock = () => {
    message.success(`${user.name} has been unlocked.`);
  };

  const handleSoftDelete = () => {
    message.warning(`${user.name} has been soft deleted.`);
  };

  return (
    <Space>
      {user.status === "active" ? (
        <Popconfirm
          title="Are you sure you want to lock this account?"
          onConfirm={handleLock}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Lock
          </Button>
        </Popconfirm>
      ) : (
        <Button type="default" onClick={handleUnlock}>
          Unlock
        </Button>
      )}

      <Popconfirm
        title="Are you sure you want to soft delete this user?"
        onConfirm={handleSoftDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    </Space>
  );
};

export default UserActions;
