import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import ProtectRoute from './components/auth/ProtectRoute'
import PagenotFound from './components/PagenotFound'
const App: React.FC = () => {
  return (
    <>
    <Routes>

      <Route path='/' element={<HomePage/>}/>
      <Route path='*' element={<PagenotFound/>}/>


       <Route path='/dashboard' element={<ProtectRoute />}>
       <Route path=''  element={<Dashboard />}/>

       </Route>
    </Routes>
     
    </>
  )
}

export default App
