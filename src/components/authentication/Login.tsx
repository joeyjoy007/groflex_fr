import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input } from 'antd';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/context';
import Password from '../pages/password_form/Password';

const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        login(values);
        // navigate('/g');

      };

      const {login}: any = useContext(AuthContext);
      const [modal2Open, setModal2Open] = React.useState(false);
      const [form1] = Form.useForm();
  return (
    <div style={{border:'2px solid gray',padding:20,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
        <h4>Login</h4>
         <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
       
      </Form.Item>
        <a onClick={(e)=>{e.preventDefault() ,setModal2Open(true)}} style={{float:'right',marginTop:'-23px'}} href="">
          Forgot password
        </a>
       
    

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
         Or <Link to='/register'>Register</Link>
      </Form.Item>
    </Form>

    <Modal
        footer={null}
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
      <Password passwordKey={0} form1={form1} setIsModalOpen={setModal2Open}/>
      </Modal>
    </div>
  )
}

export default Login