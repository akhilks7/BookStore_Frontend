import React, { useContext } from 'react'
import { FaGraduationCap, FaHome } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { PiBooks } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import serverURL from '../../Services/serverURL'
import { useState } from 'react'
import { useEffect } from 'react'
import { userProfileUpdateContent } from '../../context/ContextShare'

function AdminSidebar() {
    const [userdata, setuserdata] = useState({
        username: "",
        password: "",
        conformpassword: "",
        bio: "",
        profile: "",
        role: ""
      })
      const [token, settoken] = useState("")
      const [existingProfile, setexistingProfile] = useState('')
      const {userProfileUpdateStatus}=useContext(userProfileUpdateContent)
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
          settoken(sessionStorage.getItem("token"))
        }
         const user = JSON.parse(sessionStorage.getItem("userDetails"))
                setuserdata({
                    username: user.username,
                    password: user.password,
                    conformpassword: user.password,
                    role: user.role
                })
    
                setexistingProfile(user.profile)
      }, [token,userProfileUpdateStatus])
    return (
        <>
            <div className='bg-gray-200 w-full h-screen flex items-center flex-col'>
                <div className='my-10'>
                    {existingProfile == "" ?
                        <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?semt=ais_hybrid&w=740&q=80" style={{ width: "150px", height: "150px", borderRadius: "50%" }} alt="" />
                        : <img src={`${serverURL}/uploadImages/${existingProfile}`} style={{ width: "150px", height: "150px", borderRadius: "50%" }} alt="" />
                    }                </div>
                <h1 className='text-2xl mb-10'>{userdata.username}</h1>
                <div className='mb-10'>
                    <div className='mb-4 flex'>
                        {/* <input type="radio" id='home' readOnly /> */}
                        <Link to={'/admin-home'}><label htmlFor="home" className='flex ms-3 mt-2 '><FaHome className='mt-1 me-1' />Home</label></Link>
                    </div>
                    <div className='mb-4 flex'>
                        {/* <input type="radio" id='books' readOnly /> */}
                        <Link to={'/admin-books'}><label htmlFor="books" className='flex ms-3 mt-2 '><PiBooks className='mt-1 me-1' />Books</label></Link>
                    </div>

                    <div className='mb-4 flex'>
                        {/* <input type="radio" id='careers' readOnly /> */}
                        <Link to={'/admin-careers'}><label htmlFor="careers" className='flex ms-3 mt-2 '><FaGraduationCap className='mt-1 me-1' />Careers</label></Link>
                    </div>
                    <div className='mb-4 flex'>
                        {/* <input type="radio" id='settings' readOnly /> */}
                        <Link to={'/admin-settings'}><label htmlFor="settings" className='flex ms-3 mt-2 '><IoMdSettings className='mt-1 me-1' />Settings</label></Link>
                    </div>


                </div>
            </div>

        </>
    )
}

export default AdminSidebar