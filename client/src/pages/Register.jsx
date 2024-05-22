import {Form, Input, message} from 'antd';
import '../styles/RegisterStyle.css';
import {Link, useNavigate} from 'react-router-dom'
import Header from '../components/header'
import axios from 'axios'
import { useDispatch } from 'react-redux'; 
import { showLoading,hideLoading } from '../redux/feature/alertSlice';
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinish = async(values) =>
  {
    try{
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register', values)
      dispatch(hideLoading());
      if(res.data.sucess)
      {
        message.success('Registered Sucessfully!')
        navigate("/login")
      }else{
        message.error(res.data.message);
      }
    }
    catch(err){
      dispatch(hideLoading());
      console.log(err)
      message.error(`Something went wrong`)
    }
  }
  return (
    <>
    <Header/>
    <div className="form-container card">
      <Form layout = "vertical" onFinish={onfinish} className='register-form card p-5'>
        <h1>Register</h1>
        <Form.Item label="Username" name="name">
          <Input type="text" required/>
          </Form.Item>
          <Form.Item label="Email" name="email">
          <Input type="email" required/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required/>
        </Form.Item>
        <div>
        <Link to = '/login'><h3>Already a user?</h3></Link>
        <button className='btn btn-primary' type='submit'>Register</button>
        </div>
      </Form>
    </div>
    </>
  )
}

export default Register