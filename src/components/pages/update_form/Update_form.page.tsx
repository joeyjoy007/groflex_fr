import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input, Select, message } from 'antd';
import { updateUser } from '../../../server/apis/user';
import moment from 'moment';
import React from 'react';
import { get_country } from '../../../server/apis/country';
import { get_state } from '../../../server/apis/state';

const Update_form = ({allInfo,form,setIsModalOpen,paginate}: any) => {

    const [messageApi, contextHolder] = message.useMessage();


    React.useEffect(() => {
      form.setFieldsValue({email:allInfo.email})
      form.setFieldsValue({userId:allInfo._id})
      form.setFieldsValue({zip_code:allInfo.zip_code})
      form.setFieldsValue({city:allInfo.city})
      form.setFieldsValue({username:allInfo.username})
    }, [allInfo])

    const [countries, setCountries] = React.useState(null);
    const [state, setState] = React.useState(null);
    

    const onFinish =async (values: any) => {
      // const data = moment(values.dob).format("DD-MM-YYYY")
      form.setFieldsValue({email:allInfo.email})
      form.setFieldsValue({_id:allInfo._id})
      const y = Object.values(values).map((e)=>{
        return e === undefined 
      })
      const check = y.filter(e=>e=== false)
      if(check.length === 2){
        messageApi.open({
          type: 'warning',
          content: 'please fill fields to update',
        });
      }
      else{
        try {
          const update = await updateUser(values).then((res: any)=>{
            setIsModalOpen(false);
            messageApi.open({
              type: 'success',
              content: 'profile updated',
            });
            paginate()
          }).catch((err: any)=>{

            messageApi.open({
              type: 'error',
              content:'profile not updated',
            });
          })
        } catch (error: any) {
          messageApi.open({
            type: 'error',
            content:error.message,
          });
        }

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



  return (
    <>
    {contextHolder}
    <span>Edit Profile</span>
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
          <Select onClick={()=>fetch_countries()} onSelect={(e)=>fetch_state(e)} placeholder={allInfo.country.country}>
          {
              countries?.map((e: any)=>{
                console.log("EEE",e)
                return (
                  <Select.Option key={e._id} value={e._id}>{e.country}</Select.Option>
                )
              })
            }          </Select>    
      </Form.Item>

      <Form.Item 
      name="state"
      >
          <Select placeholder={allInfo.state.state}>
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