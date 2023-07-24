/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card,Skeleton,Switch,Pagination,Popover,Input} from 'antd';
import React, { useContext } from 'react';
import { Layout, Space } from 'antd';
import { AuthContext } from '../../context/context';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'right',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const { Meta } = Card;
const {Search} = Input
const Home_Grid = () => {
    const [loading, setLoading] = React.useState(true);
    const [info, setInfo] = React.useState(null);

    const onChange = (checked: boolean) => {
      setLoading(!checked);
    };

    const {logout} = useContext(AuthContext);

    React.useEffect(() => {
      const infom = localStorage.getItem('userInfo');
      setInfo(JSON.parse(infom));
    }, [])
    
  
  return (
    <>
  <Space direction="vertical" style={{ width: '100%' }} >
    <Layout>
      <Header style={headerStyle}>

      <Popover placement="bottom" title={info?.payload?.user?.username} content={()=>{
        return (
          <div>
            {info?.payload?.user?.email}
            <div onClick={()=>logout()} style={{marginTop:5}}>
              Logout
            </div>
          </div>
        )
      }} trigger="click">
         <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
      </Popover>
      </Header>
    </Layout>
    <div style={{width:'100%'}}>
    <Search width={100} placeholder="input search loading with enterButton" loading enterButton />
    <Card
    style={{ width: 300,padding:25 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Card title"
      description="This is the description"
    />
  </Card>

    </div>
    <div style={{position:'absolute',bottom:0,width:'99%',justifyContent:'center',display:'flex'}}>
    <Pagination defaultCurrent={1} total={50} />
    </div>
  </Space>
   



  {/* <Switch checked={!loading} onChange={onChange} />
      <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </Card> */}
  
    </>
  )
}

export default Home_Grid