import {
  Form,
  Input,
  Row,
  Col,
  TimePicker,
  message,
  Button,
  Select,
} from "antd";
import axios from "axios";
import "../styles/doctorStyle.css";
import options from "../data/Specialization";
const AddDoctor = () => {
  const onfinish = async (values) => {
    try {
      const res = await axios.post("/api/v1/admin/addDoctor", values);
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h3>Add Doctor</h3>
      <Form
        layout="vertical"
        className="add-doctor card p-5"
        onFinish={onfinish}
      >
        <Row gutter="10">
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Username" name="name">
              <Input type="text" required />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="First Name" name="firstName">
              <Input type="text" required />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Last Name" name="lastName">
              <Input type="text" required />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Phone no:" name="phone">
              <Input type="text" required />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website (Optional)" name="website">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Specialization" name="specialization">
              <Select options={options}></Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Experience" name="experience" placeholder="5">
              <Input type="number" required />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings">
              <TimePicker.RangePicker format="HH" />
            </Form.Item>
          </Col>
          <Button type="primary" htmlType="submit" className="form-submit">
            Submit
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default AddDoctor;
