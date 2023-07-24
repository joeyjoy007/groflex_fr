/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { loginUser } from '../server/apis/user';
import { message } from 'antd';



export const AuthContext= createContext(null);


export const AuthProvider:any = ({ children }:any) => {



    const [messageApi, contextHolder] = message.useMessage();        
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>();
    const [fetchAgain, setFetchAgain] = useState(false);



    const login:any = async (data: any) => {
        setIsLoading(true);
        try {
            
            const response:any = await loginUser(data);
            console.log("RE",response);
            if (response.status === 1) {

                setUserInfo(response);
                console.log("Context Response==>",response);
                setUserToken(response.payload.token);
                setUserInfo(JSON.stringify(response));
                localStorage.setItem('userInfo',JSON.stringify(response))
                localStorage.setItem('userToken',response.payload.token)
                setIsLoading(false);
                messageApi.success({
                    type:"success",
                    content:response.message
                   });
            }
            else{
                setIsLoading(false)
                messageApi.error({
                    type:"error",
                    content:"Login unsuccess"
                   });
            }
        } catch (error: any) {
            setIsLoading(false);
            messageApi.error({
                type:"error",
                content:error.message
               });
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
         localStorage.removeItem('userToken');
         localStorage.removeItem('userInfo');
        setIsLoading(false);
        messageApi.success({
            type:"success",
            content:"Logout success"
           });
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            const userToken = localStorage.getItem('userToken');
            const userInfo = localStorage.getItem('userInfo');

            if (userToken !== null) {
                setUserToken(userToken);
                setUserInfo(userInfo);
                
                messageApi.info({
                    type:"info",
                    content:"Welcome"
                   });
            }
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            messageApi.error({
                type:"error",
                content:error.message
               });
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);
    return (
      <>
        {contextHolder}
        <AuthContext.Provider 
        value={{ login,userInfo,userToken,isLoading,logout,setFetchAgain,fetchAgain }}>{children}</AuthContext.Provider>;
      </>
    )
    
   

};