import { useEffect, useState } from 'react'

import './App.css'
import { AiFillAlert } from 'react-icons/ai'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './common/pages/LandingPage'
import Contact from './common/pages/Contact'
import Auth from './common/pages/Auth'
import Pnf from './common/pages/Pnf'
import AllBooks from './user/pages/AllBooks'
import Careers from './user/pages/Careers'
import Profile from './user/pages/Profile'
import ViewBooks from './user/pages/ViewBooks'
import AdminHome from './admin/pages/AdminHome'
import AdminCareer from './admin/pages/AdminCareer'
import AdminBooks from './admin/pages/AdminBooks'
import AdminSetting from './admin/pages/AdminSetting'
import Preloader from './common/pages/Preloader'
import { ToastContainer, Bounce } from "react-toastify";
import PaymentSucess from './user/pages/PaymentSucess'
import PaymentError from './user/pages/PaymentError'
import { useContext } from 'react'
import { userAuthContext } from './context/AuthContext'



function App() {

  const [loader, setloader] = useState(true)
  const{role}=useContext(userAuthContext)

  useEffect(() => {
    setTimeout(() => {
      setloader(false)
    }, 2000);
  }, [])


  return (
    <>

      <Routes>
        {/* ---------------- common --------------------- */}
        <Route path='/' element={loader ? <Preloader /> : <LandingPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />

        {/* ---------------- user --------------------- */}
       {role == "user" && <>
          <Route path='/all-books' element={<AllBooks />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/view-books/:id' element={<ViewBooks />} />
          <Route path='/payment-success' element={<PaymentSucess />} />
          <Route path='/payment-error' element={<PaymentError />} />
        </>}
 

        {/* ---------------- Admin --------------------- */}
        {role == "admin" && <>
          <Route path='/admin-home' element={<AdminHome />} />
          <Route path='/admin-careers' element={<AdminCareer />} />
          <Route path='/admin-books' element={<AdminBooks />} />
          <Route path='/admin-settings' element={<AdminSetting />} />
        </>}

        {/* --------------- Pnf ------------------ */}
        <Route path='*' element={<Pnf />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

    </>
  )
}

export default App
