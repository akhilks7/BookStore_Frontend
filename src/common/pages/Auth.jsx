import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { googleloginAPI, loginAPI, registerAPI } from '../../Services/allApi'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useContext } from 'react';
import { userAuthContext } from '../../context/AuthContext';


function Auth({ register }) {
  const [passwordview, setpasswordview] = useState(true)
  const{setAuthoriseduser}=useContext(userAuthContext)
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  console.log(userDetails);

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.warning("Please fill in the fields")
    } else {
      const result = await registerAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success("Registered Successfully")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate("/login");
      } else if (result.status == 404) {
        toast.warning(result.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error("Something went wrong")
      }


    }
  }

  const handlelogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      alert("fill completelu")
    } else {
      const result = await loginAPI(userDetails)
      console.log(result);
      if (result.status == 200 && result.data.existinguser.role == "user") {
        toast.success("logined Successfully")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        setAuthoriseduser(true)
        sessionStorage.setItem("userDetails", JSON.stringify(result.data.existinguser))
        sessionStorage.setItem("token", result.data.tocken)
        navigate("/");
      } else if (result.status == 200 && result.data.existinguser.role == "admin") {
        toast.success("logined Successfully")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        sessionStorage.setItem("userDetails", JSON.stringify(result.data.existinguser))
        sessionStorage.setItem("token", result.data.tocken)
        navigate("/admin-home");
      } else if (result.status == 401) {
        toast.warning(result.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error("Something went wrong")
      }

    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse.credential);
    const googleData = jwtDecode(credentialResponse.credential)
    console.log(googleData);
    try {
      const result = await googleloginAPI({ email: googleData.email, username: googleData.name, profile: googleData.picture, password: googleData.jti })
      console.log(result);
      if (result.status == 200 && result.data.existinguser.role == "user") {
        toast.success("logined Successfully")
        setAuthoriseduser(true)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        sessionStorage.setItem("userDetails", JSON.stringify(result.data.existinguser))
        sessionStorage.setItem("token", result.data.tocken)
        navigate("/");
      } else if (result.status == 200 && result.data.existinguser.role == "admin") {
        toast.success("logined Successfully")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        sessionStorage.setItem("userDetails", JSON.stringify(result.data.existinguser))
        sessionStorage.setItem("token", result.data.tocken)
        navigate("/admin-home");
      } else if (result.status == 401) {
        toast.warning(result.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url("https://img.freepik.com/premium-vector/geometric-gradient-technology-background_23-2149110132.jpg?semt=ais_hybrid&w=740&q=80")] '>

        <div className='p-10'>
          <h1 className='text-3xl font-semibold text-center m-5 text-white'>BOOKSTORE</h1>
          <div>

          </div>
          <div className='w-150 bg-gray-300 p-10'>
            <div className='flex items-center justify-center'><FaUserCircle className='text-8xl text-center ' /></div>
            {register ? <h1 className='text-center text-4xl font-bold p-2'>Register </h1> : <h1 className='text-center text-4xl font-bold p-2'>Login </h1>}
            {register && <div><label className='text-xl font-bold' htmlFor="">Username</label>
              <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='bg-white w-full p-2 m-2' /></div>
            }
            <label className='text-xl font-bold' htmlFor="">Email</label>
            <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder='Email' className='bg-white w-full p-2 m-2' />



            <label className='text-xl font-bold' htmlFor="">Password</label>
            <div className='flex'>
              <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type={passwordview ? "password" : "text"} placeholder='Password' className='bg-white w-full p-2  m-2' />

              {passwordview ? <FaEye className='text-2xl mt-4 ' style={{ marginLeft: "-40px" }} onClick={() => { setpasswordview(!passwordview) }} /> : <GoEyeClosed className='text-2xl mt-4 ' style={{ marginLeft: "-40px" }} onClick={() => { setpasswordview(!passwordview) }} />}

            </div>

            <div className='flex'>
              {register ? <button onClick={() => { handleRegister() }} className='w-full bg-blue-600 text-white text-lg p-1 ms-2 my-3  text-center font-semibold'>Register</button> :
                <button onClick={() => { handlelogin() }} className='w-full bg-green-800 text-white text-lg p-1 ms-2 my-3  text-center font-semibold'>Login</button>}
            </div>

            <div className=''>

              {register ? <p className='text-green-700'>already have an account ! <Link to={"/login"}>Login</Link></p>

                : <p className='text-blue-700'>Dont have an account? <Link to={"/register"}>Register</Link></p>
              }
            </div>
          </div>






          <div>
            {!register &&
              <div>
                {/* google auth */}
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLogin(credentialResponse);
                  }}

                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                />
              </div>}
          </div>



        </div>

      </div>
    </>
  )
}

export default Auth