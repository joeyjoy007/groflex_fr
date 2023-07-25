import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { reset_password, reset_password_by_mail } from '../../../server/apis/user';

const Password = ({allInfo,form1,setIsModalOpen,passwordKey}: any) => {

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish =async  (values: any) => {
        if(values.password === values.cPassword){
         if(passwordKey === 0){
          try {
            const resetPass = await reset_password_by_mail({email:values.email,password:values.password}).then((res: any)=>{
                messageApi.open({
                    type:'success',
                    content:'password changed'
                })
                form1.resetFields()
                setIsModalOpen(false)
            }).catch((err: any)=>{
                messageApi.open({
                    type:'error',
                    content:err.message
                })
            })
        } catch (error: any) {
            messageApi.open({
                type:'error',
                content:'password not update'
            })
        }
         }
         else if(passwordKey === 1){
          try {
            const resetPass = await reset_password({userId:allInfo?._id,password:values.password}).then((res: any)=>{
                messageApi.open({
                    type:'success',
                    content:'password changed'
                })
                form1.resetFields()
                setIsModalOpen(false)
            }).catch((err: any)=>{
                messageApi.open({
                    type:'error',
                    content:'passwords not update'
                })
            })
        } catch (error: any) {
            messageApi.open({
                type:'error',
                content:'password not update'
            })
        }
         }
        }
        else{
            messageApi.open({
                type:'warning',
                content:'passwords do not match'
            })
        }
       
      };
  return (
    <>
        {contextHolder}
        Reset Password
        <div style={{marginTop:'2rem'}}>
    <Form
      form={form1}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
    
  {
    passwordKey === 0?(
      <>
        <Form.Item
        name="email"
        rules={[{ required: true, message: 'Type your email for password updation' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="email"
        />
      </Form.Item>

      </>
    ):(
      null
    )
  }
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        name="cPassword"
        rules={[{ required: true, message: 'Please input your confirm password' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="confirm password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Reset Password
        </Button>
      </Form.Item>
    </Form>
        </div>

    </>
  )
}

export default Password