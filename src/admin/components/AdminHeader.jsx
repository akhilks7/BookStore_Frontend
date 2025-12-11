import React from 'react'
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userAuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

function AdminHeader() {
  const navigate = useNavigate()
  const{setAuthoriseduser}=useContext(userAuthContext)
  
  const Logout = () => {
    sessionStorage.removeItem("token")
    
    sessionStorage.removeItem("userDetails")
   setAuthoriseduser(false)
    navigate("/")
  }
  return (
    <nav className="px-5 py-3 flex items-center">
      {/* logo */}
      <div className="flex items-center">
        <img width="50px" height="50px" src="https://images-platform.99static.com//ugmhd9CaLnHebv7Ry8avOveDDtI=/299x0:1067x768/fit-in/500x500/99designs-contests-attachments/42/42948/attachment_42948180"
          alt="" />
        <h1 className="font-bold flex text-2xl ms-4">BOOKSTORE</h1>
      </div>

      {/* login */}
      <div className="ms-auto">
        <button onClick={() => { Logout() }} className='flex justify-between items-center border border-black rounded px-4 py-3 ms-3 hover:bg-black hover:text-white'><FaPowerOff className='me-3' />Logout</button>
      </div>
    </nav>
  )
}

export default AdminHeader