import { LockOutlined, UserOutlined ,UploadOutlined } from '@ant-design/icons';
import { Button, Radio, Form, Input,DatePicker,Select,Checkbox,Upload,Row,Col,UploadFile } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        navigate('/l')

      };


      const fileList: UploadFile[] = [
        // {
        //   uid: '0',
        //   name: 'xxx.png',
        //   status: 'uploading',
        //   percent: 33,
        // },
      ];
  return (
    
    <div style={{border:'2px solid gray', padding:20,borderRadius:10}}>

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >


    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
        <Form.Item
        name="username"
        rules={[{ required: true, message: 'please input your username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
      </Form.Item>

      <Form.Item
        name="email"
        style={{marginLeft:10}}
        rules={[{ required: true, message: 'write email in correct format' }]}
      >
        <Input type='email' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
      </Form.Item>
    </div>


    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
      <Form.Item 
      name="country"
      rules={[{ required: true, message: 'select country' }]}

      >
          <Select placeholder="select country">
            <Select.Option value="country">country</Select.Option>
          </Select>
      </Form.Item>

      <Form.Item 
      name="state"
      rules={[{ required: true, message: 'select state' }]}
      >
          <Select placeholder="select state">
            <Select.Option value="state">state</Select.Option>
          </Select>
      </Form.Item>

      <Form.Item 
      name="date"
      rules={[{ required: true, message: 'select date' }]}
      >
          <DatePicker placeholder='select date'/>
      </Form.Item>
   
</div>



       <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>

     <Form.Item
        name="city"
        rules={[{ required: true, message: 'please input your city!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="city" />
      </Form.Item>

     <Form.Item
        name="zip-code"
        rules={[{ required: true, message: 'please input your zip-code!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="zip-code" />
      </Form.Item>
   
     </div>



    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>    
      <Form.Item
     name='profile'

         >
         <Upload
             action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
             listType="picture"
             defaultFileList={[...fileList]}
             >
               <Button icon={<UploadOutlined />}>Upload Profile</Button>
         </Upload>
    </Form.Item>
    <Form.Item
        name="password"
        rules={[{ required: true, message: 'please input your password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

    </div>

  

    <Form.Item label="Gender" 
      name="gender"
      rules={[{ required: true, message: 'please input your gender!' }]}
      >
          <Radio.Group style={{display:'flex',flexDirection:'column'}}>
            <Radio value="Male"> Male</Radio>
            <Radio value="Female"> Female </Radio>
          </Radio.Group>
    </Form.Item>


  
    
    <Form.Item name="interest" 
     label="Interest"
     rules={[{ required: true, message: 'choose atleast 1 interest' }]}
     >
      <Checkbox.Group>
        <Row style={{display:'flex',flexDirection:'column'}}>
          <Col span={8}>
            <Checkbox value="D" style={{ lineHeight: '32px' }}>
              Writing
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="E" style={{ lineHeight: '32px' }}>
              Playing
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="F" style={{ lineHeight: '32px' }}>
              Travelling
            </Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
    </Form.Item>



   

  


   

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Register