import {
  Select,
  Typography,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  TimePicker,
  DatePicker,
  message,
} from "antd";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import Options from "../data/Specialization";

const { Title } = Typography;
const BookAppointments = () => {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState([]);
  const [currentDate, setCurrentDate] = useState([]);
  const [disTime, setDisTime] = useState([]);
  const col = [
    {
      title: "Name",
      render: (record) => {
        return record.firstName + " " + record.lastName;
      },
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Timings",
      dataIndex: "timings",
      render: (text) => {
        return (
          <div>
            <p>
              {moment(text[0]).format("HH") +
                " - " +
                moment(text[1]).format("HH")}
            </p>
          </div>
        );
      },
    },
    {
      title: "Book Appointment",
      render: (record) => {
        return (
          <Button type="primary" onClick={() => bookAppointment(record)}>
            Book
          </Button>
        );
      },
    },
  ];
  const updateForm = async (values) => {
    try {
      console.log(values);
      const res = await axios.post("api/v1/user/getSpecDoctor", {
        specialization: values,
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bookAppointment = (record) => {
    setBookModalOpen(true);
    setCurrentRecord(record);
  };
  const handleBookModalCancel = () => {
    setBookModalOpen(false);
  };

  const saveValues = async (values) => {
    const userappointment = {
      name: user?.name,
      doctorName: currentRecord.firstName + " " + currentRecord.lastName,
      specialization: currentRecord.specialization,
      phone: currentRecord.phone,
      email: currentRecord.email,
      date: values.date,
      timeSlot: values.time,
    };

    const doctorappointment = {
      name: currentRecord.name,
      userName: user?.name,
      date: values.date,
      timeSlot: values.time,
    };
    try {
      console.log(userappointment);
      const res = await axios.post(
        "api/v1/user/bookAppointment",
        userappointment
      );
      if (res.data.success) {
        message.success("Booked!");
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await axios.post(
        "api/v1/doctor/addAppointment",
        doctorappointment
      );
      if (res.data.sucess) {
        console.log("added in doctor aswell");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentAppointment = async () => {
    try {
      const res = await axios.post("api/v1/doctor/getAppointment", {
        name: currentRecord.name,
      });
      if (res.data.success) {
        setCurrentDate(res.data.data);
      } else {
        console.log("test");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkdisabledTime = (date) => {
    getCurrentAppointment();
    let times = [];
    currentDate.forEach((element) => {
      if (moment(element.date).format("YYYY-MM-DD") == date) {
        times.push(moment(element.timeSlot).format("H"));
      }
      setDisTime(times);
    });
  };
  const disabledTime = () => {
    return {
      disabledHours: () => {
        let disabled = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24,
        ];
        const interval =
          moment(currentRecord.timings[1]).format("HH") -
          moment(currentRecord.timings[0]).format("HH") +
          1;
        disabled.splice(
          moment(currentRecord.timings[0]).format("HH"),
          interval
        );
        disTime.forEach((element) => {
          disabled.push(Number(element));
        });
        //console.log(disabled);
        return disabled;
      },
    };
  };

  return (
    <>
      <Modal
        title="Book Appointment"
        open={bookModalOpen}
        onCancel={handleBookModalCancel}
        footer={[
          <Button key="cancel" onClick={handleBookModalCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form layout="vertical" onFinish={saveValues}>
          <Form.Item label="Date" name="date">
            <DatePicker
              onChange={(date, dateString) => checkdisabledTime(dateString)}
            ></DatePicker>
          </Form.Item>
          <Form.Item label="Time" name="time">
            <TimePicker
              format="HH"
              disabledTime={disabledTime}
              use12Hours
              showNow={false}
            ></TimePicker>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setBookModalOpen(false)}
          >
            Confirm
          </Button>
        </Form>
      </Modal>
      <Title>Select Dept</Title>
      <Row style={{ marginBottom: "2%" }}>
        <Col xs={24} md={24} lg={8}>
          <Select
            options={Options}
            onChange={updateForm}
            size="middle"
            style={{ width: "100%" }}
          ></Select>
        </Col>
      </Row>
      <Table columns={col} dataSource={doctors}></Table>
    </>
  );
};

export default BookAppointments;
