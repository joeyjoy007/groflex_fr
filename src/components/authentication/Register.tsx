import { LockOutlined, UserOutlined,HomeOutlined,PushpinOutlined ,MailOutlined,UploadOutlined } from '@ant-design/icons';
import { Button, Radio, Form, Input,DatePicker,Select,Checkbox,Upload,Row,Col,UploadFile, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../server/apis/user';
import React from 'react';
import { get_country } from '../../server/apis/country';
import { get_state } from '../../server/apis/state';

const Register = () => {

    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const [countries, setCountries] = React.useState(null);
    const [state, setState] = React.useState(null);

    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
     try {
      const register = await registerUser(values).then((res: any)=>{
        console.log(res)
        messageApi.open({
          type:'success',
          content:'Registration success'
        })
       setTimeout(() => {
        navigate('/login')
       }, 1000);
      }).catch((err: any)=>{
        messageApi.open({
          type:'error',
          content:"Registration unsuccessfull"
        })

      })
     } catch (error: any) {
      messageApi.open({
        type:'error',
        content:error.message
      })
     }
      };


      const fetch_countries = async ()=>{
        try {
          const country = await get_country().then((res: any)=>{
            setCountries(res.payload)
          }).then((err: any)=>{
            console.log(err.message)
          })
        } catch (error: any) {
          console.log(error.message)
        }
      }

      const fetch_state = async (e)=>{
        try {
          const country = await get_state({countryId:e}).then((res: any)=>{
            setState(res.payload)
            console.log(res)
          }).then((err: any)=>{
            console.log(err.message)
          })
        } catch (error: any) {
          console.log(error.message)
        }
      }

      React.useEffect(() => {
        form.setFieldsValue({profile:'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'})
        fetch_countries();
        return ()=>{
          fetch_countries();
        }
      }, [])
      


      const fileList: UploadFile[] = [
        // {
        //   uid: '0',
        //   name: '123.png',
        //   status: 'uploading',
        //   percent: 33,
        // },
      ];
  return (
    
    <div style={{border:'2px solid white',boxShadow:'3px 2px 2px gray', padding:20,borderRadius:10,background:'white'}}>
      {contextHolder}
      <h4>Register</h4>
    <Form
      form={form}
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
        <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
      </Form.Item>

      <Form.Item
        name="email"
        style={{marginLeft:10}}
        rules={[{ required: true, message: 'write email in correct format' }]}
      >
        <Input type='email' prefix={<MailOutlined  className="site-form-item-icon" />} placeholder="email" />
      </Form.Item>
    </div>


    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
      <Form.Item 
      name="country"
      rules={[{ required: true, message: 'select country' }]}

      >
          <Select onSelect={(e)=>fetch_state(e)} placeholder="select country">
            {
              countries?.map((e: any)=>{
                return (
                  <Select.Option key={e._id} value={e._id}>{e.country}</Select.Option>
                )
              })
            }
          </Select>
      </Form.Item>

      <Form.Item 
      name="state"
      rules={[{ required: true, message: 'select state' }]}
      > 
      <Select placeholder="select state">
         {
          state?.map((e: any)=>{
            return (
             
                <Select.Option  value={e._id}>{e.state}</Select.Option>
            
            )
          })
         }
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
        <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="city" />
      </Form.Item>

     <Form.Item
        name="zip-code"
        rules={[{ required: true, message: 'please input your zip-code!' }]}
      >
        <Input prefix={<PushpinOutlined className="site-form-item-icon" />} placeholder="zip-code" />
      </Form.Item>
   
     </div>



    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>    

         <Upload
             action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
             listType="picture"
             defaultFileList={[...fileList]}
             multiple={false}
             name='profile'
             >
               <Button icon={<UploadOutlined />}>Upload Profile</Button>
         </Upload>

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
            <Checkbox value="Writing" style={{ lineHeight: '32px' }}>
              Writing
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="Playing" style={{ lineHeight: '32px' }}>
              Playing
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="Travelling" style={{ lineHeight: '32px' }}>
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
         Or <Link to='/login'>Login</Link>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Register