import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from '../components/AdminSideBar'
import { FaBook, FaUser, FaUserGraduate } from 'react-icons/fa'
import { getAllAdminBooksAPI, getAlladminUsersAPI } from '../../Services/allApi'

function AdminHome() {
  const[noofbooks,setnoofbooks]=useState([])
  const[noofusers,setnoofusers]=useState([])
  const[token,settoken]=useState("")
  const getcount=async()=>{
    const result=await getAllAdminBooksAPI()
    console.log(result.data);
    setnoofbooks(result.data)
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const users= await getAlladminUsersAPI(reqHeader)
    setnoofusers(users.data)
    
    console.log(users.data);
  }
  console.log(noofbooks.length);
  console.log(noofusers.length);
 useEffect(() => {
  const savedToken = sessionStorage.getItem("token");
  if (savedToken) {
    settoken(savedToken);
  }
}, []);

useEffect(() => {
  if (token) {
    getcount();
  }
}, [token]);
  return (
    <>
      <AdminHeader />
        <div className='md:grid grid-cols-[1fr_4fr]'>
          <div>
            <AdminSideBar />
          </div>
        <div className='p-4'>
          <div className='md:grid grid-cols-3 text-white'>
            <div className='px-5'>
              <div className='grid grid-cols-[1fr_4fr] bg-blue-600 rounded p-4'>
                <div className='flex justify-center items-center'><FaBook/></div>
                  <div>
                    <h1>Total No.Of Books : <span className='text-xl'>{noofbooks.length}</span></h1>
                    
                  
                </div>
              </div>
            </div>
            <div className='px-5'>
              <div className='grid grid-cols-[1fr_4fr] bg-green-600 rounded p-4'>
                <div className='flex justify-center items-center'><FaUser/></div>
                  <div>
                    <h1>Total No.Of Users : <span className='text-xl'>{noofusers.length}</span></h1>
                    
                  
                </div>
              </div>
            </div>
            <div className='px-5'>
              <div className='grid grid-cols-[1fr_4fr] bg-yellow-600 rounded p-4'>
                <div className='flex justify-center items-center'><FaUserGraduate/></div>
                  <div>
                    <h1>Total No.Of Applicants : <span className='text-xl'>85</span></h1>
                    
                  
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>

    </>
  )
}

export default AdminHome