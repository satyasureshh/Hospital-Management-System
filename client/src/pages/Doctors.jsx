import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Input,
  TimePicker,
  message,
} from "antd";
import moment from "moment";

const timingstyle = {
  display: "flex",
};

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [timingModalOpen, setTimingModalOpen] = useState(false);
  const [passwordOnOpen, setPasswordModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [mail] = Form.useForm();
  const [timings] = Form.useForm();
  const getDoctorData = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getDoctors");
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDoctorData();
  }, []);

  const removeItem = async (record) => {
    try {
      await axios.post("/api/v1/admin/removeDoctor", record);
      getDoctorData();
      message.success("Removed Doctor");
    } catch (err) {
      message.error("Something went wrong");
      console.log(err);
    }
  };
  const changePassword = (record) => {
    mail.setFieldsValue(record);
    setPasswordModalOpen(true);
  };

  const handlePasswordOk = async (values) => {
    try {
      const res = await axios.post("/api/v1/admin/updateDoctor", values);
      if (res.data.success) {
        message.success("Password Updated");
        setPasswordModalOpen(false);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  };
  const handlePasswordCancel = () => {
    setPasswordModalOpen(false);
  };
  const timingOnClick = (record) => {
    timings.setFieldValue("name", record.name);
    setTimingModalOpen(true);
  };
  const handleTimingCancel = () => {
    setTimingModalOpen(false);
  };
  const edit = (record) => {
    form.setFieldsValue(record);
    setEditModalOpen(true);
  };

  const handleEditOk = async (values) => {
    try {
      const res = await axios.post("/api/v1/admin/updateDoctorProfile", values);
      if (res.data.success) {
        message.success("Fields Updated");
        setEditModalOpen(false);
        getDoctorData();
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  };
  const handleCancel = () => {
    setEditModalOpen(false);
  };
  const handleTimingOk = async (values) => {
    try {
      const res = await axios.post("/api/v1/admin/updateDoctorProfile", values);
      if (res.data.success) {
        message.success("Timings Updated");
        getDoctorData();
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }

    setTimingModalOpen(false);
  };

  const items = [
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
      render: (text, record) => {
        return (
          <div style={timingstyle}>
            <p>
              {moment(text[0]).format("HH") +
                " - " +
                moment(text[1]).format("HH")}
            </p>
            <Button size="medium" onClick={() => timingOnClick(record)}>
              Edit Timings
            </Button>
          </div>
        );
      },
    },
    {
      title: "Edit",
      render: (record) => {
        return <Button onClick={() => edit(record)}>Edit</Button>;
      },
    },
    {
      title: "Authentication",
      render: (record) => {
        return (
          <Button type="primary" onClick={() => changePassword(record)}>
            Edit Password
          </Button>
        );
      },
    },
    {
      title: "Remove ?",
      render: (record) => {
        return (
          <Button danger onClick={() => removeItem(record)}>
            Remove
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <h2>Doctor List</h2>
      <Modal
        title="Edit Modal"
        open={editModalOpen}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        width={1000}
      >
        <Form
          variant="filled"
          layout="vertical"
          className="edit-doctor"
          onFinish={handleEditOk}
          form={form}
        >
          <Row gutter="100">
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Username" name="name">
                <Input type="text" required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter="100">
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="First Name" name="firstName">
                <Input type="text" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Last Name" name="lastName">
                <Input type="text" required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter="100">
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Phone no:" name="phone">
                <Input type="text" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Website (Optional)" name="website">
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter="100">
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Specialization" name="specialization">
                <Input type="text" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Experience" name="experience">
                <Input type="number" required />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Ok
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Edit Timings"
        open={timingModalOpen}
        onCancel={handleTimingCancel}
        footer={[
          <Button key="Cancel" onClick={handleTimingCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={timings} onFinish={handleTimingOk}>
          <Form.Item name="name" hidden="true">
            <Input type="string"></Input>
          </Form.Item>
          <Form.Item label="Timings" name="timings">
            <TimePicker.RangePicker format="HH" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Ok
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Edit Password"
        open={passwordOnOpen}
        onCancel={handlePasswordCancel}
        footer={[
          <Button key="Cancel" onClick={handlePasswordCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={mail} onFinish={handlePasswordOk}>
          <Form.Item label="Email" name="email" hidden="true">
            <Input type="email"></Input>
          </Form.Item>
          <Form.Item label="Change Password" name="password">
            <Input type="password"></Input>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Ok
          </Button>
        </Form>
      </Modal>
      <Table dataSource={doctors} columns={items}></Table>
    </>
  );
};

export default Doctors;
