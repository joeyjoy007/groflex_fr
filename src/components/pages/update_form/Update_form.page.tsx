import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';
import { updateUser } from '../../../server/apis/user';
import moment from 'moment';
import React from 'react';

const Update_form = ({allInfo,form}: any) => {

    // const [form] = Form.useForm()

    React.useEffect(() => {
      form.setFieldsValue({email:allInfo.email})
      form.setFieldsValue({userId:allInfo._id})
      form.setFieldsValue({zip_code:allInfo.zip_code})
      form.setFieldsValue({country:allInfo.country._id})
      form.setFieldsValue({city:allInfo.city})
      form.setFieldsValue({state:allInfo.state._id})
      form.setFieldsValue({username:allInfo.username})
    }, [allInfo])
    

    const onFinish =async (values: any) => {
      // const data = moment(values.dob).format("DD-MM-YYYY")
      form.setFieldsValue({email:allInfo.email})
      form.setFieldsValue({_id:allInfo._id})
      const y = Object.values(values).map((e)=>{
        return e === undefined 
      })
      const check = y.filter(e=>e=== false)
      if(check.length === 2){
        console.log("please fill fields to update")
      }
      else{
        try {
          const update = await updateUser(values).then((res: any)=>{
            console.log(res.payload)
          }).catch((err: any)=>{
            console.log(err.message)
          })
        } catch (error: any) {
          console.log(error.message)
        }
        console.log("updating",values)
      }

      };



  return (
    <>
         <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{marginTop:'2rem'}}
    >
      <div style={{display:'flex',justifyContent:'space-between'}}>
        
      <Form.Item
        name="userId"
        hidden={true}
      >
        <Input value={allInfo._id} placeholder={allInfo._id} prefix={<UserOutlined className="site-form-item-icon" />}  />
      </Form.Item>
      <Form.Item
        name="username"
      >
        <Input placeholder={allInfo.username} prefix={<UserOutlined className="site-form-item-icon" />}  />
      </Form.Item>


      <Form.Item
        name="email"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={allInfo.email}
          value={allInfo.email}
          disabled
        />
      </Form.Item>

      </div>

     
     <div style={{display:'flex',justifyContent:'space-between'}}>

     <Form.Item
        name="zip_code"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={allInfo.zip_code}
        />
    </Form.Item>

      <Form.Item 
      name="dob"
      >
          <DatePicker placeholder={moment(allInfo.dob).format("DD-MM-YYYY")}/>
      </Form.Item>

   
     </div>

    

      <div style={{display:'flex',justifyContent:'space-between'}}>
      <Form.Item 
      name="country"
    
      >
          <Select placeholder={allInfo.country.country}>
            <Select.Option value={allInfo.country._id}>country</Select.Option>
          </Select>    
      </Form.Item>

      <Form.Item 
      name="state"
      >
          <Select placeholder={allInfo.state.state}>
            <Select.Option value={allInfo.state._id}>state</Select.Option>
          </Select>
      </Form.Item>

      <Form.Item
        name="city"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={allInfo.city}
        />
      </Form.Item>

      </div>
      <Form.Item>
       <Button type="primary" htmlType="submit">
          Update
       </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default Update_form