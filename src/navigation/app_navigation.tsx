import {
    Route,
    Routes,
  } from "react-router-dom";
import Register from "../components/authentication/Register";
import Login from "../components/authentication/Login";

const App_navigation = () => {
  return (
    <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/l" element={<Login/>}/>
    </Routes>
  )
}

export default App_navigation