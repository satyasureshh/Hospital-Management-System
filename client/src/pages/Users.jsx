import { Button, Table, message } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers");
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const DeleteUser = async (record) => {
    try {
      const res = await axios.post("/api/v1/admin/deleteUser", record);
      if (res.data.success) {
        message.success("User Deleted");
        getUserData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateUser = async (record) => {
    try {
      const res = await axios.post("/api/v1/admin/updateUser", record);
      if (res.data.success) {
        message.success("User updated");
        getUserData();
      } else {
        message.success("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const items = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Admin ?",
      render: (record) => {
        return record.isAdmin ? "Yes" : "No";
      },
    },
    {
      title: "Remove User",
      render: (record) => {
        if (!record.isAdmin) {
          return (
            <Button type="primary" danger onClick={() => DeleteUser(record)}>
              Remove
            </Button>
          );
        } else if (record.name != user.name) {
          return (
            <Button type="primary" disabled onClick={() => DeleteUser(record)}>
              Remove
            </Button>
          );
        }
      },
    },
    {
      title: "Change Status",
      render: (record) => {
        if (record.name != user.name) {
          return (
            <Button type="primary" onClick={() => UpdateUser(record)}>
              Change
            </Button>
          );
        }
      },
    },
  ];
  return (
    <>
      <h2>User List</h2>
      <Table dataSource={users} columns={items}></Table>
    </>
  );
};

export default Users;
