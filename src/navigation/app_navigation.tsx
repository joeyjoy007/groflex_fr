import {
    Route,
    Routes,
  } from "react-router-dom";
import Register from "../components/authentication/Register";
import Login from "../components/authentication/Login";
import Home_Grid from "../components/pages/Home_Grid";
import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import ErrorPage from "../components/pages/Error";

const App_navigation = () => {
    const {userToken} = useContext(AuthContext)
  return (
  <>
  {
    userToken !== null?(
        <>
         <div  style={{display:'flex',height:'100vh'}}>
        <Routes>
            <Route path="/home" element={<Home_Grid/>}/>
            <Route path='*' element={<ErrorPage/>}/>
        </Routes>
        </div>
        </>
    ):(
        <>
        <div  style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center',backgroundImage:' linear-gradient(315deg, #378b29 0%, #ffffff 74%)'}}>
        <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

        </Routes>
        </div>
        </>
    )
  }
  </>
  
  )
}

export default App_navigation