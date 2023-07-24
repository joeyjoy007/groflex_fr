import {
    Route,
    Routes,
  } from "react-router-dom";
import Register from "../components/authentication/Register";
import Login from "../components/authentication/Login";
import Home_Grid from "../components/pages/Home_Grid";
import React, { useContext } from "react";
import { AuthContext } from "../context/context";

const App_navigation = () => {
    const {userToken} = useContext(AuthContext);
  return (
  <>
  {
    userToken !== null?(
        <>
         <div  style={{display:'flex',height:'100vh'}}>
        <Routes>
            <Route path="/l" element={<Home_Grid/>}/>
        </Routes>
        </div>
        </>
    ):(
        <>
        <div  style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}>
        <Routes>
        <Route path="/r" element={<Register/>}/>
        <Route path="/l" element={<Login/>}/>

        </Routes>
        </div>
        </>
    )
  }
  </>
  
  )
}

export default App_navigation