/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar,Popover} from 'antd';
import React, { useContext } from 'react';
import { Layout, Space } from 'antd';
import { AuthContext } from '../../context/context';
import All_user from './All_user';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'right',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};


const Home_Grid = () => {
    const [loading, setLoading] = React.useState(true);
    const [info, setInfo] = React.useState(null);

    const {logout}: any = useContext(AuthContext);

    React.useEffect(() => {
      const infom: any = localStorage.getItem('userInfo');
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
 <All_user/>
  </Space>
  
  
    </>
  )
}

export default Home_Grid