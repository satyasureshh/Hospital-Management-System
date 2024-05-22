import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/feature/alertSlice";
import "../styles/LoginStyle.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.sucess) {
        localStorage.setItem("token", res.data.token);
        message.success("Logged in Sucessfully");
        navigate("/patient");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      message.error(`Something went wrong`);
    }
  };
  return (
    <>
      <Header />
      <div className="form-container card">
        <Form
          layout="vertical"
          onFinish={onfinish}
          className="login-form card p-5"
        >
          <h1>Login</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div>
            <Link to="/register">
              <h3>Not a user ?</h3>
            </Link>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
