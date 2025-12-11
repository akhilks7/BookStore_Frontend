
import { useContext } from 'react'
import { updateadminprofileAPI } from '../../Services/allApi'
import serverURL from '../../Services/serverURL'
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from '../components/AdminSideBar'
import { useState } from 'react'
import { useEffect } from 'react'
import { userProfileUpdateContent } from '../../context/ContextShare'

function AdminSetting() {
  const [token, settoken] = useState("")
  console.log(token);
  const [userdata, setuserdata] = useState({
    username: "",
    password: "",
    conformpassword: "",
    bio: "",
    profile: "",
    role: ""
  })
  const {setuserProfileUpdateStatus}=useContext(userProfileUpdateContent)
  const [existingProfile, setexistingProfile] = useState('')
  const [preview, setpreview] = useState('')
  console.log(userdata);
  const handleUploadImg = (e) => {
    setuserdata({ ...userdata, profile: e.target.files[0] })
    const url = URL.createObjectURL(e.target.files[0])
    setpreview(url)
  }

  const updateAdminProfile = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const updateUserprofile = new FormData()
    const { username, password, conformpassword, bio } = userdata
    try {
      if (!username || !password || !conformpassword) {
        alert(`please fill in all feilds`)
      } else {
        if (userdata.password == userdata.conformpassword) {
          if (preview) {
            for (let item in userdata) {
              updateUserprofile.append(item, userdata[item])
            }
            const result = await updateadminprofileAPI(updateUserprofile, reqHeader)
            console.log(result);
            
            // setresload(!reload)
            sessionStorage.setItem("userDetails", JSON.stringify(result.data))
            setuserProfileUpdateStatus(result)
            // window.location.reload()
          } else {
            console.log(`not inside preview`);

            const result = await updateadminprofileAPI({ username, password,profile: existingProfile }, reqHeader)
            console.log(result);
            
            sessionStorage.setItem("userDetails", JSON.stringify(result.data))
            setuserProfileUpdateStatus(result)
            // window.location.reload()
          }


        } else {
          alert(`password are not same`)
        }
      }
    } catch (error) {
      console.log(error);

    }
    
  }
     const reset = () => {
        const user = JSON.parse(sessionStorage.getItem("userDetails"))
        setuserdata({
            username: user.username,
            password: user.password,
            conformpassword: user.password,
            bio: user.bio,
            role: user.role
        })

        setexistingProfile(user.profile)
        setpreview("")
    }

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
  }, [token])
  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_5fr]'>
        <div>
          <AdminSideBar />
        </div>
        <div className='p-4'>
          <h1 className='text-3xl text-center font-semibold my-10'>Settings</h1>
          <div className='md:grid grid-cols-2 mt-10'>
            <div className='text-justify md:px-10 px-5'>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, molestias expedita laborum
                sequi modi, deserunt, consequatur fugit blanditiis et quasi quos fuga unde error aliquid dignissimos
                sit. Quia rem quibusdam quae suscipit iste natus ad voluptates reprehenderit molestias sequi voluptatem
                vero excepturi architecto reiciendis rem aspernatur minima ipsa laborumique commodi quas, quisquam officiis dolores
                veritatis mollitia aliquam pariatur error nostrum, veniam placeat!</p>
              <p className=' mt-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, molestias expedita laborum
                sequi modi, deserunt, consequatur fugit blanditiis et quasi quos fuga unde error aliquid dignissimos
                sit. Quia rem quibusdam quae suscipit  minima i Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, culpa itaque! Rem, vitae? Quis eum laboriosam possimus maxime, unde beatae?
                s animi, modi sit quisquam? Eos accusantium incidunt totam beatae! Similique commodi quas, quisquam officiis dolores
                veritatis mollitia aliquam pariatur error nostrum, veniam placeat!</p>
            </div>

            <div className='md:px-10 px-5'>
              <div className='bg-blue-300 md:p-10 p-5 rounded my-10 md:my-0'>
                <div className='flex justify-center items-center my-10'>
                  <label htmlFor="profile">
                    <input onChange={(e) => { handleUploadImg(e) }} id='profile' style={{ display: "none" }} type="file" />
                    {existingProfile == "" ?
                      <img src={preview ? preview : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?semt=ais_hybrid&w=740&q=80"} style={{ width: "150px", height: "150px", borderRadius: "50%" }} alt="" />
                      : <img src={preview ? preview : `${serverURL}/uploadImages/${existingProfile}`} style={{ width: "150px", height: "150px", borderRadius: "50%" }} alt="" />
                    }
                  </label>
                </div>
                <div className='mb-3 '>
                  <label htmlFor="" className='font-medium'>Username:</label>
                  <input value={userdata.username} onChange={(e) => { setuserdata({ ...userdata, username: e.target.value }) }} type="text" name="" id="" placeholder='Username..' className='bg-white rounded w-full p-2' />
                </div>
                <div className='mb-3'>
                  <label htmlFor="" className='font-medium'>Password:</label>
                  <input value={userdata.password} onChange={(e) => { setuserdata({ ...userdata, password: e.target.value }) }} type="PAssword" name="" id="" placeholder='Password' className='bg-white rounded w-full p-2' />
                </div>
                <div className='mb-3'>
                  <label htmlFor="" className='font-medium'>Confrim Password</label>
                  <input value={userdata.conformpassword} onChange={(e) => { setuserdata({ ...userdata, conformpassword: e.target.value }) }} type="text" name="" id="" placeholder='Confrim PAssword' className='bg-white rounded w-full p-2' />
                </div>
                <div className='flex justify-between mt-10 gap-6'>
                  <button onClick={()=>{reset()}} type="button" className='bg-red-600 rounded-xl text-white p-3 w-1/2 hover:bg-white hover:border hover:border-red-700 hover:text-red-700'>Reset</button>
                  <button onClick={()=>{updateAdminProfile()}} type="button" className='bg-green-600 rounded-xl text-white p-3 w-1/2 hover:bg-white hover:border hover:border-green-700 hover:text-green-700'>Update</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminSetting