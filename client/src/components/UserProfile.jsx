import { Button, Table } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [upcommingAppointments, setupcommingAppointments] = useState([]);
  const [completedAppointments, setcompletedAppointments] = useState([]);
  const getAppointments = async () => {
  console.log(user)
    try {
      const res = await axios.get("/api/v1/user/getAppointments", user.name);
      if (res.data.success) {
        setupcommingAppointments(res.data.data.upcommingAppointments);
        setcompletedAppointments(res.data.data.completedAppointments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const col = [
    {
      title: "Name",
      dataIndex: "doctorName",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
    },
  ];

  const upcol = [
    {
      title: "Name",
      dataIndex: "doctorName",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "Time",
      dataIndex: "timeSlot",
      render: (text) => {
        return moment(text).format("h A");
      },
    },
    {
      title: "Cancel ?",
      render: (record) => {
        return (
          <Button
            type="primary"
            danger
            onClick={() => removeAppointment(record)}
          >
            Cancel
          </Button>
        );
      },
    },
  ];
  const removeAppointment = async (value) => {
    console.log(value);
    try {
      console.log("test");
      await axios.post("api/v1/user/removeAppointment", value);
    } catch (err) {
      console.log(err);
    }
    try {
      await axios.post("/api/v1/doctor/removeAppointment", value);
    } catch (err) {
      console.log(err);
    }
    getAppointments();
  };

  return (
    <>
      <h5>Upcomming</h5>
      <Table dataSource={upcommingAppointments} columns={upcol}></Table>
      <h5>Completed</h5>
      <Table dataSource={completedAppointments} columns={col}></Table>
    </>
  );
};

export default UserProfile;
