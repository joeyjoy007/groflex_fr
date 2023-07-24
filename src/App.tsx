import React from 'react'
import Register from './components/authentication/Register'
import App_navigation from './navigation/app_navigation'

const App = () => {
  return (
    <div style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}>
      {/* <Register/> */}
      <App_navigation/>
    </div>
  )
}

export default App