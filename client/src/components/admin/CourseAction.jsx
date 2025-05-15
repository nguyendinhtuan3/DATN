import { Button, Popconfirm, Space, message } from "antd";

const CourseAction = ({ course }) => {
  const handleLock = () => {
    message.warning(`Course "${course.title}" has been locked.`);
  };

  const handleUnlock = () => {
    message.success(`Course "${course.title}" has been unlocked.`);
  };

  const handleDelete = () => {
    message.error(`Course "${course.title}" has been deleted.`);
  };

  return (
    <Space>
      {course.status === "active" ? (
        <Popconfirm
          title="Are you sure you want to lock this course?"
          onConfirm={handleLock}
        >
          <Button danger>Lock</Button>
        </Popconfirm>
      ) : (
        <Button type="primary" onClick={handleUnlock}>
          Unlock
        </Button>
      )}

      <Popconfirm
        title="Are you sure you want to delete this course?"
        onConfirm={handleDelete}
      >
        <Button danger type="dashed">
          Delete
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default CourseAction;
