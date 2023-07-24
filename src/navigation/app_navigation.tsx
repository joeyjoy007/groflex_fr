import {
    Route,
    Routes,
  } from "react-router-dom";
import Register from "../components/authentication/Register";
import Login from "../components/authentication/Login";
import Home_Grid from "../components/pages/Home_Grid";
import React from "react";

const App_navigation = () => {
    const [token, setToken] = React.useState(0)
  return (
  <>
  {
    token === 0?(
        <>
         <div  style={{display:'flex',height:'100vh'}}>
        <Routes>
            <Route path="/" element={<Home_Grid/>}/>
        </Routes>
        </div>
        </>
    ):(
        <>
        <div  style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}>
        <Routes>
            <Route path="/g" element={<Home_Grid/>}/>
        </Routes>
        </div>
        </>
    )
  }
  </>
  
  )
}

export default App_navigation