import React, { useState, useEffect, useContext } from 'react'
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaRegUser } from 'react-icons/fa'
import { MdOutlineMenu } from "react-icons/md";
import { Link } from 'react-router-dom'
import { userProfileUpdateContent } from '../../context/ContextShare';
import { userAuthContext } from '../../context/AuthContext';

function Header() {
    const [menu, setmenu] = useState(false)
    const [dropdownstatus, setdropdownstatus] = useState(false)
    const [token, settoken] = useState("")
    const [userdetails, setuserdetails] = useState({})
    const {userProfileUpdateStatus}=useContext(userProfileUpdateContent)
    const{setAuthoriseduser}=useContext(userAuthContext)
    // console.log(userdetails);
    
    const Logout =()=>{
        sessionStorage.removeItem("token")
        settoken("")
        sessionStorage.removeItem("userDetails")
        setuserdetails({})
        setAuthoriseduser(false)
        window.location.href="/"
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        token && settoken(token)

        const userdetails = sessionStorage.getItem("userDetails")
        userdetails && setuserdetails(JSON.parse(userdetails))
    }, [userProfileUpdateStatus])


    return (
        <>
            {/* TOP BAR */}
            <div className="grid grid-cols-3 p-3 items-center">

                {/* Logo */}
                <div className='flex items-center'>
                    <img
                        width="50px"
                        height="50px"
                        src="https://images-platform.99static.com//ugmhd9CaLnHebv7Ry8avOveDDtI=/299x0:1067x768/fit-in/500x500/99designs-contests-attachments/42/42948/attachment_42948180"
                        alt="logo"
                    />
                    <h1 className='font-semibold text-2xl md:hidden'> BOOKSTORE</h1>
                </div>

                {/* Title (Desktop only) */}
                <div className='md:flex justify-center items-center hidden'>
                    <h1 className='text-3xl font-semibold'>BOOKSTORE</h1> 
                </div>

                {/* Right side icons + Login/Profile */}
                <div className='md:flex justify-end items-center  hidden relative'>

                    <FaInstagramSquare className='me-3 text-2xl cursor-pointer' />
                    <FaFacebook className='me-3 text-2xl cursor-pointer' />
                    <FaLinkedin className='me-3 text-2xl cursor-pointer' />

                    {/* If NOT logged in */}
                    {!token ? (
                        <Link to="/login">
                            <button className='flex items-center border border-black rounded px-3 py-2 ms-3
                                hover:bg-black hover:text-white'>
                                <FaRegUser className='me-2' /> Login
                            </button>
                        </Link>
                    ) : (
                        <>
                            {/* User avatar */}
                            <button onClick={() => setdropdownstatus(!dropdownstatus)}>
                                <div className='flex items-center justify-center p-2 gap-3 bg-gray-300 rounded-2xl'>
                                    <img
                                        src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                                        width="35px"
                                        style={{ borderRadius: "50%" }}
                                        alt="user"
                                    />
                                    <p>{userdetails.username}</p>
                                </div>
                            </button>

                            {/* Dropdown menu */}
                            {dropdownstatus && (
                                <div className="absolute top-12 right-0 bg-white text-black shadow-lg rounded p-3 w-32">
                                    <Link to="/profile">
                                        <button className="block w-full text-left p-2 hover:bg-gray-100">
                                            Profile
                                        </button>
                                    </Link>
                                    <button
                                        className="block w-full text-left p-2 hover:bg-gray-100"
                                        onClick={() => 
                                           Logout()
                                        }
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                </div>

            </div>

            {/* NAVIGATION BAR */}
            <nav className="bg-gray-900 text-white p-2 md:flex justify-center">

                {/* Mobile menu button */}
                <div className="md:hidden p-2" onClick={() => setmenu(!menu)}>
                    <MdOutlineMenu className="text-3xl cursor-pointer" />
                </div>

                {/* Menu items */}
                <ul className={
                    menu
                        ? "flex flex-col"
                        : "hidden md:flex justify-center items-center"
                }>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to="/">Home</Link></li>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to="/all-books">Books</Link></li>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to="/careers">Careers</Link></li>
                    <li className='md:mx-4 mt-3 md:mt-0'><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Header
