import React, { useEffect } from 'react'

import {Routes,Route, Navigate} from "react-router-dom"
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/userAuthStore'
import {  useThemeStore } from './store/useThemeStore'

import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"

const App = () => {

  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
 const {theme}= useThemeStore()

  useEffect(()=>{
    checkAuth()

  },[checkAuth])

  console.log({authUser});

  if(isCheckingAuth && !authUser)
    return(
  <div className='flex items-center justify-center h-screen'>
    <Loader className="size-10 animate-spin" />
  </div>
  )

  
  return (
    <div data-theme={theme}>
     <Navbar/>

      <Routes>

        <Route path="/" element={authUser ? <Homepage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <Login/>: <Navigate to="/"/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/profile" element={authUser ? <Profile/> : <Navigate to="/login"/>}/>



      </Routes>


      <Toaster/>

      


    </div>
  )
}

export default App