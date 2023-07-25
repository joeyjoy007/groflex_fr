/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditOutlined, EllipsisOutlined, SettingOutlined,DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card,Skeleton,Switch,Pagination,Popover,Input, Modal, Form} from 'antd';
import React from 'react';
import { deleteUser, getUser, paginate, searhUser } from '../../server/apis/user';
import Update_form from './update_form/Update_form.page.tsx';


const All_user = () => {

  const { Meta } = Card;
  const {Search} = Input

  const [allUsers, setAllUsers] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [allInfo, setAllInfo] = React.useState(null);
  const [paginateUser, setPaginateUser] = React.useState(1)
  const [page_no, setPage_no] = React.useState(1)

  // const fetchUser = async()=>{
  //   try {
  //     const users = await getUser().then((res: any)=>{
  //      setAllUsers(res?.payload)
  //      setPaginateUser(res?.payload?.length)
  //     }).catch((err: any)=>{
  //       console.log(err.message)
  //     })
  //   } catch (error: any) {
  //     console.log(error.message)
  //   }
  // }


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
        }).catch((err: any)=>{
          console.log(err.message)
        })
      } catch (error: any) {
        console.log(error.message)
      
    }
  }

  const modal_setting = (e: any)=>{
    form.resetFields()
    setAllInfo(e);
    setIsModalOpen(!isModalOpen);
  }

  

  const [form] = Form.useForm();
  
  

  return (
    <>
  <div style={{width:'100%'}}>
    <Search onChange={(e)=>search_users(e)} width={100} placeholder="input search loading with enterButton" loading enterButton />
      <div style={{display:'flex',flexWrap:'wrap'}}>
      {
    allUsers?.map((e: any)=>{
      return (
        <Card
        key={e._id}
        style={{ width: 'auto',padding:20,marginLeft:'1rem',marginTop:'1rem' }}
        actions={[
          <EditOutlined onClick={()=>modal_setting(e)} key="edit" />,
          <DeleteOutlined onClick={()=>delete_user(e._id)} key="setting" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
        >
        <Meta
          avatar={<Avatar src={e.profile} />}
          title={e?.username}
          description={e?.email}
        />
       </Card>
    
      )
    })
   }     
    <Modal open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={null}>
      <Update_form allInfo = {allInfo} form={form}/>
    </Modal>
    </div>
  </div>
  <div style={{position:'absolute',bottom:0,width:'99%',justifyContent:'center',display:'flex'}}>

    <Pagination current={page_no} pageSize={5} total={Math.round(paginateUser)} onChange={(e)=>pagination(e)} />
  </div>
    </>
  )
}

export default All_user