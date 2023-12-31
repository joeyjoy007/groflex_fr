/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditOutlined, EllipsisOutlined, SettingOutlined,DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card,Skeleton,Switch,Pagination,Popover,Input, Modal, Form, message} from 'antd';
import React from 'react';
import { deleteUser, getUser, paginate, searhUser } from '../../server/apis/user';
import Update_form from './update_form/Update_form.page.tsx';
import Password from './password_form/Password.tsx';
import moment from 'moment';


const All_user = () => {

  const { Meta } = Card;
  const {Search} = Input

  const [allUsers, setAllUsers] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [allInfo, setAllInfo] = React.useState(null);
  const [paginateUser, setPaginateUser] = React.useState(1)
  const [page_no, setPage_no] = React.useState(1)
  const [openPassword, setOpenPassword] = React.useState(false)

  const [messageApi, contextHolder] = message.useMessage();



  const pagination = async(page_no: any)=>{
    try {
      setPage_no(page_no)
      const page = await paginate({page:page_no}).then((res: any)=>{
       setAllUsers(res?.payload?.pagination)
       setPaginateUser(res?.payload?.count)
      }).catch((err)=>{
        console.log(err.message)
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  React.useEffect(() => {
    // fetchUser();
    pagination(1);
    return ()=>{
      pagination(1)
    }
  }, [])

  const search_users = async(e: any)=>{
    if(e?.target?.value?.length === 0){
      // fetchUser();
      pagination(1)
    }
    else{
      try {
        console.log("ok")
        const search_user =await searhUser(e).then((res: any)=>{
          console.log(res.payload)
          setAllUsers(res.payload)
        }).catch((err: any)=>{
          console.log(err.message)
        })
      } catch (error: any) {
        console.log(error.message)
      }
    }
  }

  const delete_user = async(e: any)=>{
      try {
        const search_user =await deleteUser({_id:e}).then((res: any)=>{
          // fetchUser();
          pagination(1);
          messageApi.open({
            type:'success',
            content:'user deleted'
          })
        }).catch((err: any)=>{
          messageApi.open({
            type:'error',
            content:'user not deleted'
          })
        })
      } catch (error: any) {
        messageApi.open({
          type:'error',
          content:error.message
        })
      
    }
  }

  const modal_setting = (e: any)=>{
    setOpenPassword(false)
    form.resetFields()
    setAllInfo(e);
    setIsModalOpen(!isModalOpen);
  }

  const password_modal = (e: any)=>{
    setOpenPassword(true)
    form1.resetFields()
    setAllInfo(e);
    setIsModalOpen(!isModalOpen);
  }
  

  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  
  

  return (
    <div style={{height:'80vh',justifyContent:'space-between',display:'flex',flexDirection:'column'}}>
    {contextHolder}
  <div style={{width:'100%',height:'80vh',position:'relative'}}>
    <Search onChange={(e)=>search_users(e)} width={100} placeholder="search users"  />
      <div style={{display:'flex',flexWrap:'wrap'}}>
      {
    allUsers?.map((e: any)=>{
      return (
        <Card
        key={e._id}
        style={{ width: 310,padding:20,marginLeft:'1rem',marginTop:'1rem' }}
        actions={[
          <EditOutlined onClick={()=>modal_setting(e)} key="edit" />,
          <DeleteOutlined onClick={()=>delete_user(e._id)} key="setting" />,
          <EllipsisOutlined onClick={()=>password_modal(e)} key="ellipsis" />,
        ]}
        >
        <Meta
          avatar={<Avatar src={e.profile} />}
          title={
            <div>
             <div style={{display:'flex',justifyContent:'space-between'}}>
               {e?.username}
             </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
               <div style={{fontSize:12}}>{moment(e.dob).format("DD-MM-YYYY")}</div>
               <span style={{fontSize:12}}>
                 {e?.gender}
               </span>
              </div>
            </div>
          }
          description={
            <div>
              {e?.email}
             <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{fontWeight:'bold',color:'#222222'}}>
                  {e?.country?.country}
                </span>
                <div>
                <span style={{fontWeight:'600',color:'#222222'}}>{e?.state?.state}</span>
                <span style={{fontWeight:'400',color:'#222222',fontSize:12}}>, {e?.city}</span>
            </div>
           
             </div>
             <div style={{float:'right',fontWeight:'bold',color:'#222222',fontSize:13}}>
              {e?.zip_code}
            </div>
            </div>
          }
        />

        
       </Card>
    
      )
    })
   }     
    <Modal open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={null}>
     {
      openPassword ?(
        <Password passwordKey={1} allInfo={allInfo} form1={form1} setIsModalOpen={setIsModalOpen}/>
      ):(
        <Update_form allInfo={allInfo} form={form} setIsModalOpen={setIsModalOpen} paginate={()=>pagination(1)}/>
      )
     }
    </Modal>
    </div>
  </div>


  <div style={{justifyContent:'center',display:'flex',position:'fixed',bottom:10,left:'50%'}}>
    <Pagination current={page_no} pageSize={5} total={Math.round(paginateUser)} onChange={(e)=>pagination(e)} />
  </div>
    </div>
  )
}

export default All_user