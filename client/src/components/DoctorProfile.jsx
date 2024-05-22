import { Table, Button } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const DoctorProfile = () => {
  const dataSource = [
    {
      key: "1",
      name: "Srine",
      specialization: "Dermatologist",
      completed: "Yes",
      remarks: "Random text",
    },
    {
      key: "2",
      name: "slimey",
      specialization: "Radiology",
      completed: "No",
      remarks: "Some remarks",
    },
    {
      key: "3",
      name: "Ei rex shawn",
      specialization: "Orthopedics",
      completed: "Yes",
      remarks: "More remarks",
    },
  ];

  const appointments = [
    {
      name: "elkfjroi",
      reason: "eingor",
      time: "9 am",
      date: "09.01.23"
    }
  ];

  const doctorTableCol = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Completed",
      render: () => (
        <Button type="primary" onClick={() => handleCompleted()}>
          Completed
        </Button>
      ),
    },
    {
      title: "Remarks",
      render: () => (
        <Button type="primary" onClick={() => handleRemarks()}>
          Remarks
        </Button>
      ),
    },
  ];

  const appointmentTableCol = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Reason for Visit",
      dataIndex: "reason",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
  ];

  const handleCompleted = () => {
    
  };

  const handleRemarks = () => {
  
  };

  return (
    <div>
      <h2>Doctor's Profile</h2>
      <Table columns={doctorTableCol} dataSource={dataSource} />
      <h2>Appointments</h2>
      <Table columns={appointmentTableCol} dataSource={appointments} />
    </div>
  );
};

export default DoctorProfile;
