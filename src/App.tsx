import React from 'react'
import { setUpAxios } from './server/server';
import App_navigation from './navigation/App_navigation';
import { AuthProvider } from './context/context';

const App = () => {
  React.useEffect(() => {
    setUpAxios();
});

  return (
    <>
    <AuthProvider>
      <App_navigation/>
    </AuthProvider>
    </>
  )
}

export default App