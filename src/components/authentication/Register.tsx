import { LockOutlined, UserOutlined ,UploadOutlined } from '@ant-design/icons';
import { Button, Radio, Form, Input,DatePicker,Select,Checkbox,Upload,Row,Col,UploadFile } from 'antd';

const Register = () => {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
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
    <div>

<Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >


    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
        <Form.Item
        name="firstname"
        rules={[{ required: true, message: 'please input your firstname!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="firstname" />
      </Form.Item>

      <Form.Item
        name="lastname"
        style={{marginLeft:10}}
        rules={[{ required: true, message: 'please input your lastname!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="lastname" />
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

    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
    <Form.Item label="Gender" 
      name="gender"
      rules={[{ required: true, message: 'please input your gender!' }]}
      >
          <Radio.Group style={{display:'flex',flexDirection:'column'}}>
            <Radio value="Male"> Male</Radio>
            <Radio value="Female"> Female </Radio>
          </Radio.Group>
    </Form.Item>


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

     </div>



   

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