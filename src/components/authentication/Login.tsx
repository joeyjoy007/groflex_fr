import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input } from 'antd';
import React from 'react';

const Login = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };

      const [modal1Open, setModal1Open] = React.useState(false);
      const [modal2Open, setModal2Open] = React.useState(false);
  return (
    <div style={{border:'2px solid gray',padding:20,borderRadius:10}}>
         <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
        <a onClick={(e)=>{e.preventDefault() ,setModal2Open(true)}} style={{float:'right'}} href="">
          Forgot password
        </a>
      </Form.Item>
    
       
    

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>

    <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
      <span>Password reset</span>
      </Modal>
    </div>
  )
}

export default Login